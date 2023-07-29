## docker-compose-kit

The kit can remind me how to create an app with database by docker-compose.

## deploy services

```bash
docker compose up -d # deploy development environment
docker compose up -f docker-compose.dev.yml -d # deploy production environment
```

## inspect logs

```bash
docker compose logs
docker compose logs <service_name>
```

## stop and remove docker compose

```bash
docker compose -f docker-compose.dev.yml down
docker compose down
```
