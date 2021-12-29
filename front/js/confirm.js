// fonction pour ecrire le numero dans le DOM
function writeIdOrder() {
  let url = window.location.search;
  let urlParams = new URLSearchParams(url);
  const orderId = urlParams.get("id");
  document.querySelector("#orderId").innerText = orderId;
}

writeIdOrder();
