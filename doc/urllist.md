# 予約システムのURL一覧

## 画面URL一覧

| 画面名 | URL | 説明 | 認証要否 |
|-------|-----|------|----------|
| ログイン画面 | `/login` | ユーザがシステムにログインする | 不要 |
| 新規登録画面 | `/register` | 新規ユーザの登録を行う | 不要 |
| ホーム画面 | `/` | ダッシュボード。イベントや予約の概要を表示 | 要 |
| イベント一覧画面 | `/events` | イベントの検索・一覧表示 | 要 |
| イベント詳細画面 | `/events/[id]` | 個別イベントの詳細情報を表示 | 要 |
| 予約確認画面 | `/events/[id]/reserve` | イベントの予約内容を確認・実行 | 要 |
| 予約一覧画面 | `/reservations` | ユーザの予約履歴を表示 | 要 |
| プロフィール画面 | `/profile` | ユーザ情報の表示・編集 | 要 |

## APIエンドポイント一覧

### 認証系API

| エンドポイント | メソッド | 説明 | リクエストボディ | レスポンス |
|---------------|---------|------|------------------|------------|
| `/api/auth/login` | POST | ログイン認証 | `{ email, password }` | `{ token, user }` |
| `/api/auth/register` | POST | ユーザ登録 | `{ username, email, password }` | `{ user }` |
| `/api/auth/logout` | POST | ログアウト | - | `{ success }` |

### イベント系API

| エンドポイント | メソッド | 説明 | クエリパラメータ | レスポンス |
|---------------|---------|------|------------------|------------|
| `/api/events` | GET | イベント一覧取得 | `category`, `keyword`, `page` | `{ events[], total }` |
| `/api/events/[id]` | GET | イベント詳細取得 | - | `{ event }` |
| `/api/events/categories` | GET | カテゴリ一覧取得 | - | `{ categories[] }` |
| `/api/events/featured` | GET | おすすめイベント取得 | - | `{ events[] }` |

### 予約系API

| エンドポイント | メソッド | 説明 | リクエスト | レスポンス |
|---------------|---------|------|------------|------------|
| `/api/reservations` | GET | 予約一覧取得 | - | `{ reservations[] }` |
| `/api/reservations` | POST | 予約作成 | `{ eventId, scheduleId }` | `{ reservation }` |
| `/api/reservations/[id]` | DELETE | 予約キャンセル | - | `{ success }` |
| `/api/reservations/recent` | GET | 最近の予約取得 | - | `{ reservations[] }` |

### ユーザ系API

| エンドポイント | メソッド | 説明 | リクエスト | レスポンス |
|---------------|---------|------|------------|------------|
| `/api/users/profile` | GET | プロフィール取得 | - | `{ user }` |
| `/api/users/profile` | PUT | プロフィール更新 | `{ username, email, ... }` | `{ user }` |

## クエリパラメータ詳細

### イベント検索パラメータ
- `category`: イベントカテゴリでフィルタリング
- `keyword`: イベント名や説明文での検索
- `page`: ページネーション（デフォルト: 1）
- `limit`: 1ページあたりの表示件数（デフォルト: 10）
- `sort`: ソート順（例: date_asc, date_desc）

## 認証について

- 認証が必要なエンドポイントには、リクエストヘッダーに以下を付与
  ```
  Authorization: Bearer {token}
  ```

- 未認証でアクセスした場合は、`401 Unauthorized`を返却

## エラーレスポンス

すべてのAPIは、エラー時に以下の形式でレスポンスを返します：

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

## ステータスコード

- 200: 成功
- 201: 作成成功
- 400: リクエスト不正
- 401: 認証エラー
- 403: 権限エラー
- 404: リソース未発見
- 500: サーバーエラー