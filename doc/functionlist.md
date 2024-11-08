
# 予約システム 機能一覧

各画面に対応する機能を一覧にまとめました。

## 機能一覧

### 1. ログイン画面
- **ユーザ認証**: メールアドレスとパスワードでのユーザ認証を行う。
- **新規登録リンク**: 新規登録画面へのリンクを提供。
- **エラーメッセージ表示**: 認証エラー時にエラーメッセージを表示。

### 2. 新規登録画面
- **ユーザ登録**: ユーザ名、メールアドレス、パスワードの入力により新規ユーザを登録。
- **ログインリンク**: ログイン画面へのリンクを提供。
- **入力検証**: パスワードの強度やメール形式のチェックを行う。

### 3. ホーム画面（ダッシュボード）
- **イベントの概要表示**: カテゴリ別におすすめイベントを表示。
- **予約の概要表示**: ユーザの最新の予約状況を表示。
- **画面遷移リンク**: イベント一覧、予約一覧、ユーザプロフィール画面へのリンクを提供。

### 4. イベント一覧画面
- **イベント検索**: カテゴリやキーワードでイベントを検索。
- **イベントフィルタリング**: カテゴリごとにイベントをフィルタリング。
- **イベント詳細リンク**: 各イベントの詳細情報画面へのリンクを提供。

### 5. イベント詳細画面
- **イベント情報表示**: イベントの詳細情報（説明、日時、カテゴリ）を表示。
- **予約可能時間の表示**: イベントの予約可能な日時をリスト表示。
- **予約ボタン**: 選択した時間での予約を行う。

### 6. 予約確認画面
- **予約内容確認**: 予約するイベントの内容、日時、参加人数を確認。
- **予約確定**: 予約の確定ボタンで予約を完了。
- **キャンセルリンク**: 予約一覧画面に戻るリンクを提供。

### 7. 予約一覧画面
- **予約の表示**: ユーザの全予約一覧を表示（過去の予約、今後の予約に分けて表示）。
- **予約キャンセル**: 各予約のキャンセル機能を提供。
- **予約詳細リンク**: 予約内容の詳細確認リンク。

### 8. ユーザプロフィール画面
- **プロフィール情報表示・編集**: ユーザ名やメールアドレスなどのプロフィール情報を表示・編集。
- **パスワード変更**: パスワード変更機能を提供。
- **保存ボタン**: プロフィールの変更を保存。

### 9. 管理画面（Strapi 管理者向け）
- **イベント管理**: イベントの作成・編集・削除機能を提供。
- **カテゴリ管理**: カテゴリの追加・編集・削除機能を提供。
- **ユーザ管理**: ユーザ情報の確認・削除機能を提供。

---

各画面に対してユーザが実行できる主要な機能を記載しました。これにより、システム全体の基本的な操作フローと機能範囲を理解することができます。

この機能一覧は、開発の進行に応じて変更や追加が行われる可能性があります。

