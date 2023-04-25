const mongoose = require("mongoose");

const DB_CONFIG = {
    HOST: 'localhost',
    DB_PORT: 27017,
    DATABASE: 'recipes-app'
}

const DB_CONNECTION_STRING = `mongodb://${DB_CONFIG.HOST}:${DB_CONFIG.DB_PORT}/${DB_CONFIG.DATABASE}`;


mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log("database is connected");
    }).catch((err) => {
        console.log(err);
    });