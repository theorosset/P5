let productArrayCart = JSON.parse(localStorage.getItem("product"));

//repartition des produit du ls dans page panier
getItem();

async function getItem() {
  let articles = await getArticles();
  //condition si il ya quelque chose dans le panier
  if (productArrayCart != null) {
    for (let i = 0; i < productArrayCart.length; i++) {
      createInDom(productArrayCart[i], articles[i]);
      TotalPrice(productArrayCart[i], articles[i]);
      deletArticle(productArrayCart[i], articles[i]);
    }
    //si le panier est vide
  } else {
    document.querySelector(
      "#cart__items"
    ).innerHTML = `<p>Il y a actuellement aucun produit dans votre panier</p>`;
  }
}

function getArticles() {
  return (
    fetch(`http://localhost:3000/api/products`)
      .then(function (response) {
        return response.json();
      })
      //on capture l'erreur si il y en a une
      .catch(function error() {
        document.querySelector(
          ".item__img"
        ).innerHTML = `<p>Nous ne pouvons pas afficher ce produit actuellement</p>`;
      })
  );
}

/**
 *
 * @param {object} productArrayCart recupere le produit
 *
 */
function createInDom(productArrayCart, Article) {
  const cartItems = document.querySelector("#cart__items");

  //--------------------creation-------------------------------------

  //creation de la balise article dans le DOM
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", productArrayCart.productId);
  article.setAttribute("data-color", productArrayCart.productColor);
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
  img.src = Article.imageUrl;
  img.alt = Article.altTxt;

  // insertion du nom du produit
  const productName = document.createElement("h2");

  divNamePriceColors.appendChild(productName);
  productName.innerText = Article.name;

  //insertion de la couleur
  const productColor = document.createElement("p");

  divNamePriceColors.appendChild(productColor);

  productColor.innerText = productArrayCart.productColor;

  //insertion du prix
  const productPrice = document.createElement("p");

  divNamePriceColors.appendChild(productPrice);

  productPrice.innerText = Article.price + " €";
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
  quantityInput.valueAsNumber = productArrayCart.productQuantity;

  //inseration de la suppression
  const delet = document.createElement("p");
  delet.classList.add("deleteItem");
  divParentSuppr.appendChild(delet);

  delet.innerText = "Supprimer";
}

//calcule pour le prix total
let total = 0;
function TotalPrice(productArrayCart, Article) {
  const priceTotal = document.querySelector("#totalPrice");
  let price = Article.price * productArrayCart.productQuantity;
  total += price;
  priceTotal.innerText = total;

  return total;
}
