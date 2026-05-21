// Select the target div
const targetDiv = document.getElementById("swym-wishlist-render-container");

// Create a MutationObserver instance
const observer = new MutationObserver((mutationsList, observer) => {
    // console.log("Change detected in the div!");
    // Your custom JS code here
  setTimeout(function(){
    $("#cartDrawer").load(window.location.href + " #cartDrawer");
        $("#headerCartStatus").load(window.location.href + " #headerCartStatus");
        // Update mobile cart icon as well
        $("#mobileHeaderCartStatus").load(window.location.href + " #mobileHeaderCartStatus");
    }, 500);
});

// Observer configuration
const config = { childList: true, subtree: true, attributes: true, characterData: true };

// Start observing the target div
if (targetDiv) {
    observer.observe(targetDiv, config);
}


$(window).on('load', function(){
  setTimeout(function(){
let dataCityMain = $('input[name="shipping_address"]:checked').attr('data-province');

  // let ld_radio_label_content = $('.ld_radio_label_content').text();
  if (dataCityMain != ''){
    $('#ld_delivery_areas_div .ld_content_box_row').each(function(){
      let ld_radio_label_content = $(this).find('.ld_radio_label_content').text().trim();
      
      if(dataCityMain == ld_radio_label_content){
        $(this).find('.ld_input_radio').trigger('click');
        $(this).css('display', 'block').siblings().css('display', 'none');
        
      }
    });
    
  }
    }, 2000);
});



