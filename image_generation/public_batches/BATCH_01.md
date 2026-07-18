# V3理解単位バッチ 01

- 固定範囲: IMG_0001〜IMG_0010
- 10項目・10枚。1項目につきImage 2.0を1回呼ぶ。合成・後分割禁止。
- 縦9:16 PNG。ユーザー所有の宇宙飛行士ヒョウ先生を同じ姿で使用。
- 元文章・元図版を転載せず、事実・数値・関係を独自の短文と新規図解へ再構成。
- 最大4並列。既存の有効PNGはスキップし、成功ごとに即保存する。

|画像|分類|理解単位|元ページ|分割|Markdown/JSON|直接参照素材|
|---:|---|---|---|---|---|---|
|0001|cover|未来のための 社会 受験ビジュアル図鑑|1,2,3,4,5,6|1/1|pages_md/page_0001.md<br>pages_md/page_0002.md<br>pages_md/page_0003.md<br>pages_md/page_0004.md<br>pages_md/page_0005.md<br>pages_md/page_0006.md<br>pages/page_0001.json<br>pages/page_0002.json<br>pages/page_0003.json<br>pages/page_0004.json<br>pages/page_0005.json<br>pages/page_0006.json|なし|
|0002|global_toc|全体目次：地理|14,15,16,17|1/1|pages_md/page_0014.md<br>pages_md/page_0015.md<br>pages_md/page_0016.md<br>pages_md/page_0017.md<br>pages/page_0014.json<br>pages/page_0015.json<br>pages/page_0016.json<br>pages/page_0017.json|なし|
|0003|global_toc|全体目次：政治・歴史・国際・資料|18,19,20|1/1|pages_md/page_0018.md<br>pages_md/page_0019.md<br>pages_md/page_0020.md<br>pages/page_0018.json<br>pages/page_0019.json<br>pages/page_0020.json|なし|
|0004|unit_opener|第1章 社会の学び方から世界地図へ|21,22|1/1|pages_md/page_0021.md<br>pages_md/page_0022.md<br>pages/page_0021.json<br>pages/page_0022.json|figures/p0022_f01.jpg|
|0005|content|社会を学ぶ意味|7|1/1|pages_md/page_0007.md<br>pages/page_0007.json|なし|
|0006|content|学びを支える3つの力|8|1/1|pages_md/page_0008.md<br>pages/page_0008.json|figures/p0008_f01.jpg|
|0007|content|主体的・対話的・深い学び|9|1/1|pages_md/page_0009.md<br>pages/page_0009.json|figures/p0009_f01.jpg|
|0008|content|図・表・本文を組み合わせる|10,11|1/1|pages_md/page_0010.md<br>pages_md/page_0011.md<br>pages/page_0010.json<br>pages/page_0011.json|figures/p0010_f01.jpg<br>figures/p0010_f02.jpg<br>figures/p0010_f03.jpg<br>figures/p0010_f04.jpg<br>figures/p0010_f05.jpg<br>figures/p0010_f06.jpg<br>figures/p0010_f07.jpg<br>figures/p0010_f08.jpg<br>figures/p0011_f01.jpg<br>figures/p0011_f02.jpg<br>figures/p0011_f03.jpg<br>figures/p0011_f04.jpg<br>figures/p0011_f05.jpg<br>figures/p0011_f06.jpg<br>figures/p0011_f07.jpg<br>figures/p0011_f08.jpg|
|0009|content|知識を使って考え説明する入試力|12,13|1/1|pages_md/page_0012.md<br>pages_md/page_0013.md<br>pages/page_0012.json<br>pages/page_0013.json|figures/p0012_f01.jpg<br>tables/p0012_t01.jpg<br>figures/p0012_f02.jpg<br>figures/p0012_f03.jpg<br>figures/p0013_f01.jpg<br>figures/p0013_f02.jpg<br>figures/p0013_f03.jpg<br>figures/p0013_f04.jpg|
|0010|content|地球の球形・陸地と海洋・六大陸と三大洋|23|1/1|pages_md/page_0023.md<br>pages/page_0023.json|figures/p0023_f01.jpg<br>figures/p0023_f02.jpg<br>figures/p0023_f03.jpg<br>figures/p0023_f04.jpg<br>figures/p0023_f05.jpg<br>figures/p0023_f06.jpg|

## 最短再開指示

`Use $source-to-image-deck and continue from image_generation/state.json.`

<!-- AUTO_RAW_URLS:START -->

## 取得すべき raw URL（自動生成・別端末はこれをそのまま取得）

すべて `raw.githubusercontent.com` の生ファイル。`github.com/.../blob/...` は使わない。

### システム／ルール（毎回必須）
- マスタープロンプト: https://raw.githubusercontent.com/hiroakiyasa/shakai/main/image_generation/MASTER_PROMPT.md
- 固定生成ルール: https://raw.githubusercontent.com/hiroakiyasa/shakai/main/image_generation/LOCKED_GENERATION_RULES.md
- 進捗・状態(state): https://raw.githubusercontent.com/hiroakiyasa/shakai/main/image_generation/state.json
- キャラクター参照画像: https://raw.githubusercontent.com/hiroakiyasa/shakai/main/image_generation/assets/character_reference.png

### このバッチの元素材（登録分のみ・漏れなく取得）
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0008_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0009_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f02.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f03.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f04.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f05.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f06.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f07.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0010_f08.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f02.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f03.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f04.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f05.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f06.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f07.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0011_f08.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0012_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0012_f02.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0012_f03.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0013_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0013_f02.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0013_f03.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0013_f04.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0022_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f01.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f02.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f03.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f04.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f05.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/figures/p0023_f06.jpg
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0001.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0002.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0003.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0004.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0005.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0006.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0007.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0008.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0009.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0010.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0011.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0012.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0013.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0014.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0015.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0016.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0017.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0018.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0019.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0020.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0021.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0022.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages/page_0023.json
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0001.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0002.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0003.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0004.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0005.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0006.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0007.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0008.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0009.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0010.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0011.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0012.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0013.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0014.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0015.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0016.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0017.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0018.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0019.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0020.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0021.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0022.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0023.md
- https://raw.githubusercontent.com/hiroakiyasa/shakai/main/tables/p0012_t01.jpg

<!-- AUTO_RAW_URLS:END -->
