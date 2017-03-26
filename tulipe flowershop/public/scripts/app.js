let router = new Navigo(null, false);

router
  .on('#/login', controllers.login)
   .on('#/products', controllers.products)
   .on('#/products/best', controllers.hotProducts)
   .on('#/products/new', controllers.newProducts)
   .on('#/products/boxes', controllers.boxes)
   .on('#/products/plants', controllers.plants)
   .on('#/products/chocolates', controllers.chocolates)
   .on('#/products/bouquets', controllers.bouquets)
   .on('#/products/:category', controllers.bouquetsCategory)
  .on('#/products/:category/:id', controllers.singleProduct)
  .on("#/shoppingCart", controllers.showCart)
  .on("#/addDeliveryDetails", controllers.addDeliveryDetails)
  .on("#/orderAccepted", controllers.orderAccepted)
//    .on('#/contact', controllers.contact)
    .on('#/home', controllers.home)
    .on(() => {
        router.navigate("#/home");
    })
    .resolve();

$('.btn-nav-logout').click(() => {
    controllers.logout();
});
$('.menu').on('click', 'li', (ev) => {
    let $target = $(ev.target);
    $target.parents('nav').find('li').removeClass('active');
    $target.parents('li').addClass('active');
});
$('#cart').on('click', function () {
    window.location = '#/shoppingCart';
});
