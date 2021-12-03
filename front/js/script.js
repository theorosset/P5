//declaration de constante
const items = document.querySelector("#items");
const URL = `http://localhost:3000/api/products`;

//recuperation des donner de l'api
async function getArticle() {
  let response = await fetch(URL);
  let returnResponse = await response.json();
  return returnResponse;
}

//répartition des donner recuperer dans le DOM
async function postArticle() {
  await getArticle()
    .then(function (data) {
      for (i = 0; i < data.length; i++) {
        let articlesId = data[i]._id;
        let imgArticles = data[i].imageUrl;
        let articleName = data[i].name;
        let articleDescription = data[i].description;

        //creation de la balise <a></a>
        let a = `<a href="product.html?id=${articlesId}">`;
        let endA = `</a>`;
        console.log(a);

        //creation d'une balise article pour les elements html

        items.innerHTML += `${a}<article><img src="${imgArticles}" /> <h3 class="productName">${articleName}</h3><p class="productDescription">${articleDescription}</p></article>${endA}`;
      }
    })
    .catch((error) => {
      items.innerHTML = `<article><p>Nous rencontrons actuellement un problème merci de réessayer ulterieurement. </p></article>`;
    });
}

//activation de la fonction pour que les données soit repartie dans le DOM
postArticle();
