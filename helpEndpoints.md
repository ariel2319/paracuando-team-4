- listado de endpoints tipo table

## Endpoints

### Auth

`/api/v1/auth/`

| Ruta | Method | Explicación  | Recibe | Devuelve |
| --- | --- | --- | --- | --- |
| sign-up | POST | El  usuario se registra, automáticamente se crea una asociación de Profiles con el rol de public | first_name
last_name
email
password | Status  201

{
"results": "Success Sign Up",
"errors": [
{
"errorName": "",
"message": ""
}
]
} |
| login | POST | El usuario envía el email y su password para poder recibir un token con el que hará peticiones en base su ID | email
password | {
  "message": "Correct Credentials!",
  "token": "sasasaa"
}    |
| me | GET | El usuario con su token, recibirá los Profiles asociados a su cuenta. | Solo enviando el  
beaer token
en los headers funcionará. | {
"results": {
"id": "740273ca-b792-4129-a050-2fc01957d94d",
"first_name": "Juana",
"last_name": "De Arco",
"email": "examplemailto:ian.vassallo@academlo.com",
"username": "examplemailto:ian.vassallo@academlo.com",
"image_url": null,
"profiles": [
{
"id": "6",
"user_id": "740273ca-b792-4129-a050-2fc01957d94d",
"role_id": 1,
"created_at": "2023-02-09T23:32:03.233Z",
"updated_at": "2023-02-09T23:32:03.233Z"
}
]
}
} |
| forget-password | POST | El usuario setea un token en la DB para que pueda cambiar su contraseña

El token tiene exp | email | {
  "message": "Email sended!, check your inbox",
}    |
| change-password | POST | Se envía el token junto con la contraseña para que se haga el cambio de contraseña | password | {
  "message": "Succes Update",
}    |

## User

`/api/v1/users/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Solo para usuarios que sean administradores

Se podrán filtrar usuarios en base a sus campos, y el tipo de dato de estos, definirá la regla de buscado

Ej: Si es de tipo varchar, sería ideal hacer una búsqueda con ilike | Mediante los queries params recibirán sus campos del modelo para que se pueda filtrar, incluido los created_at

Por ejemplo: first_name, last_name, email,username | {
  "results": {
    "count": 5,
    "totalPages": 1,
    "CurrentPage": 1,
    "results": [
      {
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "first_name": "nowFirstname",
        "last_name": "nowLastName",
        "email": "email@email.com",
        "username": "nowUserName"
      }
    ]
  }
 } | Solo podrá acceder a este endpoint el Administrador

User que tenga el rol Admin en la base de datos |
| /:id | GET | Se verá información  pública acerca de un usuario

Si el usuario mira su mismo perfil, se le mostrarán campos más completos

 |  | Campos públicos del usuario

Así como relaciones publicas

Como los interest | Requiere Login

Abierto a todos

Si un usuario mira su mismo perfil, verá todos sus campos exceptuando password y token

Esto también aplica para el admin

Si el user que mira el perfil es otro (vista pública) solo podrá ver los campos:
first_name
last_name
image_url
 |
| /:id/votes | GET | Se verán los votos hechos por los usuarios

Se podrá paginar
 |  | {
"results": {
"count": 5,
"totalPages": 1,
"CurrentPage": 1,
"results": [
{
"publication_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
"user_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
"created_at": "2050-01-26T14:31:49.555Z",
"updated_at": "2050-01-26T14:31:49.555Z",
}
]
}
} | Requiere Login

Abierto a todos |
| /:id/publications | GET | Se verán las publicaciones hechas por los usuarios

Se podrá paginar

Junto con opciones para poder filtrar por campos de la publicación | Parametros para la paginación

size y limit

Junto con  | {
"results": {
"count": 5,
"totalPages": 1,
"CurrentPage": 1,
"results": [
{
"publication_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
"user_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
"created_at": "2050-01-26T14:31:49.555Z",
"updated_at": "2050-01-26T14:31:49.555Z",
}
]
}
} | Requiere Login

Abierto a todos |
| /:id | PUT | El usuario podrá editar sus campos

Existen campos que no se deben de tocar a la hora de edición, por ejemplo: token,email_verified, password, email, username | Los campos a editar que no comprometan la autenticación | {
  "message": "Succes Update",
}   | Solo mismo usuario podrá cambiar su perfil |
| /:id/add-interest | POST | El usuario mandará el tag_id que será usado para marcar su interés | token en los headers, que será usado para junto con el tag_id, hacer la relación | {
  "message": "Interest Added",
}   | Solo mismo usuario podrá cambiar su perfil |
| /:id/remove-interest | DELETE | El usuario mandará el tag_id que será usado para remover su interés (users_tags) | token en los headers, que será usado para junto con el tag_id, remover la relación (users_tags) | {
  "message": "Interest removed",
}   | Solo mismo usuario podrá cambiar su perfil |
| /:id/add-image | POST | El usuario mandará una imagen que se guardará en el servicio elegido (aws,firebase…)

Y el campo image_url será usado para guardar la URL de la imagen | La imagen como Form Data | {
  "message": "Image Added",
}   | Solo mismo usuario podrá cambiar su perfil |
| /:id/remove-image | DELETE | El usuario tendrá la opción de eliminar la imagen del servicio (aws, firebase…)

Y setear el campo image_url como NULL

Si no tiene imagen, retornar 404 que no tiene imagen | Solo recibirá la petición de que quiere remover la imagen | {
  "message": "Image Removed",
}   | El mismo user hacia su mismo perfil

El administrador
hacia cualquier cuenta |

## Publications Types

`/api/v1/publications-types/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Se podrán filtrar publication types en base a sus campos, y el tipo de dato de estos, definirá la regla de buscado | Los campos de piblication types | Vista paginada como en los ejemplos anteriores | Requiere Login

