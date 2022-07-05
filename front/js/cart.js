let panier = getBasket(); // Variable qui appelle une fonction contenant le localStorage
for (let product of panier) {
  `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
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
}

fetch("http://localhost:3000/api/products/")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.log(err));

// FAIRE UN FETCH ET DES FONCTION ENSUITE ? en s'aidant de la page "script.js ?"

/* ------------------------------------- TESTS CI DESSOUS --------------------------------------------- */

// Je crée une variable contenant la balise <cart__items>
// let cartItems = document.querySelector("#cart__items");

// Je crée la balise "article" dans la balise <cart__items>
// let cartItemsArticle = document.createElement("article");
// cartItems.appendChild(cartItemsArticle);

// Permet d'ajouter la class="cart__item"
//cartItemsArticle.classList.add("cart__item");

// Permet d'ajouter data-id="{product-ID}"
// cartItemsArticle.dataset.id("product._id");

// let localStorageId = contentBasket;
// cartItemsArticle.innerHTML = contentCart.id;

//console.log(cartItems);
//console.log(localStorageId);

//const basketTest = JSON.parse(localStorage.getItem("basketTest"));
//console.log(basketTest);
