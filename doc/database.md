
# 予約システムデータベース設計

## 概要
このドキュメントは、ユーザがイベントを選択し予約できるシステムのデータベース設計について説明しています。以下の要件を考慮しています：
1. ユーザは好みのイベントを選択し、予約することができます。
2. イベントにはカテゴリがあり、カテゴリごとに検索が可能です。
3. 各イベントには予定された日時が設定されており、ユーザは同じ時間帯に重複した予約をすることはできません。

## テーブル

### 1. `users` テーブル
ユーザ情報を格納します。

| カラム        | 型              | 説明                                     |
|---------------|-----------------|-----------------------------------------|
| `id`          | SERIAL PRIMARY KEY | 各ユーザのユニークな識別子。                |
| `username`    | VARCHAR(50) UNIQUE | ユーザ名。                              |
| `email`       | VARCHAR(100) UNIQUE | ユーザのメールアドレス。                |
| `password`    | VARCHAR(255)    | 暗号化されたパスワード。                   |
| `created_at`  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | ユーザの登録日。 |
| `updated_at`  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 最終更新日。          |

### 2. `events` テーブル
イベント情報を格納します。

| カラム        | 型              | 説明                                     |
|---------------|-----------------|-----------------------------------------|
| `id`          | SERIAL PRIMARY KEY | 各イベントのユニークな識別子。              |
| `name`        | VARCHAR(100)    | イベント名。                             |
| `description` | TEXT            | イベントの詳細説明。                       |
| `category_id` | INTEGER REFERENCES categories(id) | イベントのカテゴリ。 |
| `created_at`  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | イベントの作成日。 |
| `updated_at`  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 最終更新日。          |

### 3. `categories` テーブル
イベントカテゴリ情報を格納します。

| カラム        | 型              | 説明                                     |
|---------------|-----------------|-----------------------------------------|
| `id`          | SERIAL PRIMARY KEY | 各カテゴリのユニークな識別子。              |
| `name`        | VARCHAR(50)     | カテゴリ名（例：コンサート、セミナー）。      |
| `description` | TEXT            | カテゴリの説明。                           |

### 4. `event_schedules` テーブル
イベントのスケジュール詳細（日時と収容人数）を格納します。

| カラム        | 型              | 説明                                     |
|---------------|-----------------|-----------------------------------------|
| `id`          | SERIAL PRIMARY KEY | 各スケジュールのユニークな識別子。          |
| `event_id`    | INTEGER REFERENCES events(id) | 関連するイベントID。   |
| `start_time`  | TIMESTAMP       | イベントの開始日時。                      |
| `end_time`    | TIMESTAMP       | イベントの終了日時。                      |
| `capacity`    | INTEGER         | 予約可能な最大人数。                       |

### 5. `reservations` テーブル
ユーザの予約情報を格納します。

| カラム           | 型              | 説明                                     |
|------------------|-----------------|-----------------------------------------|
| `id`             | SERIAL PRIMARY KEY | 各予約のユニークな識別子。                |
| `user_id`        | INTEGER REFERENCES users(id) | 関連するユーザID。    |
| `event_schedule_id` | INTEGER REFERENCES event_schedules(id) | 関連するスケジュールID。 |
| `status`         | VARCHAR(20)    | 予約状況（例：予約済み、キャンセルなど）。 |
| `reserved_at`    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 予約日時。 |
| `updated_at`     | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 最終更新日。          |

## 追加の考慮事項

- **定員管理**: `event_schedules` テーブルの `capacity` カラムで参加者数の上限を設定し、各スケジュールの予約数が定員を超えないように制御します。
- **予約キャンセル**: `reservations` テーブルの `status` カラムで予約状態を管理し、キャンセルなどによって利用可能な定員を更新します。
- **イベントの時間管理**: `event_schedules` の `start_time` および `end_time` フィールドを使用して、過去のイベントを除外するフィルタリングが可能です。

このデータベース構造は、ユーザがカテゴリごとにイベントを検索し、時間帯が重複しない予約を行い、定員を効果的に管理できるように設計されています。
