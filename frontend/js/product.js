const productContainer =
document.getElementById("products") ||
document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// =======================
// PRODUCT DETAIL PAGE
// =======================
if (productId) {

fetch(`https://ecommerce-project-production-e015.up.railway.app/products/${productId}`)
.then(response => response.json())
.then(product => {

productContainer.innerHTML = `

<div class="detail-card">

    <div class="detail-image">
        <img src="Images/${product.image}" alt="${product.name}">
    </div>

    <div class="detail-info">

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

console.log("Product Detail Error:", error);

productContainer.innerHTML =
"<h2>Failed to load product</h2>";

});

}

// =======================
// PRODUCTS LIST PAGE
// =======================
else {

fetch("https://ecommerce-project-production-e015.up.railway.app/products")
.then(response => response.json())
.then(products => {

productContainer.innerHTML = "";

products.forEach(product => {

productContainer.innerHTML += `

<div class="card">

    <img src="Images/${product.image}" alt="${product.name}">

    <div class="card-content">

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="price">
            Rs ${product.price}
        </div>

        <a href="products.html?id=${product.id}">
            <button>View Product</button>
        </a>

    </div>

</div>

`;

});

})
.catch(error => {

console.log("Products Error:", error);

productContainer.innerHTML =
"<h2>Products failed to load</h2>";

});

}

// =======================
// ADD TO CART
// =======================
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

if(data.success){

alert("Product Added To Cart");

}else{

alert("Failed To Add Product");

}

})

.catch(error => {

console.log(error);
alert("Something went wrong");

});

}
