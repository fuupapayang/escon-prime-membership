/* 会員登録の「ご関心のある物件」= 通知・限定情報の出し分け単位(タグ)。content.js(SITE)から作ります。
 * tag は Firestore の tags の名前と同じ文字にしてください(管理画面でこのタグ宛にPush・限定情報を出し分け)。
 * NEW RELEASES は物件ごとに1タグ。Exclusive Residences / ESCON Prime Concierge は種別ごとに1タグ。
 * 物件を増減したら scripts/lib/seed-data.js の tags と、sw.js の VERSION も更新します。 */
(function () {
  var S = window.SITE || {};
  var list = (S.newReleases || []).map(function (n) {
    return { id: n.id, tag: n.tag, region: n.region, name: n.title, img: n.card, group: 'NEW RELEASES' };
  });
  if ((S.exclusive || []).length) list.push({ id: 'exclusive', tag: 'エクスクルーシブ', region: 'Exclusive Residences', name: '分譲中の邸宅(Exclusive Residences)の最新情報', img: S.exclusive[Math.min(4, S.exclusive.length - 1)].card, group: 'Exclusive Residences' });
  if ((S.concierge || []).length) list.push({ id: 'concierge', tag: 'プライムコンシェルジュ', region: 'ESCON Prime Concierge', name: '中古・未公開物件のご紹介(プライムコンシェルジュ)', img: S.concierge[0].card, group: 'ESCON Prime Concierge' });
  window.PROPERTIES = list;
})();
