const productContainer = document.getElementById("products");

fetch("https://ecommerce-project-production-e015.up.railway.app/api/products")
.then(response => response.json())
.then(products => {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

            <img src="Images/${product.image}" alt="${product.name}">

            <div class="card-content">

                <span class="category-badge">
                    ${product.category_name}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    Rs ${product.price}
                </div>

                <a href="products.html?id=${product.id}">
                    <button>
                        View Product
                    </button>
                </a>

            </div>

        </div>

        `;

    });

})
.catch(error => {

    console.log("Products Error:", error);

    productContainer.innerHTML = `
        <h2>Products failed to load </h2>
    `;

});