/* globals module */
"use strict";

module.exports = function (app, db) {
    app.use("/api", function (req, res, next) {
        var authKey = req.headers["x-auth-key"];
        req.user = db.get("users")
            .value()
            .find(x => x.authKey = authKey);
        next();
    });
};