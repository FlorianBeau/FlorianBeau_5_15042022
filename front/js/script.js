// FETCH  = Promesse

fetch("http://localhost:3000/api/products")
  // En cas de succés :
  .then((response) => response.json())

  // En cas d'erreur
  .catch((error) => {
    alert("Aie ");
  })

  .then((articles) => {
    console.log(articles);

    let articleDom = "";

    for (let article of articles) {
      console.log(article);

      articleDom += `<a href="./product.html?id=${article._id}">
            <article>
              <img src="${article.imageUrl}" alt="${article.altTxt}">
              <h3 class="productName">${article.name}</h3>
              <p class="productDescription">${article.description}</p>
            </article>
          </a>`;
    }

    document.querySelector(".items").innerHTML = articleDom;

    /*
    // <a href=""></a>
    let articleDom = document.createElement("a");
    document.querySelector(".items").appendChild(articleDom);

    //  <a href="product.html?id="></a>
    articleDom.href = `product.html?id=${article._id}`;
    articleDom.setAttribute("href", `product.html?id=${article._id}`);

    let newArticle = document.createElement("article");
    articleDom.appendChild(newArticle);

    // <h3> </h3>
    let articleTitle = document.createElement("h3");
    newArticle.appendChild(articleTitle);

    // Permet d'ajouter une classe sur un élement
    articleTitle.classList.add("productName");
    articleTitle.innerHTML = article.name;

    //  <p>is enim malesuada risus sapien gravida nulla nisl arcu. Dis</p>;
    // créer une balise <p>
    let articleDesc = document.createElement("p");

    // Ajoute une classe à mon <p class="productDescription"> </p>
    articleDesc.classList.add("productDescription");

    // Insérer dynamiquement la valeur dans mon <p>
    articleDesc.innerHTML = article.description;
    newArticle.appendChild(articleDesc);

    let pictureProduct = document.createElement("img");
    pictureProduct.src = article.imageUrl;
    newArticle.appendChild(pictureProduct);

    let tagAlt = document.getElementsByName(pictureProduct);
    pictureProduct.alt = article.altTxt;
    newArticle.appendChild(pictureProduct);
  */
  });
