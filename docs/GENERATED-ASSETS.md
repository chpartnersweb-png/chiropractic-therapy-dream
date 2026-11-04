# 生成画像の記録

作成日：2026年11月4日。imagegenスキルに従い、組み込みのimage_genツールを使用。APIキーやCLIは使用していない。

## 生成物

| ファイル | 用途 | 備考 |
| --- | --- | --- |
| `src/assets/generated/hero-therapy.png` | ヒーローの全面画像 | 1536×1024。生成した施術イメージ。院長や実際の施術室を撮影したものではない。モバイルではCSSで中央を表示 |
| `src/assets/generated/dream-symbol.png` | ヘッダー・フッターのロゴシンボル | 1280×1280、透明背景。日本語の名称はHTMLの文字組みで追加 |
| `public/favicon.png` | ファビコン | 生成したシンボルを使用 |

院長・施術・施術室・外観を紹介する本文写真には支給素材を使用。OGPには支給の施術室写真を使用し、生成ヒーローを実店舗写真として構造化データへ登録していない。

## 最終プロンプト

### ヒーロー

Use case: photorealistic-natural. Asset type: full-bleed hero photograph for a Japanese chiropractic and body therapy salon website. Create a refined editorial photograph, landscape 3:2 aspect ratio, highest quality. A close-up of a clothed adult lying face down on a white linen therapy bed, two anatomically natural therapist hands gently resting on their upper back and shoulder over a soft ivory cotton shirt. Show hands and the shoulder/back across the lower half of the frame. Crop out both people's faces. The upper third is softly blurred warm brown curtains and gentle natural window light, with quiet darkish warm negative space for a website headline. Realistic skin and linen texture, subtle film grain, warm neutral brown and cream palette, soft directional daylight, calm unposed human presence. The body must be naturally proportioned, five fingers per hand, plausible pressure and posture. This is an illustrative wellness scene, not an image of a real named practitioner or actual salon. No text, no logo, no watermark, no candles, no flowers, no needles, no medical devices, no bare torso. Composition must also tolerate a central vertical mobile crop retaining hands at bottom and empty space above.

### ロゴ

Use case: logo-brand. Create one finished minimalist single-color logo symbol for a Japanese chiropractic and therapy salon named Dream. Do not include any text or letters as typography. An elegant abstract capital D silhouette formed by one open graceful oval curve and two slightly offset parallel gently curved vertical strokes within it, evoking bodily balance and two hands. Sophisticated restrained Japanese salon identity, calm, visually balanced, strong recognizable silhouette, moderately thick strokes for legibility at small size. One flat dark warm brown color #4a342b, truly transparent background, square canvas with mark filling approximately 80 percent. No gradients, no shadows, no 3D, no paper mockup, no border, no flowers, no lotus, no human figure, no medical cross, no additional symbols. Single emblem only.

透明背景指定：ロゴはtrue、ヒーローはfalse。
