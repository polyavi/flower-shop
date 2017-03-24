/* globals require console */
"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    lowdb = require("lowdb"),
    cors = require("cors");

let db = lowdb("./data/data.json");
db._.mixin(require("underscore-db"));

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

require("./utils/authorize-user")(app, db);

let usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);

let productsController = require("./controllers/products-controller")(db);

app.get("/api/products", productsController.get.getProducts);
app.get("/api/products/bouquets", productsController.get.getBouquets);
app.get("/api/products/boxes", productsController.get.getBoxes);
app.get("/api/products/plants", productsController.get.getPlants);
app.get("/api/products/chocolates", productsController.get.getChocolates);

app.post("/api/products/bouquets", productsController.post.postBouquet);
app.post("/api/products/boxes", productsController.post.postBox);
app.post("/api/products/plants", productsController.post.postPlant);
app.post("/api/products/chocolates", productsController.post.postChocolate);

let port = 3000;
app.listen(process.env.PORT || port, () => console.log(`Server is running at http://localhost:${port}`));
