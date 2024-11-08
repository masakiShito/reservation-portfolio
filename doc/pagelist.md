
# 予約システム 画面一覧

## 概要
このドキュメントは、予約システムで使用される各画面の一覧を示します。画面はフロントエンドのNext.jsアプリケーションで提供され、バックエンドのStrapiで管理されるデータに基づいて動作します。

## 画面一覧

### 1. ログイン画面
- **概要**: ユーザがシステムにログインするための画面。
- **機能**: メールアドレスとパスワードの入力、ログインボタン。
- **備考**: 新規登録画面へのリンクも含む。

### 2. 新規登録画面
- **概要**: 新しいユーザがシステムに登録するための画面。
- **機能**: ユーザ名、メールアドレス、パスワードの入力、登録ボタン。
- **備考**: ログイン画面へのリンクも含む。

### 3. ホーム画面（ダッシュボード）
- **概要**: ユーザがアクセスした際に最初に表示されるダッシュボード。
- **機能**: 利用可能なイベントの概要表示、予約の概要表示。
- **備考**: ユーザの予約状況やおすすめイベントの表示も可能。

### 4. イベント一覧画面
- **概要**: すべてのイベントを一覧で表示する画面。
- **機能**: イベントのカテゴリフィルター、検索機能、各イベントの詳細リンク。
- **備考**: カテゴリごとのイベント検索に対応。

### 5. イベント詳細画面
- **概要**: 選択されたイベントの詳細情報を表示する画面。
- **機能**: イベント名、説明、日時、カテゴリ、予約可能な時間帯表示。
- **備考**: 予約ボタンを含み、選択したスケジュールの予約が可能。

### 6. 予約確認画面
- **概要**: 予約情報を確認し、予約を確定する画面。
- **機能**: 予約の確認内容（イベント名、日時、参加人数）、予約確定ボタン。
- **備考**: 予約キャンセルのリンクも含む。

### 7. 予約一覧画面
- **概要**: ユーザのすべての予約を一覧で表示する画面。
- **機能**: 予約内容の表示、キャンセルボタン。
- **備考**: 過去の予約と今後の予約を区別して表示する機能。

### 8. ユーザプロフィール画面
- **概要**: ユーザのプロフィール情報を表示および編集する画面。
- **機能**: プロフィール情報（名前、メールアドレスなど）の表示と編集、パスワード変更。
- **備考**: 変更の保存ボタンを含む。

### 9. 管理画面（Strapi 管理者向け）
- **概要**: 管理者がイベントやカテゴリ、ユーザ情報を管理するための画面。
- **機能**: イベントの作成・編集・削除、カテゴリの管理、ユーザの管理。
- **備考**: Strapiのダッシュボードを利用して実装。

## 備考
本リストは基本的な画面構成を示しており、開発の進行に応じて画面や機能が追加・変更される可能性があります。
