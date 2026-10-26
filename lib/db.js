'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const DEMO_TOKEN = 'demo-token-gentei-0001';
const SEED_VERSION = 3; // bump when property/contents/pushes seed changes (older data is migrated)

let db = null;
let writing = false;
let dirty = false;

const uid = (p) => p + crypto.randomBytes(5).toString('hex');
const newToken = () => crypto.randomBytes(24).toString('hex');
const nowISO = () => new Date().toISOString();

function save() {
  // atomic write: tmp file + rename (synchronous, small data)
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + '.' + process.pid + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

// 初期データは scripts/lib/seed-data.js と共通(物件・タグ・限定情報・デモ顧客)。ここでは VAPID 鍵などローカル用の設定だけ足す。
function seed() {
  const d = require('../scripts/lib/seed-data').seed();
  const vapid = require('web-push').generateVAPIDKeys();
  return { ...d, settings: { adminPassword: 'admin', vapid: { publicKey: vapid.publicKey, privateKey: vapid.privateKey } } };
}

function init() {
  let first = false;
  if (fs.existsSync(DB_FILE)) {
    try { db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
    catch (e) { console.error('db.json corrupted, reseeding:', e.message); fs.renameSync(DB_FILE, DB_FILE + '.corrupt-' + Date.now()); db = null; }
  }
  if (!db) { db = seed(); first = true; save(); }
  // ensure shape
  for (const k of ['tags', 'contents', 'customers', 'personalFiles', 'pushes', 'events', 'conversions']) if (!Array.isArray(db[k])) db[k] = [];
  if (!db.settings) db.settings = {};
  if (!db.settings.adminPassword) db.settings.adminPassword = 'admin';
  if (!db.settings.vapid) {
    const v = require('web-push').generateVAPIDKeys();
    db.settings.vapid = { publicKey: v.publicKey, privateKey: v.privateKey };
    save();
  }
  if (!db.property) { db.property = seed().property; save(); }
  if (!db.meta) db.meta = {};
  if ((db.meta.seedVersion || 0) < SEED_VERSION) {
    // migrate older seed: refresh property/contents/pushes, keep customers/events/tokens/conversions/settings
    if (fs.existsSync(DB_FILE)) { try { fs.copyFileSync(DB_FILE, DB_FILE + '.bak-v' + (db.meta.seedVersion || 1)); } catch (e) { /* ignore */ } }
    const fresh = seed();
    const oldProp = db.property || {};
    db.property = { ...fresh.property, gtmId: oldProp.gtmId || '' };
    db.contents = fresh.contents;
    db.pushes = fresh.pushes;
    db.meta.seedVersion = SEED_VERSION;
    save();
  }
  return first;
}

module.exports = { init, save, get: () => db, uid, newToken, nowISO, DEMO_TOKEN, DB_FILE };
