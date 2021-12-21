//constante de recuperation des element du dom
const items = document.querySelector("#items");
main();

//repartition des element dans le DOM
async function main() {
  let articles = await getArticles();

  for (let i = 0; i < articles.length; i++) {
    createElementInDOM(articles[i]);
  }
}

//function pour contacter l'api et avoir les données en json
function getArticles() {
  return (
    fetch(`http://localhost:3000/api/products`)
      .then(function (response) {
        return response.json();
      })
      //on capture l'erreur si il y en a une
      .catch(function error() {
        items.innerHTML = `<p>Nous ne pouvons pas afficher les produits actuellement</p>`;
      })
  );
}

//creation des articles a inserer dans le dom
function createElementInDOM(article) {
  //creation de notre lien dans le dom
  const link = document.createElement("a");
  items.appendChild(link);
  link.href = `product.html?id=${article._id}`;

  //creation de notre balise article dans le dom
  const baliseArticle = document.createElement("article");
  link.appendChild(baliseArticle);

  //creation de nos emplacement pour nos image
  const img = document.createElement("img");
  baliseArticle.appendChild(img);
  img.src = article.imageUrl;
  img.alt = article.altTxt;

  //creation de l'emplacement pour nos titre
  const title = document.createElement("h3");
  baliseArticle.appendChild(title);
  title.classList.add("productName");
  title.innerHTML = article.name;

  //creation de l'emplacement pour la description
  const p = document.createElement("p");
  baliseArticle.appendChild(p);
  p.classList.add("productDescription");
  p.innerText = article.description;
}
