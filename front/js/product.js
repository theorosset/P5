//recuperation de la valeurs de l'id du produit séléctionner
let url = window.location.search;

// declaration de constante pour recuperer l'id avec urlSearch
const searchParam = new URLSearchParams(url);
const productId = searchParam.get("id");
