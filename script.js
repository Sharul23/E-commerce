const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

//cart logic

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const existingProductIndex = cart.findIndex(item => item.product === product && item.image === image);

            if (existingProductIndex > -1) {
                // Update quantity if product already exists in the cart
                cart[existingProductIndex].quantity += 1;
            } else {
                // Add new product to the cart
                cart.push({ product, price, quantity: 1, image });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        });
    });
});



