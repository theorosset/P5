// fonction pour ecrire le numero dans le DOM
function writeIdOrder() {
  let orderId = sessionStorage.getItem("orderId");
  document.querySelector("#orderId").innerText = orderId;
}
writeIdOrder();
