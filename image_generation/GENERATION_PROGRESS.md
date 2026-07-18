# 画像生成進捗（理解単位方式・V4固定計画）

- 方針: **1つの理解単位 = 1画像**
- 総画像数: 640（64バッチ × 10枚）
- 画像寸法: 941×1672（9:16、1080×1920相当のPNGラスター）
- 正本計画: `image_generation/LOCKED_PAGE_SEQUENCE.json`（items 640件）
- 正本状態: `image_generation/state.json`
- 正式出力先: `image_generation/output/concept_series/`（001〜連番）
- `image_generation/generated/` はスキル検証用の番号付きミラー（正本ではない）

## 現在地（2026-07-18 実ファイル監査で再同期）

- **生成済み: 615枚** — `output/concept_series/` に 001〜616 が実在（**576のみ欠番**）。
- **残り: 25枚** — 画像 **576** と **617〜640**。
- 旧記述（570枚完了・next_batch 58）は実態とずれていたため破棄。571〜616は生成済み。
- 残りは固定バッチ58〜64ではなく、**残バッチ R1 / R2 / R3** で消化する。

| 残バッチ | 枚数 | 対象画像 | ファイル |
|---|---:|---|---|
| REMAINING_R1 | 10 | 576, 617〜625 | `public_batches/REMAINING_R1.md` |
| REMAINING_R2 | 10 | 626〜635 | `public_batches/REMAINING_R2.md` |
| REMAINING_R3 | 5 | 636〜640（637〜640は総復習） | `public_batches/REMAINING_R3.md` |

- 別端末ChatGPTで回す手順とプロンプト: `image_generation/CHATGPT_REMAINING_PROMPT.md`
- デザイン見本（完成8枚）: `image_generation/style_reference/`

### 未処理の品質課題（残25枚とは別件）

- `NNN_auto.png` が38枚（575〜616の範囲）。中身は完成品だが命名が規約外。
- 解像度が941×1672でないものが259枚（972×1728が155枚、966×1717が101枚ほか）。

## 別セッションでの続行手順（バッチ番号を指定するだけ）

1. `image_generation/state.json` の `next_batch` を確認（現在58）。
2. 対象の `image_generation/public_batches/BATCH_XX.md` を開き、登録された10件だけを読む。
3. 各項目の `pages_md/page_XXXX.md` ・ `pages/page_XXXX.json` ・ 直接参照素材（figures/tables）を漏れなく参照する。
4. 元図版・元文章・元写真は転載せず、事実・数値・関係だけを独自の図解へ再構成する（`MASTER_PROMPT.md` と `LOCKED_GENERATION_RULES.md` を厳守）。
5. Image 2.0を10回に分け、9:16・941×1672のPNGを一枚ずつ生成する（合成・後分割・ベクター禁止）。
6. `output/concept_series/` に `NNN_slug.png` で保存し、`state.json` の `completed_*`・`next_batch`・`next_image` を更新する。

## 品質・デザインコンセプト（全バッチ共通・固定）

- 大図解1つ＋説明3〜5ブロック。細かい表・長文注釈・8項目以上の一覧は禁止。
- 本文34px以上／図表ラベル30px以上（1080×1920換算）。中学受験の頻出語句・重要数値は48〜64px・太字。
- 中学受験重要語句は `#D71920`・太字・同色実線下線（この色は重要語句と下線以外に使わない）。
- タイトルより下は一体型学習エリア。頻出ポイントは対応図の近くへ置き、最下段のまとめ箱にしない。
- 既定キャラクター（宇宙飛行士ヒョウ先生）は同じ姿で維持し、画面面積18％以内。本文・地図・年表を隠さない。
- 穴埋め・選択肢・クイズ・タップUI・正誤表示は画像内に入れない。

## 境界決定規則

1. 同じ問い・同じ因果関係が複数ページに続く場合は1理解単位へ統合する。
2. 1ページに独立した複数テーマがある場合は理解単位を分割する。
3. 図・表・グラフは、それが説明する文章と同じ理解単位へ割り当てる。
4. 1画像へ無理に詰め込まない。入らない情報は縮小せず理解単位を分割する。
