# Development

Pasos para leventar la app de desarrollo:

1. Levantar la base de datos

```
docker compose up -d
```
2. Reemplazar las variables de entorno (.env)

3. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)



# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```