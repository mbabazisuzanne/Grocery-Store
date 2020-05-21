# CORE-Project-One

### Grocery-Store-Inventory-Application

### Collaborators
- Mbabazi Suzan
- Roland Sankara
- Praise Tindi
- Jane Aguti

### Endpoints

- /auth/signup `for adding a user`
- /auth/view `to View users`
- /auth/login `to Login`

- /inventory/item `to add item to inventory`
- /inventory/items `to view all the items `

- /inventory/category `to perform CRUD ops on Category `
- /inventory/categories `to view all the categories `

- /inventory/:categoryID `to view category by ID`
- /inventory/:categoryID/items `to view category Items by categoryID`
- /inventory/categoryID/items/:ItemID `to view category item by ID`

### Item Schema
title:{type:text},
stock:{type:number},
price:{type:number},
category:{type:number}

### User Schema
username: {type:String},
password: {type:String},
email: {type:String},
contact: {type:Number}
