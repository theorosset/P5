let total = 0;
//repartition des produit du ls dans page panier
getItem();

function getItem() {
  const getElement = JSON.parse(localStorage.getItem("product"));

  //condition si il ya quelque chose dans le panier
  if (getElement != null) {
    for (i = 0; i < getElement.length; i++) {
      createInDom(getElement);
      TotalPrice(getElement);
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
 * @param {object} getElement recupere le produit
 *
 */
function createInDom(getElement) {
  const cartItems = document.querySelector("#cart__items");

  //------------creation-----------------------

  //creation de la balise article dans le DOM
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", getElement[i].productId);
  article.setAttribute("data-color", getElement[i].productColor);
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

  //creation de la div parent pour la suppression
  const divEnfantSuppr = document.createElement("div");
  divEnfantSuppr.classList.add("deleteItem");
  divParentSuppr.appendChild(divEnfantSuppr);

  //----------------------insertion--------------------------------

  //insertion de l'image
  const img = document.createElement("img");
  divImg.appendChild(img);
  img.src = getElement[i].productImg;
  img.alt = getElement[i].attributAlt;

  // insertion du nom du produit
  const productName = document.createElement("h2");

  divNamePriceColors.appendChild(productName);
  productName.innerText = getElement[i].productName;

  //insertion de la couleur
  const productColor = document.createElement("p");

  divNamePriceColors.appendChild(productColor);

  productColor.innerText = getElement[i].productColor;

  //insertion du prix
  const productPrice = document.createElement("p");

  divNamePriceColors.appendChild(productPrice);

  productPrice.innerText = getElement[i].productPrice + " €";
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
  quantityInput.valueAsNumber = getElement[i].productQuantity;

  //inseration de la suppression
  const delet = document.createElement("p");
  divEnfantSuppr.appendChild(delet);

  delet.innerText = "Supprimez";
}

//calcule pour le prix total
function TotalPrice(getElement) {
  const priceTotal = document.querySelector("#totalPrice");
  let price = getElement[i].productPrice;
  total += price;
  priceTotal.innerText = total;
}