Abierto |
| /:id | GET | Vista detallada | ID en los params | Vista detallada del tipo de publicación | Requiere Login

Abierto |
| /:id | PUT | Alterar los campos ya existentes | ID en los params | {
  "message": "Succes Update",
}   | Solo admin |

## Publications

`/api/v1/publications/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Se podrán filtrar las publicaciones en base a todos sus campos 

Se debe evitar mandar el content que es de tipo TEXT, y ocupará mucho espacio en la respuesta

Se tiene que poder filtrar por tags asociados

Y también tiene que incluir cada búsqueda un votes, el conteo de cuantos votos se han hecho y poder filtrar en base a este | Los más importantes a filtrar serán

publications_types_ids,
title,
description,
tags (Relación),
votes,
created_at | Vista paginada como en los ejemplos anteriores

Tiene que traer la asociación de a quién pertenece la publicación.
El nombre de esta asociación, desde las publicaciones hacia el usuario, será BelongsTo con nombre de user como su alias.
Entonces en la respuesta, el user tiene que llegar como user | No se tiene que loeguear

Abierto a todas las personas |
| / | POST | Se añade una publicación

Cuando un usuario añade una publicación, se tiene que asignar un vote de manera automática 

En este endpoint, también se asignarán los tags asociados de la publicación | Los campos necesarios para crear la publicación 

Junto con los tags que se asociarán a la aplicación  | Mensaje de que se creó el recurso y un status 201 | El user_id se sacará del token

Por lo que solo el usuario logueado podrá agregar una publicación con su user  |
| /:id | GET | Vista detallada de la publicación

Tiene que incluir las relaciones de esta que tiene como belongsTo

Junto con el count  de votes que posee
 | Vista detallada de la publicación | Vista detallada

Tiene que traer la asociación de a quién pertenece la publicación.
El nombre de esta asociación, desde las publicaciones hacia el usuario, será BelongsTo con nombre de user como su alias.
Entonces en la respuesta, el user tiene que llegar como user | No se tiene que loeguear

Abierto a todas las personas |
| /:id | DELETE | Se podrá eliminar la publicación

Solo el creador de una publicación y los admins tendrán permitido hacer esta acción |  | Recurso removido | Solo el usuario que le pertenezca la publicación podrá borrar su publicación 

También los administradores |
| /:id/vote | POST | Se podrá votar una publicación

Y se podrá quitar el voto de la publicación | Solo será necesario mandas el ID en los params (en la ruta)

Ya que el ID del user estará en el token de autenticación | Voto añadido / Voto Removido | El user_id se sacará del token

Por lo que solo el user logueado podrá añadir/remover su voto |
| /:id/add-image | POST | Solo el admin o el propio dueño pueden hacer esto

Se añadirá una imagen al servicio de guardado (aws, firebase…) 

Cada publicación solo puede tener 3 imagenes

Con un peso máximo de 524288 | 0.5 Mb  | La imagen como Form Data | Imagen Posteada | Solo el usuario logueado podrá agregar una imagen con su publicación

También el administrador |
| /:id/remove-image/:order | DELETE | Solo el admin o el propio dueño pueden hacer esto

Se podrá remover del servicio de guardado y de la DB | ID de la publicación y order de la imagen | Imagen removida | Solo el usuario logueado podrá remover una imagen con su publicación

También el administrador |

## Tags

`/api/v1/tags/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Vista paginada de todos los tags en la aplicación | Queries params que serán los campos para poder filtrar | Vista paginada como en los ejemplos anteriores | Solo el usuario logueado |
| / | POST | Añadir un Tag | Los campos en el body a que recibe para poder crearse | {
  "message": "Tag Added",
}   | Solo el admin |
| /:id | GET | Vista detallada del recurso | ID en los params | Vista detallada del tag | Solo el usuario logueado |
| /:id | PUT | Edición de los campos de la entidad | Los campos en el body a editar | {
  "message": "Succes Update",
}   | Solo el admin |
| /:id | DELETE | Se podrá remover el tag deseado | ID en los params | {
  "message": "Tag Removed",
}   | Solo el admin |
| /:id/add-image | POST | El usuario mandará una imagen que se guardará en el servicio elegido (aws,firebase…)

