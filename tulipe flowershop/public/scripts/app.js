let router = new Navigo(null, false);

router
  .on('#/login', controllers.login)
   .on('#/products', controllers.products)
   .on('#/products/:category', controllers.bouquets)
  .on('#/products/:category/:id', controllers.singleProduct)
  // .on('#/add/books', controllers.addBook)
  // .on('#/add/dvds', controllers.addDvd)
//   .on('#/add/cds', controllers.addCd)
//   .on('#/add/magazines', controllers.addMagazine)
//   .on('#/add/comics', controllers.addComic)
//    .on('#/contact', controllers.contact)
//    .on('#/products/comics', controllers.comics)
    .on('#/home', controllers.home)
    .on(() => {
        router.navigate("#/home");
    })
    .resolve();

$('.btn-nav-logout').click(() => {
    controllers.logout();
});
$('.navigation').on('click', 'li', (ev) => {
    let $target = $(ev.target);
    $target.parents('nav').find('li').removeClass('active');
    $target.parents('li').addClass('active');
});
