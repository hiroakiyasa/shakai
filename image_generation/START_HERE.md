# 別セッション開始用

固定計画は生成済み。次だけでバッチを実行できる。

## 現在の次バッチ = 58（画像571〜580）

```text
image_generation/public_batches/BATCH_58.md を読み、バッチ58を実行してください。

登録された10件だけを確認し、各項目の pages_md / pages / figures / tables を漏れなく参照。
元図版・元文章は転載せず、事実・数値・関係だけを独自の図解へ再構成。
image_generation/MASTER_PROMPT.md と LOCKED_GENERATION_RULES.md を厳守。
既定キャラクターは image_generation/assets/character_reference.png を参照し同じ姿を維持。
Image 2.0を10回に分け、横9:縦16・941×1672のPNGを一枚ずつ生成。合成・後分割・ベクター禁止。
```

バッチ番号とファイル名の番号を変えれば、59〜64も同じ形式で実行できる。

## 実行側が読むもの

1. 対象の `image_generation/public_batches/BATCH_XX.md`
2. そこに登録されたMarkdown、JSON、直接参照素材（figures/tables）
3. キャラクター参照 `image_generation/assets/character_reference.png`

他バッチや未登録素材は探索しない。

## 現在の準備状態

`image_generation/state.json` の `planning_status` は `locked`。`next_batch` が次に実行するバッチ番号。
