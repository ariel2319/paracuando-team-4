npx sequelize model:generate --name product --attributes name:string,category:string,price:decimal
npx sequelize migration:generate --name <nombre-de-la-migracion>
npx sequelize-cli db:migrate