$(document).ready(function(){


    $(document).on('click', 'button[name="checkout"]', function (e) {
        // e.preventDefault();

        let selectedAddress = $("input[name='shipping_address']:checked");
        let selectedAddressProvince = $("input[name='shipping_address']:checked").attr('data-province');

        let cartNoteVal = $('#cartNoteDummy').val();
        let deliveryDateTime = $('#local_delivery').val();

          // Fallback: if deliveryDateTime is null/empty, use span values
        if (!deliveryDateTime || deliveryDateTime.trim() === '') {
            const dateValue = $('#date-view-ld').text().trim();
            const timeslotValue = $('#timeslot-view-ld').text().trim();
            
            if (dateValue && timeslotValue && 
                dateValue !== 'Not Selected' && timeslotValue !== 'Not Selected' &&
                dateValue !== 'No dates available' && timeslotValue !== 'No slots available') {
            
            // Format: "17/11/2025 between 7:00 AM and 11:00 AM"
            deliveryDateTime = `${dateValue} between ${timeslotValue}`;
            }
        }

        if (selectedAddress.length > 0 && selectedAddressProvince) {
            // Validate phone number
            let phoneNumber = selectedAddress.attr("data-phone");
            
            if (!phoneNumber || phoneNumber.trim() === '' || phoneNumber === 'null' || phoneNumber === 'undefined') {
                e.preventDefault();
                $('#checkoutButtonError').text('⚠️ Phone number is missing in your address. Please update your address with a valid phone number.');
                $('#checkoutButtonError').css({
                    'color': 'red',
                    'font-weight': '500',
                    'margin-top': '10px',
                    'display': 'block'
                });
                console.warn('Checkout blocked: Phone number is missing');
                
                // Scroll to error message
                $('html, body').animate({
                    scrollTop: $('#checkoutButtonError').offset().top - 100
                }, 500);
                
                return false;
            }
            
            let address = `
            Name: ${selectedAddress.attr("data-name")}
            Address: ${selectedAddress.attr("data-address1")}${selectedAddress.attr("data-address2") ? ', ' + selectedAddress.attr("data-address2") : ''}
            City: ${selectedAddress.attr("data-city")}
            Country: ${selectedAddress.attr("data-country")}
            Province: ${selectedAddress.attr("data-province")}
            Phone: ${phoneNumber}
            Email: ${selectedAddress.attr("data-email")}
            Timeslot: ${deliveryDateTime}
            `.replace(/^\s+/gm, '').trim();
            
            var cartNotemain = 'Cart Note: ' + cartNoteVal + '\n' + address;
            
            $('#cartNote').val(cartNotemain);
            // Populate the hidden attribute field with cartNotemain
            $('#noteDetails').val(cartNotemain);


            // Validate cartNotemain: must contain Province
            if (!cartNotemain || !cartNotemain.includes('Province:')) {
                e.preventDefault();
                $('#checkoutButtonError').text('Please choose address again');
                return false;
            }

            $('#checkoutButtonError').text('');
            console.log(cartNotemain);

        } else {
            e.preventDefault();
            $('#checkoutButtonError').text('Please add a new valid address');
        }
    });

    $(document).on('click', '#wk_pay_wallet', function (e) {

        let selectedAddress = $("input[name='shipping_address']:checked");
        let selectedAddressProvince = $("input[name='shipping_address']:checked").attr('data-province');

        let cartNoteVal = $('#cartNoteDummy').val();
        let deliveryDateTime = $('#local_delivery').val();

          // Fallback: if deliveryDateTime is null/empty, use span values
        if (!deliveryDateTime || deliveryDateTime.trim() === '') {
            const dateValue = $('#date-view-ld').text().trim();
            const timeslotValue = $('#timeslot-view-ld').text().trim();
            
            if (dateValue && timeslotValue && 
                dateValue !== 'Not Selected' && timeslotValue !== 'Not Selected' &&
                dateValue !== 'No dates available' && timeslotValue !== 'No slots available') {
            
            // Format: "17/11/2025 between 7:00 AM and 11:00 AM"
            deliveryDateTime = `${dateValue} between ${timeslotValue}`;
            }
        }

        if (selectedAddress.length > 0 && selectedAddressProvince) {
            // Validate phone number
            let phoneNumber = selectedAddress.attr("data-phone");
            
            if (!phoneNumber || phoneNumber.trim() === '' || phoneNumber === 'null' || phoneNumber === 'undefined') {
                e.preventDefault();
                $('#checkoutButtonError').text('⚠️ Phone number is missing in your address. Please update your address with a valid phone number.');
                $('#checkoutButtonError').css({
                    'color': 'red',
                    'font-weight': '500',
                    'margin-top': '10px',
                    'display': 'block'
                });
                console.warn('Checkout blocked: Phone number is missing');
                
                // Scroll to error message
                $('html, body').animate({
                    scrollTop: $('#checkoutButtonError').offset().top - 100
                }, 500);
                
                return false;
            }
            
            let address = `
            Name: ${selectedAddress.attr("data-name")}
            Address: ${selectedAddress.attr("data-address1")}${selectedAddress.attr("data-address2") ? ', ' + selectedAddress.attr("data-address2") : ''}
            City: ${selectedAddress.attr("data-city")}
            Country: ${selectedAddress.attr("data-country")}
            Province: ${selectedAddress.attr("data-province")}
            Phone: ${phoneNumber}
            Email: ${selectedAddress.attr("data-email")}
            Timeslot: ${deliveryDateTime}
            `.replace(/^\s+/gm, '').trim();
            
            var cartNotemain = 'Cart Note: ' + cartNoteVal + '\n' + address;
            
            $('#cartNote').val(cartNotemain);

            // Validate cartNotemain: must contain Province
            if (!cartNotemain || !cartNotemain.includes('Province:')) {
                e.preventDefault();
                $('#checkoutButtonError').text('Please choose address again');
                return false;
            }

            $('#checkoutButtonError').text('');
            console.log(cartNotemain);

        } else {
            e.preventDefault();
            $('#checkoutButtonError').text('Please add a new valid address');
        }
    });



  });




