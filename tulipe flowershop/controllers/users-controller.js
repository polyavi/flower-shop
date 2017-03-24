/* globals module */

module.exports = function (db) {
    const idGenerator = require('../utils/id-generator');

    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = "qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM";

    function generateAuthKey(uniquePart) {
        let authKey = uniquePart + '',
            index;

        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }

        return authKey;
    }

    function get(req, res) {
        let users = db.get("users")
            .value();

        return res.send({
            result: users
        });
    }

    function post(req, res) {
        let user = req.body;
        if (!user || typeof user.username !== "string" || typeof user.passHash !== "string" || !user.username || !user.passHash) {
            return res.status(400)
                .send("Invalid user");
        }

        user.usernameToLower = user.username.toLowerCase();

        let dbUser = db.get("users")
            .value()
            .find(x => x.usernameToLower === user.usernameToLower);


        if (dbUser) {
            return res.status(400)
                .send("Duplicated user");
        }

        user.id = idGenerator.next().value;
        user.authKey = generateAuthKey(user.id);

        db.get("users")
            .push(user)
            .value();

        console.log(db.get('users').value());

        return res.status(201)
            .send({
                result: {
                    username: user.username
                }
            });
    }

    function put(req, res) {
        let reqUser = req.body;
        let user = db.get("users")
            .value()
            .find(x => x.username === reqUser.username);

        if (!user || user.passHash !== reqUser.passHash) {
            return res.status(404)
                .send("Invalid username or password");
        }

        if (!user.authKey) {
            user.authKey = generateAuthKey(user.id);
            db.save();
        }

        return res.send({
            result: {
                username: user.username,
                authKey: user.authKey
            }
        });
    }

    return {
        get,
        post,
        put
    };
};