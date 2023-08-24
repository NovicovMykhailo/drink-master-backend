# GOIT Drink Master Back End Project

### _-- Rest Api Drink Master Back end --_

- **DEPLOYED @** &ensp; [![Deployed At | ](https://i.ibb.co/zG6DGXq/render-logo-818-C47-ACCA-seeklogo-com.png)](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) &ensp; &ensp;

- **SOURCE @**  &ensp; [![Repository |](https://i.ibb.co/j3TLp8G/github-logo-vector.png)](https://github.com/NovicovMykhailo/drink-master-backend) &ensp; &ensp; 

### Contacts REST API connected to MongoDB

![MongoDB Logo](https://i.ibb.co/Ht5xNDz/Mongo-db-logo-1.png)

**this API allows you** :

- View all cocktails
- View all ingredients
- View all categories
- View top-cocktails
- View cocktail by id
- Add cocktail
- Delete cocktail
- Add cocktail to Favorites

# Basic 

### Base URL &ensp; [[https://drink-master-back-end.onrender.com/]](https://https://drink-master-back-end.onrender.com/api/cocktails)

#### for cocktails `/api`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **GET** | [/recipes](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) | Path to get all cocktails | All cocktails |
| **GET** | [/glasses](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) | Path to get all glasses | All glasses |
| **GET** | [/ingredients/list](https://nodejs-restapi-g9eb.onrender.com/api/ingredients) | Path to get all ingredients | All ingredients |
| **GET** | [/recipes/category-list](https://nodejs-restapi-g9eb.onrender.com/api/categories) | Path to get all categories | All categories |
| **GET** | [/recipes?page=1&limit=20](https://nodejs-restapi-g9eb.onrender.com/api/cocktails?page=1&limit=9) | Pagination | page and cocktails |
| **GET** | [/recipes/:id](https://nodejs-restapi-g9eb.onrender.com/api/contacts/:id) | Path to get contact by ID | Found Cocktail |
| **GET** | [/recipes/main-page](https://nodejs-restapi-g9eb.onrender.com/api/top-cocktails) | Path to get top cocktails by categories | Top Cocktails |
|~~**DELETE**~~| [/cocktails/:id](https://nodejs-restapi-g9eb.onrender.com/api/cocktails/:id) | Path to delete cocktails by ID | Message |
| ~~**POST**~~ | [/cocktails](https://nodejs-restapi-g9eb.onrender.com/api/cocktails) | Path to add cocktail to DB | New cocktail |

<!-- 
filters by: categories: All || one
filters by: ingredients: null || one
filters by querry: null || filtered
 -->

### Authentication

#### for authorisation `/users`

| Method | LINK | Description | Return |
| :-- | :-- | --: | --: |
| **POST** | [/register](https://nodejs-restapi-g9eb.onrender.com/users/register) | Path to registration | user object |
| **POST** | [/login](https://nodejs-restapi-g9eb.onrender.com/users/login) | Path to SignIn | user object + Token |
| **POST** | [/logout](https://nodejs-restapi-g9eb.onrender.com/users/logout) | Path to logout | Status |
| **GET**  | [/current](https://nodejs-restapi-g9eb.onrender.com/users/current) | Path to current User Info | User Info |
| ~~**PATCH**~~ | [/update](https://nodejs-restapi-g9eb.onrender.com/users/update) | Path to update User info | Updated user info |
| ~~**GET**~~ | [/favorites](https://nodejs-restapi-g9eb.onrender.com/users/favorites) | get favorite cocktail | all favorites | |
|~~**POST**~~ | [/favorites](https://nodejs-restapi-g9eb.onrender.com/users/favorites) | Path favorite cocktail | added  cocktail | |
| ~~**DELETE**~~ | [/:id](https://nodejs-restapi-g9eb.onrender.com/users/favorite/:id) | Path to remove favorite cocktail | removed cocktail | |
| ~~**POST?**~~ | [/subscribe](https://nodejs-restapi-g9eb.onrender.com/users/update) | Path to update User info | Updated user info |


## Cocktail Example 

```js

 {
    "_id": "639b6de9ff77d221f190c50d"

    "drink": "Drink Name",
    "category": "Category Name",
    "alcoholic": "Alcoholic",
    "glass": "Coffee mug",
    "instructions": "Lorem ENGLISH",
    "instructionsRU": "Lorem Russian",
    "instructionsUK": "Lorem Ukranian",
    "drinkThumb": "Link 2 photo",
    "owner": "userId"

    "ingredients": [
      {
        "title": "name",
        "measure": "2 tsp",
        "ingredientThumb": "Large Photo",
        "thumb-medium": "Med Photo",
        "thumb-small": "Small Photo"
      },
      {
        "title": "name",
        "measure": "Strong cold ",
        "ingredientThumb": "Large Photo",
        "thumb-medium": "Med Photo",
        "thumb-small": "Small Photo"
      }
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
    "title": "Ingredient Name",
    "ingredientThumb": "large Image",
    "thumb-medium": "medium image",
    "thumb-small": "small image"
  },

```

## category Example 
```js
  {
    "_id" : "64e727691c746b5dded5e01d"
    "name": "Ordinary Drink"
  },

```
<!--USER:  Email; Password; avatar ; name-->

