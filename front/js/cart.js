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

    // Permet de cumuler les infos des produits récupérés
    Object.assign(productsOfStorage, productOfAPI);
  }
};

// TOTAL (quantités et prix)
let updateCart = () => {
  document.querySelector("#totalQuantity").innerHTML = getNumberProduct();
  document.querySelector("#totalPrice").innerHTML = getTotalPrice();
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

  // SUPPRESSION DE PRODUIT
  let btnDelete = document.querySelectorAll(".deleteItem");
  for (let productsOfCart of btnDelete) {
    productsOfCart.addEventListener("click", (e) => {
      let itemEnfant = e.target.closest(".cart__item");
      let produit = {
        // Produit qu'on veut supprimer
        id: itemEnfant.getAttribute("data-id"),
        color: itemEnfant.getAttribute("data-color"),
      };
      removeFromBasket(produit);
      itemEnfant.remove();
      panier = panier.filter(
        (p) => p.id != produit.id || p.color != produit.color
      );

      updateCart();
    });
  }

  let btnQuantity = document.querySelectorAll(".itemQuantity");
  // element.closest = passer article utiliser data id et data color

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

  updateCart();
};

getProductInfo().then(() => showProduct());

const items = JSON.parse(localStorage.getItem("items"));

function getTotalPrice() {
  let total = 0;
  for (let product of panier) {
    total += product.quantity * product.price;
  }
  return total;
}

// ------------------------------------------------------------------------------------------------- //

// FORMULAIRE
// 1) Récupérer et analyser les données saisies par l’utilisateur dans le formulaire
// 2) Constituer un objet contact (à partir des données du formulaire) et un tableau de produits.
//    - prendre id de chaque element du local et ajouter au tableau de produit final

// function createCartOrder(array) {
//   for (let product of panier) {
//     array.push(product.id);
//   }
// }

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
    // faire fonction envoi formulaire (fetch post)
    let contact = {
      firstName: document.querySelector("#firstName").value, // si tu change forùulaire fonctionne plus
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    let products = panier.map((produit) => produit.id);
    //createCartOrder(produits);

    let form = {
      contact,
      products,
    };

    console.log(form);

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

    // Faire fetch post avec en body (requête) form
  }
});

function check(input) {
  return input.reportValidity();
}
