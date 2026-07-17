# バッチ番号だけで実行する方法

固定計画生成後、ユーザーが「バッチXXを生成」と指示した場合、`image_generation/public_batches/BATCH_XX.md`だけを正本として処理する。

## 絶対動作

- 全教材を再監査しない
- 他バッチを読まない
- 画像数・バッチ数・順序を変更しない
- 登録済みMarkdown・JSON・直接参照素材だけを確認する
- Image 2.0を10回に分け、一枚ずつ生成する
- 横9：縦16、1080×1920相当、PNGラスター
- コラージュ、一覧画像、後分割、ベクター画像は禁止

## 最短指示

```text
公開Webの次のファイルを読み、バッチXXを実行してください。
https://github.com/hiroakiyasa/shakai/blob/main/image_generation/public_batches/BATCH_XX.md

GitHubコネクターがなくても停止せず、通常のWebブラウズを使ってください。
登録された10件だけを確認し、10枚を1枚にまとめず、Image 2.0を10回に分けて一枚ずつ生成してください。
各画像は9:16のPNGラスター画像とし、ベクター画像は禁止です。
```
