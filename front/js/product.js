//recuperation de l'id du produit selectionner
let url = window.location.search;

let urlParams = new URLSearchParams(url);
const urlId = urlParams.get("id");

//fonction qui sera lu uniquement si la promesse est resolu
main();

//--------fonction de repartition dans le DOM--------
async function main() {
  const product = await getProducts();
  createPlaceProduct(product);
  addLocal(product);
}

//--------fonction de recuperation des données du produit selectionner avec son id-------

function getProducts() {
  return (
    fetch(`${urlApi}api/products/${urlId}`)
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
  for (let i = 0; i < product.colors.length; i += 1) {
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
      productId: product._id,
      productColor: document.querySelector("#colors").value,
      productQuantity: quantityInput.valueAsNumber,
    };

    //etat par defaut du localStorage
    let productArrayCart = [];

    if (localStorage.getItem("product") != null) {
      productArrayCart = JSON.parse(localStorage.getItem("product"));
    }
    // si aucune couleur n'a été choisit
    if (productChoose.productColor == "") {
      alert("Veuillez choisir une couleur.");
      return;
    }

    //si la quantité choisit est supérieur a 0 et inférieur ou égal a 100
    if (
      productChoose.productQuantity > 0 &&
      productChoose.productQuantity <= 100
    ) {
      // si il y a déja le même produit dans le panier
      if (productArrayCart != null) {
        const searchInLs = productArrayCart.find((productColorId) => {
          return (
            productColorId.productId === productChoose.productId &&
            productColorId.productColor === productChoose.productColor
          );
        });

        //si la recherche est validé
        if (searchInLs) {
          let TotalQuantity =
            productChoose.productQuantity + searchInLs.productQuantity;
          searchInLs.productQuantity = TotalQuantity;
          localStorage.setItem("product", JSON.stringify(productArrayCart));
          alert("Votre produit a été ajouté au panier");
        }

        //sinon on ajoute l'élément au panier
        else {
          productArrayCart.push(productChoose);
          localStorage.setItem("product", JSON.stringify(productArrayCart));
          alert("Votre produit a été ajouté au panier");
        }
      }
    } else {
      alert("Veuillez saisir une quantité entre 1 et 100");
    }
  });
}
