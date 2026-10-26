'use strict';
// Seed data: copy of functions/lib/seed.js (== lib/db.js seedVersion 2) minus settings.
// Demo customer ids are prefixed 'demo-' (c001 -> demo-c001) and tokens are dropped (customers are keyed by Firebase anonymous uid).
const crypto = require('crypto');
const DEMO_TOKEN = 'demo-token-gentei-0001';
const SEED_VERSION = 3;
const newToken = () => crypto.randomBytes(24).toString('hex');
const uid = (p) => p + crypto.randomBytes(5).toString('hex');

function seed() {
  const now = Date.now();
  const DAY = 86400000;
  let s = 20260601; // deterministic PRNG
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const iso = (t) => new Date(t).toISOString();

  // NEW RELEASES は物件ごとに1タグ、Exclusive Residences / ESCON Prime Concierge は種別ごとに1タグ(public/properties.js の tag と同じ名前)。会員の「ご関心物件」= タグ。Push・限定情報はタグで出し分け。
  const tags = [
    { id: 't001', name: '芦屋', color: '#0b2a5b' },
    { id: 't002', name: '福岡', color: '#1f5c8f' },
    { id: 't003', name: '南麻布', color: '#2e7d4f' },
    { id: 't004', name: '西麻布', color: '#6a3d8f' },
    { id: 't005', name: '九段南', color: '#a8483a' },
    { id: 't006', name: 'VIP', color: '#b8860b' },
    { id: 't007', name: 'エクスクルーシブ', color: '#3a4a6b' },
    { id: 't008', name: 'プライムコンシェルジュ', color: '#7a5f25' },
  ];

  const A = '/assets/img/';
  const property = {
    id: 'prime',
    name: 'ESCON PRIME MEMBERSHIP',
    tagline: 'この国の技術を未来へ継承し、次世代の暮らしに新たな価値を。',
    heroImage: A + 'top_mv.jpg',
    heroImageSp: A + 'top_mv_sp.jpg',
    logo: A + 'common_logo.svg',
    clientName: '株式会社エスコン',
    clientLogo: A + 'common_escon.svg',
    gtmId: '',
  };

  const mk = (i, title, type, url, targetTags, order, thumb, active = true, extra = {}) => ({
    id: 'ct' + String(i).padStart(3, '0'), title, type, url,
    thumb, targetTags, active, order, updatedAt: iso(now - (30 - i) * DAY), ...extra,
  });
  const essence = [
    { title: 'めきき｜本物を見抜く批評眼', src: A + 'ess_mekiki.jpg' },
    { title: 'たくみ｜ものづくりの精巧な技術', src: A + 'ess_takumi.jpg' },
    { title: 'きわめ｜極限までに研ぎ澄ますこと', src: A + 'ess_kiwame.jpg' },
    { title: 'こころみ｜冒険的な進取の精神', src: A + 'ess_kokoromi.jpg' },
    { title: 'おもてなし｜あたたかく迎える心', src: A + 'ess_omotenashi.jpg' },
  ];
  const props = [
    ['芦屋', '【芦屋】（仮称）芦屋市松ノ内町プロジェクト 先行情報', 'prop_ashiya.jpg'],
    ['福岡', '【福岡】（仮称）福岡市中央区唐人町プロジェクト 先行情報', 'prop_fukuoka.jpg'],
    ['南麻布', '【南麻布】（仮称）港区南麻布４丁目プロジェクト 先行情報', 'prop_minamiazabu.jpg'],
    ['西麻布', '【西麻布】（仮称）港区西麻布２丁目プロジェクト 先行情報', 'prop_nishiazabu.jpg'],
    ['九段南', '【九段南】（仮称）千代田区九段南１丁目プロジェクト 先行情報', 'prop_kudan.jpg'],
  ];
  const contents = [
    mk(1, 'エスコンのフィロソフィ｜継承される5つの真髄', 'gallery', 'cg:essence', [], 1, A + 'ess_mekiki.jpg', true, { gallery: essence }),
    ...props.map((p, k) => mk(2 + k, p[1], 'gallery', 'cg:' + p[0], [p[0]], 2 + k, A + p[2], true, { gallery: [{ title: p[1], src: A + p[2] }] })),
    mk(7, 'エスコン プライムコンシェルジュ｜中古・未公開物件のご紹介', 'link', 'https://vs.qlea.com/escon/primemembership/', [], 7, A + 'top_concept.jpg'),
    mk(8, 'VIP会員様限定 プライベートご案内（準備中）', 'link', 'https://example.com/vip', ['VIP'], 8, A + 'top_design_2.jpg', false),
  ];

  const names = [
    ['山田 太郎', 'yamada', ['芦屋', '西麻布'], '見込み', '佐藤', 'ios'],
    ['鈴木 花子', 'suzuki', ['福岡'], '検討中', '田中', 'android'],
    ['高橋 健一', 'takahashi', ['VIP', '南麻布', '九段南'], '商談中', '佐藤', 'ios'],
    ['伊藤 美咲', 'ito', ['九段南'], '来場済', '田中', 'android'],
    ['渡辺 誠', 'watanabe', ['芦屋'], '新規', '', 'pc'],
    ['中村 由美', 'nakamura', ['西麻布', '南麻布'], '検討中', '佐藤', 'ios'],
    ['小林 大輔', 'kobayashi', ['VIP', '西麻布'], '商談中', '田中', 'ios'],
    ['加藤 さくら', 'kato', [], '新規', '', 'android'],
  ];
  const customers = [];
  names.forEach((n, i) => {
    const created = now - (170 - i * 18) * DAY;
    customers.push({
      id: 'c' + String(i + 1).padStart(3, '0'),
      name: n[0], email: `${n[1]}@example.com`, tags: n[2], status: n[3], assignee: n[4],
      memo: i === 2 ? 'ご夫婦でご検討。都心の複数案件に関心。' : '',
      token: i === 0 ? DEMO_TOKEN : newToken(),
      createdAt: iso(created), lastSeenAt: iso(created), pushSub: null,
      installed: i !== 4 && i !== 7, platform: n[5],
    });
  });

  // events
  const events = [];
  const ev = (c, type, target, t) => events.push({ id: uid('e'), customerId: c.id, type, target, at: iso(t) });
  const T = props.map((p) => p[1]);
  const profiles = {
    c001: { n: 22, targets: [T[0], T[3], 'エスコンのフィロソフィ｜継承される5つの真髄'] },
    c002: { n: 14, targets: [T[1], 'エスコンのフィロソフィ｜継承される5つの真髄'] },
    c003: { n: 30, targets: [T[2], T[4], 'エスコン プライムコンシェルジュ｜中古・未公開物件のご紹介'] },
    c004: { n: 9, targets: [T[4]] },
    c005: { n: 3, targets: [T[0]] },
    c006: { n: 11, targets: [T[3], T[2]] },
    c007: { n: 26, targets: [T[3], 'エスコン プライムコンシェルジュ｜中古・未公開物件のご紹介'] },
    c008: { n: 1, targets: [] },
  };
  customers.forEach((c) => {
    const p = profiles[c.id];
    const start = new Date(c.createdAt).getTime();
    ev(c, 'page', '/register.html', start);
    if (c.installed) ev(c, 'install', c.platform, start + 4 * 60000);
    let last = start;
    for (let k = 0; k < p.n; k++) {
      // sessions skew toward recent weeks for active customers
      const span = now - start;
      let t = start + span * (0.15 + 0.85 * Math.pow(rnd(), c.id === 'c005' || c.id === 'c008' ? 1.5 : 0.55));
      if (c.id === 'c004' && k > 5) t = start + span * 0.3 * rnd();
      ev(c, 'login', '/', t);
      ev(c, 'page', '/', t + 20000);
      if (p.targets.length) {
        const view = 1 + Math.floor(rnd() * 3);
        for (let v = 0; v < view; v++) {
          const tg = p.targets[Math.floor(rnd() * p.targets.length)];
          const type = 'content';
          ev(c, 'library', '限定情報', t + 40000 + v * 30000);
          ev(c, type, tg, t + 60000 + v * 45000);
        }
      }
      if (t > last) last = t;
      if (rnd() < 0.15) ev(c, 'push_open', 'push', t - 60000);
    }
    c.lastSeenAt = iso(last);
  });
  events.sort((a, b) => a.at.localeCompare(b.at));
  events.forEach((e, i) => { e.id = 'e' + String(i + 1).padStart(6, '0'); }); // deterministic ids => idempotent seeding

  const personalFiles = [
    { id: 'pf001', customerId: 'c001', title: '山田様 ご案内資料（西麻布）', kind: 'file', url: 'https://example.com/files/yamada-plan.pdf', createdAt: iso(now - 12 * DAY) },
    { id: 'pf002', customerId: 'c001', title: 'ご面談日程のご連絡', kind: 'mail', url: 'mailto:concierge@example.com', createdAt: iso(now - 5 * DAY) },
    { id: 'pf003', customerId: 'c003', title: '高橋様 プライベートご案内', kind: 'link', url: 'https://example.com/files/takahashi-vip', createdAt: iso(now - 3 * DAY) },
  ];

  const pushes = [
    { id: 'ps001', title: '【プライムメンバーシップ】ようこそ', body: '一般公開前の物件情報を、ご関心の物件ごとにお届けします。', url: '/', targetTags: [], createdAt: iso(now - 60 * DAY), status: 'sent', sentCount: 5 },
    { id: 'ps002', title: '【九段南】新規プロジェクトの先行情報', body: '（仮称）千代田区九段南１丁目プロジェクトの最新情報を公開しました。', url: '/', targetTags: ['九段南'], createdAt: iso(now - 30 * DAY), status: 'sent', sentCount: 3 },
    { id: 'ps003', title: '【VIP様限定】プライベートご案内', body: 'VIP会員様向けの特別なご案内を、順次お届けします。', url: '/', targetTags: ['VIP'], createdAt: iso(now - 9 * DAY), status: 'sent', sentCount: 2 },
    { id: 'ps004', title: '【芦屋】先行情報を更新しました（下書き）', body: '（仮称）芦屋市松ノ内町プロジェクトの新しい情報を追加しました。', url: '/', targetTags: ['芦屋'], createdAt: iso(now - 1 * DAY), status: 'draft', sentCount: 0 },
  ];

  const conversions = [
    { id: 'cv001', customerId: 'c001', kind: 'visit_reserve', at: iso(now - 20 * DAY), note: '面談予約' },
    { id: 'cv002', customerId: 'c004', kind: 'visit_reserve', at: iso(now - 45 * DAY), note: '面談済' },
    { id: 'cv003', customerId: 'c003', kind: 'document', at: iso(now - 14 * DAY), note: '資料請求(南麻布)' },
    { id: 'cv004', customerId: 'c007', kind: 'visit_reserve', at: iso(now - 6 * DAY), note: '' },
    { id: 'cv005', customerId: 'c003', kind: 'contract_inquiry', at: iso(now - 2 * DAY), note: '条件のお問い合わせ' },
  ];

  return {
    meta: { seedVersion: SEED_VERSION },
    property, tags, contents, customers, personalFiles, pushes, events, conversions,
  };
}

function seedForFirestore(opts = {}) {
  const d = seed();
  const map = (id) => 'demo-' + id;
  const customers = d.customers.map((c) => { const { token, ...rest } = c; return { ...rest, id: map(c.id) }; });
  const events = d.events.map((e) => ({ ...e, customerId: map(e.customerId) }));
  const personalFiles = d.personalFiles.map((f) => ({ ...f, customerId: map(f.customerId) }));
  const conversions = d.conversions.map((c) => ({ ...c, customerId: map(c.customerId) }));
  const out = { property: d.property, tags: d.tags, contents: d.contents, pushes: d.pushes, seedVersion: SEED_VERSION };
  if (opts.demo === false) return { ...out, customers: [], events: [], personalFiles: [], conversions: [] };
  return { ...out, customers, events, personalFiles, conversions };
}

module.exports = { seedForFirestore, seed, SEED_VERSION, DEMO_TOKEN, newToken, uid };
