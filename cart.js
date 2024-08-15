document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="remove-item" data-product="${item.product}" data-image="${item.image}">Remove</button></td>
                <td><img src="${item.image}" alt="${item.product}" class="cart-item-image"></td>
                <td>${item.product}</td>
                <td>₹${item.price}</td>
                <td><input type="number" value="${item.quantity}" class="quantity" data-product="${item.product}" data-image="${item.image}" min="1"></td>
                <td>₹${item.price * item.quantity}</td>
            `;
            cartItemsContainer.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        cartSubtotal.textContent = `₹${subtotal}`;
        cartTotal.textContent = `₹${subtotal}`;
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const product = event.target.getAttribute('data-product');
            const image = event.target.getAttribute('data-image');
            const index = cart.findIndex(item => item.product === product && item.image === image);
            if (index > -1) {
                cart.splice(index, 1);
                saveCart();
                updateCart();
            }
        }
    });

    document.addEventListener('input', event => {
        if (event.target.classList.contains('quantity')) {
            const product = event.target.getAttribute('data-product');
            const image = event.target.getAttribute('data-image');
            const quantity = parseInt(event.target.value, 10);
            const item = cart.find(item => item.product === product && item.image === image);
            if (item) {
                item.quantity = quantity;
                saveCart();
                updateCart();
            }
        }
    });

    updateCart();
});
