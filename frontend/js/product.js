const productContainer = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://ecommerce-project-production-e015.up.railway.app/products/${productId}`)
.then(response => response.json())
.then(product => {

    console.log(product);

    productContainer.innerHTML = `
    <div class="detail-card">

        <div class="detail-image">
            <img src="Images/${product.image}" alt="${product.name}">
        </div>

        <div class="detail-info">

            <span class="category-badge">
                Category ${product.category_id}
            </span>

            <h1>${product.name}</h1>

            <p>${product.description}</p>

            <div class="detail-price">
                Rs ${product.price}
            </div>

        </div>

    </div>
    `;
})
.catch(error => {
    console.log("Product Error:", error);

    productContainer.innerHTML =
    "<h2>Product failed to load</h2>";
});