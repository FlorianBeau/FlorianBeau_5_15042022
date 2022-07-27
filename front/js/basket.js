// Faire sur toutes les fonctions JS de ce fichier

/**
 * Fonction pour sauvegarder le contenu du panier
 * @param {Array} basket le panier à sauvegarder
 */
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * Fonction pour obtenir le contenu du panier
 * @returns {Array} le panier s'il existe sinon, un tableau vide
 */

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
  // Filter indique tous les autres que celui que l'on souhaite supprimer
  // p = produit du panier
  // product = produit à supprimer
  // On crée un doublon du panier, on filtre pour garder tous les autres produits et on sauvegarde à la
  // place de l'ancien
  basket = basket.filter((p) => p.id != product.id || p.color != product.color);
  saveBasket(basket);
}

// Fonction pour changer la quantité du panier (produit et quantité)
function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity = quantity;
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

function clearBasket() {
  localStorage.removeItem("basket");
}
