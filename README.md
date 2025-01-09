# Development

Pasos para levantar la app en desarrollo

1. Levantar la Base de Datos
   `docker compose up -d`

2. Renombrar el .env.template a .env

3. Reemplazar las variables de entorno

4. Ejecutar el seed para llenar la Base de Datos local [(http://localhost:3000/api/seed)]

# Comandos de Prisma

`npx prisma init`
`npx prisma migrate dev`
`npx prisma generate`
