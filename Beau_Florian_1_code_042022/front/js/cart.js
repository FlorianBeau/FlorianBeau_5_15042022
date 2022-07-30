let panier = getBasket();

let articleDom2 = "";

// Je boucle sur le localStorage pour récupérer chaque produit (Id, couleur et quantité) et je met à
// l'intérieur un fetch pour pouvoir récupérer le prix,l'image et le nom de chaque produit.

/**
 * Je boucle sur la variable panier (localStorage) pour pouvoir récupérer chaque produit et vais chercher
 * les informations du de chaque id produit dans l'API grâce à la méthode fetch
 */
let getProductInfo = async () => {
  for (let productsOfStorage of panier) {
    let response = await fetch(
      "http://localhost:3000/api/products/" + productsOfStorage.id
    );
    let productOfAPI = await response.json();
    Object.assign(productsOfStorage, productOfAPI); // Permet de cumuler les infos contenues dans le
    // panier (id, couleur, quantité) et celles de l'API (prix, image...) de chaque produit.
  }
};

/**
 * TOTAL (quantités et prix) Calcul
 */
let updateCart = () => {
  document.querySelector("#totalQuantity").innerHTML = getNumberProduct(); // Nombre d'articles
  document.querySelector("#totalPrice").innerHTML = getTotalPrice(); // Prix total
};

/**
 * Permet de manipuler le DOM sur la page produit en créer les informations pour chaque produit à l'aide
 * des informations récupérées.
 */
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
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min=1 max=100 value=${productsOfStorage.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }
  document.querySelector("#cart__items").innerHTML = articleDom2;

  /**
   * SUPPRESSION DE PRODUIT
   */
  let btnDelete = document.querySelectorAll(".deleteItem");
  for (let productsOfCart of btnDelete) {
    productsOfCart.addEventListener("click", (e) => {
      let itemEnfant = e.target.closest(".cart__item");
      let produit = {
        // Produit qu'on veut supprimer
        id: itemEnfant.getAttribute("data-id"),
        color: itemEnfant.getAttribute("data-color"),
      };
      removeFromBasket(produit); // Appel la fonction permettant de pouvoir vider le panier
      itemEnfant.remove();
      panier = panier.filter(
        (p) => p.id != produit.id || p.color != produit.color
      );
      updateCart(); // Appel la fonction permettant de mettre à jour le panier
    });
  }

  // Je sélectionne toutes les classes: .itemQuantity
  let btnQuantity = document.querySelectorAll(".itemQuantity");

  // MODIFICATION DES QUANTITES
  // Prend la liste des input quantity du DOM et parcours chaque input
  for (let inputQuantity of btnQuantity) {
    inputQuantity.addEventListener("change", (e) => {
      let htmlArticle = e.target.closest(".cart__item");

      let produit = {
        id: htmlArticle.dataset.id,
        color: htmlArticle.dataset.color,
      };
      changeQuantity(produit, parseInt(e.target.value));
      let foundProduct = panier.find(
        (p) => p.id == produit.id && p.color == produit.color
      );
      foundProduct.quantity = parseInt(e.target.value);
      updateCart();
    });
  }
  updateCart(); // Appel la fonction permettant de mettre à jour le panier
};

getProductInfo().then(() => showProduct());

const items = JSON.parse(localStorage.getItem("items"));

/**
 *
 * @returns Fonction permettant le calcul du prix total
 */
function getTotalPrice() {
  let total = 0;
  for (let product of panier) {
    total += product.quantity * product.price;
  }
  return total;
}

// ------------------------------------------------------------------------------------------------- //
// FORMULAIRE
/**
 * Je crée un évenement au click de la souris qui va contrôler si les expressions régulières (Régex)
 * exigées ont bien éts respectées, alors le bouton "commander" permettra de pouvoir envoyer
 */
document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault(); // la méthode preventDefault annule l'envoi du formulaire par défaut
  let fields = document.querySelectorAll(
    "#firstName, #lastName, #address, #city, #email"
  );
  let valid = true;
  for (let field of fields) {
    valid &= check(field);
    if (!valid) {
      break;
    }
  }

  if (valid) {
    console.log("Le formulaire est bien remplis");
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    let products = panier.map((produit) => produit.id);

    // Variable contenant un objet contact et un objet product
    let form = {
      contact,
      products,
    };

    console.log(form);

    // Fetch permettant d'envoyer (POST) la commande au serveur
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())

      .then((data) => {
        window.location.assign(`./confirmation.html?orderId=${data.orderId}`);
      });
  }
});

/**
 * Fonction permettant de retourner le résultat si les conditions sont respectées
 * @param {*} input
 * @returns
 */
function check(input) {
  return input.reportValidity();
}
