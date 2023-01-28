# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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
-  id
- name
- price

#### User (table users)
- id
- username
- firstName
- lastName
- password

#### Order (table orders)
- id
- userId
- status of order (active or complete)

#### OrderItem (table order_items)
- orderId
- productId
- quantity