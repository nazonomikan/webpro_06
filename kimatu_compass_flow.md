```mermaid
flowchart TD
  A[一覧: /kimatu_compass_list] -->|作成ページへ| B[作成ページ: /public/kimatu_compass.html]
  B -->|フォーム送信 POST| C[作成処理: POST /kimatu_compass_list]
  C -->|完了して一覧へ| A

  A -->|詳細を見る| D[詳細: /kimatu_compass_detail/:id]
  D -->|編集へ| E[編集ページ: /kimatu_compass_list/edit/:id]
  E -->|更新送信 POST| F[更新処理: POST /kimatu_compass_list/update/:id]
  F -->|完了して一覧へ| A

  A -->|削除する| G[削除処理: GET /compass_list/delete/:id]
  G -->|削除完了| A

  A -->|互換作成（GET）| H[作成互換: /kimatu_compass_add.html]
  H -->|一覧を表示| A
```
