let dataService = {
    products(){
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
    addBouquet(bouquet) {
        return requester.postJSON("/api/products/bouquets", bouquet);
    },
    addMagazine(box) {
        return requester.postJSON("/api/products/boxes", box);
    },
    addComic(plant) {
        return requester.postJSON("/api/products/plants", plant);
    },
    addCd(chocolate) {
        return requester.postJSON("/api/products/chocolates", chocolate);
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            });
    },
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    }
};
