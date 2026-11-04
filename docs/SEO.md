# SEO設定

## 対象URLと実施範囲

正式URL： https://chiropractic-therapy-dream.pages.dev/

SEO対応前に公開ページのDOMを読み取り、canonicalがないこと、OGP画像が相対URLであること、店舗の構造化データに公開URL・番地がないことを確認した。そのうえでローカルソースを変更した。変更後のビルド・テスト・ブラウザ表示確認は、ユーザー指定により実施していない。デプロイ、Search Consoleの操作、検索結果への反映確認も行っていない。

## 共通設定

`src/config/seo.mjs` にURL・タイトル・説明・言語をまとめ、Astro設定、SEOコンポーネント、robots.txt、サイトマップで共用する。

- タイトル：カイロセラピードリーム｜東大和市の整体・カイロプラクティック
- 説明：東大和市駅から徒歩8分、向原のカイロセラピードリーム。一人ひとりの身体に合わせた整体・カイロプラクティック、深層筋ストレッチ、リンパケア、チネイザンなど全14メニューをご案内。受付9:00〜17:00、金曜日定休。ご予約・ご相談はお電話で。
- canonical：正式URLの末尾スラッシュあり。LPの検索パラメーター・フラグメントを含めない。
- Astroの`site`：正式URLを設定。
- robotsメタ：`index, follow, max-image-preview:large`。

ヒーローの指定コピーと文字量は維持し、紹介本文に所在地・駅・代表的なメニューを自然に含めた。キーワードの羅列や見えないSEO専用テキストは追加していない。

## OGP・Xカード

OGPのURL、画像URLはHTTPSの絶対URLを出力する。Xカードにもタイトル・説明・画像・画像の説明を設定。

代表画像は支給の`施術室.jpeg`から1200×630のJPEGを出力する。ヒーローの生成画像を実店舗の代表写真には使用しない。生成ロゴはWebサイトのロゴとしてのみ使用する。

## 構造化データ

`src/components/Seo.astro` のJSON-LDに以下を出力する。

- `WebSite`：サイト名、正式URL、言語、運営店舗。
- `WebPage`：ページタイトル・説明、サイト・店舗・代表画像への参照。
- `LocalBusiness`：正式名称、電話、正式住所、地図、営業時間、メニュー料金範囲、院長、ロゴ、施術室写真。
- `Person`：院長名、役職、支給写真、紹介箇所へのURL。
- `OfferCatalog`、`Offer`、`Service`：3分類・14メニューを`src/data/menu.ts`から生成。料金は数値・通貨はJPY。名称・説明は画面と共通。

正式住所は今回ユーザーが直接提示した **〒207-0013 東京都東大和市向原6丁目949-21** を採用し、本文・構造化データ・地図の検索指定に反映。

営業時間は月・火・水・木・土・日の09:00〜17:00。金曜日を営業曜日に含めない。未確認の座標、駐車場、支払い方法、資格、医療機関の区分、口コミ・評価点、税区分は追加しない。構造化データは掲載事実の説明であり、Googleの特別な表示を保証するものではない。

## クロール用ファイル

- `src/pages/robots.txt.ts` → `/robots.txt`：クロールを許可し、正式URLのサイトマップを案内。
- `src/pages/sitemap.xml.ts` → `/sitemap.xml`：正規トップURLの1件のみ掲載。

いずれもビルド時に静的ファイルとして出力する。現在は1ページ構成のため、`#menu`などのページ内アンカーを別ページとして登録しない。実際の更新履歴を管理していないため、ビルド日の`lastmod`への自動設定は行わない。

## 再デプロイ後の運用

このソースを再デプロイした後、公開URLのrobots.txt・sitemap.xml・canonical・OGP・構造化データを確認する。Google Search Consoleに対象サイトが登録されている場合は `https://chiropractic-therapy-dream.pages.dev/sitemap.xml` を送信し、トップページのURL検査から必要に応じてインデックス登録をリクエストする。

Googleビジネスプロフィールのウェブサイト欄にも正式URLを登録すると、店舗情報とサイトの行き来がしやすくなる。今回はGoogleアカウントやビジネスプロフィールには変更していない。

## 参照した公式資料

- [Astroのルーティング・静的エンドポイント](https://docs.astro.build/en/guides/routing/)
- [Google：正規URLの指定](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google：サイトマップの作成と送信](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google：ローカルビジネスの構造化データ](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google：サイト名](https://developers.google.com/search/docs/appearance/site-names)
- [Schema.org：OfferCatalog](https://schema.org/OfferCatalog)
- [Schema.org：Service](https://schema.org/Service)
