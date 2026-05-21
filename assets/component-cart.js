class SHTCartNote extends SHTCustomComponent {
    constructor() {
        super(), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.addEventListener("change", SHTHelper.debounce(t => {
          console.log("change");
            t = JSON.stringify({
                note: t.target.value
            });
            fetch("" + window.routes.cart_update_url, {
                ...SHTHelper.fetchConfigJSON,
                body: t
            })
        }, 300))
    }
}
customElements.define("sht-cart-note", SHTCartNote);
class SHTCartRemoveButton extends SHTCustomComponent {
    constructor() {
        super(), this.addEventListener("click", t => {
            t.preventDefault(), this.closest("sht-cart-frm").updateQuantity(this.dataset.index, 0)
        })
    }
}
customElements.define("sht-cart-rmv-btn", SHTCartRemoveButton);
class SHTCartForm extends SHTCustomComponent {
    constructor() {
        super(), this.cartDrawer = SHTHelper.qs("sht-cart-drwr"), this.cartDrawerForm = SHTHelper.qs("sht-cart-drwr-frm"), this.cartNotification = SHTHelper.qs("sht-cart-noti"), this.totalItems = Array.from(this.$$(".js-quantity-input")).reduce((t, e) => t + parseInt(e.value), 0), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.addEventListener("change", SHTHelper.debounce(t => {
            this.onChange(t)
            console.log('clicked del')
        }, 300))
    }
    onChange(t) {
        "note" !== t.target.name && this.updateQuantity(t.target.dataset.index, t.target.value, document.activeElement.dataset.name)
    }
    getSectionsToRender(t = !0) {
        return t ? [{
            id: "cartForm",
            section: this.$(".js-cart-form-wrapper").dataset.sectionId,
            selectors: [".js-cart-form-content-cart-items", ".js-cart-form-content-cart-total", ".js-cart-form-item_count"]
        }] : [{
            selector: "#mainCartContainer",
            id: "main-cart",
            space_selector: "#mainCartContainer"
        }]
    }
    renderContents(r) {
        this.getSectionsToRender(!1).forEach(t => {
            var e = SHTHelper.qid(t.space_selector);
            e && (e.innerHTML = this.getSectionInnerHTML(r.sections[t.id], t.selector))
        })
    }
    updateQuantity(e, t, n) {
        let r = this.getSectionsToRender();
        const quantity = t;
        this.cartDrawer && (r = [...r, ...this.cartDrawer.getSectionsToRender()]), this.cartNotification && (r = [...r, ...this.cartNotification.getSectionsToRender()]);
        t = JSON.stringify({
            line: e,
            quantity: t,
            sections: r.map(t => t.section),
            sections_url: window.location.pathname
        });
        fetch("" + window.routes.cart_change_url, {
            ...SHTHelper.fetchConfigJSON,
            body: t
        }).then(response => response.text()).then(responseText => {
            let r = JSON.parse(responseText);
            if (r.errors) {
                this.updateErrorRegions(e, r.errors)
            } else {
                if (0 === parseInt(quantity)) {
                    console.log("Product deleted from cart");
                    window.location.reload();
                } else {
                    console.log("Cart quantity updated, reloading page");
                    window.location.reload();
                }
            }
        }).catch(t => {
            this.$(".js-cart-form-errors").textContent = SHTLanguage.cart.ERROR
        })
    }
    updateFreeShipNotifications(t) {
        t = t.sections[SHTHelper.qid("mainCartForm").dataset.sectionId];
        (new DOMParser).parseFromString(t, "text/html")
    }
    updateErrorRegions(t, e) {
        var r = this.$("#line-item-error-" + t),
            t = this.$(`.js-quantity-input[data-index="${t}"]`);
        r && (r.querySelector(".js-cart-form-item-error-message").innerHTML = e, r.classList.remove("d-none-important")), t && (t.value = t.dataset.cartQuantity)
    }
    getSectionInnerHTML(t, e) {
        return (new DOMParser).parseFromString(t, "text/html").querySelector(e).innerHTML
    }
}
customElements.define("sht-cart-frm", SHTCartForm);