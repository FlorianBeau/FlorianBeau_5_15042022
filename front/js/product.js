/* 
  STEP 1 :
  Récupérer l'id de mon produit qui se trouve dans l'url:
  http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926
  */

// Utilisation de UrlSearchParams:
let str = document.URL;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

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
    console.log(productOfAPI);

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

    /*
    1) Je crée une variable "productColors"
    2) J'identifie la balise "colors"
    3) Je crée une balise enfant "option"
    4) J'injecte le code Js provenant de l'API <colors> dans la balise <option>
    

    // Couleur

    for (let color in colors) {
      console.log(productOfAPI[color]);

      let productColors = document.querySelector("option");
      document.createElement("option").appendChild(productColors);

      for (let color in colors);
      console.log(productOfAPI[color]);
    }
    */

    //productColors.innerHTML = valuesProducts;
    ////console.log(productColors);

    //document.createElement("div").appendChild(productColors);
    //console.log(productColors);

    //document.createElement("option").productOfAPI;

    //for (let color in colors);
    //console.log(productOfAPI[productColors]);

    //document.createElement("#colors").appendChild(productColors);
  });

/* ----------------------------------------------------------------------------------------------------------------------------------
  // STEP 3 :
  // Afficher les information de la STEP 2 dans le DOM
/*
1) Sélectionner ma div grâce à sa classe
2) Je lui rajoute une balise <img> avec l'attribut "src"
3) Je lui injecte le code JS dans l'html.
*/
