# GOIT Drink Master Back End Project

### _-- Rest Api to manage cocktails and guides to make them --_

- **DEPLOYED @** &ensp; [![Deployed At | ](https://i.ibb.co/zG6DGXq/render-logo-818-C47-ACCA-seeklogo-com.png)](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) &ensp; &ensp;

- **SOURCE @**  &ensp; [![Repository |](https://i.ibb.co/j3TLp8G/github-logo-vector.png)](https://github.com/NovicovMykhailo/drink-master-backend) &ensp; &ensp; 

### Cocktails REST API connected to MongoDB

![MongoDB Logo](https://i.ibb.co/Ht5xNDz/Mongo-db-logo-1.png)

# Basic 

### Base URL &ensp; [[https://drink-master-back-end.onrender.com/]](https://https://drink-master-back-end.onrender.com/api/cocktails)

#### for cocktails `/api`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **GET** | [/recipes](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) | Path to get all cocktails | All cocktails |
| **GET** | [/glasses](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) | Path to get all glasses | All glasses |
| **GET** | [/ingredients/list](https://nodejs-restapi-g9eb.onrender.com/api/ingredients) | Path to get all ingredients | All ingredients |
| **GET** | [/recipes/category-list](https://nodejs-restapi-g9eb.onrender.com/api/categories) | Path to get all categories | All categories |
| **GET** | [/recipes?page=1&limit=9](https://nodejs-restapi-g9eb.onrender.com/api/cocktails?page=1&limit=9) | Pagination | Paginations|
| **GET** | [/recipes/:id](https://nodejs-restapi-g9eb.onrender.com/api/contacts/:id) | Path to get contact by ID | Found Cocktail |
| **GET** | [/recipes/main-page](https://nodejs-restapi-g9eb.onrender.com/api/top-cocktails) | Path to get top cocktails by categories | Top Cocktails |
| ~~**POST**~~ | [/own](https://nodejs-restapi-g9eb.onrender.com/api/own  ) | Path to add cocktail to DB | New cocktail |
| ~~**GET**~~ | [/own](https://nodejs-restapi-g9eb.onrender.com/api/own) | Path to get owned cocktails | Owned cocktails |
|~~**DELETE**~~| [/own](https://nodejs-restapi-g9eb.onrender.com/api/own) | Path to delete cocktails by ID (sent from FE)| Message |
| **POST**| [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite  ) | Path to adding to fav cocktail by ID (sent from FE) | Message |
| **GET**| [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite) | Path to get fav cocktails by user | Liked cocktails |
|**DELETE**| [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite) | Path to remove cocktail from fav by ID (sent from FE) | Message |
| **GET**| [/popular-recipe ](https://nodejs-restapi-g9eb.onrender.com/api/popular-recipe) | Path to get rated cocktail list by favs | Rated cocktails |
| **GET** | [/search?q=''&category=''&ingredient=''&page=1&limit=9](https://nodejs-restapi-g9eb.onrender.com/api/search) | Path to search cocktails by category | found cocktails|



### Authentication

#### for authorisation `/users`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **POST** | [/register](https://nodejs-restapi-g9eb.onrender.com/users/register) | Path to registration | User Info |
| **POST** | [/login](https://nodejs-restapi-g9eb.onrender.com/users/login) | Path to SignIn | User Info + Token |
| **POST** | [/logout](https://nodejs-restapi-g9eb.onrender.com/users/logout) | Path to logout | Status |
| **GET**  | [/current](https://nodejs-restapi-g9eb.onrender.com/users/current) | Path to current User Info | User Info |
| ~~**PATCH**~~ | [/update](https://nodejs-restapi-g9eb.onrender.com/users/update) | Path to update User info | Updated user info |
| ~~**POST**~~ | [/subscribe](https://nodejs-restapi-g9eb.onrender.com/users/subscribe) | Path to send Subscrition to email (sent from FE) | Message|

## Cocktail Example 

```js

 {
    "_id": "639b6de9ff77d221f190c50d"

    "drink": "Drink Name",
    "category": "Category Name",
    "alcoholic": "Alcoholic",
    "glass": "Glass Type",
    "instructions": "Lorem ENGLISH",
    "drinkThumb": "Link to photo",
    "owner": "userId"
    "favs":[ 
        "user_1_Id",
        "user_2_Id",
        "user_3_Id",
        "user_4_Id"
      ],
    "ingredients": [
        { "...ingredient #1" },
        { "...ingredient #1" }
      ],

    "drinkAlternate": null,
    "tags": null,
    "video": null,
    "IBA": null,
  },

```


## ingredient Example 
```js
  {
    "_id" : "64e727691c746b5dded5e01d",
    "title": "Ingredient Name",
    "ingredientThumb": "large Image",
    "thumb-medium": "medium image",
    "thumb-small": "small image"
  },

```

## category, glasses Example 
```js
  {
    "_id" : "64e727691c746b5dded5e01d"
    "name": "Name"
  },

```

