# URL短縮サービス - バックエンド

NestJS + PostgreSQL で構築したURL短縮サービスのバックエンドAPIです。

## デモ

フロントエンド: https://change-url-front.onrender.com

## 技術スタック

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT認証
- Render（デプロイ）

## 機能

- ユーザー登録・ログイン（JWT認証）
- URL短縮（ランダムな6文字のショートコード生成）
- 短縮URLでのリダイレクト
- URL一覧取得
- URL削除

## エンドポイント

| メソッド | パス | 認証 | 説明 |
|---|---|---|---|
| POST | /auth/register | 不要 | ユーザー登録 |
| POST | /auth/login | 不要 | ログイン・JWT発行 |
| GET | /:shortCode | 不要 | 短縮URLでリダイレクト |
| POST | /urls | 必要 | URL作成 |
| GET | /urls | 必要 | URL一覧取得 |
| DELETE | /urls/:id | 必要 | URL削除 |

## ローカル起動

```bash
# パッケージインストール
npm install

# PostgreSQLでDBを作成
psql postgres
CREATE DATABASE url_shortener;
\q

# 環境変数設定
cp .env.example .env

# 起動
npm run start:dev
```

## 環境変数

| 変数名 | 説明 |
|---|---|
| DATABASE_URL | PostgreSQL接続URL（本番用） |
| JWT_SECRET | JWT署名用の秘密鍵 |
| FRONTEND_URL | CORSで許可するフロントエンドURL |