document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("return_to") === "cart") {
        sessionStorage.setItem("return_to", "cart"); // Store in session
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const addressForms = document.querySelectorAll("form[action^='/account/addresses/']");

    addressForms.forEach((form) => {
        form.addEventListener("submit", function () {
            if (sessionStorage.getItem("return_to") === "cart") {
                sessionStorage.removeItem("return_to"); // Clear session storage
                setTimeout(() => {
                    window.location.href = "/cart"; // Redirect after update
                }, 1000); // Slight delay to allow form submission
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const addressForms = document.querySelectorAll("form[action^='/account/addresses']");

    addressForms.forEach((form) => {
        form.addEventListener("submit", function () {
            if (sessionStorage.getItem("return_to") === "cart") {
                sessionStorage.removeItem("return_to"); // Clear session storage
                setTimeout(() => {
                    window.location.href = "/cart"; // Redirect after update
                }, 1000); // Slight delay to allow form submission
            }
        });
    });
});




// Select the target element
let targetNode = document.getElementById("mainCartForm");

if(targetNode){

// Create a MutationObserver instance
let observerNew = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList" || mutation.type === "characterData") {
            // console.log("Div content changed:", targetNode.innerHTML);
            myFunction(); // Call your function here
        }
    }
});

// Configure observer options
let configNew = { childList: true, subtree: true, characterData: true };

// Start observing the target node
observerNew.observe(targetNode, configNew);

// Function to run when div updates
function myFunction() {
    let dataCityMain = $('input[name="shipping_address"]:checked').attr('data-province');
//   console.log(dataCityMain);
  // let ld_radio_label_content = $('.ld_radio_label_content').text();
  if (dataCityMain != ''){
    $('#ld_delivery_areas_div .ld_content_box_row').each(function(){
      let ld_radio_label_content = $(this).find('.ld_radio_label_content').text().trim();
    //   console.log('content =' + ld_radio_label_content);
      if(dataCityMain == ld_radio_label_content){
        $(this).find('.ld_input_radio').trigger('click');
        $(this).css('display', 'block').siblings().css('display', 'none');
        // console.log('success matched');
      }
    });
  }
}

}


$(document).on("click", ".checkout-button-ctrl", function (e) {
    myFunction();
});
$(document).on("click", ".open-modal-btn", function (e) {
    myFunction();
});
let userInteracted = false;

function runOnUserAction() {
    if (userInteracted) return; // run ONLY once
    userInteracted = true;

    console.log("User interacted — running code now");
    myFunction();
}

// Detect ANY user interaction
$(document).on("click keydown scroll mousemove touchstart", function () {
    runOnUserAction();
});


// Function to refresh cart icons (both desktop and mobile)
function refreshCartIcons() {
    $("#cartDrawer").load(window.location.href + " #cartDrawer");
    
    // Update both desktop and mobile cart counts directly instead of full reload
    fetch("/cart.js")
        .then(response => response.json())
        .then(cartData => {
            // console.log('updating cart counts');
            const count = cartData.item_count;
            
            // Update DESKTOP cart count number
            const desktopCartCount = document.querySelector('#headerCartStatus .cart-count-number');
            if (desktopCartCount) {
                desktopCartCount.textContent = count;
            }
            
            // Update DESKTOP cart count visibility
            const desktopCartCountContainer = document.querySelector('#headerCartStatus .header__cart-count');
            if (count === 0) {
                desktopCartCountContainer?.classList.add('opacity-0', 'hidden-xs');
            } else {
                desktopCartCountContainer?.classList.remove('opacity-0', 'hidden-xs');
            }
            
            // Update DESKTOP cart count class for styling
            if (desktopCartCountContainer) {
                desktopCartCountContainer.className = desktopCartCountContainer.className.replace(/header-cart-count-\d+/, `header-cart-count-${count}`);
            }
            
            // Update MOBILE cart count number
            const mobileCartCount = document.querySelector('#mobileHeaderCartStatus .cart-count-number');
            if (mobileCartCount) {
                mobileCartCount.textContent = count;
            }
            
            // Update MOBILE cart count visibility
            const mobileCartCountContainer = document.querySelector('#mobileHeaderCartStatus .header__cart-count');
            if (count === 0) {
                mobileCartCountContainer?.classList.add('opacity-0', 'hidden-xs');
            } else {
                mobileCartCountContainer?.classList.remove('opacity-0', 'hidden-xs');
            }
            
            // Update MOBILE cart count class for styling
            if (mobileCartCountContainer) {
                mobileCartCountContainer.className = mobileCartCountContainer.className.replace(/header-cart-count-\d+/, `header-cart-count-${count}`);
            }
        })
        .catch(error => console.error("Error updating cart counts:", error));
}

