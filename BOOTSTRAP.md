# BOOTSTRAP — 合格社会クエスト 画像生成ハブ（バッチ番号だけで起動）

このファイルが唯一の起動点です。別ターミナル・別セッションでも、**バッチ番号（例: 58）** を渡すだけで、同じ品質・同じデザインの学習ページ画像を生成できます。

- ハブraw: `https://raw.githubusercontent.com/hiroakiyasa/shakai/main/BOOTSTRAP.md`
- 生成対象: 中学受験社会科の縦型学習ページ、941×1672px（9:16）PNG、1バッチ10枚
- 進捗: 570枚完了（バッチ01〜57）。**次に生成するのはバッチ58**。残りは58〜64。

---

## 実行アルゴリズム（バッチ番号 N を受け取ったら）

1. **番号を2桁ゼロ埋め**して `NN` にする（例: 58 → `58`、9 → `09`）。
2. 次のバッチ定義を **raw** で取得する（`github.com/.../blob/...` は使わない。必ず `raw.githubusercontent.com`）:
   `https://raw.githubusercontent.com/hiroakiyasa/shakai/main/image_generation/public_batches/BATCH_NN.md`
3. そのファイル末尾の **`AUTO_RAW_URLS`** ブロックに、取得すべき絶対rawURLが全て列挙されている。そこにある
   - システム／ルール（`MASTER_PROMPT.md`, `LOCKED_GENERATION_RULES.md`, `state.json`, `character_reference.png`）
   - このバッチの元素材（`pages_md/*.md`, `pages/*.json`, `figures/*.jpg`, `tables/*.jpg`）
   を **全て取得**する。
4. `MASTER_PROMPT.md` と `LOCKED_GENERATION_RULES.md` を読み、下記「絶対条件」を厳守する。
5. バッチ定義の表に並ぶ **10項目** を上から順に、1項目 = 1画像として **Image 2.0 で一枚ずつ** 生成する。
6. 各画像は、その項目が指す元素材（本文md / 構造化json / 図jpg / 表jpg）の**事実・数値・関係だけ**を読み取り、**独自の図解・年表・統計カードへ再構成**する（転載しない）。
7. `NNN_slug.png`（連番3桁）でローカル保存し、10枚を生成したら完了報告する。別端末はGitHubへpushしなくてよい（生成物はローカル保持）。

> URLの組み立て規則: 元素材はすべて `https://raw.githubusercontent.com/hiroakiyasa/shakai/main/<パス>`。
> 例) `pages_md/page_0558.md` → `https://raw.githubusercontent.com/hiroakiyasa/shakai/main/pages_md/page_0558.md`

---

## 絶対条件（全バッチ共通・固定デザイン）

- Image 2.0で、**10枚を10回に分けて一枚ずつ**生成。合成・一覧化・後分割・SVG/EPS/ベクターは禁止。
- 横9:縦16、**941×1672px相当のPNGラスター**。
- 1画像 = **大図解1つ＋説明3〜5ブロック**まで。細かい表・長文注釈・8項目以上の一覧は作らない。
- 文字は1080×1920換算で**本文34px以上・図表ラベル30px以上**。中学受験の**頻出語句/重要数値は48〜64px・太字**。
- 中学受験の最重要語句だけを **`#D71920`・太字・同色の実線下線**で強調（この色は重要語句と下線以外に使わない）。
- タイトルより下は中央/下段に割らず**一体型の学習エリア**。頻出ポイントは対応する図・年表の近くへ。
- 既定キャラクター（宇宙飛行士ヒョウ先生）は `character_reference.png` と同じ顔・目・衣装・配色・体型を維持。**画面面積18%以内**で本文・地図・年表・重要語句を隠さない。
- 年号・人名・地名・制度・出来事の前後関係、地図の方位・国境・行政区分、統計の基準年を正確に。推測で補わない。
- **著作権配慮**: 元文章・元図版・元写真・元誌面・配色・凡例・構図を模倣/転載しない。書名・出版社名・著者名・学校名・ロゴ・ISBN・価格を画像内に入れない。
- 穴埋め・選択肢・クイズ・解答欄・タップUI・正誤表示は画像内に入れない。
- バッチ定義タイトルの「さんけん…」「こふん」等はふりがなOCRの残り。**本文から正しい理解単位**を判断する。

---

## 使い方（別セッションに一度だけ貼る「常駐プロンプト」）

```text
あなたは「合格社会クエスト」社会科学習ページの画像生成ランナーです。
最初に必ずハブを取得: https://raw.githubusercontent.com/hiroakiyasa/shakai/main/BOOTSTRAP.md
（raw.githubusercontent.com の生ファイルを使うこと。github.com/blob は使わない）
私が「バッチ番号」だけ（例: 58）を送ったら、BOOTSTRAP.md の「実行アルゴリズム」に従い、
BATCH_<2桁>.md と その AUTO_RAW_URLS の全URLを取得し、ルール厳守で10枚を一枚ずつ生成してください。
まず「準備OK。バッチ番号を送ってください」とだけ返し、番号を待ってください。
```

以後は **数字を1つ送るだけ**（例: `58` → 完了後 `59`）。`state.json` の `next_batch` が次の対象です。

> 取得できないと言われたら: そのセッションのWeb取得/URL fetchを有効化し、必ず `raw.githubusercontent.com` を使わせること。`github.com/.../blob/...` はHTMLページなので読めない。
