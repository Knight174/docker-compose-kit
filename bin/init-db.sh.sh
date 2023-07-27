#!/bin/bash

set -e

# 初始化数据库
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE dev;
    CREATE DATABASE prod;
    \c prod;
EOSQL