// PLP Quantity Buttons - Event Delegation (single listener, no duplicates)
(function() {
    const updateTimers = new Map();
    const UPDATE_DEBOUNCE = 500;
    const pendingAddToCart = new Set(); // Track cards currently adding to cart
    let fetchCartDataTimer = null; // Debounce timer for fetchCartData

    // Helper to update button states based on quantity and inventory
    function updateButtonStates(card, quantity, maxInventory) {
        const plusBtn = card.querySelector(".quantity-selector .plus");
        const minusBtn = card.querySelector(".quantity-selector .minus");
        
        if (plusBtn) {
            if (quantity >= maxInventory) {
                plusBtn.disabled = true;
                plusBtn.classList.add("disabled");
            } else {
                plusBtn.disabled = false;
                plusBtn.classList.remove("disabled");
            }
        }
        
        if (minusBtn) {
            if (quantity <= 1) {
                minusBtn.disabled = false;
                minusBtn.classList.remove("disabled");
            }
        }
    }

    function fetchCartDataImmediate() {
        fetch("/cart.js")
            .then(response => response.json())
            .then(cart => {
                document.querySelectorAll(".product-card__wrapper").forEach((card) => {
                    const productId = card.dataset.productId;
                    const maxInventory = parseInt(card.dataset.inventoryQuantity, 10) || 9999;
                    const addToCartBtn = card.querySelector(".js-product-form-submit-btn.btn-cart");
                    const quantitySelector = card.querySelector(".quantity-selector");
                    const quantityDisplay = card.querySelector(".quantity");

                    if (!addToCartBtn || !quantitySelector || !quantityDisplay) return;

                    let cartItem = cart.items.find(item => item.id == productId);

                    const productIdStr = String(productId);
                    if (cartItem) {
                        quantityDisplay.textContent = cartItem.quantity;
                        quantitySelector.classList.remove("hidden");
                        addToCartBtn.classList.add("hidden");
                        // Update button states based on inventory
                        updateButtonStates(card, cartItem.quantity, maxInventory);
                        // Clear pending flag since item is now in cart
                        pendingAddToCart.delete(productIdStr);
                    } else {
                        // Only hide if not pending add to cart
                        if (!pendingAddToCart.has(productIdStr)) {
                            quantitySelector.classList.add("hidden");
                            addToCartBtn.classList.remove("hidden");
                        }
                    }
                });
            });
    }

    // Debounced version of fetchCartData to prevent multiple rapid calls
    function fetchCartData() {
        if (fetchCartDataTimer) {
            clearTimeout(fetchCartDataTimer);
        }
        fetchCartDataTimer = setTimeout(fetchCartDataImmediate, 300);
    }

    function updateCart(variantId, quantity, callback) {
        fetch("/cart/change.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: variantId, quantity: quantity }),
        })
        .then(response => response.json())
        .then(data => {
            if (callback) callback();
            openCartDrawer();
        })
        .catch(error => console.error("Error updating cart:", error));
    }

    function openCartDrawer() {
        $("#cartDrawer").load(window.location.href + " #cartDrawer");
        $("#headerCartStatus").load(window.location.href + " #headerCartStatus");
        
        fetch("/cart.js")
            .then(response => response.json())
            .then(cartData => {
                const count = cartData.item_count;
                
                const mobileCartCount = document.querySelector('#mobileHeaderCartStatus .cart-count-number');
                if (mobileCartCount) {
                    mobileCartCount.textContent = count;
                }
                
                const mobileCartCountContainer = document.querySelector('#mobileHeaderCartStatus .header__cart-count');
                if (count === 0) {
                    mobileCartCountContainer?.classList.add('opacity-0', 'hidden-xs');
                } else {
                    mobileCartCountContainer?.classList.remove('opacity-0', 'hidden-xs');
                }
                
                if (mobileCartCountContainer) {
                    mobileCartCountContainer.className = mobileCartCountContainer.className.replace(/header-cart-count-\d+/, `header-cart-count-${count}`);
                }
            })
            .catch(error => console.error("Error updating mobile cart:", error));
    }

    function scheduleCartUpdate(productId, quantity, quantitySelector, addToCartBtn) {
        if (updateTimers.has(productId)) {
            clearTimeout(updateTimers.get(productId));
        }
        updateTimers.set(productId, setTimeout(() => {
            updateCart(productId, quantity, () => {
                if (quantity <= 0) {
                    quantitySelector.classList.add("hidden");
                    addToCartBtn.classList.remove("hidden");
                }
                fetchCartData();
            });
            updateTimers.delete(productId);
        }, UPDATE_DEBOUNCE));
    }

    // Single event listener using event delegation
    function handleQuantityClick(e) {
        const plusBtn = e.target.closest(".quantity-selector .plus");
        const minusBtn = e.target.closest(".quantity-selector .minus");
        
        if (!plusBtn && !minusBtn) return;
        
        // Mark event as handled to prevent duplicate processing
        if (e._plpQtyHandled) return;
        e._plpQtyHandled = true;
        
        e.stopImmediatePropagation();
        e.preventDefault();
        
        const card = e.target.closest(".product-card__wrapper");
        if (!card) return;
        
        const productId = card.dataset.productId;
        const maxInventory = parseInt(card.dataset.inventoryQuantity, 10) || 9999;
        const addToCartBtn = card.querySelector(".js-product-form-submit-btn.btn-cart");
        const quantitySelector = card.querySelector(".quantity-selector");
        const quantityDisplay = card.querySelector(".quantity");
        
        if (!quantityDisplay) return;
        
        let quantity = parseInt(quantityDisplay.textContent, 10);
        
        if (plusBtn) {
            // Check if already at max inventory
            if (quantity >= maxInventory) {
                updateButtonStates(card, quantity, maxInventory);
                return;
            }
            quantity += 1;
            quantityDisplay.textContent = quantity;
            updateButtonStates(card, quantity, maxInventory);
            scheduleCartUpdate(productId, quantity, quantitySelector, addToCartBtn);
        } else if (minusBtn) {
            quantity -= 1;
            if (quantity > 0) {
                quantityDisplay.textContent = quantity;
            } else {
                quantity = 0;
            }
            updateButtonStates(card, quantity, maxInventory);
            scheduleCartUpdate(productId, quantity, quantitySelector, addToCartBtn);
        }
    }
    
    // Listen on both phases to catch and stop the event
    document.addEventListener("click", handleQuantityClick, true);
    document.addEventListener("click", handleQuantityClick, false);

    // Load cart data on init (use immediate version for initial load)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchCartDataImmediate);
    } else {
        fetchCartDataImmediate();
    }

    // Expose fetchCartData globally for other scripts to call
    window.plpFetchCartData = fetchCartData;

    // Show quantity selector immediately when add to cart button is clicked
    function showQuantitySelectorForCard(card) {
        const addToCartBtn = card.querySelector(".js-product-form-submit-btn.btn-cart");
        const quantitySelector = card.querySelector(".quantity-selector");
        const quantityDisplay = card.querySelector(".quantity");
        const maxInventory = parseInt(card.dataset.inventoryQuantity, 10) || 9999;
        const productId = card.dataset.productId;

        if (addToCartBtn && quantitySelector && quantityDisplay) {
            // Mark this product as pending add to cart (ensure string type for consistency)
            pendingAddToCart.add(String(productId));
            
            // Immediately show quantity selector (optimistic UI)
            addToCartBtn.classList.add("hidden");
            quantitySelector.classList.remove("hidden");
            quantityDisplay.textContent = 1;
            updateButtonStates(card, 1, maxInventory);
            
            // Fetch actual cart data after a delay to sync (2 seconds to ensure cart API completes)
            setTimeout(fetchCartData, 2000);
        }
    }

    // Listen for click on add to cart button (immediate feedback)
    document.addEventListener('click', function(e) {
        const addToCartBtn = e.target.closest('.product-card__wrapper .js-product-form-submit-btn.btn-cart');
        if (addToCartBtn) {
            const card = addToCartBtn.closest('.product-card__wrapper');
            if (card) {
                // Show immediately - no delay
                showQuantitySelectorForCard(card);
            }
        }
    }, true);

    // Also listen for form submit as backup
    document.addEventListener('submit', function(e) {
        const form = e.target.closest('sht-atc-frm form, form[action*="/cart/add"]');
        if (form) {
            const card = form.closest('.product-card__wrapper');
            if (card) {
                showQuantitySelectorForCard(card);
            }
        }
    }, true);
})();


