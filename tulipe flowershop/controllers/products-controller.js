/* globals require module */
"use strict";

const _ = require("lodash");
const idGenerator = require('../utils/id-generator');

module.exports = function (db) {
    db.defaults({
            products: [],
            users: []
        })
        .value();

    // Get
    function getProductsFromDB() {
        return db.get('products').value();
    }

    function getProducts(req, res) {
        let products = getProductsFromDB();

        res.send({
            result: products
        });
    };

    function getBouquets(req, res) {
        let products = getProductsFromDB()['bouquets'];

        res.send({
            result: products
        });
    };

    function getBoxes(req, res) {
        let products = getProductsFromDB()['boxes'];

        res.send({
            result: products
        });
    };

    function getPlants(req, res) {
        let products = getProductsFromDB()['plants'];

        res.send({
            result: products
        });
    };

    function getChocolates(req, res) {
        let products = getProductsFromDB()['chocolates'];

        res.send({
            result: products
        });
    };
    // Post
    function postBouquet(req, res) {
        let bouquet = req.body;
        bouquet.id = idGenerator.next().value;

        getProductsFromDB()['bouquets']
            .push(bouquet);
    }

    function postBox(req, res) {
        let box = req.body;
        box.id = idGenerator.next().value;

        getProductsFromDB()['boxes']
            .push(box);
    }

    function postPlant(req, res) {
        let plant = req.body;
        plant.id = idGenerator.next().value;

        getProductsFromDB()['plants']
            .push(plant);
    }

    function postChocolate(req, res) {
        let chocolate = req.body;
        chocolate.id = idGenerator.next().value;

        getProductsFromDB()['chocolates']
            .push(chocolate);
    }

    return {
        get: {
            getBouquets,
            getBoxes,
            getPlants,
            getChocolates,
            getProducts
        },
        post: {
            postBouquet,
            postBox,
            postPlant,
            postChocolate
        }
    };
};
