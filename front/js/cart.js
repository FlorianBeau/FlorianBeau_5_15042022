let panier = getBasket();

let articleDom2 = "";

// Je boucle sur le localStorage pour récupérer chaque produit (Id, couleur et quantité) et je met à
// l'intérieur un fetch pour pouvoir récupérer le prix,l'image et le nom de chaque produit.

let getProductInfo = async () => {
  for (let productsOfStorage of panier) {
    let response = await fetch(
      "http://localhost:3000/api/products/" + productsOfStorage.id
    );
    let productOfAPI = await response.json(); // Réponse = résultat obtenu avec la requete fetch puis la// transforme en objet ?

    Object.assign(productsOfStorage, productOfAPI); // Permet de cumuler les infos des produits
  }
};

let showProduct = () => {
  for (let productsOfStorage of panier) {
    articleDom2 += `<article class="cart__item" data-id="${productsOfStorage._id}" data-color="${productsOfStorage.color}">
                <div class="cart__item__img">
                  <img src="${productsOfStorage.imageUrl}" alt="${productsOfStorage.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productsOfStorage.name}</h2>
                    <p>${productsOfStorage.color}</p>
                    <p>${productsOfStorage.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productsOfStorage.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="${productsOfStorage._id}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }
  document.querySelector("#cart__items").innerHTML = articleDom2;
};

getProductInfo().then(() => showProduct());