// Listen for cart drawer changes (quantity updates and removals)
document.addEventListener('DOMContentLoaded', function() {
    // Listen for cart changes via fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        
        // Check if it's a cart change request
        if (typeof url === 'string' && (url.includes('/cart/change.js') || url.includes('/cart/update.js') || url.includes('/cart/add.js'))) {
            const isAddToCart = url.includes('/cart/add.js');
            return originalFetch.apply(this, args).then(response => {
              initializeMobileNavigation();
                // Refresh cart icons after cart change
                setTimeout(refreshCartIcons, 50);
                // Only update PLP quantity selectors for change/update, not add
                // (add is handled by the click handler with optimistic UI)
                if (window.plpFetchCartData && !isAddToCart) {
                    setTimeout(window.plpFetchCartData, 500);
                }
                return response;
            });
        }
        
        return originalFetch.apply(this, args);
    };

    // Listen for form submissions (add to cart)
    document.addEventListener('submit', function(e) {
        // Check if it's a product form submission
        if (e.target.matches('form[action*="/cart/add"]') || 
            e.target.querySelector('.js-product-form-submit-btn-text') ||
            e.target.matches('.product-form') ||
            e.target.matches('[data-type="add-to-cart-form"]')) {
            // console.log('Product form submitted:', e.target);
            // Add delay to allow form submission to complete
            setTimeout(() => {
                initializeMobileNavigation();
                refreshCartIcons();
            }, 50);
        }
    });

    // Listen for cart drawer button clicks using event delegation
    document.addEventListener('click', function(e) {
        console.log('Click detected on:', e.target.className, e.target.tagName);
        
        // Check multiple ways to detect cart drawer buttons
        if (e.target.matches('.js-cart-drawer-quantity-btn') || 
            e.target.matches('.js-cart-drawer-delete-btn') ||
            e.target.matches('.js-cart-drawer-quantity-btn-minus') ||
            e.target.matches('.js-cart-drawer-quantity-btn-plus') ||
            e.target.closest('.js-cart-drawer-quantity-btn') || 
            e.target.closest('.js-cart-drawer-delete-btn') ||
            e.target.closest('.js-cart-drawer-quantity-btn-minus') ||
            e.target.closest('.js-cart-drawer-quantity-btn-plus') ||
            e.target.closest('sht-cart-drwr-qty-inp') ||
            e.target.closest('sht-cart-drwr-rmv-btn')) {
            
            // console.log('Cart drawer button clicked, refreshing icons...');
            setTimeout(refreshCartIcons, 50);
        }
    }, true); // Use capture phase

    // Watch for cart drawer DOM changes
    const cartDrawerObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                // console.log('Cart drawer DOM changed, refreshing icons...');
                setTimeout(refreshCartIcons, 50);
            }
        });
    });

    // Start observing cart drawer when it exists
    function startCartDrawerObserver() {
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer) {
            cartDrawerObserver.observe(cartDrawer, {
                childList: true,
                subtree: true
            });
            // console.log('Cart drawer observer started');
        } else {
            // Try again after a short delay
            setTimeout(startCartDrawerObserver, 1000);
        }
    }

    startCartDrawerObserver();
    
    // Also listen for cart drawer form submissions
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'cart-drawer-form') {
            setTimeout(refreshCartIcons, 50);
        }
    });
});

