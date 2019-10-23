# MarketMix Api  
Codebase de la prueba de selección de marketmix.

## Prueba

Desarrollar una rest api que consuma un servicio web preferiblemente en javascript (Nodejs) donde vamos a crear 3 servicios  puede ser con datos estáticos o conectado a una base de datos.

- Exponer una serie de productos.  
- Permitir agregar un carrito al web service.  
- Permitir eliminar un Ítem del carrito del web service.  

## Tech Stack

- NodeJS  
- express  
- Postgres  
- Sequelize  

## Instalación
- Clonar repositorio.  
- ingrasar al directorio de la aplicación.  
- Ejecutar `npm install` para instalar dependencias del proyecto.  
- Crear archivo `.env` basándose en el archivo `.env.example` colocando los datos para la conexión a tú propia base de datos.  
- Ejecutar `npm run setup-db` para inicializar las tablas de la base de datos.  
- Ejecutar `npm run start-dev` para iniciar el servicio.  

## Scripts

- `npm run setup-db`: Reinicia las tablas de la base de datos y pobla la tabla de productos con datos fake para las pruebas.  
- `npm run lint`: Hace linting de los archivos con eslint y la [guía de estilo de codigo de airbnb](https://github.com/airbnb/javascript).  

## Endpoints  
La API corre por defecto en el puerto 3000. Todos los endpoints aquí documentados estan prefijados por /api. Ejemplo:  

http://localhost:3000/api/products

### GET /products  
Expone una serie de productos. Ejemplo de respuesta:  
```json
// STATUS CODE: 200 Ok
{
    "data": [
        {
            "id": 1,
            "image": "https://image.com/uri",
            "description": "lorem...",
            "name": "Awesome product name",
            "price": 30000
        },
        ...
    ],
    "message": "Productos obtenidos exitósamente!"
}
```

### POST /shopping-cart  
Agrega un carrito al webservice, ejemplo de body de la petición:  

```js
{
    products: [1,2,3] //ids de productos
}
```
Ejemplo de respuesta exitosa:  
```json
// STATUS CODE: 201 Created
{
    "data": {
        "id": 1,
        "products": [1,2,3]
    },
    "message": "Carrito de compras creado con éxito!"
}
```

Ejemplo de respuesta fallida:
```json
// STATUS CODE: 400 Bad Request
{
    "message": "Bad Request: Debe enviar por lo menos un producto."
}
```
### DELETE /shopping-cart/:idCart/:idProduct  
Elimina un item del carrito de compras. Ejemplo de respuesta exitosa: 
```js
// STATUS CODE: 204 No Content
```
Ejemplo de respuesta fallida:  
```json
// STATUS CODE: 404 Bad Request
{
    "message": "Bad Request: No existe el producto en el carrito de compras."
}
```

### GET /shopping-cart/:idCart
Trae el carrito un carrito de compras por id. (El enpoint fue creado para facilitar las pruebas de los endpoints anteriormente mencionados)
