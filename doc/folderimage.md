# 予約システムのフォルダ構成とURL設計

## フォルダ構成

```
/frontend
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx        # ログイン画面
│   │   ├── register/
│   │   │   └── page.tsx        # 新規登録画面
│   │   └── layout.tsx          # 認証系の共通レイアウト
│   ├── (dashboard)/
│   │   ├── page.tsx            # ホーム画面（ダッシュボード）
│   │   ├── events/
│   │   │   ├── page.tsx        # イベント一覧画面
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # イベント詳細画面
│   │   │       └── reserve/
│   │   │           └── page.tsx # 予約確認画面
│   │   ├── reservations/
│   │   │   └── page.tsx        # 予約一覧画面
│   │   ├── profile/
│   │   │   └── page.tsx        # ユーザプロフィール画面
│   │   └── layout.tsx          # ダッシュボード系の共通レイアウト
│   └── layout.tsx              # グローバルレイアウト
├── components/
│   ├── common/                 # 共通コンポーネント
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Loading/
│   ├── auth/                   # 認証関連コンポーネント
│   │   ├── LoginForm/
│   │   └── RegisterForm/
│   ├── events/                 # イベント関連コンポーネント
│   │   ├── EventCard/
│   │   ├── EventList/
│   │   ├── EventSearch/
│   │   └── CategoryFilter/
│   └── reservations/           # 予約関連コンポーネント
│       ├── ReservationCard/
│       └── ReservationList/
├── lib/
│   ├── prisma/                 # Prismaの設定
│   │   └── client.ts
│   └── api/                    # APIクライアント
│       ├── events.ts
│       ├── reservations.ts
│       └── users.ts
└── types/                      # 型定義
    ├── event.ts
    ├── reservation.ts
    └── user.ts
```

## 注意事項

1. すべての認証が必要なルートは、ミドルウェアで保護されます。
2. APIエンドポイントは、StrapiのエンドポイントをフロントエンドのAPIルートでラップします。
3. フォルダ構成は、Next.js 13以降のApp Routerの規約に従っています。
4. 各ページコンポーネントは、Server ComponentsとClient Componentsを適切に使い分けます。