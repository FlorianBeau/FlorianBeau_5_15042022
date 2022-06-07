// Je crée une variable contenant la balise <cart__items>
let cartItems = document.querySelector("#cart__items");

// Je crée la balise "article" dans la balise <cart__items>
let cartItemsArticle = document.createElement("article");
cartItems.appendChild(cartItemsArticle);

// Permet d'ajouter la class="cart__item"
cartItemsArticle.classList.add("cart__item");
// cartItemsArticle.innerHTML = `${article._id}`;

console.log(cartItems);
