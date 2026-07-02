const productContainer = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

fetch(`http://localhost:5000/api/products/${productId}`)
.then(response => response.json())
.then(product => {

productContainer.innerHTML = `

<div class="detail-card">

    <div class="detail-image">

        <img src="images/${product.image}" alt="${product.name}">

    </div>

    <div class="detail-info">

        <span class="category-badge">
            ${product.category_name}
        </span>

        <h1>${product.name}</h1>

        <p>
            ${product.description}
        </p>

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
    console.log(error);
});

function addToCart(productId){

fetch("http://localhost:5000/api/cart/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

user_id:1,
product_id:productId,
quantity:1

})

})

.then(response => response.json())
.then(data => {

alert("Product Added To Cart");

})
.catch(error => {

console.log(error);

});

}