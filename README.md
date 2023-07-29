## docker-compose-kit

The kit can remind me how to create an app with database by docker-compose.

## 开发基本流程

1. 启动数据库服务
2. 迁移数据
3. 启动 express 应用

## docker 中创建数据库服务

例如：

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

## docker-compose 指令

```bash
docker compose up -d # 构建并启动容器（后台运行）
docker compose -f docker-compose.dev.yml up -d # 指定使用 docker-compose.dev.yml 启动容器
docker compose down # 停止并移除容器
docker compose -f docker-compose.dev.yml down # 指定停止并移除
docker compose build # 构建镜像
docker compose stop # 停止已经创建的容器
docker compose start # 启动已经创建的容器
docker compose restart # 重启容器
docker compose logs # 查看容器的日志输出
docker compose ps # 列出正在运行的容器
docker compose exec <service_name> sh # 在容器内执行命令
docker compose build # 构建容器
```

```bash
# 使用 docker-compose.yml 和 docker-compose.dev.yml 启动容器
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```
