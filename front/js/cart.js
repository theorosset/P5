//repartition des produit du ls dans page panier
postItem();

//fonction qui se jouera uniquement si la promesse est résolue
async function postItem() {
  //recuperation des articles dans le ls
  let productArrayCart = JSON.parse(localStorage.getItem("product"));

  //recuperation des articles dans l'api
  let articles = await getArticles();

  //si il y a quelque chose dans le localstorage
  if (productArrayCart != null) {
    itemSearchApi(productArrayCart, articles);

    modifQuantity(productArrayCart, articles);
    TotalQuantity(productArrayCart);
    TotalPrice(productArrayCart, articles);
    deletItem(productArrayCart);
    formValid(productArrayCart);
  }
}

/**
 *fonction pour récuperer les bonne information de l'api par rapport au info du LS
 * @param {object[]} productArrayCart produit dans le panier
 * @param {object[]} article  info des article  dans l'api
 *
 */
function itemSearchApi(productArrayCart, article) {
  console.log(productArrayCart);
  console.log(article);
  productArrayCart.forEach((el) => {
    const searchArticle = article.find(function ({ _id }) {
      return _id === el.productId;
    });
    if (searchArticle) {
      createInDom(el, searchArticle);
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
          "#cart__items"
        ).innerHTML = `<p>Nous ne pouvons affichez votre paniez actuellement</p>`;
      })
  );
}

/**
 *--------fonction pour inserez les elements dans le dom
 *
 *  @param {object[]} productArrayCart élément du panier
 * @param {object} cart info de l'article dans l'api
 * @type {createElement} creation des balise dans le DOM
 */
function createInDom(productArrayCart, cart) {
  console.log(cart);
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
  img.src = cart.imageUrl;
  img.altTxt = cart.altTxt;

  // insertion du nom du produit
  const productName = document.createElement("h2");

  divNamePriceColors.appendChild(productName);
  productName.innerText = cart.name;

  //insertion de la couleur
  const productColor = document.createElement("p");

  divNamePriceColors.appendChild(productColor);

  productColor.innerText = productArrayCart.productColor;

  //insertion du prix
  const productPrice = document.createElement("p");

  divNamePriceColors.appendChild(productPrice);

  productPrice.innerText = cart.price + " €";
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

/**
 * -----------------------suppression de l'article dans le panier
 *
 * @param {object[]} productArrayCart  produit dans le ls
 *
 */
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
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // on recherche l'index dans le tableau du ls
      const article = productArrayCart.findIndex(function ({
        productId,
        productColor,
      }) {
        return productId === id && productColor === color;
      });
      console.log(article);

      // suppression de l'élément séléctionner avec splice()
      if (article) {
        console.log(productArrayCart.splice(article, 1));
      }

      if (article == []) {
        productArrayCart.splice(0, 1);
      }
      // on enregiste le changement dans le local storage
      localStorage.setItem("product", JSON.stringify(productArrayCart));

      //on actualise la page
      location.reload();
    });
  });
  console.log(productArrayCart);
}
/**
 * --------------------modification de la quantité--------------
 * @param {object[]} productArrayCart élément dans le local storage
 * @param {object[]} articles article dans l'api
 */
function modifQuantity(productArrayCart, article) {
  const inputQuantity = document.querySelectorAll(".itemQuantity");

  //pour chaque input quantité
  inputQuantity.forEach(function (inputQuantity) {
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
      productArrayCart.forEach(function (el) {
        if (el.productId === id && el.productColor === color) {
          console.log("qté :" + newQuantity);
          el.productQuantity = newQuantity;

          TotalQuantity(productArrayCart);
          localStorage.setItem("product", JSON.stringify(productArrayCart));
        }
      });
      TotalPrice(productArrayCart, article);
    });
  });
}
/**
 * --------------------------calcule de la quantité total
 *
 * @param {object[]} productArrayCart élément dans le panier
 * @type {HTMLHtmlElement} emplacement de la quantité total
 */

function TotalQuantity(productArrayCart) {
  const TotalQuantity = document.querySelector("#totalQuantity");
  //on iniatilise le total
  let Total = 0;

  //pour chaque produit du localStorage on incrémente la quantité total des article
  productArrayCart.forEach(function (el) {
    //a chaque tours de boucle le total est incrémenter
    Total += el.productQuantity;
  });

  //on insere le total dans le DOM
  TotalQuantity.innerText = Total;
}

/**
 * -----------------------calcule du prix total
 *
 * @param {object[]} productArrayCart élément dans le panier
 * @param {object[]} article info des articles depuis l'api
 */

function TotalPrice(productArrayCart, article) {
  const priceTotal = document.querySelector("#totalPrice");

  //initialisation du total
  let total = 0;
  //pour chaque produit dans le localstorage
  productArrayCart.forEach(function ({ productId, productQuantity }) {
    console.log(productId);
    // on recupere le bon produit par rapport a l'id dans le ls et a l'id dans l'api
    const cart = article.find(function ({ _id }) {
      return _id === productId;
    });
    // si il y a une valeur dans la constante cart on calcule la quantité multiplier par son prix et on l'incrémente au total
    if (cart) {
      total += productQuantity * cart.price;
    }
    console.log(total);
  });
  // on ecrit le total dans le DOM
  priceTotal.innerText = total;

  console.log(total);
}
//--------------------------------validation du formulaire----------------------

function formValid(productArrayCart) {
  const form = document.querySelector(".cart__order__form");
  const order = document.querySelector("#order");

  //console.log(form);

  form.firstName.addEventListener("input", function () {
    FirstnameValid(form.firstName);
  });

  form.lastName.addEventListener("input", function () {
    LastnameValid(form.lastName);
  });

  form.address.addEventListener("input", function () {
    AdressValid(form.address);
  });

  form.city.addEventListener("input", function () {
    CityValid(form.city);
  });

  form.email.addEventListener("input", function () {
    emailValid(form.email);
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      FirstnameValid(form.firstName) === true &&
      LastnameValid(form.lastName) === true &&
      AdressValid(form.address) === true &&
      CityValid(form.city) === true &&
      emailValid(form.email) === true
    ) {
      SendInfo(productArrayCart);
    } else {
      alert(
        "Un ou plusieurs champs de votre formulaire son manquant et/ou mal remplis."
      );
    }
  });
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
  let nameRegExp = new RegExp("^([a-z]+)(s)?([a-z]*)$", "i");
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
  return testName;
}

/**
 * ------------validation du nom
 * @param {htmlElementDOM} inputLastName
 * @returns boolean
 *
 * */

function LastnameValid(inputLastName) {
  let nameRegExp = new RegExp("^([a-z]+)(s)?([a-z]*)$");
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
  return testName;
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
  return testAdress;
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
  return cityTest;
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
  return emailTest;
}

/**
 *----------enregistrement des information du formulaire dans le LS
 * @param {htmlElementDOM} formulaire
 * voir l'évenement submit sur tout le formulaire
 */

//---------------------confirmation
function SendInfo(productArrayCart) {
  const form = document.querySelector(".cart__order__form");

  let productId = [];
  for (i = 0; i < productArrayCart.length; i++) {
    productId.push(productArrayCart[i].productId);
  }

  const order = {
    contact: {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    },
    products: productId,
  };
  console.log(order);
  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  //on contatcte l'api pour recuperer le numero de commande selon les réglages etablie dans la constante options
  fetch("http://localhost:3000/api/products/order", options)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.clear();
      sessionStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";
    })
    .catch(function () {
      alert(
        "Nous rencontrons actuellement un problème pour envoyer le formulaire"
      );
    });
}
