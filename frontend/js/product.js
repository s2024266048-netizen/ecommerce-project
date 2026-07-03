const productContainer = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://ecommerce-project-production-e015.up.railway.app/products/${productId}`)
.then(response => response.json())
.then(product => {

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

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

    </div>

    `;

})
.catch(error => {

    console.log("Product Error:", error);

    productContainer.innerHTML = `
        <h2>Product failed to load 😢</h2>
    `;
});

function addToCart(productId){

    fetch("https://ecommerce-project-production-e015.up.railway.app/api/cart/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            user_id: 1,
            product_id: productId,
            quantity: 1
        })

    })
    .then(response => response.json())
    .then(data => {

        alert(data.message || "Product Added To Cart");

    })
    .catch(error => {

        console.log(error);
        alert("Something went wrong");

    });

}