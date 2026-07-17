# 社会教材の標準ソース構成

次のいずれかの形式で教材を追加する。

## 推奨構成

- `pages_md/page_0001.md`〜
- `pages/page_0001.json`〜（任意だが推奨）
- `figures/`
- `tables/`
- `figures_context/`（任意）
- `figures_manifest.json`（任意）
- `verification_report.md`（任意）

## 代替構成

- ページ見出しが`## p.N`形式の`book.md`
- `book.json`（任意）

Markdown内の画像参照は通常の形式を使う。

```md
![地図や資料の説明](figures/p0001_f01.jpg)
```

教材追加後、GitHub Actionsの`Build locked social studies image batches`が次を自動生成する。

- 全ページ・直接参照素材の監査
- 地理・歴史・公民への分類
- 400枚以上かつ10枚単位の固定計画
- `LOCKED_CONTENT_PLAN.json`
- `LOCKED_PAGE_SEQUENCE.json`
- `batch_manifest.json`
- 全`public_batches/BATCH_XX.md`
- 未割当ページ0件の検証レポート

## 注意

元教材が存在しない状態では、固定バッチを捏造しない。`state.json`は`awaiting_source_data`となり、バッチ生成は開始しない。
