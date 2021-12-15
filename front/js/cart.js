let productArrayCart = JSON.parse(localStorage.getItem("product"));
let total = 0;
//repartition des produit du ls dans page panier
getItem();

function getItem() {
  //condition si il ya quelque chose dans le panier
  if (productArrayCart != null) {
    for (i = 0; i < productArrayCart.length; i++) {
      createInDom(productArrayCart);
      TotalPrice(productArrayCart);
    }

    //si le panier est vide
  } else {
    document.querySelector(
      "#cart__items"
    ).innerHTML = `<p>Il y a actuellement aucun produit dans votre panier</p>`;
  }
}

/**
 *
 * @param {object} productArrayCart recupere le produit
 *
 */
function createInDom(productArrayCart) {
  const cartItems = document.querySelector("#cart__items");

  //--------------------creation-------------------------------------

  //creation de la balise article dans le DOM
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", productArrayCart[i].productId);
  article.setAttribute("data-color", productArrayCart[i].productColor);
  cartItems.appendChild(article);

  //creation de la div qui prendra l'image
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  article.appendChild(divImg);

  //creation de la  div parent qui prendra une div pour le nom, la couleur et le prix
  const divParentDescript = document.createElement("div");
  divParentDescript.classList.add("cart__item__content");
  article.appendChild(divParentDescript);

  //creation  de la div enfant pour la couleur, nom, prix
  const divNamePriceColors = document.createElement("div");
  divNamePriceColors.classList.add("cart__item__content__description");
  divParentDescript.appendChild(divNamePriceColors);

  //creation de la div parent qui prendra une div pour la quantité
  const divParentQuantity = document.createElement("div");
  divParentQuantity.classList.add("cart__item__content__settings");
  divParentDescript.appendChild(divParentQuantity);

  //creation de la div enfant pour la quantité
  const divQuantity = document.createElement("div");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  divParentQuantity.appendChild(divQuantity);

  //creation de la div parent pour la suppression
  const divParentSuppr = document.createElement("div");
  divParentSuppr.classList.add("cart__item__content__settings__delete");
  divParentQuantity.appendChild(divParentSuppr);

  //----------------------insertion--------------------------------

  //insertion de l'image
  const img = document.createElement("img");
  divImg.appendChild(img);
  img.src = productArrayCart[i].productImg;
  img.alt = productArrayCart[i].attributAlt;

  // insertion du nom du produit
  const productName = document.createElement("h2");

  divNamePriceColors.appendChild(productName);
  productName.innerText = productArrayCart[i].productName;

  //insertion de la couleur
  const productColor = document.createElement("p");

  divNamePriceColors.appendChild(productColor);

  productColor.innerText = productArrayCart[i].productColor;

  //insertion du prix
  const productPrice = document.createElement("p");

  divNamePriceColors.appendChild(productPrice);

  productPrice.innerText = productArrayCart[i].productPrice + " €";
  //insertion de la quantite
  const quantityP = document.createElement("p");

  divQuantity.appendChild(quantityP);
  quantityP.innerText = "Qté :";

  //input pour modifier la quantite
  const quantityInput = document.createElement("input");
  quantityInput.classList.add("itemQuantity");

  divQuantity.appendChild(quantityInput);

  //ajout des attribut au input
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");
  quantityInput.valueAsNumber = productArrayCart[i].productQuantity;

  //inseration de la suppression
  const delet = document.createElement("p");
  delet.classList.add("deleteItem");
  divParentSuppr.appendChild(delet);

  delet.innerText = "Supprimer";
}

//suppression du produit
function itemDelet() {
  //selection du "bouton" supprimer
  const btnDelet = document.querySelectorAll(".deleteItem");
  console.log(btnDelet);

  //on vas chercher chaque bouton supprimer avec une boucle
  for (i = 0; i < btnDelet.length; i++) {
    console.log(btnDelet[i]);
    btnDelet[i].addEventListener("click", function () {});
  }
}
itemDelet();
//calcule pour le prix total
function TotalPrice(productArrayCart) {
  const priceTotal = document.querySelector("#totalPrice");
  let price =
    productArrayCart[i].productPrice * productArrayCart[i].productQuantity;
  total += price;
  priceTotal.innerText = total;
}
