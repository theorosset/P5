//recuperation des articles dans le ls
let productArrayCart = JSON.parse(localStorage.getItem("product"));

//repartition des produit du ls dans page panier
postItem();

async function postItem() {
  let articles = await getArticles();

  //si il y a quelque chose dans le localstorage
  if (productArrayCart != null) {
    itemSearchApi(articles, productArrayCart);
    deletItem(productArrayCart, articles);
  }
}

//fonction pour récuperer les bonne information de l'api par rapport au info du local storage
function itemSearchApi(article, productArrayCart) {
  productArrayCart.forEach((el) => {
    const search = article.find(function ({ _id }) {
      return _id === el.productId;
    });
    if (search) {
      createInDom(el, search);
    }
  });
}

//recuperation des articles dans l'api
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

//fonction pour inserez les elements dans le dom
function createInDom(productArrayCart, search) {
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
  img.src = search.imageUrl;
  img.altTxt = search.altTxt;

  // insertion du nom du produit
  const productName = document.createElement("h2");

  divNamePriceColors.appendChild(productName);
  productName.innerText = search.name;

  //insertion de la couleur
  const productColor = document.createElement("p");

  divNamePriceColors.appendChild(productColor);

  productColor.innerText = productArrayCart.productColor;

  //insertion du prix
  const productPrice = document.createElement("p");

  divNamePriceColors.appendChild(productPrice);

  productPrice.innerText = search.price + " €";
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

//-----------------------suppression de l'article dans le panier
function deletItem(productArrayCart) {
  const btnDelet = document.querySelectorAll(".deleteItem");

  //pour chaque bouton supprimer on récupere son id et sa couleur
  btnDelet.forEach(function (btn) {
    // on recupere chaque bouton  le plus proche de l'élément parent (balise article)
    const btnClosest = btn.closest("Article");
    const id = btnClosest.dataset.id;
    const color = btnClosest.dataset.color;
    console.log(id);
    console.log(color);

    // au clique sur  supprimer on supprime le bonne article
    btn.addEventListener("click", function () {
      productArrayCart.forEach(function (el) {
        if (el.productId === id && el.productColor === color) {
          console.log(delete el.productId);
          console.log(delete el.productQuantity);
          console.log(delete el.productColor);
        }
        localStorage.setItem("product", JSON.stringify(productArrayCart));
      });
    });
  });
  console.log(productArrayCart);
}

/**
 * --------------------modification de la quantité--------------
 * @type {HTMLInputElement}
 *
 */
function modifQuantity() {
  const inputQuantity = document.querySelectorAll(".itemQuantity");

  //pour chaque input quantité
  inputQuantity.forEach(function (inputQuantity) {
    console.log(inputQuantity);
    //on recupere les input qui son dans la balise article
    const inputClosest = inputQuantity.closest("Article");

    let newQuantity = "";
    const id = inputClosest.dataset.id;
    const color = inputClosest.dataset.color;

    //on enregistre chaque changement de la quantité dans le DOM
    inputQuantity.addEventListener("change", function (e) {
      e.preventDefault();
      newQuantity = inputQuantity.valueAsNumber;

      //pour chaque article du LS on enregistre la nouvelle quantité
      productArrayCart.forEach(function (article) {
        if (article.productId === id && article.productColor === color) {
          article.productQuantity = newQuantity;
          localStorage.setItem("product", JSON.stringify(productArrayCart));
        }
      });
    });
  });
}

//-------------------------calcule du prix total-----------------

let total = 0;
function TotalPrice(productArrayCart, Article) {
  const priceTotal = document.querySelector("#totalPrice");
  let price = Article.price * productArrayCart.productQuantity;
  total += price;
  priceTotal.innerText = total;

  return total;
}

//--------------------------------validation du formulaire----------------------
function formValid() {
  const form = document.querySelector(".cart__order__form");
  const order = document.querySelector("#order");
  console.log(form);

  form.firstName.addEventListener("change", function () {
    FirstnameValid(form.firstName);
  });

  form.lastName.addEventListener("change", function () {
    LastnameValid(form.lastName);
  });

  form.address.addEventListener("change", function () {
    AdressValid(form.address);
  });

  form.city.addEventListener("change", function () {
    CityValid(form.city);
  });

  form.email.addEventListener("change", function () {
    emailValid(form.email);
  });

  OrderInfoSet(form);
}
/**
 * ----------validation du prenom
 *
 * @param {htmlElementDOM} inputAddress
 * @returns boolean
 *
 * */

function FirstnameValid(inputFirstName) {
  // Ajout du Regex
  let nameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  //test de notre expression reguliere
  let testName = nameRegExp.test(inputFirstName.value);
  console.log(testName);

  //si le test renvoie false on ajoute le message d'erreur
  if (testName === false) {
    document.querySelector("#firstNameErrorMsg").innerText =
      "Veuillez entrer un Prénom valide";
  }

  //sinon aucun message ne s'affiche
  else {
    document.querySelector("#firstNameErrorMsg").innerText = "";
  }
  return (testName = nameRegExp.test(inputFirstName));
}

/**
 * ------------validation du nom
 * @param {htmlElementDOM} inputLastName
 * @returns boolean
 *
 * */

function LastnameValid(inputLastName) {
  let nameRegExp = new RegExp("^[a-zA-Z ,.'-]+$", "i");
  let testName = nameRegExp.test(inputLastName.value);
  console.log(testName);

  //si le test renvoie false on ajoute le message d'erreur
  if (testName === false) {
    document.querySelector("#lastNameErrorMsg").innerText =
      "Veuillez entrer un Nom valide";
  }

  //sinon aucun message ne s'affiche
  else {
    document.querySelector("#lastNameErrorMsg").innerText = "";
  }
  return (testName = nameRegExp.test(inputLastName));
}
/**
 * -------------validation de l'adress
 *
 *  @param {htmlElementDOM} inputAddress
 * @returns boolean
 *
 * */

function AdressValid(inputAddress) {
  let AdressRegExp = new RegExp(
    "[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let testAdress = AdressRegExp.test(inputAddress.value);
  console.log(testAdress);

  //si le test renvoie false on ajoute le message d'erreur
  if (testAdress === false) {
    document.querySelector("#addressErrorMsg").innerText =
      "Veuillez entrer une adress valide";
  }

  //sinon aucun message ne s'affiche
  else {
    document.querySelector("#addressErrorMsg").innerText = "";
  }
  return (testAdress = AdressRegExp.test(inputAddress));
}

/**
 * -----validation de la ville
 *
 * @param {htmlElementDOM} inputCity
 * @returns boolean
 *
 * */
//
function CityValid(inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$");
  let cityTest = cityRegExp.test(inputCity.value);
  console.log(cityTest);

  if (cityTest === false) {
    document.querySelector("#cityErrorMsg").innerText =
      "Veuillez entrer une ville valide";
  }

  //sinon aucun message ne s'affiche
  else {
    document.querySelector("#cityErrorMsg").innerText = "";
  }
  return (cityTest = cityRegExp.test(inputCity));
}

/**
 * ---------validation de l'email
 *
 * @param {htmlElementDOM} inputEmail
 * @returns boolean
 *
 * */
function emailValid(inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$"
  );
  let emailTest = emailRegExp.test(inputEmail.value);
  console.log(emailTest);

  if (emailTest === false) {
    document.querySelector("#emailErrorMsg").innerText =
      "Veuillez entrer un email valide";
  }

  //sinon aucun message ne s'affiche
  else {
    document.querySelector("#emailErrorMsg").innerText = "";
  }
  return (emailTest = emailRegExp.test(inputEmail));
}
formValid();

/**
 *----------enregistrement des information du formulaire dans le LS
 * @param {htmlElementDOM} formulaire
 *
 */
function OrderInfoSet(form) {
  const order = document.querySelector("#order");

  order.addEventListener("click", function () {
    let contact = {
      FormFirstName: form.firstName.value,
      FormLastName: form.lastName.value,
      FormAddress: form.address.value,
      FormVille: form.city.value,
      FormEmail: form.email.value,
    };
  });
}
