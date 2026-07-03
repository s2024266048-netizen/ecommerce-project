fetch(`https://ecommerce-project-production-e015.up.railway.app/products/${productId}`)
.then(res => res.json())
.then(product => {

    console.log("PRODUCT:", product);

    if(!product || !product.id){
        productContainer.innerHTML = "<h2>Product is not loading</h2>";
        return;
    }

    productContainer.innerHTML = `
    <div class="detail-card">

        <div class="detail-image">
            <img src="Images/${product.image}" alt="${product.name}">
        </div>

        <div class="detail-info">

            <span class="category-badge">
                ${product.category_name || ""}
            </span>

            <h1>${product.name}</h1>

            <p>${product.description}</p>

            <div class="price">
                Rs ${product.price}
            </div>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

    </div>
    `;
})
.catch(err => {
    console.log("ERROR:", err);
    productContainer.innerHTML = "<h2>Server Error</h2>";
});