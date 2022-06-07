/*
// CE QUE JE SOUHAITE FAIRE :
// COMMENT ?

//let getStorage = localStorage.getItem("setStorage"); // OK j'obtiens bien ma chaine de caractères
let parseStorage = JSON.parse(getStorage); // OK j'obtiens bien mes données sous forme d'objets !
let quantityProduct = parseStorage.quantity; // OK je récupère mes quantités sélectionnés

------------------------------------------------------------------------------------------------------- */

// Fonction pour sauvegarder le contenu du panier
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Fonction pour obtenir le contenu du panier
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// Fonction pour ajouter des produits au panier
function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  // Find permet d'aller chercher un élément sur un tableau par rapport à une condition
  if (foundProduct != undefined) {
    foundProduct.quantity += product.quantity;
    if (foundProduct.quantity >= 100) foundProduct.quantity = 100;
  } else {
    basket.push(product);
  }
  saveBasket(basket);
}

// Fonction pour supprimer un produit du panier
function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

// Fonction pour changer la quantité du panier (produit et quantité)
function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
}

// Fonction pour obtenir le nombre de produits du panier
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

// Fonction pour obtenir le prix total des produits
function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  return total;
}
