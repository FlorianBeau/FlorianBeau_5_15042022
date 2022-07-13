/* 
  STEP 1 :
  Récupérer l'id de mon produit qui se trouve dans l'url:
  http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926
  */

// Utilisation de UrlSearchParams:
let str = document.URL;
let url = new URL(str);
let id = url.searchParams.get("id");

// Variables pour les promesses "then"
let coloris = "";
let description = "";
let titre = "";

/* ----------------------------------------------------------------------------------------------------------------------------------*/
/*STEP 2 :
  Récupérer les informations de mon produit grace à l'id : 107fb5b75607497b96722bda5b504926
  fetch .. localhost../api/products/..
  catch( en cas d'erreur )
  */

const colors = document.querySelector("#colors");
const btnAddToCart = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");

fetch("http://localhost:3000/api/products/" + id)
  // En cas de succés :
  .then((response) => response.json())

  .then((data) => {
    let productOfAPI = data;

    // Couleur
    for (let color of productOfAPI.colors) {
      coloris += `<option value="${color}">${color}</option>`;
      document.querySelector("#colors").innerHTML = coloris;
    }

    // Description
    description += `${productOfAPI.description}`;
    document.querySelector("#description").innerHTML = description;

    // Titre
    titre += `${productOfAPI.name}`;
    document.querySelector("#title").innerHTML = titre;

    // Image
    let image = "";
    image = `<img src="${productOfAPI.imageUrl}" alt="${productOfAPI.altTxt}">`;
    document.querySelector(".item__img").innerHTML = image;

    // Prix
    let prix = "";
    prix = `<span id="price">${productOfAPI.price}</span>`;
    document.querySelector("#price").innerHTML = prix;

    // En cas d'erreur
  })
  .catch((error) => {
    alert("Aie ");
  });

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
    console.log(contentCart);
  }
});

// addBasket en lui passant le produit qui est sur la page
