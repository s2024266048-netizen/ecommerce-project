const cartContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("cartTotal");

let total = 0;

fetch("https://ecommerce-project-production-e015.up.railway.app/api/cart/1")
.then(response => response.json())
.then(items => {

    cartContainer.innerHTML = "";
    total = 0;

    if(items.length === 0){

        cartContainer.innerHTML = `
            <h3>Your cart is empty 🛒</h3>
        `;

        totalPriceElement.innerText = "Total: Rs 0";
        return;
    }

    items.forEach(item => {

        const itemTotal =
        Number(item.price) * Number(item.quantity);

        total += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <div class="cart-image">
                <img src="Images/${item.image}" alt="${item.name}">
            </div>

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>Price: Rs ${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Subtotal: Rs ${itemTotal}</p>

                <button onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        </div>

        `;
    });

    totalPriceElement.innerText =
    `Total: Rs ${total}`;

})
.catch(error => {

    console.log("Cart Error:", error);

});

function removeItem(cartId){

    fetch(`https://ecommerce-project-production-e015.up.railway.app/api/cart/${cartId}`, {

        method: "DELETE"

    })
    .then(response => response.json())
    .then(data => {

        if(data.success){
            alert("Item Removed Successfully");
            location.reload();
        }

    })
    .catch(err => {

        console.log(err);
        alert(" Failed To Remove Item");

    });

}