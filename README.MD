# GOIT Drink Master Back End Project

### _-- Rest Api to manage recipes and guides to make them --_

- **DEPLOYED @** &ensp; [![Deployed At | ](https://i.ibb.co/zG6DGXq/render-logo-818-C47-ACCA-seeklogo-com.png)](https://nodejs-restapi-g9eb.onrender.com/api/recipes) &ensp; &ensp;

- **SOURCE @** &ensp; [![Repository |](https://i.ibb.co/j3TLp8G/github-logo-vector.png)](https://github.com/NovicovMykhailo/drink-master-backend) &ensp; &ensp;

### recipes REST API connected to MongoDB

![MongoDB Logo](https://i.ibb.co/Ht5xNDz/Mongo-db-logo-1.png)

# Basic

### Base URL &ensp; [[https://drink-master-back-end.onrender.com/]](https://https://drink-master-back-end.onrender.com/api/recipes)


### API Docs &ensp; `/api-docs`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| ~~**GET**~~ | [/](https://nodejs-restapi-g9eb.onrender.com/api-docs) | Path to reed docs to this API | Swagger Markup Web Page |



#### Recipes API &ensp; `/api`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **GET** | [/recipes](https://nodejs-restapi-g9eb.onrender.com/api/recipes) | Path to get all recipes | All recipes |
| **GET** | [/glasses](https://nodejs-restapi-g9eb.onrender.com/api/glasses) | Path to get all glasses | All glasses |
| **GET** | [/ingredients/list](https://nodejs-restapi-g9eb.onrender.com/api/ingredients/list) | Path to get all ingredients | All ingredients |
| **GET** | [/recipes/category-list](https://nodejs-restapi-g9eb.onrender.com/api//recipes/categories) | Path to get all categories | All categories |
| **GET** | [/recipes?page=1&limit=9](https://nodejs-restapi-g9eb.onrender.com/api/recipes?page=1&limit=9) | Pagination | Paginations |
| **GET** | [/recipes/:id](https://nodejs-restapi-g9eb.onrender.com/api/recipes/:id) | Path to get recipe by id  | Found recipe |
| **GET** | [/recipes/main-page](https://nodejs-restapi-g9eb.onrender.com/api/recipes/main-page) | Path to get top recipes by categories | Top recipes |
| **GET** | [/popular-recipes ](https://nodejs-restapi-g9eb.onrender.com/api/popular-recipes) | Path to get rated recipe list by favs | Rated recipes |
| **GET** | [/search?q=''&category=''&ingredient=''&page=1&limit=9](https://nodejs-restapi-g9eb.onrender.com/api/search) | Path to search recipes by category | found recipes |
| **GET** | [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite) | Path to get fav recipes by user | Liked recipes |
| **POST** | [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite) | Path to adding to fav recipe by ID (reuired user ID) | Message |
| **DELETE** | [/favorite](https://nodejs-restapi-g9eb.onrender.com/api/favorite) | Path to remove recipe from fav by ID (reuired user ID) | Message |
| **GET** | [/own](https://nodejs-restapi-g9eb.onrender.com/api/own) | Path to get owned recipes | Owned recipes |
| **DELETE** | [/own](https://nodejs-restapi-g9eb.onrender.com/api/own) | Path to delete recipes by ID (reuired recipe ID) | Message and deleted recipe |
| **POST** | [/own](https://nodejs-restapi-g9eb.onrender.com/api/own) | Path to add recipe to DB (reuired FormData and Image)| New recipe |

### Authentication API  &ensp; `/users`


| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **POST** | [/register](https://nodejs-restapi-g9eb.onrender.com/users/register) | Path to registration | User Info |
| **POST** | [/login](https://nodejs-restapi-g9eb.onrender.com/users/login) | Path to SignIn | User Info + Token |
| **POST** | [/logout](https://nodejs-restapi-g9eb.onrender.com/users/logout) | Path to logout | Status |
| **GET** | [/current](https://nodejs-restapi-g9eb.onrender.com/users/current) | Path to current User Info | User Info |
| **PATCH** | [/update](https://nodejs-restapi-g9eb.onrender.com/users/update) | Path to update User info | Updated user info |
| **POST** | [/subscribe](https://nodejs-restapi-g9eb.onrender.com/users/subscribe) | Path to send Subscrition to email (required email) | Message |

## recipe Example

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

## paggination object example

```js
{
    "count": {
        "page": 1,
        "totalPages": 1,
        "total": 2
    },
    "data": [
        { "recipe_1" },
        { "recipe_2" }
        ...
    ]
}

```
