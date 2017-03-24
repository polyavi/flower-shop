var handlebars = handlebars || Handlebars;

let controllers = {
    home: () => {
        var products;
        dataService.isLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    $(document.body).addClass("logged-in");
                    $('.visible-when-not-logged-in').hide();
                    $('.hidden-when-not-logged-in').show();
                    window.location = "#/home";
                    return;
                }
            });
        dataService.products()
            .then((productsResponse) => {
                products = productsResponse;
                return templates.get('home')
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(products);
                $("#main").html(html);

            });
    },
    products: () => {
        var products;
        dataService.products()
            .then((productsResponse) => {
                products = productsResponse;

                return templates.get("store");
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(products.result);

                $("#main").html(html);
            });
    },
    bouquets: (params) => {
        var bouquets = [],
            j = 0,
            category = params.category;
        dataService.bouquets()
            .then((bouquetsResponse) => {
                for (i in bouquetsResponse.result) {
                    if (bouquetsResponse.result[i].category === category) {
                        bouquets[j] = bouquetsResponse.result[i];
                        console.log(bouquets);
                        j++;
                    }
                }
                return templates.get('bouquets');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(bouquets);
                $('.products-wrapper').html(html);
            });
    },
    boxes: () => {
        var boxes;
        dataService.boxes()
            .then((boxesResponse) => {
                boxes = boxesResponse;

                return templates.get('boxes');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(boxes.result);

                $('#main').html(html);
            });

    },
    plants: () => {
        var plants;
        dataService.plants()
            .then((plantsResponse) => {
                plants = plantsResponse;

                return templates.get('plants');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(plants.result);

                $('#main').html(html);
            });
    },
    chocolates: () => {
        var chocolates;
        dataService.chocolates()
            .then((chocolatesResponse) => {
                chocolates = chocolatesResponse;

                return templates.get('chocolates');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(chocolates.result);

                $('#main').html(html);
            });
    },

    singleProduct: (params) => {
        var product,
            id = params.id;
        dataService.products()
            .then((productsResponse) => {
                for (i in productsResponse.result) {
                    for (j in productsResponse.result[i]) {
                        if (productsResponse.result[i][j].id === Number(id)) {
                            product = productsResponse.result[i][j];
                        }
                    }
                }
                return templates.get('singleProduct');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(product);
                $('#main').html(html);
            });
    },
    searchByName: (categoryArray, searchWord) => {
        var len = categoryArray.length;
        for (var i = 0; i < len; i += 1) {
            var $currentItem = $(categoryArray[i]);
            if ($currentItem.html().toLowerCase().indexOf(searchWord.toLowerCase()) < 0) {
                $currentItem.parent().parent().addClass('filter');
            } else {
                $currentItem.parent().parent().removeClass('filter');
            }
        }
    },
    login: () => {
        dataService.isLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    $(document.body).addClass("logged-in");
                    $('.visible-when-not-logged-in').hide();
                    $('.hidden-when-not-logged-in').show();
                    window.location = "#/home";
                    return;
                }

                templates.get("login")
                    .then((templateHtml) => {
                        let templateFunc = handlebars.compile(templateHtml);
                        let html = templateFunc();

                        $("#main").html(html);

                        $("#btn-login").on("click", (ev) => {
                            let user = {
                                username: $("#tb-username").val(),
                                passHash: $("#tb-password").val()
                            };

                            dataService.login(user)
                                .then((respUser) => {
                                    $(document.body).addClass("logged-in");
                                    $('.visible-when-not-logged-in').hide();
                                    $('.hidden-when-not-logged-in').show();
                                    document.location = "#/home";

                                });

                            ev.preventDefault();
                            return false;
                        });

                        $("#btn-register").on("click", (ev) => {
                            let user = {
                                username: $("#tb-username").val(),
                                passHash: $("#tb-password").val()
                            };

                            dataService.register(user)
                                .then((respUser) => {
                                    return dataService.login(user);
                                })
                                .then((respUser) => {
                                    $(document.body).addClass("logged-in");
                                    $('.visible-when-not-logged-in').hide();
                                    $('.hidden-when-not-logged-in').show();
                                    document.location = "#/home";
                                });

                            ev.preventDefault();
                            return false;
                        });

                    });
            });
    },
    logout: () => {
        dataService.logout()
            .then(() => {
                $(document.body).removeClass("logged-in");
                $('.visible-when-not-logged-in').show();
                $('.hidden-when-not-logged-in').hide();
            });
    }

};
