# PROGRESS — エスコン プライムメンバーシップ
更新: 2026-10-26

## 回答(機密なし)
- アプリ名: エスコン プライムメンバーシップ / ホーム画面名: プライム
- 方式: 複数物件(NEW RELEASES 5件)。物件 = タグ。会員登録で「ご関心物件」を選ぶ → 物件別に Push・限定情報を出し分け
- 掲載物件: 芦屋 / 福岡 / 南麻布 / 西麻布 / 九段南(いずれも「(仮称)」プロジェクト。public/properties.js)
- テーマ: ホワイト&ネイビー(#0b2a5b)+ゴールド
- GitHub: fuupapayang/escon-prime-membership(未作成) / Firebase: escon-prime-membership-2026(未作成)
- 管理者メール: escon_prime_site@ikiiki.com(確定)
- 素材: 公式サイト(vs.qlea.com)の画像。ES CON 様の利用許可「得ている」(ユーザー申告 2026-10-26)

## チェックリスト
- [x] 0 事前確認
- [x] 1 ヒアリング(管理者メールのみ未確定)
- [x] 2 素材(許可確認: はい)
- [x] 3 生成 / check.js OK(WARN: スロット名 .png 3件=.jpg に変更済み, 仮ロゴ) / ローカル確認(トップ・物件シート・登録・タグ出し分け)
- [x] 4-1 GitHub repo・Pages(https://github.com/fuupapayang/escon-prime-membership 公開URL https://fuupapayang.github.io/escon-prime-membership/)
- [x] 4-2 Firebase(Firestore・Auth・Webアプリ・サービスアカウント鍵。管理者ユーザー追加はユーザー申告済み要動作確認)
- [x] 4-3 ルール配備(2026-10-26 管理者 escon_prime_site@ikiiki.com)
- [x] 4-4 初期データ(--no-demo)・VAPID(公開鍵はFirestore、秘密鍵はSecret。再作成禁止)
- [x] 4-6 variables/secrets
- [x] 4-7 push・Pages デプロイ緑(2026-10-26)。Push送信Actionは未試験
- [~] 4-8 動作確認(Push送信Actionは sent 2/failed 0 を確認。会員登録・管理画面・端末での通知表示はユーザー確認待ち)
- [ ] 5 引き渡し

## メモ / 変更履歴
- 2026-10-26 生成。トップを「フィロソフィ→5つの真髄→NEW RELEASES→メンバーシップ特典→登録」に再構成。register.html に物件選択、tags へ保存。
- localStorage キーを `escon-prime-ms.*` に分離(同じ github.io の別物件アプリとのトークン混線防止)。
- ローカル確認で `data/db.json`(デモ顧客+ローカルVAPID秘密鍵)ができた → check.js が ERROR にするため、公開前に本人承認のうえ削除。
- アイコンは仮(ネイビー地+ゴールドの P)。本アイコンは make-icons で差し替え。
- 2026-10-26 参照サイトの全コンテンツ(NEW RELEASES詳細/Exclusive Residences/ESCON Prime Concierge/GALLERY/Concept Movie/クラフトマンインタビュー)を public/content.js に取り込み、公開済み。タグ「エクスクルーシブ」「プライムコンシェルジュ」を Firestore に追加。
- アイコンを Figma「P01 BLACK SIGNATURE」に差し替え済み。
- 未了: テスト会員の削除(本人)/ 引き渡し資料(HANDOVER.md・QR)/ 本公開(ALLOW_INDEX)/ 仮ロゴ差し替え / ローカル data/db.json の削除(承認待ち)。
- 鍵ファイル(...-sa.json)は ~/Documents に移動済み。コミット禁止(.gitignore済み)。
