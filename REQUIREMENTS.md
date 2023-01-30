# API Requirements

## API Endpoints
#### Products
- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create (args: Product)[token required]: `'products/' [POST] (token)`
- Delete: `'products/:id  [DELETE]`

#### Users
- Index [token required]: `'users/' [GET] (token)`
- Show [token required]: `'users/:id' [GET] (token)`
- Create (args: User)[token required]: `'users/' [POST] (no token, this is like registration)`
- Delete [token required]: `'users/:id' [DELETE] (token)`

#### Orders
- Index [token required]: `'orders' [GET] (token)`
- Get a user orders [token required]: `'orders/users/:userId' [GET] (token)`
- Complete an order (change status): `'orders/:id [PUT] (token)`
- Delete [token required]: `'orders/:id [DELETE] (token)`

## Data Shapes
#### Product (table products)
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User (table users)
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- firstName `VARCHAR`
- lastName `VARCHAR`
- password `VARCHAR`

#### Order (table orders)
- id `SERIAL PRIMARY KEY`
- userId `INTEGER  REFERENCES users(id)`
- status of order (active or complete) `VARCHAR`

#### OrderItem (table order_items)
- orderId `INTEGER REFERENCES orders(id)`
- productId `INTEGER REFERENCES products(id)`
- quantity `INTEGER`
