// Je crée une variable contenant la balise <cart__items>
let cartItems = document.querySelector("#cart__items");

// Je crée la balise "article" dans la balise <cart__items>
let cartItemsArticle = document.createElement("article");
cartItems.appendChild(cartItemsArticle);

// Permet d'ajouter la class="cart__item"
cartItemsArticle.classList.add("cart__item");

// Permet d'ajouter data-id="{product-ID}"
cartItemsArticle.dataset.id("product-id");

//let localStorageId = contentBasket;
// cartItemsArticle.innerHTML = contentCart.id;

// console.log(cartItems);
//console.log(localStorageId);

//const basketTest = JSON.parse(localStorage.getItem("basketTest"));
//console.log(basketTest);
//console.log(cartItems);
