# Backend con Express y Knex - Tienda de abarrotes

El presente proyecto es una API para ventas de abarrotes, usando Express y Knex para hacer la conexión con una base de datos hecha con POSTGRESQL.

Por defecto es ejecutada en:

```
http://localhost:3000
```

Tiene los siguientes endpoints:

## Products

#### Create product

Método: `POST`

```
http://localhost:3000/api/v1/products
```

Body Example:

```
{
	"name": "Peras",
	"description": "Peras ricas",
	"price": 15,
	"sku": "ABCPERAS"
}
```

#### Find all products

Método: `GET`

```
http://localhost:3000/api/v1/products
```

Esta búsqueda acepta los siguientes query params:

`product_id`: Busca productos por su id.

`min_price`: Busca productos con precio mayor o igual al solicitado.

`max_price`: Busca productos con precio menor o igual al solicitado.

#### Find one product by id

Método: `GET`

```
http://localhost:3000/api/v1/products/:productId
```

#### Modify product

Método: `PATCH`

```
http://localhost:3000/api/v1/products/:productId
```

En el Body enviar los parámetros a modificar.

Body Example:

```
{
	"price": 16
}
```

#### Soft Delete one product

Método: `DELETE`

```
http://localhost:3000/api/v1/products/:productId
```

En esta petición solamente se modifica el estado de la propiedad `active`.

#### Delete one product

Método: `DELETE`

```
http://localhost:3000/api/v1/products/destroy/:productId
```

En esta petición se elimina el producto de la base de datos.

## Customers

#### Create customer

Método: `POST`

```
http://localhost:3000/api/v1/customers
```

Body Example:

```
{
	"first_name": "Iván",
	"last_name": "García",
	"email": "ivan@mail.com",
	"phone": "6456712365",
	"address": "Calle Benito Juárez",
	"postal_code": "94532",
	"suburb": "López Mateos",
	"city": "CDMX"
}
```

En esta petición los atributos `email` y `phone` deben ser únicos.

#### Find all customers

Método: `GET`

```
http://localhost:3000/api/v1/customers
```

Esta búsqueda acepta los siguientes query params:

`customer_id`: Busca customers por su id.

`first_name`: Busca customers por su first_name.

`last_name`: Busca customers por su last_name.

`city`: Busca customers por su city.

#### Find one customer by id

Método: `GET`

```
http://localhost:3000/api/v1/products/:customerId
```

#### Modify customer

Método: `PATCH`

```
http://localhost:3000/api/v1/products/:customerId
```

En el Body enviar los parámetros a modificar.

Body Example:

```
{
	"postal_code": "98742"
}
```

#### Soft Delete one customer

Método: `DELETE`

```
http://localhost:3000/api/v1/products/:customerId
```

En esta petición solamente se modifica el estado de la propiedad `active`.

#### Delete one customer

Método: `DELETE`

```
http://localhost:3000/api/v1/products/destroy/:customerId
```

En esta petición se elimina el customer de la base de datos.

## Sales

#### Create sale

Método: `POST`

```
http://localhost:3000/api/v1/sales/:customerId
```

Body Example:

```
{
		"products": [
			{
                  		"product_id": 2,
                  		"amount": 8
                	},
			{
                  		"product_id": 3,
                  		"amount": 1
                	}
		]
}
```

Return Example:

```
{
	"customer_id": 5,
	"sale_date": "2023-12-15T01:06:37.243Z",
	"products_amount": 9,
	"total_price": 112,
	"products": [
		{
			"product_id": 2,
			"amount": 8,
			"sale_price": "96.00"
		},
		{
			"product_id": 3,
			"amount": 1,
			"sale_price": "16.00"
		}
	]
}
```

#### Find all sales

Método: `GET`

```
http://localhost:3000/api/v1/sales
```

Esta búsqueda acepta los siguientes query params:

`customer_id`: Busca ventas hechas por customer_id.

`sale_date`: Busca ventas realizadas en la fecha otorgada. Debe tener formato `YYYY-MM-DD`.

`min_amount`: Busca ventas con una cantidad de artículos mayor o igual a la solicitada.

`max_amount`: Busca ventas con una cantidad de artículos menor o igual a la solicitada.

`min_price`: Busca ventas con un precio total mayor o igual al solicitado.

`max_price`: Busca ventas con un precio total menor o igual al solicitado.

#### Find one sale by customer_id and sale_date

Método: `GET`

```
http://localhost:3000/api/v1/sales/:customerId/:saleDate
```

#### Find sales by customer_id

Método: `GET`

```
http://localhost:3000/api/v1/sales/:customerId
```

#### Find sales by sale_date

Método: `GET`

```
http://localhost:3000/api/v1/sales/date/:saleDate
```
