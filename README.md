# aws-billing-alarm

請求アラームのsalckへ通知する。
Serverless Frameworkで構築。

## 準備

0. AWS CLIとServerless Frameworkのインストール。AWS CLIにcredentialとprofileの設定をする。
1. [slack api](https://api.slack.com/apps) のincomming webhookを作成する。
2. このリポジトリをclone。
3. `npm install` を実行。
3. 開発環境 `config/dev.yml` 、本番環境 `config/prod.yml` に以下を設定。

```yml
SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX
PROFILE: your_profile_name
```

## deploy

```bash
# 開発環境
sls deploy -v

# 本番環境
sls deploy --stage prod
```
