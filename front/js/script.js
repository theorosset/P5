//declaration de constante
const items = document.querySelector("#items");

//déclaration de variable
let URL = `http://localhost:3000/api/products`;
let searchParam = new URLSearchParams(window.location.search);
console.log(searchParam);
let articlesId;
let imgArticles;
let articleName;
let articleDescription;

//déclaration de fonction

// on contacte l'url de l'api pour recuperer une promesse
fetch(URL)
  .then((Response) => Response.json())

  //attribution des donnée de l'api au DOM
  .then((data) => {
    console.log(data);
    // boucle for pour récuperer les ID, images , noms et les descriptions des produits
    for (i = 0; i < data.length; i++) {
      articlesId = data[i]._id;
      imgArticles = data[i].imageUrl;
      articleName = data[i].name;
      articleDescription = data[i].description;

      //creation de la balise <a></a>
      let a = `<a href="product.html?id=${articlesId}">`;
      let endA = `</a>`;
      console.log(a);

      //creation d'une balise article pour les elements html

      items.innerHTML += `${a}<article><img src="${imgArticles}" /> <h3 class="productName">${articleName}</h3><p class="productDescription">${articleDescription}</p></article>${endA}`;
    }
  })
  .catch(
    (error) =>
      (items.innerHTML =
        "Nous rencontrons actuellement un problème merci de réessayer ulterieurement.")
  );
