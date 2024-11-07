# Construcción

Para construir la imagen de postgres

1. Hacer el pull de docker:

````
docker pull postgres:<version>
````

2. Crear docker compose: docker-compose.yml

# Development

Pasos para leventar la app de desarrollo:

1. Levantar la base de datos

```
docker compose up -d
```
2. Copiar el .env.template  y renombrarlo a .env

3. Reemplazar las variables de entorno (.env)

4. Ejecutar el comando ```npm install```

5. Ejecutar el comando ```npm run dev```

6. Ejecutar los siguientes comando de prisma:

````
npx prisma migrate dev
npx prisma generate
````


7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)



# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
npx prisma db pull //para traer un modelo de de la base de datos
```