document.addEventListener('DOMContentLoaded', () => {
    function addCartToHTML() {
        let listCartHTML = document.querySelector('.returncart .list');
        let totalQuantityHTML = document.querySelector('.return .totalQuantity');
        let totalPriceHTML = document.querySelector('.return .totalPrice');

        let listCart = JSON.parse(localStorage.getItem('cart')) || [];
        let products = JSON.parse(localStorage.getItem('products')) || []; 

        let totalQuantity = 0;
        let totalPrice = 0;

        if (listCart.length > 0) {
            listCart.forEach(cartItem => {
                if (cartItem) {
                    let product = products.find(p => p.id == cartItem.product_id);
                    if (product) {
                        let newP = document.createElement('div');
                        newP.classList.add('item');
                        newP.innerHTML = `
                            <img src="${product.image}" alt="">
                            <div class="info">
                                <div class="name">${product.name}</div>
                                <div class="price">${product.price.toLocaleString('vi-VN')} VND</div>
                            </div>
                            <div class="quantity">${cartItem.quantity}</div>
                            <div class="totalprice">${(product.price * cartItem.quantity).toLocaleString('vi-VN')} VND</div>
                        `;
                        listCartHTML.appendChild(newP);
                        totalQuantity += cartItem.quantity;
                        totalPrice += product.price * cartItem.quantity;
                    }
                }
            });
        }

        totalQuantityHTML.innerText = totalQuantity;
        totalPriceHTML.innerText = totalPrice.toLocaleString('vi-VN') + ' VND';
    }

    addCartToHTML();
});
document.querySelector('.buttonCheckout').addEventListener('click', function() {
    let name=document.getElementById('name').value;
    let phone=document.getElementById('name').value;
    let address=document.getElementById('name').value;
    if(!name||!phone||!address){
        document.querySelector('.khong-thanh').style.display='block';
    }
    document.querySelector('.thanh-toan').style.display = 'block';
});

