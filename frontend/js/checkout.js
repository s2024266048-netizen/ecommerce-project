const checkoutItems = document.getElementById("checkoutItems");
const totalAmount = document.getElementById("totalAmount");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const user_id = 1;

let total = 0;

// LOAD CART ITEMS

fetch(`https://ecommerce-project-production-e015.up.railway.app/api/cart/${user_id}`)
.then(res => res.json())
.then(data => {

    checkoutItems.innerHTML = "";
    total = 0;

    if(data.length === 0){

        checkoutItems.innerHTML = `
            <h3>Your cart is empty 🛒</h3>
        `;

        totalAmount.innerText = "Total: Rs 0";
        return;
    }

    data.forEach(item => {

        const itemTotal =
        Number(item.price) * Number(item.quantity);

        total += itemTotal;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <h3>${item.name}</h3>

                <p>Price: Rs ${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Subtotal: Rs ${itemTotal}</p>

            </div>

        `;

    });

    totalAmount.innerText = `Total: Rs ${total}`;

})
.catch(err => {

    console.log("Checkout Error:", err);

});


// PLACE ORDER

placeOrderBtn.addEventListener("click", () => {

    if(total === 0){

        alert("Cart is empty!");
        return;
    }

    const customer_name =
    document.getElementById("customerName").value.trim();

    const phone =
    document.getElementById("customerPhone").value.trim();

    const city =
    document.getElementById("customerCity").value.trim();

    const address =
    document.getElementById("customerAddress").value.trim();

    if(
        !customer_name ||
        !phone ||
        !city ||
        !address
    ){

        alert("Please fill all fields");
        return;
    }

    fetch("https://ecommerce-project-production-e015.up.railway.app/api/orders/place", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_id,
            total_amount: total,

            customer_name,
            phone,
            city,
            address

        })

    })
    .then(res => res.json())
    .then(data => {

        if(data.success){

            alert(
                `🎉 Order Placed Successfully!\n\nOrder ID: ${data.orderId}`
            );

            window.location.href =
            `order-success.html?id=${data.orderId}&name=${encodeURIComponent(customer_name)}&total=${total}`;

        }else{

            alert("Order Failed");

        }

    })
    .catch(err => {

        console.log(err);

        alert("Something went wrong");

    });

});