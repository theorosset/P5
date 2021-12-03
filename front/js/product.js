// declaration  pour recuperer l'id avec urlSearch
let url = window.location.search;
const searchParam = new URLSearchParams(url);
const productId = searchParam.get("id");
console.log(productId);

//constante du chemin vers l'id de l'api
const URL = `http://localhost:3000/api/products/${productId}`;
console.log(URL);

// constante de récuperation d'élément du DOM
const imgProduct = document.querySelector(".item__img");
const nameProduct = document.querySelector("#title");
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsChoose = document.querySelector("#colors");
const quantityChoose = document.querySelector("#quantity");

//on demande a l'api de nous donnez les données par rapport a l'id produit
async function getProduct() {
  let response = await fetch(URL);
  let returnResponse = await response.json();
  return returnResponse;
}
//repartition des données recuperer dans le DOM
async function postProduct() {
  await getProduct()
    .then((data) => {
      console.log(data);
      let image = data.imageUrl;
      let name = data.name;
      let price = data.price;
      let description = data.description;
      let colors = data.colors;

      console.log(price);
      console.log(name);

      //inseration de l'image dans le DOM
      imgProduct.innerHTML = `<img src="${image}" alt="Photographie d'un canapé">`;
      //insertion du nom dans le DOM
      nameProduct.innerHTML = `${name}`;
      //insertion du prix dans le DOM
      priceProduct.innerHTML = `${price} `;
      //insertion de la description
      descriptionProduct.innerHTML = `${description}`;
      //insertion des couleur

      for (i = 0; i < colors.length; i += 1) {
        //iteration dans le tableau des couleurs
        let colorsElement = colors[i];
        console.log(colorsElement);
        //on crée les emplacements <option></option>
        let option = document.createElement("option");
        colorsChoose.appendChild(option);
        //on recupere nos elements du tableau et on les appliques au DOM
        option.innerText = colorsElement;
      }
    })
    .catch((error) => {
      imgProduct.innerHTML = `<p>Nous rencontrons actuellement un problème pour afficher  ce produit</p>`;
    });
}

postProduct();
