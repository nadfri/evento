
# Evento

Web App permettant de gérer en ligne ses événements



## Demo

https://evento-nadfri.vercel.app/


## Tech Stack

**Client:** React, NextJS, SASS

**Server:** NextJS API

**Base de données:** MongoDB

**Packages**: react-icon, toastify, slugify, moment


## Installation

Cloner le repo

```bash
  npm install
  npm run dev
```

Ajoutez vos identifiants MongoDB dans `next.config.js`
```js
module.exports = {
  reactStrictMode: true,
  env: {
    mongoDB_admin: "_____",
    mongoDB_mdp:   "_____",
    db_name:       "_____",
    NEXTAUTH_URL: "http://localhost:3000",
  },
}
```

Le client Mongo, se trouve dans helpers/mongodb.js
```js
import { MongoClient } from "mongodb";

export async function connectToDB() {
  const admin = process.env.mongoDB_admin;
  const mdp = process.env.mongoDB_mdp;
  const db_name = process.env.db_name;
  // Connection à MongoDb
  const client = await MongoClient.connect(
    `mongodb+srv://${admin}:${mdp}@cluster0.vkppp.mongodb.net/${db_name}?retryWrites=true&w=majority`
  );
  return client;
}
```
## Screen Shot
![screanShot](https://evento-nadfri.vercel.app/screenshot.png)
    