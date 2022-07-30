fetch("http://localhost:3000/api/products")
  // En cas de succés :
  .then((response) => response.json()) // Réponse http

  .then((articles) => {
    // Body de la réponse
    let articleDom = "";

    for (let article of articles) {
      articleDom += `<a href="./product.html?id=${article._id}">
            <article>
              <img src="${article.imageUrl}" alt="${article.altTxt}">
              <h3 class="productName">${article.name}</h3>
              <p class="productDescription">${article.description}</p>
            </article>
          </a>`;
    }

    document.querySelector("#items").innerHTML = articleDom;
  })
  // En cas d'erreur
  .catch((error) => {
    alert("Aie ");
  });
