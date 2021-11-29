// declaration  pour recuperer l'id avec urlSearch
let url = window.location.search;
const searchParam = new URLSearchParams(url);
const productId = searchParam.get("id");
console.log(productId);

//constante du chemin vers l'id de l'api
const URL = `http://localhost:3000/api/products/${productId}`;
console.log(URL);

// constante de récuperation d'élément du DOM
const imgItems = document.querySelector(".item__img");
const nameProduct = document.querySelector("#title");
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");

//on demande a l'api de nous donnez les donnez par rapport a l'id produit
fetch(URL)
  .then((response) => {
    return response.json();
  })

  //recuperation des donnez en fonction de l'id et repartition dans le DOM
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
    imgItems.innerHTML = `<img src="${image}" alt="Photographie d'un canapé">`;
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
      colorsOfProduct.appendChild(option);
      //on recupere nos elements du tableau et on les appliques au DOM
      option.innerText = colorsElement;
    }
  })
  .catch((error) => {
    imgItems.innerHTML = `<p>Nous rencontrons actuellement un problème pour afficher  ce produit</p>`;
  });