// Mobile Navigation Function
function initializeMobileNavigation() {
  // Menu navigation handler
  const menuNavIcon = document.getElementById("menu-nav-icon");
  if (menuNavIcon && !menuNavIcon.hasAttribute('data-nav-listener')) {
    menuNavIcon.setAttribute('data-nav-listener', 'true');
    menuNavIcon.addEventListener("click", function () {
      const target = document.querySelector(".header__logo .hmburger-menu");
      if (target) {
        target.click();
      }
    });
  }

  // Cart navigation handler
  const cartNavIcon = document.getElementById("cart-nav-icon");
  if (cartNavIcon && !cartNavIcon.hasAttribute('data-nav-listener')) {
    cartNavIcon.setAttribute('data-nav-listener', 'true');
    cartNavIcon.addEventListener("click", function () {
      // Cart opening is handled by the cart drawer component
    });
  }
}

function updateCartNoteFromSelectedAddress() {
    let selectedAddress = $("input[name='shipping_address']:checked");

    if (!selectedAddress.length) {
        console.warn('No shipping address selected');
        return;
    }

    let cartNoteVal = $('#cartNoteDummy').val() || '';
    let deliveryDateTime = $('#local_delivery').val();

    // Fallback: if deliveryDateTime is null/empty, use span values
    if (!deliveryDateTime || deliveryDateTime.trim() === '') {
        const dateValue = $('#date-view-ld').text().trim();
        const timeslotValue = $('#timeslot-view-ld').text().trim();

        if (
            dateValue && timeslotValue &&
            dateValue !== 'Not Selected' &&
            timeslotValue !== 'Not Selected' &&
            dateValue !== 'No dates available' &&
            timeslotValue !== 'No slots available'
        ) {
            // Format: "17/11/2025 between 7:00 AM and 11:00 AM"
            deliveryDateTime = `${dateValue} between ${timeslotValue}`;
        }
    }

    let phoneNumber = selectedAddress.attr("data-phone") || '';

    let address = `
Name: ${selectedAddress.attr("data-name")}
Address: ${selectedAddress.attr("data-address1")}${selectedAddress.attr("data-address2") ? ', ' + selectedAddress.attr("data-address2") : ''}
City: ${selectedAddress.attr("data-city")}
Country: ${selectedAddress.attr("data-country")}
Province: ${selectedAddress.attr("data-province")}
Phone: ${phoneNumber}
Email: ${selectedAddress.attr("data-email")}
Timeslot: ${deliveryDateTime}
`.replace(/^\s+/gm, '').trim();

    let cartNoteMain = 'Cart Note: ' + cartNoteVal + '\n' + address;

    $('#cartNote').val(cartNoteMain);

    console.log(cartNoteMain);
}

// Call on DOM ready
$(document).ready(function () {
    updateCartNoteFromSelectedAddress();

    // Call on Save Timeslot click
    $('#save-timeslot').on('click', function () {
        updateCartNoteFromSelectedAddress();
    });

    // Call on Deliver Here button click
    $('#deliverHereBtn').on('click', function () {
        updateCartNoteFromSelectedAddress();
    });
    $(document).on('click', '.header__icon__search', function () {
        $('.section-header').toggleClass('header--predictive-search-open');
    });
});

