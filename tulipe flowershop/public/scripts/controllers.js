var handlebars = handlebars || Handlebars;

let controllers = (function() {
    function getSum(array) {
        var sum = 0;

        array.forEach((item) => {
            sum += item.price;
        });

        return sum;
    }

    function search(searchArray, searchWord) {
        var len = searchArray.length;
        for (var i = 0; i < len; i += 1) {
            var $currentItem = $(searchArray[i]);
            if ($currentItem.html().toLowerCase().indexOf(searchWord.toLowerCase()) < 0) {
                $currentItem.parent().parent().parent().addClass('filter');
            } else {
                $currentItem.parent().parent().parent().removeClass('filter');
            }
        }
    }

    function sort(items, sortBy) {
        if (sortBy === 'hot') {
            items.sort(function(a, b) {
                return (a.orders < b.orders) ? 1 : ((b.orders < a.orders) ? -1 : 0);
            });
        }
        if (sortBy === 'price') {
            items.sort(function(a, b) {
                return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
            });
        }
        if (sortBy === 'new') {
            items.sort(function(a, b) {
                return (a.addDate < b.addDate) ? 1 : ((b.addDate < a.addDate) ? -1 : 0);
            });
        }
        return items;
    }

    function highlights() {
        var products= [];
        dataService.products()
            .then((productsResponse) => {
                products = productsResponse;

                return templates.get('highlights');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(products.result);

                $('.highlight-container').html(html);
            });
    }

    function home() {
        var items;
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
                items = productsResponse.result;
                return templates.get('home');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items);
                $("#main").html(html);
                onlyProducts('hot', "#hot");
                onlyProducts('new', "#new");
            });
        highlights();
    }

    function store() {
        var products = [];
        dataService.products()
            .then((productsResponse) => {
                return templates.get("store");
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(products);

                $("#main").html(html);

                $('#search').on('input', function() {
                    var searchArrays = $('.product-name');
                    var searchWord = $('#search').val();
                    search(searchArrays, searchWord);
                });
            });
        highlights();
    }

    function products(sortBy) {
        var items = [];
        store();
        dataService.products()
            .then((productsResponse) => {
                for (let i in productsResponse.result) {
                    items = items.concat(productsResponse.result[i]);
                }
                sort(items, sortBy);
                return templates.get("productsList");
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items);

                $("#store").html(html);

                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    products(sortVal);
                });
            });
    }

    function hotProducts() {
        products('hot');
    }

    function newProducts() {
        products('new');
    }

    function onlyProducts(sortBy, holder){
          var items = [];
          dataService.products()
              .then((productsResponse) => {

                  for (let i in productsResponse.result) {
                      items = items.concat(productsResponse.result[i]);
                  }
                  sort(items, sortBy);
                  items.splice(4, items.length-4);
                  return templates.get("products");
              })
              .then((templateHtml) => {
                  let templateFunc = handlebars.compile(templateHtml);
                  let html = templateFunc(items);
                  $(holder).html(html);
              });
      }

    function bouquetsCategory(params, sortBy) {
        var items = [],
            j = 0,
            category = params.category;
        store();
        dataService.bouquets()
            .then((bouquetsResponse) => {
                for (i in bouquetsResponse.result) {
                    if (bouquetsResponse.result[i].category === category) {
                        items[j] = bouquetsResponse.result[i];
                        j++;
                    }
                }
                sort(items, sortBy);
                return templates.get('productsList');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items);
                $('#store').html(html);

                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    bouquetsCategory(params, sortVal);
                });
            });
    }

    function bouquets(sortBy) {
        var items;
        store();
        dataService.bouquets()
            .then((bouquetsResponse) => {
                items = bouquetsResponse;

                sort(items.result, sortBy);

                return templates.get('productsList');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items.result);

                $('#store').html(html);

                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    bouquets(sortVal);
                });
            });
    }

    function boxes(sortBy) {
        var items;
        store();
        dataService.boxes()
            .then((boxesResponse) => {
                items = boxesResponse;
                sort(items.result, sortBy);
                return templates.get('productsList');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items.result);

                $('#store').html(html);
                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    boxes(sortVal);
                });
            });

    }

    function plants(sortBy) {
        var items;
        store();
        dataService.plants()
            .then((plantsResponse) => {
                items = plantsResponse;
                sort(items.result, sortBy);
                return templates.get('productsList');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items.result);

                $('#store').html(html);
                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    plants(sortVal);
                });

            });
    }

    function chocolates(sortBy) {
        var items;
        store();
        dataService.chocolates()
            .then((chocolatesResponse) => {
                items = chocolatesResponse;
                sort(items.result, sortBy);
                return templates.get('productsList');
            })
            .then((templateHtml) => {
                let templateFunc = handlebars.compile(templateHtml);
                let html = templateFunc(items.result);

                $('#store').html(html);
                $('#sort').val(sortBy);
                $('#sort').on('change', function() {
                    var sortVal = $('#sort').val();
                    chocolates(sortVal);
                });
            });
    }

    function singleProduct(params) {
        var product,
            id = params.id;
        store();
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
                $('#store').html(html);

                $('#btn-add-item').on('click', function() {
                    dataService.addToCart(product)
                        .then(function() {

                        });
                });
            });
    }

    function showCart() {
        templates.get('shoppingCart')
            .then(function(html) {
                var compiledTemplate = Handlebars.compile(html);

                dataService.cart()
                    .then(function(cart) {
                        var totalPrice = 0;
                        if (!cart) {
                            totalPrice = 0;
                            cart = [];
                        } else totalPrice = getSum(cart);

                        totalPrice = parseFloat(totalPrice.toString()).toFixed(2);
                        $('#main').html(compiledTemplate(cart));
                        $('#totalPrice').html('$' + totalPrice);

                        $('.btn-remove-item').on('click', function(ev) {
                            var $listElement = $(ev.target).parents('tr'),
                                itemId = $listElement.attr('data-id');
                            dataService.removeFromCart(itemId)
                                .then((itemId) => {
                                    $listElement.remove();
                                });
                            showCart();
                        });

                    });
                $('#btn-add-details').on('click', function(ev) {
                    window.location = "#/addDeliveryDetails";
                });
            });

    }

    function addDeliveryDetails() {
        templates.get('addDeliveryDetails')
            .then(function(html) {
                var compiledTemplate = Handlebars.compile(html);
                $('#main').html(compiledTemplate);
            });
    }

    function orderAccepted() {
        templates.get('orderAccepted')
            .then(function(html) {
                var compiledTemplate = Handlebars.compile(html);
                $('#main').html(compiledTemplate);
                localStorage.removeItem("cart");
            });
    }

    function login() {
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
    }

    function logout() {
        dataService.logout()
            .then(() => {
                $(document.body).removeClass("logged-in");
                $('.visible-when-not-logged-in').show();
                $('.hidden-when-not-logged-in').hide();
            });
    }

    return {
        home: home,
        login: login,
        logout: logout,
        highlights: highlights,
        products: products,
        newProducts: newProducts,
        hotProducts: hotProducts,
        bouquets: bouquets,
        bouquetsCategory: bouquetsCategory,
        boxes: boxes,
        plants: plants,
        chocolates: chocolates,
        singleProduct: singleProduct,
        showCart: showCart,
        addDeliveryDetails: addDeliveryDetails,
        orderAccepted: orderAccepted
    };
}());
