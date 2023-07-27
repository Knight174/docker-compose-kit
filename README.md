## docker 中创建数据库服务

```bash
mkdir express-db
docker run -v "$PWD/express-db":/var/lib/postgresql/data -p 30000:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=123456 -d postgres:14
```

## 进入容器创建数据库

```bash
docker exec -it 9558798 bash
psql -U user
CREATE DATABASE dev;
# CREATE DATABASE prod;
\c dev;
```

## prisma 全局安装（可选）

如果不安装，后面执行 prisma 命令时，需要加上 npx。

```bash
npm install -g prisma
```

## prisma 初始化

```bash
npx prisma init
# add model in schema.prisma, then execute the below command
npx prisma generate
```

或者直接指定数据库

```bash
npx prisma init --datasource-provider postgresql
```

## 开发环境数据库迁移

将 model schema 应用于数据库

```bash
# 数据库迁移（修改字段或新增模型）
npx prisma migrate dev
npx prisma migrate dev --name new-field
npx prisma migrate dev --name new-model
```

```bash
# 自定义迁移
# Sometimes, you need to modify a migration before applying it.
# To apply the edited migration, run prisma migrate dev again.
npx prisma migrate dev --create-only
```

## 开发环境数据库重置

删除 database/schema¹，创建新的 database/schema¹，应用所有迁移，运行 seed 脚本

```bash
npx prisma migrate reset # 数据库重置
npx prisma db push # 数据库重置
```

## 项目开发

前提：prisma init 完毕

```bash
npm run migrate:dev # （开发环境）数据库迁移
npm run start:dev
```

## 生产环境或测试环境数据库迁移

```bash
npx prisma generate
npx prisma migrate deploy # （生产环境）数据库迁移
```

## 数据库可视化

```bash
npx prisma studio
```

- 在 docker 启动数据库服务
- 创建数据库
- prisma 初始化
  - npx prisma generate // 如果有 schema 文件
  - npx prisma init // 如果没有，通过这个自动生成
  - npx prisma migrate dev // 创建并应用数据库迁移，将数据模型的更改应用到数据库中
  - npx prisma db push // 执行数据库同步，根据数据模型文件自动创建数据库表
  - npx prisma studio // 一个可视化的数据库管理工具，用于浏览和编辑数据库中的数据。
- 运行 express 服务

  "start:prod": "env-cmd -f .env.production npx prisma generate && node server.js && npx prisma migrate deploy"
