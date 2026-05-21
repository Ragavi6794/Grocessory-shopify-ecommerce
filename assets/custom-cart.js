document.addEventListener("DOMContentLoaded", function () {
    fetchCartData(); // Load cart data on page load

    function fetchCartData() {
        fetch("/cart.js")
            .then(response => response.json())
            .then(cart => {
                document.querySelectorAll(".product-card__wrapper").forEach((card) => {
                    const productId = card.dataset.productId;
                    const addToCartBtn = card.querySelector(".js-product-form-submit-btn.btn-cart");
                    const quantitySelector = card.querySelector(".quantity-selector");
                    const quantityDisplay = card.querySelector(".quantity");

                    if (!addToCartBtn || !quantitySelector || !quantityDisplay) return;

                    let cartItem = cart.items.find(item => item.id == productId);

                    if (cartItem) {
                        quantityDisplay.textContent = cartItem.quantity;
                        quantitySelector.classList.remove("hidden");
                        addToCartBtn.classList.add("hidden");
                    } else {
                        quantitySelector.classList.add("hidden");
                        addToCartBtn.classList.remove("hidden");
                    }
                });
            });

            $("#mobileHeaderCartStatus").load(window.location.href + " #mobileHeaderCartStatus");
    }

    document.querySelectorAll(".product-card__wrapper").forEach((card) => {
        const productId = card.dataset.productId;
        const addToCartBtn = card.querySelector(".js-product-form-submit-btn.btn-cart");
        const quantitySelector = card.querySelector(".quantity-selector");
        const quantityDisplay = card.querySelector(".quantity");
        const plusBtn = card.querySelector(".plus");
        const minusBtn = card.querySelector(".minus");

        if (!addToCartBtn || !quantitySelector || !quantityDisplay || !plusBtn || !minusBtn) return;

     addToCartBtn.addEventListener("click", function () {
    addToCartBtn.classList.add("hidden");
    quantitySelector.classList.remove("hidden");
    quantityDisplay.textContent = 1;
    updateCart(productId, 1, () => {
        fetchCartData(); 
    });
});


        plusBtn.addEventListener("click", function () {
            let quantity = parseInt(quantityDisplay.textContent, 10) + 1;
            updateCart(productId, quantity, () => {
                quantityDisplay.textContent = quantity;
                fetchCartData(); // Refresh all product cards
              
            });
        });

        minusBtn.addEventListener("click", function () {
            let quantity = parseInt(quantityDisplay.textContent, 10) - 1;
            updateCart(productId, quantity, () => {
                if (quantity > 0) {
                    quantityDisplay.textContent = quantity;
                } else {
                    quantitySelector.classList.add("hidden");
                    addToCartBtn.classList.remove("hidden");
                }
                fetchCartData(); // Refresh all product cards
                
            });
        });
    });

    function updateCart(variantId, quantity, callback) {
        fetch("/cart/change.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: variantId, quantity: quantity }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Cart updated:", data);
            if (callback) callback();
            // fetchCartData(); // Refresh all product cards
            openCartDrawer();
        })
        .catch(error => console.error("Error updating cart:", error));
    }

    function openCartDrawer() {
        console.log('yes called');
        $("#cartDrawer").load(window.location.href + " #cartDrawer");
        $("#headerCartStatus").load(window.location.href + " #headerCartStatus");
        
        // Update mobile cart count directly instead of full reload
        fetch("/cart.js")
            .then(response => response.json())
            .then(cartData => {
                const count = cartData.item_count;
                
                // Update mobile cart count number
                const mobileCartCount = document.querySelector('#mobileHeaderCartStatus .cart-count-number');
                if (mobileCartCount) {
                    mobileCartCount.textContent = count;
                }
                
                // Update mobile cart count visibility
                const mobileCartCountContainer = document.querySelector('#mobileHeaderCartStatus .header__cart-count');
                if (count === 0) {
                    mobileCartCountContainer?.classList.add('opacity-0', 'hidden-xs');
                } else {
                    mobileCartCountContainer?.classList.remove('opacity-0', 'hidden-xs');
                }
                
                // Update mobile cart count class for styling
                if (mobileCartCountContainer) {
                    mobileCartCountContainer.className = mobileCartCountContainer.className.replace(/header-cart-count-\d+/, `header-cart-count-${count}`);
                }
            })
            .catch(error => console.error("Error updating mobile cart:", error));
        
        // document.querySelector('#shtCartDrawer').setAttribute('open', true);
    }
});