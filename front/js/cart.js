//verification des element stocker
let local = localStorage;
console.log(local);

//array

// constante de récuperation d'élément du DOM
const cartItems = document.querySelector("#cart__items");

//recuperation des element mis dans le localStorage
function getStorage() {
  let quantity = local.quantity;
  let colors = local.colors;
  let image = local.image;
  let price = local.price;
  let name = local.name;
  console.log(quantity);
  console.log(colors);
  console.log(image);
  console.log(price);
  console.log(name);
}

//creation des emplacement  dans le DOM
function creaElementDom() {
  //creation de la balise article dans le DOM
  let article = document.createElement("article");
  article.classList.add("cart__item");
  cartItems.appendChild(article);

  //creation de la div qui prendra l'image
  let divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  document.querySelector(".cart__item").appendChild(divImg);

  //creation de la  div parent qui prendra une div pour le nom, la couleur et le prix
  let divParentDescript = document.createElement("div");
  divParentDescript.classList.add("cart__item__content");
  article.appendChild(divParentDescript);

  //creation  de la div enfant pour la couleur, nom, prix
  let divNamePriceColors = document.createElement("div");
  divNamePriceColors.classList.add("cart__item__content__description");
  divParentDescript.appendChild(divNamePriceColors);

  //creation de la div parent qui prendra une div pour la quantité
  let divParentQuantity = document.createElement("div");
  divParentQuantity.classList.add("cart__item__content__settings");
  divParentDescript.appendChild(divParentQuantity);

  //creation de la div enfant pour la quantité
  let divQuantity = document.createElement("div");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  divParentQuantity.appendChild(divQuantity);

  //creation de la div parent pour la suppression
  let divParentSuppr = document.createElement("div");
  divParentSuppr.classList.add("cart__item__content__settings__delete");
  divParentQuantity.appendChild(divParentSuppr);

  //creation de la div parent pour la suppression
  let divEnfantSuppr = document.createElement("div");
  divEnfantSuppr.classList.add("deleteItem");
  divParentSuppr.appendChild(divEnfantSuppr);
}
creaElementDom();
