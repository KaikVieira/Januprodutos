document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById("cartModal");
    const cartBtn = document.querySelector(".cart-btn");
    const closeBtn = document.querySelector(".close-button");
    const cartItemsContainer = document.getElementById("cartItems");
    const selectAllCheckbox = document.getElementById("selectAll");
    const selectedTotalDisplay = document.getElementById("selectedTotal");
    const removeAllBtn = document.getElementById("removeAllBtn");

    // Carrega o carrinho do localStorage ou cria vazio
    window.cart = JSON.parse(localStorage.getItem("cart")) || {};

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }



        for (const id in cart) {
            const item = cart[id];
            const totalItemPrice = (item.price * item.quantity).toFixed(2);

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div class="cart-quantity-badge" id="badge-${id}">${item.quantity}</div>
                <input type="checkbox" class="item-checkbox" data-id="${id}" checked />
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}" />
                </div>
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>Preço: R$ ${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="decrementItem('${id}')">-</button>
                        <span class="quantity-display" id="quantity-${id}">${item.quantity}</span>
                        <button onclick="incrementItem('${id}')">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem('${id}')">Remover</button>
                </div>
            `;

            cartItemsContainer.appendChild(div);
        }

        addCheckboxListeners();
        updateCartCount();
        updateSelectedTotal();
        saveCart();
    }

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        if (!cartCount) return;

        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function addCheckboxListeners() {
        const checkboxes = document.querySelectorAll('.item-checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSelectedTotal();
                checkRemoveAllVisibility();
            });
        });

        if (selectAllCheckbox) {
            selectAllCheckbox.onclick = () => {
                const checked = selectAllCheckbox.checked;
                checkboxes.forEach(cb => cb.checked = checked);
                updateSelectedTotal();
                checkRemoveAllVisibility();
            };
        }
    }

    function updateSelectedTotal() {
        let total = 0;
        const checkboxes = document.querySelectorAll('.item-checkbox');

        checkboxes.forEach(cb => {
            if (cb.checked) {
                const id = cb.getAttribute('data-id');
                if (cart[id]) {
                    total += cart[id].price * cart[id].quantity;
                }
            }
        });

        if (selectedTotalDisplay) {
            selectedTotalDisplay.textContent = `Total Selecionado: R$ ${total.toFixed(2)}`;
        }

        if (selectAllCheckbox) {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
        }
    }

    function checkRemoveAllVisibility() {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const anyChecked = Array.from(checkboxes).some(cb => cb.checked);

        if (removeAllBtn) {
            removeAllBtn.style.display = anyChecked ? "inline-block" : "none";
        }
    }

    window.incrementItem = function (id) {
        if (cart[id]) {
            cart[id].quantity++;

            const quantitySpan = document.getElementById(`quantity-${id}`);
            if (quantitySpan) quantitySpan.textContent = cart[id].quantity;

            const badge = document.getElementById(`badge-${id}`);
            if (badge) badge.textContent = cart[id].quantity;

            updateCartCount();
            updateSelectedTotal();
            saveCart();
        }
    }

    window.decrementItem = function (id) {
        if (cart[id]) {
            cart[id].quantity--;

            if (cart[id].quantity <= 0) {
                delete cart[id];
                updateCartDisplay();
            } else {
                const quantitySpan = document.getElementById(`quantity-${id}`);
                if (quantitySpan) quantitySpan.textContent = cart[id].quantity;

                const badge = document.getElementById(`badge-${id}`);
                if (badge) badge.textContent = cart[id].quantity;

                updateCartCount();
                updateSelectedTotal();
                saveCart();
            }
        }
    }

    window.removeItem = function (id) {
        if (cart[id]) {
            delete cart[id];
            updateCartDisplay();
        }
    }



