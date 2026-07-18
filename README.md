# 合格社会クエスト — 学習ページ生成キット

中学受験向け社会科（地理・政治・歴史・国際・資料）の縦型学習ページ画像を、**1バッチ10枚**ずつ生成するための固定計画・ルール・参照元一式です。

> **▶ 別端末・別セッションで動かすなら [`BOOTSTRAP.md`](BOOTSTRAP.md) が唯一の起動点。**
> バッチ番号（例: 58）を送るだけで実行できます。raw: `https://raw.githubusercontent.com/hiroakiyasa/shakai/main/BOOTSTRAP.md`

## 進捗

- 総計画: **640枚 / 64バッチ**（10枚/バッチ）、941×1672px（9:16）のPNGラスター
- 生成済み: **570枚（バッチ01〜57）**
- 残り: **70枚（バッチ58〜64）** ← このリポジトリで続行する対象
- 次に生成するバッチ: **58**（画像571〜580、元ページ556〜）

正本の進捗は `image_generation/state.json` の `next_batch` を参照。

## 別セッションでの続行手順（バッチ番号を指定するだけ）

1. `image_generation/state.json` の `next_batch` を確認する。
2. 対象の `image_generation/public_batches/BATCH_XX.md` を開き、**登録された10件だけ**を読む。
3. 各項目が指す参照元を漏れなく読む:
   - `pages_md/page_XXXX.md`（本文Markdown）
   - `pages/page_XXXX.json`（構造化データ）
   - `figures/pXXXX_fNN.jpg` ・ `tables/pXXXX_tNN.jpg`（直接参照素材）
4. 生成ルールを厳守する:
   - `image_generation/MASTER_PROMPT.md`（マスタープロンプト）
   - `image_generation/LOCKED_GENERATION_RULES.md`（固定ルール）
   - `image_generation/GENERATION_PROGRESS.md`（デザインコンセプト要約）
5. 元図版・元文章・元写真は**転載せず**、事実・数値・関係だけを独自の図解へ**再構成**する。
6. Image 2.0を10回に分け、9:16・941×1672のPNGを**一枚ずつ**生成する（合成・後分割・ベクター禁止）。
7. 保存後、`state.json` の `completed_batches` / `completed_images` / `next_batch` / `next_image` を更新する。

## デザインコンセプト（全バッチ共通・固定）

- 大図解1つ ＋ 説明3〜5ブロック。細かい表・長文注釈・8項目以上の一覧は禁止。
- 本文34px以上／図表ラベル30px以上（1080×1920換算）。頻出語句・重要数値は48〜64px・太字。
- 中学受験重要語句は `#D71920`・太字・同色実線下線（この色は重要語句と下線以外に使わない）。
- タイトルより下は一体型学習エリア。頻出ポイントは対応図の近くへ置く。
- 既定キャラクター（宇宙飛行士ヒョウ先生）は `image_generation/assets/character_reference.png` を参照し、同じ姿を維持。画面面積18％以内。
- 穴埋め・選択肢・クイズ・タップUI・正誤表示は画像内に入れない。

## ディレクトリ構成

```
image_generation/
├── MASTER_PROMPT.md            # マスタープロンプト（絶対条件・レイアウト・著作権配慮）
├── LOCKED_GENERATION_RULES.md  # 固定生成ルール
├── GENERATION_PROGRESS.md      # 進捗・デザインコンセプト要約
├── LOCKED_PAGE_SEQUENCE.json   # 640項目の正本計画
├── batch_manifest.json         # バッチ↔画像番号の対応
├── state.json                  # 正本の進捗状態
├── public_batches/BATCH_01..64.md  # 各バッチの対象10件と参照元
├── assets/character_reference.png  # 既定キャラクター参照画像
└── scripts/                    # 検証スクリプト
pages_md/  pages/  figures/  tables/   # 残りバッチ58〜64が参照する元素材（p.556〜614）
```

> 元書籍は所有者本人の裁断・自炊データを個人用に再構成したもの。生成画像には元誌面・元図版・書名・出版社名・ロゴ等を一切含めない。
