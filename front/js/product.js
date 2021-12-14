//recuperation de l'id du produit selectionner
let url = window.location.search;

let urlParams = new URLSearchParams(url);
const urlId = urlParams.get("id");
console.log(urlId);

//fonction qui sera lu uniquement si la promesse est resolu
postProduct();

//--------fonction de repartition dans le DOM--------
async function postProduct() {
  const product = await getProduct();
  const productCreate = createPlaceProduct(product);
  const local = addLocal(product);
}

//--------fonction de recuperation des données du produit selectionner avec son id-------

function getProduct() {
  return fetch(`http://localhost:3000/api/products/${urlId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (product) {
      return product;
    })
    .catch(function error() {
      document.querySelector(
        ".item__img"
      ).innerHTML = `<p>Nous ne pouvons pas afficher ce produit actuellement</p>`;
    });
}

//------------fonction d'insertion des produit-------------
function createPlaceProduct(product) {
  /**
   * @type {HTMLTitleElement}
   *  */
  document.title = `${product.name}`;

  //inseration de notre  image dans le DOM
  const img = document.createElement("img");
  document.querySelector(".item__img").appendChild(img);
  img.src = `${product.imageUrl}`;
  img.alt = `${product.altTxt}`;

  //inseration du titre dans le DOM
  const title = document.createElement("h1");
  document.querySelector("#title").appendChild(title);
  title.innerText = `${product.name}`;

  //inseration du prix dans le DOM
  const price = document.querySelector("#price");
  price.innerText = `${product.price} `;

  //inseration du prix dans le DOM
  const description = document.querySelector("#description");
  description.innerText = `${product.description}`;

  // itération dans le tableau des couleur et inseration des couleur disponible
  for (i = 0; i < product.colors.length; i += 1) {
    console.log(product.colors[i]);
    let option = document.createElement("option");
    document.querySelector("#colors").appendChild(option);
    option.innerText = `${product.colors[i]}`;
    option.value = `${product.colors[i]}`;
  }
}

//--------------function d'ajout au localStorage au click------------

/**
 * Ajoute un canapé dans le local storage
 *
 * @param {object} product le canapé a ajouté
 *
 */
function addLocal(product) {
  document.querySelector("#addToCart").addEventListener("click", function () {
    /**
     * @type {HTMLInputElement}
     *  */
    const quantityInput = document.querySelector("#quantity");

    //recuperation des option du produit choisit
    let productChoose = {
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productId: product._id,
      productColor: document.querySelector("#colors").value,
      productImg: product.imageUrl,
      attributAlt: product.altTxt,
      productQuantity: quantityInput.valueAsNumber,
    };
    //etat par defaut
    let productArrayCart = [];

    if (localStorage.getItem("product") != null) {
      productArrayCart = JSON.parse(localStorage.getItem("product"));
    }

    // si il y a déja le même produit dans le panier
    if (productArrayCart != null) {
      const searchInLs = productArrayCart.find((proCoId) => {
        proCoId.productId === productArrayCart.productId &&
          proCoId.productColor === productChoose.productColor;
        console.log("true");
        console.log(proCoId.productId);
        console.log(proCoId.productColor);
        console.log(productChoose.productColor);
        console.log(productChoose.productId);
      });

      //si la recherche est validé
      if (searchInLs) {
        let TotalQuantity =
          productChoose.productQuantity + searchInLs.productQuantity;
        searchInLs.productQuantity = TotalQuantity;
        console.log("Yep");
        localStorage.setItem("product", JSON.stringify(productArrayCart));
      }

      //sinon on ajoute l'élément au panier
      else {
        productArrayCart.push(productChoose);
        localStorage.setItem("product", JSON.stringify(productArrayCart));
        console.log("nop");
        console.log(productArrayCart);
      }
    }
  });
}
