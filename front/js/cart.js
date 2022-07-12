let panier = getBasket();
// Boucle qui va créer du html dans le DOM avec les renseignements du localStorage

let articleDom2 = "";

fetch("http://localhost:3000/api/products")
  // Variable qui appelle une fonction contenant le localStorage

  // En cas de succés :
  .then((response) => response.json()) // Réponse http

  .then((articles) => {
    // Body de la réponse
    console.log(articles);

    for (let product of panier) {
      product += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="${product.quantity}">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      console.log(product);

      for (let test of tests) {
        console.log(test);

        articleDom2 += `<a href="./product.html?id=${article._id}">
            <article>
              <img src="${article.imageUrl}" alt="${article.altTxt}">
              <h3 class="productName">${article.name}</h3>
              <p class="productDescription">${article.description}</p>
            </article>
          </a>`;
      }
    }

    articleProduct = product + articleDom2;

    document.querySelector("#cart__items").innerHTML = articleProduct;
  })
  // En cas d'erreur
  .catch((error) => {
    alert("Aie ");
  });

/* FAIRE UN FETCH SUR CHAQUE PRODUIT ET DES FONCTION ENSUITE ? en s'aidant de la page "script.js ?"

ORALEMENT
1) Je veux récupérer le panier dans le localStorage
2) Je veux l'afficher sur ma page "panier"

AU NIVEAU DU CODE
1) 

*/
