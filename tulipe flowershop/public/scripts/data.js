let dataService = {
    products() {
        return requester.getJSON("/api/products");
    },
    bouquets() {
        return requester.getJSON("/api/products/bouquets");
    },
    boxes() {
        return requester.getJSON("/api/products/boxes");
    },
    plants() {
        return requester.getJSON("/api/products/plants");
    },
    chocolates() {
        return requester.getJSON("/api/products/chocolates");
    },
    cart() {
        return Promise.resolve()
            .then(() => {
                if (!!localStorage.getItem("username"))
                    return JSON.parse(localStorage.getItem("cart"));
            });

    },
    login(user) {
        return requester.putJSON("/api/auth", user)
            .then(respUser => {
                localStorage.setItem("username", respUser.result.username);
                localStorage.setItem("authKey", respUser.result.authKey);
            });
    },
    register(user) {
        return requester.postJSON("/api/users", user);
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
                localStorage.removeItem("cart");

            });
    },
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    },
    addToCart(product) {
        return Promise.resolve()
            .then(() => {
                let cart = JSON.parse(localStorage.getItem("cart"));
                if (!cart) cart = [];
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
            });
    },
    removeFromCart(id) {
        return Promise.resolve()
            .then(() => {
                let cart = JSON.parse(localStorage.getItem("cart"));
                console.log(cart.length);
                if(cart.length === 1)   localStorage.removeItem("cart");
                else{
                for (i in cart) {
                    if (cart[i].id === Number(id)) {
                        cart = cart.splice(i, 1);
                    }
                }
                localStorage.setItem("cart", JSON.stringify(cart));
              }
            });
    }
};
