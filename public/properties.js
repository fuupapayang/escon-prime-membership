/* 掲載物件の一覧(トップ・会員登録・詳細シートが読み込みます)
 * tag   : 会員の「ご関心物件」= Firestore の tags 名と同じ文字にしてください(管理画面でこのタグ宛にPush送信・限定情報の出し分けができます)
 * img   : public/assets/img/ 内の写真(相対パス。gUrl() で解決されます)
 * 物件を増やす/減らす時はこのファイルと scripts/lib/seed-data.js(tags) を同じ内容にそろえ、sw.js の VERSION を上げます。
 */
window.PROPERTIES = [
  {
    id: 'ashiya', tag: '芦屋', region: '関西', status: 'NEW RELEASE',
    name: '（仮称）芦屋市松ノ内町プロジェクト', place: '兵庫県芦屋市松ノ内町',
    img: 'assets/img/prop_ashiya.jpg',
    lead: '桜並木と六甲の山並みが寄り添う、邸宅街・芦屋。',
    body: '古くから良質な住環境として知られる芦屋の地に、エスコンが挑む新たなプロジェクト。川沿いの桜並木、山の緑、そして穏やかな時間。ここで暮らす価値を、次代まで輝かせるために。'
  },
  {
    id: 'fukuoka', tag: '福岡', region: '九州', status: 'NEW RELEASE',
    name: '（仮称）福岡市中央区唐人町プロジェクト', place: '福岡県福岡市中央区唐人町',
    img: 'assets/img/prop_fukuoka.jpg',
    lead: '都心の利便と、港・城下町の歴史が重なる街。',
    body: '天神・大濠公園・ベイエリアへ手が届く、福岡の中心・中央区。歴史ある唐人町の趣と、成長を続ける都市の活力が共存する場所で、新たな住まいの価値を描きます。'
  },
  {
    id: 'minamiazabu', tag: '南麻布', region: '首都圏', status: 'NEW RELEASE',
    name: '（仮称）港区南麻布４丁目プロジェクト', place: '東京都港区南麻布４丁目',
    img: 'assets/img/prop_minamiazabu.jpg',
    lead: '都心にありながら、深い緑と静けさに包まれる南麻布。',
    body: '大使館や緑豊かな公園が点在し、都内屈指の落ち着きを湛える南麻布。選ばれた方だけが知る静謐な環境に、一邸一邸の個性を映す住まいを計画しています。'
  },
  {
    id: 'nishiazabu', tag: '西麻布', region: '首都圏', status: 'NEW RELEASE',
    name: '（仮称）港区西麻布２丁目プロジェクト', place: '東京都港区西麻布２丁目',
    img: 'assets/img/prop_nishiazabu.jpg',
    lead: '夜景に東京タワーが輝く、洗練の街・西麻布。',
    body: '洗練された大人の街として知られる西麻布。都心の夜景とともに、特別な時間を重ねるための住まいを目指します。'
  },
  {
    id: 'kudan', tag: '九段南', region: '首都圏', status: 'NEW RELEASE',
    name: '（仮称）千代田区九段南１丁目プロジェクト', place: '東京都千代田区九段南１丁目',
    img: 'assets/img/prop_kudan.jpg',
    lead: '千鳥ヶ淵の桜に近い、歴史ある九段の高台。',
    body: '桜の名所・千鳥ヶ淵や皇居の緑に近く、歴史と文化が息づく九段南。都心の中枢にありながら、四季の移ろいを身近に感じられる希少な立地での計画です。'
  }
];
window.PROPERTY_NOTE = '※掲載内容は計画段階のものであり、変更になる場合があります。詳細は会員様へ先行してご案内いたします。';
