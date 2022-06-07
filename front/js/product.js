/* 
  STEP 1 :
  Récupérer l'id de mon produit qui se trouve dans l'url:
  http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926
  */

// Utilisation de UrlSearchParams:
let str = document.URL;
let url = new URL(str);
let id = url.searchParams.get("id");

/* ----------------------------------------------------------------------------------------------------------------------------------*/
/*STEP 2 :
  Récupérer les informations de mon produit grace à l'id : 107fb5b75607497b96722bda5b504926
  fetch .. localhost../api/products/..
  catch( en cas d'erreur )
  */

fetch("http://localhost:3000/api/products/" + id)
  // En cas de succés :
  .then((response) => response.json())

  // En cas d'erreur
  .catch((error) => {
    alert("Aie ");
  })

  .then(function (data) {
    let productOfAPI = data;

    // Image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = productOfAPI.imageUrl;
    productImg.alt = productOfAPI.altTxt;

    // Titre
    let productTitle = document.querySelector("#title");
    productTitle.innerHTML = productOfAPI.name;

    // Prix
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = productOfAPI.price;

    // Description
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = productOfAPI.description;

    // COULEURS
    // Je crée une boucle
    for (let color of productOfAPI.colors) {
      let colorsProducts = document.createElement("option");
      document.querySelector("#colors").appendChild(colorsProducts);

      colorsProducts.value = color;
      colorsProducts.innerHTML = color;
    }
  });

const colors = document.querySelector("#colors");
const btnAddToCart = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");
btnAddToCart.addEventListener("click", () => {
  if (colors.value == "" || quantity.value <= 0) {
    alert("Vous devez choisir une couleur et une quantité");
  } else {
    const contentCart = {
      id: id,
      color: colors.value,
      quantity: Number(quantity.value),
    };
    addBasket(contentCart);
  }
});

// addBasket en lui passant le produit qui est sur la page
