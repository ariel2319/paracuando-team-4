npx sequelize model:generate --name product --attributes name:string,category:string,price:decimal
After generate You must add relationships in models, and foreingkey in migrations.  

npx sequelize migration:generate --name <nombre-de-la-migracion>
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all


si es hasMany el foreingkey de la otra tabla
si es belongTo es el foreingkey de tu tabla. 
