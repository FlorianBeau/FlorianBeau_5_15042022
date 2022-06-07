// FETCH  = Promesse

fetch("http://localhost:3000/api/products")
  // En cas de succés :
  .then((response) => response.json())

  // En cas d'erreur
  .catch((error) => {
    alert("Aie ");
  })

  .then(function (resultatAPI) {
    let articles = resultatAPI;
    console.log(articles);

    for (let article of articles) {
      console.log(article);
      /*
        <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> 
        */

      // <a href=""></a>
      let articleDom = document.createElement("a");
      document.querySelector(".items").appendChild(articleDom);

      //  <a href="product.html?id="></a>
      articleDom.href = `product.html?id=${article._id}`;

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

      // Ajouter une classe à mon <p class="productDescription"> </p>
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

      /*
1) Sélectionner la balise <img>
2) Rajouter la class "TextAlt"
3) Intégrer dynamiquement les textes dans ces balises
*/
    }
  });

// CRUD
// CREATE ( POST )
// READ ( GET )
// UPDATE ( PUT /  PATH )
// DELETE ( DELETE )

/*
        // STEP 1 : 
    Récupérer tous les produits de l'api 
        // STEP 2 : 
    Afficher les produits dans le DOM 
  */