Y el campo image_url será usado para guardar la URL de la imagen | La imagen como Form Data | {
  "message": "Image Added",
}   | Solo el admin |

## Countries

`/api/v1/countries/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Vista paginada de todos los countries en la aplicación |  | Vista paginada como en los ejemplos anteriores | Solo el user logueado |

## States

`/api/v1/states/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Vista paginada de todos los states en la aplicación |  | Vista paginada como en los ejemplos anteriores | Solo el user logueado |

## Cities

`/api/v1/cities/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Vista paginada de todos las cities en la aplicación |  | Vista paginada como en los ejemplos anteriores | Solo el user logueado |

## Roles

`/api/v1/roles/`

| Ruta | Method | Explicación | Recibe | Devuelve | Autorización |
| --- | --- | --- | --- | --- | --- |
| / | GET | Vista paginada de todos los roles en la aplicación |  | Vista paginada como en los ejemplos anteriores | Solo el user logueado |

## Integrar Documentación

Usar swagger para poder documentar la aplicación
Se puede usar [swagger.editor](https://editor.swagger.io/)
O el nuevo con la versión que le sigue [editor-next.swagger.io](https://editor-next.swagger.io/)

## Esquema

Todas las tablas tienen un   `created_at`  y `updated_at` cuyos ejemplos están en el Starter, estos son `allowNull:false` y su tipo de dato es el usado en el ejemplo

```jsx
Users.BelongsTo     - Countries
Users.hasMany       - Profiles (Admin role solo se obtiene a través de Seeder)
Users.hasMany       - Publications
Users.BelongsToMany - Publications  (A través de votes)
Users.BelongsToMany - Tags (A través de user_tags) (Son los intereses)

table users {
  id uuid //allowNull: false
  first_name varchar //allowNull: false
  last_name varchar //allowNull: false
  email varchar //allowNull: false
  username varchar //allowNull: false
  password varchar //allowNull: false
  email_verified datetime //allowNull: true
  token text //allowNull: true
  country_id integer //allowNull: true | auto-selected by the backend
  image_url varchar //allowNull: true
  code_phone varchar //allowNull: true
  phone varchar //allowNull: true
}

Profiles.belongsTo    -  Users
Profiles.belongsTo    -  Roles

table profiles {
  id bigint  //allowNull: false
  user_id uuid  //allowNull: false
  role_id integer  //allowNull: false
}

Countries.hasMany -  Users
Countries.hasMany -  States

table countries {
  id serial //allowNull: false
  name varchar //allowNull: false
}

States.belongsTo    -  Countries

table states {
  id serial  //allowNull: false
  country_id integer //allowNull: false
  name varchar //allowNull: false
}

Cities.belongsTo    -  States
Cities.hasMany    -  Publications

table cities {
  id serial //allowNull: false
  state_id integer //allowNull: false
  name varchar //allowNull: false
}

Roles.hasMany    - Profiles

table roles {
  id serial //allowNull: false
  name varchar //allowNull: false
}

PublicationTypes.hasMany   -  Publications

table publications_types {
  id serial //allowNull: false
  name varchar //allowNull: false
  desciption varchar //allowNull: false
}

Publications.belongsTo     - Users
Publications.belongsTo     - PublicationsTypes
Publications.belongsTo     - Cities
Publications.hasMany       - PublicationImages
Publications.belongdToMany - Users (A través de votes)
Publications.belongdToMany - Tags (A través de publications_tags)

table publications {
  id uuid //allowNull: false
  user_id uuid //allowNull: false
  publication_type_id integer //allowNull: false
  city_id integer //allowNull: false | this is autoSelected by the backend
  title varchar //allowNull: false
  description varchar //allowNull: false
  content text //allowNull: false
}

PublicationsImages.belongsTo - Publications

table publications_images { //Máximo 3 imagenes por publicación
	publication_id uuid //allowNull: false
	image_url varchar //allowNull: false
	order integer //allowNull: false
}

Votes.belongsTo - Publications
Votes.belongsTo - Users

table votes {
  publication_id uuid  //allowNull: false
  user_id uuid //allowNull: false
}

Tags.hasMany - PublicationsTags
Tags.hasMany - UsersTags

table tags {
  id serial //allowNull: false
  name varchar //allowNull: false
  desciption varchar //allowNull: false
  image_url varchar //allowNull: false
}

PublicationsTags.belongsTo  - Tags
PublicationsTags.belongsTo  - Publications

table publications_tags {
  tag_id integer //allowNull: false
  publication_id uuid //allowNull: false
}

UsersTags.belongsTo  - Tags
UsersTags.belongsTo  - Users

table users_tags { // interests of the users, asociation name is > {as: 'interest'}
  tag_id integer //allowNull: false
  user_id uuid //allowNull: false
}
```