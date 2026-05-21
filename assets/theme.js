var SHTHelper = window.SHTHelper || {},
    TRAP_FOCUS_HANDLERS = {};
SHTHelper.fetchConfigHTTP = {
    method: "POST",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/javascript"
    }
}, SHTHelper.fetchConfigJSON = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
}, SHTHelper.debounce = function(e, s) {
    let i = null;
    return function(t) {
        clearTimeout(i), i = null, i = setTimeout(function() {
            e.call(this, t)
        }, s)
    }
}, SHTHelper.removeTrapFocus = function(t = null) {
    document.removeEventListener("focusin", TRAP_FOCUS_HANDLERS.focusin), document.removeEventListener("focusout", TRAP_FOCUS_HANDLERS.focusout), document.removeEventListener("keydown", TRAP_FOCUS_HANDLERS.keydown), t && t.focus()
}, SHTHelper.trapFocus = function(e, t = e) {
    var s = e.querySelectorAll(`a[href]:not([disabled]), [tabindex]:not([tabindex^='-']), summary, button:not([disabled]), textarea:not([disabled]), input:not([type=hidden]):enabled, input[type="text"]:not([disabled]), object, iframe, input[type="search"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`);
    let i = s[0],
        r = s[s.length - 1];
    SHTHelper.removeTrapFocus(), TRAP_FOCUS_HANDLERS.focusin = t => {
        t.target !== e && t.target !== r && t.target !== i || document.addEventListener("keydown", TRAP_FOCUS_HANDLERS.keydown)
    }, TRAP_FOCUS_HANDLERS.focusout = function() {
        document.removeEventListener("keydown", TRAP_FOCUS_HANDLERS.keydown)
    }, TRAP_FOCUS_HANDLERS.keydown = function(t) {
        "Tab" !== t.key && 9 !== t.keyCode || (t.shiftKey ? t.target !== e && t.target !== i || (r.focus(), t.preventDefault()) : t.target === r && (i.focus(), t.preventDefault()))
    }, document.addEventListener("focusout", TRAP_FOCUS_HANDLERS.focusout), document.addEventListener("focusin", TRAP_FOCUS_HANDLERS.focusin), t.focus()
}, SHTHelper.isColor = function(t) {
    var e = (new Option).style;
    return e.color = t, e.color == t
}, SHTHelper.isHexColor = function(t) {
    return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(t)
}, SHTHelper.isImage = function(t) {
    return /(\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/gi.test(t)
}, SHTHelper.preventStickyHeaderReveal = function() {
    var t = SHTHelper.qs("sht-sticky-header");
    t && t.dispatchEvent(new Event("preventStickyHeaderReveal"))
}, SHTHelper.loadScript = function(t, e, s) {
    var i;
    SHTHelper.qs("#" + t) ? s() : ((i = document.createElement("script")).setAttribute("src", "" + e), i.setAttribute("id", "" + t), i.onload = function() {
        s()
    }, i.onreadystatechange = function() {
        "complete" != this.readyState && "loaded" != this.readyState || s()
    }, i.onerror = function(t) {
        console.log("Failed to load script file " + e, t), s()
    }, document.body.appendChild(i))
}, SHTHelper.forceUpdateCartStatus = function(t) {
    let e = [{
            section: "cart-drawer",
            selector: ".js-cart-drawer-wrapper",
            space_selector: ".js-cart-drawer-wrapper"
        }, {
            section: "header-cart-status",
            space_selector: ".shopify-section",
            selector: "#headerCartStatus",
            cart_notification: !1
        }, {
            section: "main-cart",
            space_selector: "#mainCartContainer",
            selector: "#mainCartContainer",
            cart_notification: !1
        }, {
            section: "cart-notification-panel-product",
            space_selector: ".js-cart-notification-panel-item-count",
            selector: ".js-cart-notification-panel-item-count-content",
            cart_notification: !1
        }, {
            section: "cart-notification-panel-product",
            space_selector: ".js-cart-notification-panel-product-" + t?.id,
            selector: ".js-cart-notification-panel-content",
            cart_notification: !0
        }],
        r = SHTHelper.qs("sht-cart-noti");
    SHTHelper.qs("sht-sticky-header");
    t = e.map(t => t.section).join(",");
    fetch(window.location.pathname + "?sections=" + t).then(t => t.json()).then(i => {
        e.forEach(t => {
            var e = i[t.section],
                s = SHTHelper.qs(t.selector);
            e && s && ((e = (new DOMParser).parseFromString(e, "text/html").querySelector(t.space_selector)) && (s.innerHTML = e.innerHTML), t.cart_notification) && r && r.open()
        })
    }).catch(t => {
        console.log("Cannot force Update Cart Status")
    })
};
class SHTElementLazyLoad {
    constructor() {
        this.elements = SHTHelper.qsa(".js-main-body .js-animate"), this.sequential_elements = SHTHelper.qsa(".js-main-body .js-seq-animate"), this.setupEventListeners()
    }
    setupEventListeners() {
        var s = new IntersectionObserver((s, i) => {
            for (let t = 0, e = s.length; t < e; t++) s[t].isIntersecting && (s[t].target.classList.add("animated"), i.unobserve(s[t].target))
        });
        for (let t = 0, e = this.elements.length; t < e; t++) s.observe(this.elements[t]);
        var i = new IntersectionObserver((s, i) => {
            for (let t = 0, e = s.length; t < e; t++) {
                var r = 100 * t;
                s[t].isIntersecting && (setTimeout(() => {
                    s[t].target.classList.add("animated")
                }, r), i.unobserve(s[t].target))
            }
        }, {
            threshold: .2
        });
        for (let t = 0, e = this.sequential_elements.length; t < e; t++) i.observe(this.sequential_elements[t])
    }
}
setTimeout(() => {
    void 0 !== SHTElementLazyLoad && new SHTElementLazyLoad
}), Shopify.designMode && document.addEventListener("shopify:section:load", function(t) {
    void 0 !== SHTElementLazyLoad && new SHTElementLazyLoad
});
class SHTCustomComponent extends HTMLElement {
    constructor() {
        super(), this.$ = this.querySelector.bind(this), this.$$ = this.querySelectorAll.bind(this)
    }
}
class SHTLazyLoadingVideo extends SHTCustomComponent {
    constructor() {
        super(), this.iframe = this.$("iframe"), this.template = this.$("template"), this.isMouseenter = !1
    }
    loadVideo() {
        var t;
        this.iframe && (this.iframe.setAttribute("src", this.iframe.getAttribute("data-src")), this.iframe.addEventListener("load", function() {
            "youtube" == this.dataVideoType && this.iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*"), "vimeo" == this.dataVideoType && this.iframe.contentWindow.postMessage('{"method":"play"}', "*")
        }.bind(this))), "local_video" == this.dataVideoType && (this.local_video = this.$("video"), t = this.local_video.querySelector("source").getAttribute("data-src"), this.local_video.src = t)
    }
    execute() {
        Shopify.designMode ? this.loadVideo() : (["mousemove", "touchstart"].forEach(function(t) {
            SHTHelper.qs("body").addEventListener(t, function(t) {
                this.isMouseenter || this.loadVideo(), this.isMouseenter = !0
            }.bind(this), {
                once: !0
            })
        }.bind(this)), window.addEventListener("scroll", function(t) {
            this.isMouseenter || this.loadVideo(), this.isMouseenter = !0
        }.bind(this), {
            once: !0
        }))
    }
    static get observedAttributes() {
        return ["data-video-type", "data-video-id"]
    }
    set dataVideoType(t) {
        this.setAttribute("data-video-type", t)
    }
    get dataVideoType() {
        return this.getAttribute("data-video-type")
    }
    set dataVideoId(t) {
        this.setAttribute("data-video-id", t)
    }
    get dataVideoId() {
        return this.getAttribute("data-video-id")
    }
    attributeChangedCallback(t, e, s) {
        e !== s && this.execute()
    }
    connectedCallback() {
        this.execute()
    }
    disconnectedCallback() {}
}
customElements.define("sht-load-video", SHTLazyLoadingVideo);
class SHTSlideShow extends SHTCustomComponent {
    constructor() {
        super(), this.slideshow = this.$(".js-slideshow"), this.slideshowItems = this.$(".js-slideshow-items"), this.totalElm = this.$(".js-slideshow-total"), this.currentElm = this.$(".js-slideshow-current"), this.separatorElm = this.$(".js-slideshow-separator"), this.prevBtn = this.$(".js-slideshow-prev-btn"), this.nextBtn = this.$(".js-slideshow-next-btn"), this.startNStopBtn = this.$(".js-slideshow-start-n-stop-btn"), this.imageItems = this.$$(".js-slideshow-image"), this.pauseIcon = this.startNStopBtn.querySelector(".js-slideshow-pause-icon"), this.playIcon = this.startNStopBtn.querySelector(".js-slideshow-play-icon"), this.properties = JSON.parse(this.dataset.slideshowProperties), this.autoplay = this.properties.autoplay || !1, this.image = null, this.template = null, this.current = 1, this.anchors = [], this.lastScrollTimeout = null, this.autoplayInterval = null, this.images = this.slideshowItems.children, this.total = this.images.length, this.slideshowItems.scrollLeft = 0, this.observer = null, this.isPaused = !1, this.pagination = this.$(".js-slideshow-pagination"), this.pagination_items = this.pagination?.querySelectorAll(".js-slideshow-pagination-item")
    }
    cloneSlideItem() {
        var t, e;
        2 == this.total && (t = this.slideshowItems.querySelector(".js-slideshow-item:first-of-type"), (e = this.slideshowItems.querySelector(".js-slideshow-item:last-of-type")) && ((e = e.cloneNode(!0)).classList.add("slider-slide--clone"), this.slideshowItems.append(e)), t) && ((e = t.cloneNode(!0)).classList.add("slider-slide--clone"), this.slideshowItems.append(e))
    }
    execute() {
        this.cloneSlideItem(), this.prepare(), this.bindEventHandlers(), this.init()
    }
    connectedCallback() {
        this.execute()
    }
    init() {
        this.autoplay && (this.resumeAutoPlay(), this.isPaused = !0), this.updateSort()
    }
    updateSort() {
        var t, e, s, i;
        this.total <= 1 || (t = this.slideshowItems.scrollLeft, e = Math.round(t), s = this.slideshowItems.offsetWidth, i = this.slideshowItems.scrollWidth, e < s && (this.slideshowItems.prepend(this.images[this.total - 1]), this.slideshowItems.scrollLeft = e + s), Math.floor(i - t) <= s && (this.slideshowItems.append(this.images[0]), this.slideshowItems.scrollLeft = e - s))
    }
    startAutoPlay() {
        this.autoplay && (clearInterval(this.autoplayInterval), this.autoplayInterval = setInterval(function() {
            this.nextSlide()
        }.bind(this), this.properties.duration))
    }
    bindEventHandlers() {
        this.slideshowItems.addEventListener("wheel", function(t) {
            5 == Math.abs(t.deltaX) && this.stopAutoPlay()
        }.bind(this), {
            passive: !0
        }), this.slideshowItems.addEventListener("scroll", SHTHelper.debounce(this.onScrollEventHandle.bind(this), 100)), this.nextBtn.addEventListener("click", function() {
            this.nextSlide(), this.stopAutoPlay()
        }.bind(this)), this.prevBtn.addEventListener("click", function() {
            this.prevSlide(), this.stopAutoPlay()
        }.bind(this)), this.startNStopBtn.addEventListener("click", this.onStartNStopEventHandle.bind(this))
    }
    onStartNStopEventHandle(t) {
        t.preventDefault(), this.autoplay ? this.stopAutoPlay() : this.resumeAutoPlay()
    }
    stopAutoPlay() {
        clearInterval(this.autoplayInterval), this.pauseIcon.classList.add("d-none"), this.playIcon.classList.remove("d-none"), this.startNStopBtn.setAttribute("aria-label", this.properties.autoplayAccessibilityText[0]), this.slideshowItems.setAttribute("aria-live", "polite"), this.autoplay = !1
    }
    resumeAutoPlay() {
        this.autoplay = !0, this.pauseIcon.classList.remove("d-none"), this.playIcon.classList.add("d-none"), this.startNStopBtn.setAttribute("aria-label", this.properties.autoplayAccessibilityText[1]), this.slideshowItems.setAttribute("aria-live", "off"), this.startAutoPlay()
    }
    onScrollEventHandle(t) {
        t.preventDefault(), this.lastScrollTimeout && clearTimeout(this.lastScrollTimeout), this.lastScrollTimeout = setTimeout(function() {
            this.updateSort()
        }.bind(this), 100), this.updateCurrent(), this.updatePagination()
    }
    updatePagination() {
        var t;
        this.pagination && (t = this.pagination.querySelector(`li[data-slideshow-index="${this.current}"]`)) && (this.pagination_items.forEach(t => t.classList.remove("is-active")), t.classList.add("is-active"))
    }
    prepare() {
        this.totalElm.textContent = this.total, this.currentElm.textContent = this.current, this.separatorElm.textContent = this.properties.separatorText, this.autoplay && (this.startNStopBtn.toggleAttribute("hidden", !1), this.startNStopBtn.querySelector(".js-slideshow-pause-icon").classList.remove("d-none"), this.startNStopBtn.setAttribute("aria-label", this.properties.autoplayAccessibilityText[0]), this.slideshowItems.setAttribute("aria-live", "off"))
    }
    updateCurrent() {
        var t = this.$(".js-slideshow-image--current");
        t && (this.current = t.dataset.slideshowIndex), this.currentElm.textContent = this.current
    }
    prevSlide() {
        if (Shopify.designMode) this.slideshowItems.scrollLeft = this.slideshowItems.scrollLeft - this.slideshow.scrollWidth;
        else {
            let t = this.$(".js-slideshow-image--current").closest(".slider-slide--active");
            t && t.classList.add("slider-slide--active-blur"), setTimeout(() => {
                this.slideshowItems.scrollLeft = this.slideshowItems.scrollLeft - this.slideshow.scrollWidth, t.classList.remove("slider-slide--active-blur")
            }, 200)
        }
    }
    nextSlide() {
        if (Shopify.designMode) this.slideshowItems.scrollLeft = this.slideshowItems.scrollLeft + this.slideshow.scrollWidth;
        else {
            let t = this.$(".js-slideshow-image--current").closest(".slider-slide--active");
            t && t.classList.add("slider-slide--active-blur"), setTimeout(() => {
                this.slideshowItems.scrollLeft = this.slideshowItems.scrollLeft + this.slideshow.scrollWidth, t.classList.remove("slider-slide--active-blur")
            }, 200)
        }
    }
    observerSlideShow() {
        this.observer = new IntersectionObserver((t, e) => {
            t.forEach(t => {
                t.isIntersecting && (this.dataset.viewport = 1), this.observer.unobserve(this)
            })
        }, {
            threshold: .15
        }), this.observer.observe(this)
    }
}
customElements.define("sht-slideshow", SHTSlideShow);
class SHTSlideshowLazyLoadingImage extends SHTCustomComponent {
    constructor() {
        super(), this.image = this.$(".js-image-lazy"), this.imageMobile = this.$(".js-image-lazy-mobile"), this.spinner = this.$(".js-image-lazy-spinner"), this.container = this.closest(".js-slideshow-items"), this.currentItemClass = "js-slideshow-image--current", this.slideItem = this.closest(".js-slideshow-item"), this.sectionId = this.dataset.sectionId, this.section = SHTHelper.qs("#shopify-section-" + this.sectionId), this.bindEventHandlers()
    }
    setSlideItemVisibility(t) {
        t ? (this.slideItem.setAttribute("aria-hidden", "false"), this.slideItem.removeAttribute("tabindex"), this.slideItem.classList.add("slider-slide--active")) : (this.slideItem.setAttribute("aria-hidden", "true"), this.slideItem.setAttribute("tabindex", "-1"), this.slideItem.classList.remove("slider-slide--active"))
    }
    observeImage(s, i) {
        var t = new IntersectionObserver((t, e) => {
            t.forEach(t => {
                t.target;
                var e = this.parentNode;
                t.isIntersecting && !this.getAttribute("loaded") ? (s && s.removeAttribute("loading"), i && i.removeAttribute("loading"), this.setAttribute("loaded", !0), e.classList.add(this.currentItemClass), this.setSlideItemVisibility(!0)) : 0 == t.intersectionRatio ? (e.classList.remove(this.currentItemClass), this.setSlideItemVisibility(!1)) : this.getAttribute("loaded") && (e.classList.add(this.currentItemClass), this.setSlideItemVisibility(!0))
            })
        }, {
            root: this.container,
            rootMargin: "100px -2px 100px -2px",
            threshold: 0
        });
        s && t.observe(s)
    }
    loadImage() {
        new ResizeObserver(t => {
            window.matchMedia("(max-width: 767px)").matches && this.imageMobile ? this.observeImage(this.imageMobile, this.image) : this.image && this.observeImage(this.image, this.imageMobile)
        }).observe(document.body), window.matchMedia("(max-width: 767px)").matches && this.imageMobile ? this.observeImage(this.imageMobile, this.image) : this.image && this.observeImage(this.image, this.imageMobile)
    }
    bindEventHandlers() {}
    execute() {
        this.loadImage()
    }
    connectedCallback() {
        this.execute()
    }
    disconnectedCallback() {}
}
customElements.define("sht-slideshow-load-img", SHTSlideshowLazyLoadingImage);
class SHTSlideshowCTA extends SHTCustomComponent {
    constructor() {
        super(), this.ctaButton = this.$$(".js-slideshow-cta"), this.container = this.closest(".js-slideshow-items"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.observeItem()
    }
    observeItem() {
        new IntersectionObserver((t, e) => {
            t.forEach(t => {
                t.isIntersecting ? this.setCTAVisibility(!0) : this.setCTAVisibility(!1)
            })
        }, {
            threshold: .25
        }).observe(this)
    }
    setCTAVisibility(s) {
        this.ctaButton.forEach((t, e) => {
            s ? (t.removeAttribute("tabindex"), t.setAttribute("aria-hidden", "false")) : (t.setAttribute("tabindex", "-1"), t.setAttribute("aria-hidden", "true"))
        })
    }
}
customElements.define("sht-slideshow-cta", SHTSlideshowCTA);
class SHTCarousel extends SHTCustomComponent {
    constructor() {
        super(), this.carousels = this.$$(".js-carousel-item"), this.container = this.$(".js-carousel-items"), this.totalItems = this.carousels.length, this.prevBtnElement = this.$(".js-carousel-prev-btn"), this.nextBtnElement = this.$(".js-carousel-next-btn"), this.currentElement = this.$(".js-carousel-counter-current"), this.totalElement = this.$(".js-carousel-counter-total"), this.paginationElement = this.$(".js-carousel-pagination"), this.pagination = this.$(".js-carousel-pagination-dots"), this.pagination_items = this.pagination?.querySelectorAll(".js-carousel-pagination-dot"), this.scrollbarThumb = this.$(".js-scrollbar-thumb"), this.scrollbarTrack = this.$(".js-scrollbar-track"), this.desktopThumbItemCount = parseInt(this.scrollbarTrack?.dataset.thumbDesk), this.mobileThumbItemCount = parseInt(this.scrollbarTrack?.dataset.thumbMobile), this.totalItems = parseInt(this.scrollbarTrack?.dataset.thumbTotal), this.init(), this.bindEventHandlers()
    }
    init() {
        "false" != this.dataset.enable && (this.itemsToShow = Array.from(this.carousels).filter(t => 0 < t.clientWidth), this.itemsToShow.length < 2 ? this.togglePagination(!1) : (this.gutter = parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-right")), this.itemOffset = this.itemsToShow[1].offsetLeft - this.itemsToShow[0].offsetLeft, this.itemsPerPage = Math.floor((this.container.clientWidth - this.itemsToShow[0].offsetLeft) / this.itemOffset), this.totalPages = this.itemsToShow.length - this.itemsPerPage + 1, this.updateCarousel()))
    }
    pauseAllVideo() {
        this.$$(".js-media-item-youtube").forEach(t => {
            t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }), this.$$(".js-media-item-vimeo").forEach(t => {
            t.contentWindow.postMessage('{"method":"pause"}', "*")
        }), this.$$(".js-media-item-video").forEach(t => t.pause())
    }
    updateCarousel() {
        var t = this.currentPage;
        this.currentPage = Math.round(this.container.scrollLeft / this.itemOffset) + 1, 0 < this.currentPage && 0 < this.totalPages && (this.totalElement && (this.totalElement.textContent = this.totalPages), this.currentElement) && (this.currentElement.innerHTML = this.currentPage), this.currentPage != t && this.dispatchEvent(new CustomEvent("itemChanged", {
            detail: {
                currentPage: this.currentPage,
                currentElement: this.itemsToShow[this.currentPage - 1],
                container: this
            }
        })), this.isItemVisible(this.itemsToShow[0]) && 0 === this.container.scrollLeft ? this.prevBtnElement.setAttribute("disabled", "disabled") : this.prevBtnElement.removeAttribute("disabled"), this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) ? this.nextBtnElement.setAttribute("disabled", "disabled") : this.nextBtnElement.removeAttribute("disabled"), 1 < this.totalPages && this.togglePagination(!0), this.totalPages <= 1 && this.togglePagination(!1), this.updateScrollIndicator(), this.updatePagination(), this.pauseAllVideo()
    }
    updatePagination() {
        var t;
        this.pagination && (t = this.pagination.querySelector(`li[data-dot-index="${this.currentPage}"]`)) && (this.pagination_items.forEach(t => t.classList.remove("is-active")), t.classList.add("is-active"))
    }
    togglePagination(t) {
        t ? this.paginationElement?.classList.remove("d-none-important") : this.paginationElement?.classList.add("d-none-important")
    }
    isItemVisible(t, e = 0) {
        return void 0 !== t && (e = this.container.clientWidth + this.container.scrollLeft - e, Math.floor(t.getBoundingClientRect().width + t.offsetLeft) <= Math.round(e)) && t.offsetLeft >= this.container.scrollLeft
    }
    onButtonClick(t) {
        t.preventDefault();
        let e = 1,
            s = 0;
        window.matchMedia("(min-width: 459px)").matches && (e = t.currentTarget.dataset.step), 0 != this.container.scrollLeft && !this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) || (s = this.gutter), this.updateScrollIndicator(), this.itemScrollPosition = "next" === t.currentTarget.name ? this.container.scrollLeft - s + e * this.itemOffset : this.container.scrollLeft + s - e * this.itemOffset, window.requestAnimationFrame(() => this.container.scrollTo({
            left: this.itemScrollPosition,
            behavior: "smooth"
        }))
    }
    updateScrollIndicator() {
        this.scrollbarTrack && (this.widthThumDesk = 100 * this.desktopThumbItemCount / this.totalItems, this.widthThumMobile = 100 * this.mobileThumbItemCount / this.totalItems, this.maxScroll = this.container.scrollWidth - this.container.clientWidth, this.scrollPersent = this.container.scrollLeft / this.maxScroll * 100, this.thumbPersentDesk = this.calculateThumbPersent(this.desktopThumbItemCount), this.thumbPersentMobile = this.calculateThumbPersent(this.mobileThumbItemCount), this.scrollbarTrack.style.setProperty("--width-thumb-desktop", this.thumbPersentDesk + "%"), this.scrollbarTrack.style.setProperty("--width-thumb-mobile", this.thumbPersentMobile + "%"))
    }
    calculateThumbPersent(t) {
        return 100 * (t + this.scrollPersent / 100 * (this.totalItems - t)) / this.totalItems
    }
    bindEventHandlers() {
        "false" != this.dataset.enable && (new ResizeObserver(t => this.init()).observe(this.container), new IntersectionObserver(((t, e) => {
            t[0].isIntersecting && (this.init(), e.unobserve(this))
        }).bind(this)).observe(this), this.prevBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.nextBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.container.addEventListener("scroll", SHTHelper.debounce(this.updateCarousel.bind(this), 100)))
    }
}
customElements.define("sht-carousel", SHTCarousel);
class SHTColorSwatch extends SHTCustomComponent {
    constructor() {
        super(), this.json = null, this.jsonDataElement = SHTHelper.qs('#colorSwatchData[type="application/json"]') || null, this.variantSwatchItems = this.$$(".js-variant-swatch-item") || [], this.jsonDataElement && this.variantSwatchItems.length && this.bindEventHandlers()
    }
    onObserverHandler() {
        new IntersectionObserver((t, e) => {
            t.forEach(t => {
                t.isIntersecting && (this.init(), e.unobserve(this))
            })
        }).observe(this)
    }
    init() {
        this.json = JSON.parse(this.jsonDataElement.textContent), this.processJsonData();
        for (let t = 0, e = this.variantSwatchItems.length; t < e; t++) {
            var s, i, r = this.variantSwatchItems[t];
            null != this.json["" + r.dataset.optionValue] ? (s = SHTHelper.isImage(this.json["" + r.dataset.optionValue]), i = SHTHelper.isHexColor(this.json["" + r.dataset.optionValue]), s && "variant_image" != r.dataset.swatchSource && (r.classList.add("clr-swh__type--image", "clr-swh__has-value"), r.style.backgroundImage = `url("${this.json[""+r.dataset.optionValue]}")`, r.style.backgroundSize = "cover", r.style.backgroundRepeat = "no-repeat", r.querySelector(".js-variant-option-label")?.classList.add("hide-value")), i && (r.style.backgroundColor = this.json["" + r.dataset.optionValue], r.classList.add("clr-swh__type--color", "clr-swh__has-value"), r.querySelector(".js-variant-option-label")?.classList.add("hide-value"))) : SHTHelper.isColor(r.dataset.optionValue) && (r.style.backgroundColor = r.dataset.optionValue, r.classList.add("clr-swh__type--color", "clr-swh__has-value"), r.querySelector(".js-variant-option-label")?.classList.add("hide-value"))
        }
    }
    processJsonData() {
        this.json && (this.json = Object.assign.apply({}, this.json.color_swatch_name.map((t, e) => ({
            [t]: this.json.color_swatch_value[e]
        }))))
    }
    bindEventHandlers() {
        this.onObserverHandler()
    }
}
class SHTVariantSwatch extends SHTColorSwatch {
    bindEventHandlers() {
        this.onObserverHandler(), this.variantSwatchItems.forEach(t => {
            t.addEventListener("click", t => {
                this.changeVariantImage(t.currentTarget)
            })
        })
    }
    changeVariantImage(t) {
        var s = SHTHelper.qs("#" + t.dataset.productImageId);
        let i = s ? s.parentNode : null;
        if (i) i.classList.add("is-loading");
        var r = SHTHelper.qsa("." + t.dataset.productLinkClass),
            a = t.querySelector("template");
        if (s && a) {
            this.setButtonVisibility(!1);
            let e = a.content.firstElementChild.cloneNode(!0);
            s.src && (s.src = e.src), s.srcset && (a.srcset ? s.srcset = e.srcset : s.srcset = e.src), r && r.forEach(t => {
                t.href = e.getAttribute("data_url")
            }), t.setAttribute("aria-current", "true"), t.classList.add("btn-active"), t.focus(), s.onload = t => {
                i.classList.remove("is-loading")
            }, s.onerror = t => {
                i.classList.remove("is-loading")
            }
        }
        if (t.dataset.variantId) {
            var productCard = t.closest('.product-card');
            var productCardWrapper = t.closest('.product-card__wrapper');
            if (productCard) {
                var variantInput = productCard.querySelector('input[name="id"]');
                if (variantInput) variantInput.value = t.dataset.variantId;
                var pproductDiv = productCard.querySelector('.product-card_pproduct');
                if (pproductDiv) pproductDiv.dataset.productId = t.dataset.variantId;
            }
            if (productCardWrapper) {
                productCardWrapper.dataset.productId = t.dataset.variantId;
            }
            this.updateVariantPrice(t.dataset.variantId, productCard);
        }
        this.setButtonVisibility(!1);
        t.setAttribute("aria-current", "true");
        t.classList.add("btn-active");
    }
    updateVariantPrice(variantId, productCard) {
        if (!productCard) return;
        var productHandle = productCard.closest('.product-card__wrapper')?.dataset.handle;
        if (!productHandle) return;
        fetch(`/products/${productHandle}.js`)
            .then(response => response.json())
            .then(product => {
                var variant = product.variants.find(v => v.id == variantId);
                if (!variant) return;
                var priceContainer = productCard.querySelector('.price');
                if (!priceContainer) return;
                var priceRegular = priceContainer.querySelector('.price__regular');
                var priceSale = priceContainer.querySelector('.price__sale');
                var priceItemRegular = priceRegular?.querySelector('.price-item--regular');
                var priceItemSale = priceSale?.querySelector('.price-item--last');
                var compareAtPriceItem = priceSale?.querySelector('.price-item--regular');
                var formatMoney = (cents) => {
                    return (cents / 100).toFixed(2) + ' AED';
                };
                if (variant.compare_at_price && variant.compare_at_price > variant.price) {
                    if (priceRegular) priceRegular.classList.add('d-none');
                    if (priceSale) {
                        priceSale.classList.remove('d-none');
                        priceSale.classList.add('d-flex', 'middle-xs', 'fw-wrap');
                    }
                    if (priceItemSale) priceItemSale.textContent = formatMoney(variant.price);
                    if (compareAtPriceItem) compareAtPriceItem.textContent = formatMoney(variant.compare_at_price);
                } else {
                    if (priceRegular) {
                        priceRegular.classList.remove('d-none');
                        priceRegular.classList.add('d-block');
                    }
                    if (priceSale) {
                        priceSale.classList.add('d-none');
                        priceSale.classList.remove('d-flex', 'middle-xs', 'fw-wrap');
                    }
                    if (priceItemRegular) priceItemRegular.textContent = formatMoney(variant.price);
                }
                if (!variant.available) {
                    priceContainer.classList.add('price--sold-out');
                } else {
                    priceContainer.classList.remove('price--sold-out');
                }
            })
            .catch(error => console.error('Error fetching variant price:', error));
    }
    setButtonVisibility(e) {
        this.variantSwatchItems && this.variantSwatchItems.forEach(t => {
            e ? (t.setAttribute("aria-current", "true"), t.classList.add("btn-active")) : (t.removeAttribute("aria-current"), t.classList.remove("btn-active"))
        })
    }
}
customElements.define("sht-variant-swtch", SHTVariantSwatch);
class SHTMainProductVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-prd-variant-swtch", SHTMainProductVariantSwatch);
class SHTMainCollectionProductVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-coll-prd-variant-swtch", SHTMainCollectionProductVariantSwatch);
class SHTMainProductVariantSwatchWSelect extends SHTColorSwatch {}
customElements.define("sht-prd-variant-swtch-w-select", SHTMainProductVariantSwatchWSelect);
class SHTProductQuickViewVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-prd-qck-vw-variant-swtch", SHTProductQuickViewVariantSwatch);
class SHTFeaturedProductVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-featured-prd-variant-swtch", SHTFeaturedProductVariantSwatch);
class SHTProductComparisonVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-prd-comparison-variant-swtch", SHTProductComparisonVariantSwatch);
class SHTMainSearchVariantSwatch extends SHTColorSwatch {}
customElements.define("sht-srch-variant-swtch", SHTMainSearchVariantSwatch);
class SHTLoadMedia extends SHTCustomComponent {
    constructor() {
        super(), this.trigger = this.$(".js-load-media-trigger"), this.trigger.addEventListener("click", t => this.loadMedia())
    }
    loadMedia(t = !0, e = !0) {
        var s;
        this.pauseAllVideo(), this.getAttribute("loaded") || ((s = document.createElement("div")).appendChild(this.$("template").content.firstElementChild.cloneNode(!0)), this.setAttribute("loaded", !0), s = this.appendChild(s.querySelector("video, iframe")), t && s.focus(), e && this.trigger.classList.add("d-none"))
    }
    pauseAllVideo() {
        SHTHelper.qsa(".js-media-item-youtube").forEach(t => {
            t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }), SHTHelper.qsa(".js-media-item-vimeo").forEach(t => {
            t.contentWindow.postMessage('{"method":"pause"}', "*")
        }), SHTHelper.qsa(".js-media-item-video").forEach(t => t.pause())
    }
}
customElements.define("sht-load-media", SHTLoadMedia);
var VAR_LOCALIZATION_CACHE = new Map;
class SHTLocalization extends SHTCustomComponent {
    constructor() {
        super(), Shopify.designMode ? this.getSearchResults() : new IntersectionObserver((async (t, e) => {
            t[0].isIntersecting && (await this.getSearchResults(), e.unobserve(this))
        }).bind(this), {
            threshold: .25
        }).observe(this)
    }
    async getSearchResults() {
        SHTHelper.loadScript(this.dataset.jsFileId, this.dataset.jsFile, async function() {
            var t = this.dataset.url.replace(/\s/g, "-").toLowerCase(),
                e = VAR_LOCALIZATION_CACHE.get(t);
            e ? this.innerHTML = e : (e = await this.fetchResults(), VAR_LOCALIZATION_CACHE.set(t, e), this.innerHTML = e)
        }.bind(this))
    }
    async fetchResults() {
        return fetch(this.dataset.url).then(t => t.text()).then(t => {
            var e = document.createElement("div"),
                t = (e.innerHTML = t, e.querySelector("#" + this.dataset.sectionId));
            return t && t.innerHTML.trim().length ? t.innerHTML : ""
        }).catch(t => (console.error(t), ""))
    }
}
customElements.define("sht-localization", SHTLocalization);
class SHTCollapsibleRegion extends SHTCustomComponent {
    constructor() {
        super(), this.properties = this.dataset.properties ? JSON.parse(this.dataset.properties) : {}, this.triggers = this.$$(".js-collapsible-region-trigger"), this.contents = this.$$(".js-collapsible-region-content"), this.bodyWidth = document.body.clientWidth, this.isCollapsibleOnDesktop = this.properties.isCollapsibleOnDesktop, this.isCollapsibleOnMobile = this.properties.isCollapsibleOnMobile, this.init(), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.isCollapsibleOnDesktop && this.isCollapsibleOnMobile || window.addEventListener("resize", t => {
            this.bodyWidth = Math.floor(document.body.clientWidth), this.init()
        }), this.triggers.forEach(t => {
            t.addEventListener("click", t => {
                this.onTriggerClick(t.currentTarget)
            })
        })
    }
    init() {
        (!this.isCollapsibleOnDesktop && 769 < this.bodyWidth || !this.isCollapsibleOnMobile && this.bodyWidth <= 769) && this.removeAriaProps(), (this.isCollapsibleOnDesktop && 769 < this.bodyWidth || this.isCollapsibleOnMobile && this.bodyWidth <= 769) && this.restoreAriaProps()
    }
    removeAriaProps() {
        this.triggers.forEach(t => {
            t.style.pointerEvents = "none", t.setAttribute("tabindex", -1), t.removeAttribute("aria-controls"), t.removeAttribute("aria-expanded")
        }), this.contents.forEach(t => {
            t.removeAttribute("aria-describedby"), t.removeAttribute("role"), t.removeAttribute("hidden")
        })
    }
    restoreAriaProps() {
        this.triggers.forEach(t => {
            t.style.pointerEvents = "auto", t.setAttribute("aria-controls", this.properties.ariaControls), t.setAttribute("aria-expanded", "false"), t.removeAttribute("tabindex")
        }), this.contents.forEach(t => {
            t.setAttribute("aria-describedby", this.properties.ariaDescribedby), t.setAttribute("role", "region"), t.setAttribute("hidden", "")
        })
    }
    onTriggerClick(t) {
        var e = "true" === t.getAttribute("aria-expanded");
        this.toggle(!e, t)
    }
    toggle(t, e) {
        e.setAttribute("aria-expanded", "" + t);
        var s = this.$("#" + e.getAttribute("aria-controls"));
        t ? (e.classList.add("open"), s.removeAttribute("hidden")) : (e.classList.remove("open"), s.setAttribute("hidden", ""))
    }
    open() {
        this.toggle(!0)
    }
    close() {
        this.toggle(!1)
    }
}
customElements.define("sht-clps-rgn", SHTCollapsibleRegion);
class SHTDialogCore extends SHTCustomComponent {
    constructor() {
        super(), this.dialog = this.$(".dialog"), this.closeBtn = this.$$(".js-dialog-close-btn"), this.body = this.$(".js-dialog-body"), this.container = this.$(".js-dialog-container"), this.closeModalOnOverlayClick = this.dataset.closeModalOnOverlay || "true", this.opener = null, this.bodyElement = document.body, this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.closeBtn.forEach(t => {
            t.addEventListener("click", t => {
                this.closeModal()
            })
        }), this.addEventListener("click", t => {
            t.target.nodeName === this.tagName && "true" === this.closeModalOnOverlayClick && this.closeModal()
        }), this.addEventListener("keyup", t => "ESCAPE" === t.code.toUpperCase() && this.closeModal()), this.dialogAttrObserve()
    }
    dialogAttrObserve() {
        new MutationObserver((t, e) => {
            t.forEach(async t => {
                "hidden" == t.attributeName && (!this.hasAttribute("hidden") ? (this.dispatchEvent(new CustomEvent("opening", {
                    detail: {
                        opener: this.opener,
                        dialog: this
                    }
                })), await this.animationsComplete(), this.dispatchEvent(new CustomEvent("opened", {
                    detail: {
                        opener: this.opener,
                        dialog: this
                    }
                })), SHTHelper.trapFocus(this)) : (SHTHelper.removeTrapFocus(this.opener), this.dispatchEvent(new CustomEvent("closing", {
                    detail: {
                        opener: this.opener,
                        dialog: this
                    }
                })), await this.animationsComplete(), this.dispatchEvent(new CustomEvent("closed", {
                    detail: {
                        opener: this.opener,
                        dialog: this
                    }
                }))))
            })
        }).observe(this, {
            attributes: !0
        })
    }
    animationsComplete() {
        return Promise.allSettled(this.dialog.getAnimations({
            subtree: !0
        }).map(t => t.finished))
    }
    processBodyContent() {
        var t;
        this.template = this.$("template"), this.template && (t = this.template.content, this.body.appendChild(t))
    }
    showModal(t, e = !1) {
        SHTHelper.preventStickyHeaderReveal(), e && this.processBodyContent(), this.opener = t, this.toggleAttribute("hidden", !1), this.classList.add("is-active")
    }
    closeModal() {
        this.setAttribute("hidden", !0), this.classList.remove("is-active")
    }
}
class SHTDialogQuickShop extends SHTDialogCore {
    constructor() {
        super()
    }
    showModal(t) {
        SHTHelper.preventStickyHeaderReveal(), this.opener = t, this.opener?.setAttribute("disabled", "disabled"), this.processData(t), document.body.classList.add("o-hidden")
    }
    processData(t) {
        this.productElement = null, fetch(t.getAttribute("data-product-url")).then(t => t.text()).then(t => {
            t = (new DOMParser).parseFromString(t, "text/html");
            this.productElement = t.querySelector(".section-product-quick-view"), window.Shopify && Shopify.PaymentButton && Shopify.PaymentButton.init(), this.body.innerHTML = this.productElement.innerHTML, this.executeScriptElements(this.body), window.SHTProductMediaItemModel && window.SHTProductMediaItemModel.loadShopifyXR()
        }).finally(() => {
            this.toggleAttribute("hidden", !1), this.classList.add("is-active"), this.opener?.removeAttribute("disabled")
        })
    }
    closeModal() {
        this.setAttribute("hidden", !0), this.classList.remove("is-active"), document.body.classList.remove("o-hidden"), setTimeout(() => {
            this.body.innerHTML = ""
        }, 300)
    }
    executeScriptElements(t) {
        t = t.querySelectorAll("script");
        Array.from(t).forEach(t => {
            let e = document.createElement("script");
            Array.from(t.attributes).forEach(t => {
                e.setAttribute(t.name, t.value)
            }), e.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(e, t)
        })
    }
}
customElements.define("sht-dialog-quickshop", SHTDialogQuickShop);
class SHTDialog extends SHTDialogCore {
    constructor() {
        super()
    }
}
customElements.define("sht-dialog", SHTDialog);
class SHTProductSpecificationDialog extends SHTDialogCore {}
customElements.define("sht-product-specification-dialog", SHTProductSpecificationDialog);
class SHTQuantityInput extends SHTCustomComponent {
    constructor() {
        super(), this.input = this.$(".js-quantity-input"), this.changeEvent = new Event("change", {
            bubbles: !0
        }), this.$$(".js-quantity-btn").forEach(t => t.addEventListener("click", this.onButtonClickHandler.bind(this)))
    }
    onButtonClickHandler(t) {
        t.preventDefault();
        var e = this.input.value;
        "plus" === t.currentTarget.dataset.name ? (console.log("quantity increase"), this.input.stepUp()) : this.input.stepDown(), e !== this.input.value && this.input.dispatchEvent(this.changeEvent)
    }
}
customElements.define("sht-qty-inp", SHTQuantityInput);
class SHTCoreDrawer extends SHTCustomComponent {
    constructor() {
        super(), this.drawerWrapperElement = this.$(".js-drawer-wrapper"), this.drawerOverlayElement = this.$(".js-drawer-overlay"), this.closeBtnElement = this.$(".js-drawer-btn-close"), this.opener = null, this.bodyElement = document.body, this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.drawerOverlayElement.addEventListener("click", this.closeDrawer.bind(this)), this.closeBtnElement.addEventListener("click", this.closeDrawer.bind(this)), window.addEventListener("load", () => {
            this.removeAttribute("hidden")
        }), this.addEventListener("keyup", t => "ESCAPE" === t.code.toUpperCase() && this.closeDrawer()), this.drawerAttrObserve()
    }
    drawerAttrObserve() {
        new MutationObserver((t, e) => {
            t.forEach(async t => {
                "open" == t.attributeName && (this.hasAttribute("open") ? (this.opener?.removeAttribute("disabled"), this.opener?.setAttribute("aria-expanded", "true"), this.setAttribute("aria-hidden", "false"), this.dispatchEvent(new Event("opening")), this.bodyElement.classList.add("o-hidden"), this.classList.add("active"), await this.animationsComplete(), this.dispatchEvent(new Event("opened")), SHTHelper.trapFocus(this)) : (SHTHelper.removeTrapFocus(this.opener), this.setAttribute("aria-hidden", "true"), this.opener?.setAttribute("aria-expanded", "false"), this.opener?.removeAttribute("disabled"), this.dispatchEvent(new Event("closing")), this.bodyElement.classList.remove("o-hidden"), this.classList.remove("active"), await this.animationsComplete(), this.dispatchEvent(new Event("closed"))))
            })
        }).observe(this, {
            attributes: !0
        })
    }
    animationsComplete() {
        return Promise.allSettled(this.drawerWrapperElement.getAnimations().map(t => t.finished))
    }
    openDrawer(t) {
        SHTHelper.preventStickyHeaderReveal(), this.opener = t, this.removeAttribute("hidden"), this.toggleAttribute("open", !0)
    }
    closeDrawer() {
        this.toggleAttribute("open", !1)
    }
}
class SHTDrawer extends SHTCoreDrawer {}
customElements.define("sht-drwr", SHTDrawer);
class SHTCartDrawer extends SHTCoreDrawer {
    getSectionsToRender() {
        return [{
            id: "cart-drawer",
            section: "cart-drawer",
            space_selector: "#cartDrawer"
        }]
    }
}
customElements.define("sht-cart-drwr", SHTCartDrawer);
class SHTCartDrawerCartNote extends SHTCustomComponent {
    constructor() {
        super(), this.addEventListener("change", SHTHelper.debounce(t => {
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
customElements.define("sht-cart-drwr-note", SHTCartDrawerCartNote);
class SHTCartDrawerQuantityInput extends SHTCustomComponent {
    constructor() {
        super(), this.input = this.$(".js-cart-drawer-quantity-input"), this.changeEvent = new Event("change", {
            bubbles: !0
        }), this.button = this.$$(".js-cart-drawer-quantity-btn");
        for (let t = 0, e = this.button.length; t < e; t++) this.button[t].addEventListener("click", this.onButtonClickHandler.bind(this))
    }
    onButtonClickHandler(t) {
        t.preventDefault();
        var e = this.input.value;
        "plus" === t.currentTarget.dataset.name ? (console.log("quantity increase"), this.input.stepUp()) : this.input.stepDown(), e !== this.input.value && this.input.dispatchEvent(this.changeEvent)
    }
}
customElements.define("sht-cart-drwr-qty-inp", SHTCartDrawerQuantityInput);
class SHTCartDrawerRemoveButton extends SHTCustomComponent {
    constructor() {
        super(), this.addEventListener("click", t => {
            t.preventDefault(), this.closest("sht-cart-drwr-frm").updateQuantity(this.dataset.index, 0)
        })
    }
}
customElements.define("sht-cart-drwr-rmv-btn", SHTCartDrawerRemoveButton);
class SHTTextHotSpot extends SHTCustomComponent {
    constructor() {
        super(), this.btn = this.$$(".js-text-hotspot-button"), this.content = this.$$(".js-text-hotspot-content"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.btn.forEach(t => {
            t.addEventListener("click", t => {
                this.resetActiveState();
                var e = t.currentTarget.getAttribute("aria-controls");
                t.currentTarget.classList.add("is-active"), this.$(".js-text-hotspot-content#" + e)?.classList.add("is-active")
            })
        }), this.content.forEach(t => {
            t.addEventListener("click", t => {
                this.resetActiveState();
                var e = t.currentTarget.getAttribute("id");
                t.currentTarget.classList.add("is-active"), this.$(`.js-text-hotspot-button[aria-controls="${e}"]`)?.classList.add("is-active")
            })
        })
    }
    resetActiveState() {
        this.btn.forEach(t => t.classList.remove("is-active")), this.content.forEach(t => t.classList.remove("is-active"))
    }
}
customElements.define("sht-text-hotspots", SHTTextHotSpot);
class SHTDetailsExposal extends SHTCustomComponent {
    constructor() {
        super(), this.detailsElm = this.$("details"), this.content = this.detailsElm.querySelector("summary").nextElementSibling, this.detailsElm.addEventListener("focusout", this.onFocusOutHandler.bind(this)), this.detailsElm.addEventListener("toggle", this.onToggleHandler.bind(this))
    }
    onFocusOutHandler() {
        setTimeout(() => {
            this.contains(document.activeElement) || this.close()
        })
    }
    onToggleHandler() {
        this.detailsElm.hasAttribute("open") ? this.detailsElm.querySelector("summary").setAttribute("aria-expanded", !0) : this.detailsElm.querySelector("summary").setAttribute("aria-expanded", !1)
    }
    close() {
        this.detailsElm.removeAttribute("open"), this.detailsElm.querySelector("summary").setAttribute("aria-expanded", !1)
    }
}
customElements.define("sht-dtl-exposal", SHTDetailsExposal);
class SHTShareProductButton extends SHTCustomComponent {
    constructor() {
        super(), this.webShareApiContainer = this.$(".js-web-share-api-container"), this.webShareApiButton = this.$(".js-web-share-api-btn"), this.noneWebShareApiContainer = this.$(".js-none-web-share-api-container"), this.noneWebShareApiButton = this.$(".js-none-web-share-api-btn"), this.copyLinkButton = this.$(".js-social-share-copy-link"), this.init()
    }
    init() {
        navigator.share ? (this.webShareApiContainer.removeAttribute("hidden"), this.noneWebShareApiContainer.setAttribute("hidden", !0), this.webShareApiButton.addEventListener("click", () => {
            navigator.share({
                url: this.dataset.productUrl,
                title: document.title
            }).then(() => {
                console.log("Thanks for sharing!")
            }).catch(console.error)
        })) : (this.noneWebShareApiContainer.removeAttribute("hidden"), this.webShareApiContainer.setAttribute("hidden", !0), this.copyLinkButton.addEventListener("click", t => {
            this.copyToClipboard(t.currentTarget)
        }))
    }
    copyToClipboard(t) {
        navigator.clipboard.writeText(this.dataset.productUrl).then(() => {
            t.querySelector(".js-social-share-copy-link-label").textContent = t.dataset.linkCopiedToClipboard
        })
    }
}
customElements.define("sht-share-prd-btn", SHTShareProductButton);
class SHTHeader extends SHTCustomComponent {
    constructor() {
        super(), this.searchHeaderOpenBtn = this.$(".js-search-open-trigger"), this.predictiveSearchElm = this.$(".js-predictive-search"), this.predictiveSearchInputElm = this.$(".js-predictive-search-input"), this.headerNavigation = this.$(".js-header-navigation"), this.bodyElement = document.body, this.toggleNavItemBtn = this.$$(".js-toggle-nav-item"), this.bindEventHandlers(), this.dataset.showSearchFull
    }
    bindEventHandlers() {
        this.searchHeaderOpenBtn.addEventListener("click", this.openPredictiveSearch.bind(this))
    }
    openPredictiveSearch(t) {
        this.classList.add("header--predictive-search-open"), this.bodyElement.classList.add("o-hidden"), setTimeout(() => {
            SHTHelper.trapFocus(this.predictiveSearchElm, this.predictiveSearchInputElm)
        }, 650)
    }
}
customElements.define("sht-header", SHTHeader);
class SHTMenuHeader extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    init() {
        this.header = SHTHelper.qs("sht-header"), this.details = this.$("details"), this.summaries = this.$$("summary"), this.summary = this.details.querySelector("summary"), this.content = this.summary.nextElementSibling, this.content_animations = null, this.menu_body_drawer = SHTHelper.qs(".js-menu-drawer-body-container"), this.level_one_btn = this.$$('.js-menu-header-back-btn[data-level="1"]'), this.level_two_btn = this.$$('.js-menu-header-back-btn[data-level="2"]');
        for (let t = 0, e = this.summaries.length; t < e; t++) {
            var s = this.summaries[t];
            s.addEventListener("click", t => {
                t.preventDefault();
                let e = t.currentTarget.closest("details");
                t.currentTarget.setAttribute("aria-expanded", !e.open), e.hasAttribute("open") ? (e.classList.remove("is-open"), setTimeout(() => {
                    e.open = !1
                }, 100), "1" == e.dataset.level && (this.header.classList.remove("header-menu--open"), this.menu_body_drawer?.classList.remove("menu--is-open"))) : (this.open(), e.open = !0, setTimeout(() => {
                    e.classList.add("is-open")
                }), "1" == e.dataset.level && (this.header.classList.add("header-menu--open"), this.menu_body_drawer?.classList.add("menu--is-open")))
            }), s.addEventListener("keyup", this.onKeyUpEscEvent.bind(this))
        }
        this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.onBodyClick = this.handleBodyClick.bind(this), this.level_one_btn.forEach(t => {
            t.addEventListener("click", t => {
                let e = t.currentTarget.closest("details");
                t = e.querySelector("summary:first-child");
                t.setAttribute("aria-expanded", !e.open), e.hasAttribute("open") && (e.classList.toggle("is-open", !e.open), setTimeout(() => {
                    e.open = !1
                }, 100), "1" == e.dataset.level && (this.header.classList.remove("header-menu--open"), this.menu_body_drawer?.classList.remove("menu--is-open")), t.focus())
            })
        }), this.level_two_btn.forEach(t => {
            t.addEventListener("click", t => {
                let e = t.currentTarget.closest("details");
                t = e.querySelector("summary:first-child");
                t.setAttribute("aria-expanded", !e.open), e.hasAttribute("open") && (e.classList.toggle("is-open", !e.open), setTimeout(() => {
                    e.open = !1
                }, 100), "1" == e.dataset.level && (this.header.classList.remove("header-menu--open"), this.menu_body_drawer?.classList.remove("menu--is-open")), t.focus())
            })
        })
    }
    onKeyUpEscEvent(t) {
        if ("ESCAPE" === t.code.toUpperCase()) {
            let e = t.target.closest("details[open]");
            if (e) {
                document.body.removeEventListener("click", this.onBodyClick);
                let t = e.querySelector("summary");
                "1" == e.dataset.level && (e.hasAttribute("open") ? (this.header.classList.remove("header-menu--open"), this.menu_body_drawer?.classList.remove("menu--is-open")) : (this.header.classList.add("header-menu--open"), this.menu_body_drawer?.classList.add("menu--is-open"))), e.classList.remove("is-open"), this.menu_body_drawer?.classList.remove("menu--is-open"), setTimeout(() => {
                    e.removeAttribute("open"), t.setAttribute("aria-expanded", !1)
                }, 100), t.focus()
            }
        }
    }
    close() {
        "1" == this.details.dataset.level && this.details.hasAttribute("open") && (this.header.classList.remove("header-menu--open"), this.menu_body_drawer?.classList.remove("menu--is-open"));
        for (let s = 0, t = this.summaries.length; s < t; s++) {
            let t = this.summaries[s],
                e = t.closest("details");
            e.classList.remove("is-open"), setTimeout(() => {
                e.removeAttribute("open"), t.setAttribute("aria-expanded", !1)
            }, 100)
        }
        document.body.removeEventListener("click", this.onBodyClick)
    }
    open() {
        document.body.addEventListener("click", this.onBodyClick)
    }
    handleBodyClick(t) {
        let e = t.target;
        setTimeout(() => {
            this.contains(e) || this.close()
        })
    }
}
customElements.define("sht-menu-header", SHTMenuHeader);
class SHTStickyHeader extends SHTCustomComponent {
    constructor() {
        super(), this.sticky_state = this.dataset.stickyState
    }
    connectedCallback() {
        if (this.prevent_reveal = !1, this.css_ary = ["top-0", "zi-4", "header--sticky", "is-header-hide"], this.header = SHTHelper.qs(".js-section-header"), this.sht_header = SHTHelper.qs("sht-header"), this.currentScrollTop = 0, this.headerBounds = {}, this.product_sticky_bar = SHTHelper.qs(".js-product-sticky-bar"), this.bindEventHandlers(), "false" == this.sticky_state) return !1;
        this.createObserver()
    }
    bindEventHandlers() {
        if ("false" == this.sticky_state) return !1;
        this.preventStickyHeaderReveal = () => this.prevent_reveal = !0, this.addEventListener("preventStickyHeaderReveal", this.preventStickyHeaderReveal), window.addEventListener("scroll", t => {
            this.onScrollHandle(), SHTHelper.qde.style.setProperty("--header-height", this.sht_header.offsetHeight + "px")
        }, !1)
    }
    createObserver() {
        new IntersectionObserver((t, e) => {
            this.header_bounds = t[0].intersectionRect, e.disconnect()
        }).observe(this.header)
    }
    onScrollHandle() {
        var t;
        this.header_bounds && (t = window.pageYOffset || SHTHelper.qde.scrollTop, "always_reveal" == this.sticky_state ? (requestAnimationFrame(() => {
            this.product_sticky_bar?.classList.add("header-reveal", "product-sticky-bar--sticky")
        }), t > this.parentNode.offsetTop - 1 && 0 < t ? requestAnimationFrame(this.reveal.bind(this)) : requestAnimationFrame(this.reset.bind(this))) : (this.getBoundingClientRect().bottom < 0 ? (this.header.classList.add("header--sticky", "is-header-sticky"), requestAnimationFrame(() => {
            this.product_sticky_bar?.classList.add("header-reveal")
        })) : (this.header.classList.remove("header--sticky", "is-header-sticky"), requestAnimationFrame(() => {
            this.product_sticky_bar?.classList.remove("header-reveal")
        })), t < this.currentScrollTop && this.getBoundingClientRect().bottom < 0 ? (this.header.classList.add("is-header-show"), requestAnimationFrame(() => {
            this.product_sticky_bar?.classList.add("header-reveal")
        })) : (this.header.classList.remove("is-header-show"), requestAnimationFrame(() => {
            this.product_sticky_bar?.classList.remove("header-reveal")
        }), this.closeMenu()), this.currentScrollTop = t))
    }
    hide() {
        this.header.classList.add("is-header-hide", "p-sticky", "top-0", "zi-4", "header--sticky"), this.closeMenu()
    }
    reveal() {
        this.header.classList.add("top-0", "animate", "zi-4", "p-sticky", "header--sticky"), this.header.classList.remove("is-header-show")
    }
    reset() {
        this.header.classList.remove("is-header-show", "top-0", "animate", "header--sticky", "p-sticky")
    }
    closeMenu() {
        this.menus = this.header.querySelectorAll("sht-menu-header");
        for (let t = 0, e = this.menus.length; t < e; t++) this.menus[t].close()
    }
    disconnectedCallback() {
        this.removeEventListener("preventStickyHeaderReveal", this.preventStickyHeaderReveal), window.removeEventListener("scroll", this.onScrollHandle.bind(this))
    }
}
customElements.define("sht-sticky-header", SHTStickyHeader);
class SHTCartNotificationPanel extends SHTCustomComponent {
    constructor() {
        super(), this.elms = {
            notification_wrapper: this.$(".js-cart-notification-panel-wrapper"),
            notification_container: this.$(".js-cart-notification-panel-container"),
            close_buttons: this.$$(".js-cart-notification-panel-close-btn")
        }, this.dismiss_timeout = null;
        for (let t = 0, e = this.elms.close_buttons.length; t < e; t++) this.elms.close_buttons[t].addEventListener("click", this.close.bind(this))
    }
    open() {
        this.style.maxHeight = this.scrollHeight + "px", this.togglePanel(!0), this.elms.notification_container.focus(), this.addEventListener("mouseover", this.onMouseOverHandle.bind(this)), this.addEventListener("mouseout", this.onMouseOutHandle.bind(this)), this.setDismissTimeout(), SHTHelper.trapFocus(this)
    }
    close() {
        this.style.maxHeight = "0px", this.clearDismissTimeout(), this.togglePanel(!1), this.dispatchEvent(new Event("closed")), SHTHelper.removeTrapFocus()
    }
    clearDismissTimeout() {
        clearTimeout(this.dismiss_timeout)
    }
    renderContents(s) {
        this.productId = s.id;
        var i = this.getSectionsToRender();
        for (let t = 0, e = i.length; t < e; t++) {
            var r = SHTHelper.qs(i[t].space_selector);
            r && ("#headerCartStatus" == i[t].space_selector && r.classList.add("header-cart-status--animate"), r.innerHTML = this.getSectionInnerHTML(s.sections[i[t].id], i[t].selector))
        }
        this.open()
    }
    getSectionsToRender() {
        return [{
            id: "cart-notification-panel-product",
            selector: ".js-cart-notification-panel-product-" + this.productId,
            space_selector: ".js-cart-notification-panel-content"
        }, {
            id: "header-cart-status",
            section: "header-cart-status",
            space_selector: "#headerCartStatus"
        }, {
            id: "cart-notification-panel-product",
            selector: ".js-cart-notification-panel-item-count",
            space_selector: ".js-cart-notification-panel-item-count-content"
        }]
    }
    getSectionInnerHTML(t, e = ".shopify-section") {
        return (new DOMParser).parseFromString(t, "text/html").querySelector(e).innerHTML
    }
    onMouseOverHandle(t) {
        this.clearDismissTimeout()
    }
    onMouseOutHandle(t) {
        this.setDismissTimeout()
    }
    togglePanel(t) {
        t ? this.toggleAttribute("hidden", !1) : this.setAttribute("hidden", !0)
    }
    setDismissTimeout() {
        this.dismiss_timeout = setTimeout(function() {
            this.close()
        }.bind(this), 5e3)
    }
}
customElements.define("sht-cart-noti", SHTCartNotificationPanel);
class SHTCartDrawerForm extends SHTCustomComponent {
    constructor() {
        super(), this.totalItems = Array.from(this.$$(".js-cart-drawer-quantity-input")).reduce((t, e) => t + parseInt(e.value), 0), this.drawerCartElement = SHTHelper.qs("sht-cart-drwr"), this.wrapperElement = this.drawerCartElement.querySelector(".js-cart-drawer-wrapper"), this.cartNotification = SHTHelper.qs("sht-cart-noti"), this.addEventListener("change", SHTHelper.debounce(t => {
            this.onChange(t)
        }, 300))
    }
    onChange(t) {
        this.updateQuantity(t.target.dataset.index, t.target.value, document.activeElement.dataset.name)
    }
    renderContents(i) {
        this.wrapperElement.classList.contains("is-empty") && this.wrapperElement.classList.remove("is-empty"), this.getSectionsToRender().forEach(s => {
            s.selectors?.forEach(t => {
                var e = SHTHelper.qid(s.id);
                e && i.sections[s.section] && ((e.querySelector(t) || e).innerHTML = this.getSectionInnerHTML(i.sections[s.section], t))
            })
        })
    }
    getSectionsToRender() {
        return [{
            id: "cartDrawer",
            section: "cart-drawer",
            selectors: [".js-cart-drawer-wrapper"]
        }, {
            id: "mainCart",
            section: "main-cart",
            selectors: ["#mainCartContainer"]
        }]
    }
    updateQuantity(e, t, s) {
        let i = this.getSectionsToRender(),
            r;
        this.cartNotification && (i = [...i, ...this.cartNotification.getSectionsToRender()]);
        t = JSON.stringify({
            line: e,
            quantity: t,
            sections: i.map(t => t.section),
            sections_url: window.location.pathname
        });
        this.updateButtonState(!0), fetch("" + window.routes.cart_change_url, {
            ...SHTHelper.fetchConfigJSON,
            body: t
        }).then(t => t.text()).then(t => {
            (r = JSON.parse(t)).errors ? setTimeout(() => {
              if (r.errors.includes('line parameter is invalid') || r.errors.includes('invalid')) {
                // Refresh cart data without page reload
                this.refreshCartData();
            } else {
                this.updateErrorRegions(e, r.errors);
            }
                // this.updateErrorRegions(e, r.errors)
            }, 100) : (this.closest(".js-cart-drawer-wrapper").classList.toggle("is-empty", 0 === r.item_count), this.getSectionsToRender().forEach(s => {
                s.selectors.forEach(t => {
                    var e = SHTHelper.qid(s.id);
                    e && ((e.querySelector(t) || e).innerHTML = this.getSectionInnerHTML(r.sections[s.section], t))
                })
            }), (t = SHTHelper.qid("cartDrawerItem-" + e)) && (t = t.querySelector(".js-cart-drawer-quantity-btn-" + s)) && t.focus(), this.cartNotification && this.cartNotification.getSectionsToRender().forEach(t => {
                "header-cart-status" == t.id && (SHTHelper.qs(t.space_selector).innerHTML = this.cartNotification.getSectionInnerHTML(r.sections[t.id], t.selector))
            }))
        }).catch(t => {
            this.$(".js-cart-drawer-errors").textContent = SHTLanguage.cart.ERROR, console.log(t.message, t.stack)
        }).finally(() => {
            this.updateButtonState(!1)
        })
    }
    updateErrorRegions(t, e) {
        var s = SHTHelper.qs("#cart-drawer-line-item-error-" + t),
            t = this.$(`.js-cart-drawer-quantity-input[data-index="${t}"]`);
        s.querySelector(".js-cart-drawer-form-item-error-message").innerHTML = e, s.classList.remove("d-none-important"), t && (t.value = t.dataset.cartQuantity)
    }
    getSectionInnerHTML(t, e) {
        return (new DOMParser).parseFromString(t, "text/html").querySelector(e).innerHTML
    }
    async refreshCartData() {
        try {
            // Fetch fresh cart data
            const response = await fetch('/cart.js');
            const cartData = await response.json();
            
            // Get fresh cart sections
            const sections = this.getSectionsToRender();
            const sectionsParam = sections.map(s => s.section).join(',');
            
            const sectionsResponse = await fetch(`${window.location.pathname}?sections=${sectionsParam}`);
            const sectionsData = await sectionsResponse.json();
            
            // Update cart UI with fresh data
            this.renderContents({ sections: sectionsData, item_count: cartData.item_count });
            
            // Update header cart status
            if (this.cartNotification) {
                this.cartNotification.getSectionsToRender().forEach(section => {
                    if (section.id === 'header-cart-status') {
                        const element = SHTHelper.qs(section.space_selector);
                        if (element && sectionsData[section.id]) {
                            element.innerHTML = this.cartNotification.getSectionInnerHTML(sectionsData[section.id], section.selector);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Failed to refresh cart data:', error);
            // Fallback to page reload only if fetch fails
            window.location.reload();
        }
    }
    updateButtonState(t) {
        var s = this.$$(".js-cart-drawer-btn"),
            e = this.drawerCartElement.querySelector(".js-cart-drawer-submit-btn");
        if (t) {
            for (let t = 0, e = s.length; t < e; t++) s[t].setAttribute("disabled", "disabled");
            e && e.setAttribute("disabled", "disabled")
        } else {
            for (let t = 0, e = s.length; t < e; t++) s[t].removeAttribute("disabled", "disabled");
            e && e.removeAttribute("disabled")
        }
    }
}
customElements.define("sht-cart-drwr-frm", SHTCartDrawerForm);
class SHTLoadDynamicCheckoutButtonDynamicCheckoutButton extends SHTCustomComponent {
    constructor() {
        super(), this.template = this.$("template"), this.onLoadDynamicCheckoutButton = this.onHandleLoadDynamicCheckoutButton.bind(this), this.bindEventHandlers(), this.isMouseenter = !1, this.json = JSON.parse(SHTHelper.qs('#shopify-features[type="application/json"]').textContent), Shopify.designMode ? this.loadDynamicCheckoutButton() : (window.addEventListener("scroll", this.onLoadDynamicCheckoutButton, !1), window.addEventListener("load", function(t) {
            let e = setTimeout(function() {
                this.isMouseenter || (this.loadDynamicCheckoutButton(), clearTimeout(e)), this.isMouseenter = !0
            }.bind(this), 3e3)
        }.bind(this)), ["mouseover"].forEach(function(t) {
            SHTHelper.qs("body").addEventListener(t, this.onLoadDynamicCheckoutButton)
        }.bind(this)))
    }
    onHandleLoadDynamicCheckoutButton(t) {
        this.isMouseenter || this.loadDynamicCheckoutButton(), t.currentTarget.removeEventListener(t.type, this.onLoadDynamicCheckoutButton), this.isMouseenter = !0
    }
    loadDynamicCheckoutButton() {
        new IntersectionObserver((t, s) => {
            t.forEach(t => {
                var e;
                1 !== t.intersectionRatio || this.getAttribute("loaded") || (t = this.template.content.firstElementChild.cloneNode(!0), (e = document.createElement("script")).src = this.json.smart_payment_buttons_url, e.setAttribute("data-source-attribute", "shopify.dynamic_checkout.product.init"), this.parentNode.insertBefore(t, this.nextSibling), this.parentNode.insertBefore(e, this.nextSibling), this.setAttribute("loaded", !0), s.unobserve(this))
            })
        }, {
            root: null,
            rootMargin: "50px 0px",
            threshold: 0
        }).observe(this)
    }
    bindEventHandlers() {}
}
customElements.define("sht-load-dyn-co-btn", SHTLoadDynamicCheckoutButtonDynamicCheckoutButton);
class SHTHorizontalCarousel extends SHTCustomComponent {
    constructor() {
        super(), this.sectionID = this.dataset.sectionId, this.carousels = this.$$(".js-carousel-item"), this.container = this.$(".js-carousel-items"), this.totalItems = this.carousels.length, this.prevBtnElement = this.$(".js-carousel-prev-btn"), this.nextBtnElement = this.$(".js-carousel-next-btn"), this.currentElement = this.$(".js-carousel-counter-current"), this.totalElement = this.$(".js-carousel-counter-total"), this.paginationElement = this.$(".js-carousel-pagination"), this.init(), this.bindEventHandlers()
    }
    init() {
        this.itemsToShow = Array.from(this.carousels).filter(t => 0 < t.clientWidth), this.itemsToShow.length < 2 ? this.horizontalTogglePagination(!1) : (this.gutter = parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-right")), this.itemOffset = this.itemsToShow[1].offsetLeft - this.itemsToShow[0].offsetLeft, this.itemsPerPage = Math.floor((this.container.clientWidth - this.itemsToShow[0].offsetLeft) / this.itemOffset), this.totalPages = this.itemsToShow.length - this.itemsPerPage + 1, this.updateCarousel())
    }
    updateCarousel() {
        var t = this.currentPage;
        this.currentPage = Math.round(this.container.scrollLeft / this.itemOffset) + 1, 0 < this.currentPage && 0 < this.totalPages && (this.totalElement && (this.totalElement.textContent = this.totalPages), this.currentElement) && (this.currentElement.innerHTML = this.currentPage + `<span class="visually-hidden">${this.currentElement.dataset.accessibilityMessage}</span>`), this.currentPage != t && this.dispatchEvent(new CustomEvent("itemChanged", {
            detail: {
                currentPage: this.currentPage,
                currentElement: this.itemsToShow[this.currentPage - 1],
                container: this
            }
        })), this.isItemVisible(this.itemsToShow[0]) && 0 === this.container.scrollLeft ? this.prevBtnElement.setAttribute("disabled", "disabled") : this.prevBtnElement.removeAttribute("disabled"), this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) ? this.nextBtnElement.setAttribute("disabled", "disabled") : this.nextBtnElement.removeAttribute("disabled"), 1 < this.totalPages && this.horizontalTogglePagination(!0), this.totalPages <= 1 && this.horizontalTogglePagination(!1)
    }
    isItemVisible(t, e = 0) {
        e = this.container.clientWidth + this.container.scrollLeft - e + 1;
        return t.offsetLeft + t.clientWidth <= e && t.offsetLeft >= this.container.scrollLeft
    }
    horizontalTogglePagination(t) {
        t ? (this.paginationElement?.classList.remove("d-none-important"), this.paginationElement?.classList.add("d-flex")) : (this.paginationElement?.classList.remove("d-flex"), this.paginationElement?.classList.add("d-none-important"))
    }
    onButtonClick(t) {
        t.preventDefault();
        let e = 1,
            s = 0;
        window.matchMedia("(min-width: 769px)").matches && (e = t.currentTarget.dataset.step), 0 != this.container.scrollLeft && !this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) || (s = this.gutter), this.itemScrollPosition = "next" === t.currentTarget.name ? this.container.scrollLeft - s + e * this.itemOffset : this.container.scrollLeft + s - e * this.itemOffset, window.requestAnimationFrame(() => this.container.scrollTo({
            left: this.itemScrollPosition,
            behavior: "smooth"
        }))
    }
    bindEventHandlers() {
        new ResizeObserver(t => this.init()).observe(this.container);
        new IntersectionObserver(((t, e) => {
            t[0].isIntersecting && (this.init(), e.unobserve(this))
        }).bind(this)).observe(this), this.prevBtnElement && this.prevBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.nextBtnElement && this.nextBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.container.addEventListener("scroll", SHTHelper.debounce(this.updateCarousel.bind(this), 100))
    }
}
customElements.define("sht-horiz-carousel", SHTHorizontalCarousel);
class SHTVerticalCarousel extends SHTCustomComponent {
    constructor() {
        super(), this.sectionID = this.dataset.sectionId, this.carousels = this.$$(".js-carousel-item"), this.container = this.$(".js-carousel-items"), this.totalItems = this.carousels.length, this.prevBtnElement = this.$(".js-carousel-prev-btn"), this.nextBtnElement = this.$(".js-carousel-next-btn"), this.currentElement = this.$(".js-carousel-counter-current"), this.totalElement = this.$(".js-carousel-counter-total"), this.paginationElement = this.$(".js-carousel-pagination"), this.slideshow = SHTHelper.qs(`sht-prd-slideshow[data-section="${this.dataset.section}"]`), this.carousel = SHTHelper.qs(`sht-carousel[data-section-id="${this.dataset.section}"]`), this.transform(), window.addEventListener("resize", t => {
            this.transform(t)
        })
    }
    transform(t) {
        window.matchMedia("(min-width: 769px)").matches ? setTimeout(() => {
            this.init(), this.bindEventHandlers(), void 0 !== t && this.setActiveMedia()
        }, 200) : setTimeout(() => {
            this.horizontalInit(), this.horizontalBindEventHandlers(), void 0 !== t && this.horizontalSetActiveMedia()
        }, 200)
    }
    horizontalInit() {
        this.itemsToShow = Array.from(this.carousels).filter(t => 0 < t.clientWidth), this.itemsToShow.length < 2 ? this.horizontalTogglePagination(!1) : (this.gutter = parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-right")), this.itemOffset = this.itemsToShow[1].offsetLeft - this.itemsToShow[0].offsetLeft, this.itemsPerPage = Math.floor((this.container.clientWidth - this.itemsToShow[0].offsetLeft) / this.itemOffset), this.totalPages = this.itemsToShow.length - this.itemsPerPage + 1, this.horizontalUpdateCarousel())
    }
    horizontalUpdateCarousel() {
        var t = this.currentPage;
        this.currentPage = Math.round(this.container.scrollLeft / this.itemOffset) + 1, 0 < this.currentPage && 0 < this.totalPages && (this.totalElement && (this.totalElement.textContent = this.totalPages), this.currentElement) && (this.currentElement.innerHTML = this.currentPage + `<span class="visually-hidden">${this.currentElement.dataset.accessibilityMessage}</span>`), this.currentPage != t && this.dispatchEvent(new CustomEvent("itemChanged", {
            detail: {
                currentPage: this.currentPage,
                currentElement: this.itemsToShow[this.currentPage - 1],
                container: this
            }
        })), this.horizontalIsItemVisible(this.itemsToShow[0]) && 0 === this.container.scrollLeft ? this.prevBtnElement.setAttribute("disabled", "disabled") : this.prevBtnElement.removeAttribute("disabled"), this.horizontalIsItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) ? this.nextBtnElement.setAttribute("disabled", "disabled") : this.nextBtnElement.removeAttribute("disabled"), 1 < this.totalPages && this.horizontalTogglePagination(!0), this.totalPages <= 1 && this.horizontalTogglePagination(!1)
    }
    horizontalIsItemVisible(t, e = 0) {
        e = this.container.clientWidth + this.container.scrollLeft - e;
        return t.offsetLeft + t.clientWidth <= e && t.offsetLeft >= this.container.scrollLeft
    }
    horizontalOnButtonClick(t) {
        t.preventDefault();
        let e = 1,
            s = 0;
        window.matchMedia("(min-width: 769px)").matches && (e = t.currentTarget.dataset.step), 0 != this.container.scrollLeft && !this.horizontalIsItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) || (s = this.gutter), this.itemScrollPosition = "next" === t.currentTarget.name ? this.container.scrollLeft - s + e * this.itemOffset : this.container.scrollLeft + s - e * this.itemOffset, window.requestAnimationFrame(() => this.container.scrollTo({
            left: this.itemScrollPosition,
            behavior: "smooth"
        }))
    }
    horizontalBindEventHandlers() {
        this.prevBtnElement && this.prevBtnElement.addEventListener("click", this.horizontalOnButtonClick.bind(this)), this.nextBtnElement && this.nextBtnElement.addEventListener("click", this.horizontalOnButtonClick.bind(this)), this.container.addEventListener("scroll", SHTHelper.debounce(this.horizontalUpdateCarousel.bind(this), 100))
    }
    horizontalTogglePagination(t) {
        t ? (this.paginationElement?.classList.remove("d-none-important"), this.paginationElement?.classList.add("d-flex")) : (this.paginationElement?.classList.remove("d-flex"), this.paginationElement?.classList.add("d-none-important"))
    }
    horizontalSetActiveMedia() {
        var t = this.$("sht-vert-carousel-itm.is-active-item");
        t && (this.container.scrollTo({
            left: t.offsetLeft,
            behavior: "auto"
        }), t = this.slideshow.$(`sht-carousel-itm[data-media-id="${t.dataset.mediaTargetId}"]`), this.carousel.querySelector(".js-carousel-items").scrollTo({
            left: t.offsetLeft,
            behavior: "auto"
        }))
    }
    init() {
        this.itemsToShow = Array.from(this.carousels).filter(t => 0 < t.clientWidth), this.itemsToShow.length < 2 ? this.togglePagination(!1) : (this.gutter = parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(this.itemsToShow[1], null).getPropertyValue("padding-bottom")), this.itemOffset = this.itemsToShow[1].offsetTop - this.itemsToShow[0].offsetTop, this.itemsPerPage = Math.floor((this.container.clientHeight - this.itemsToShow[0].offsetTop) / this.itemOffset), this.totalPages = this.itemsToShow.length - this.itemsPerPage + 1, this.updateCarousel())
    }
    updateCarousel() {
        var t = this.currentPage;
        this.currentPage = Math.round(this.container.scrollTop / this.itemOffset) + 1, 0 < this.currentPage && 0 < this.totalPages && (this.totalElement && (this.totalElement.textContent = this.totalPages), this.currentElement) && (this.currentElement.innerHTML = this.currentPage + `<span class="visually-hidden">${this.currentElement.dataset.accessibilityMessage}</span>`), this.currentPage != t && this.dispatchEvent(new CustomEvent("itemChanged", {
            detail: {
                currentPage: this.currentPage,
                currentElement: this.itemsToShow[this.currentPage - 1],
                container: this
            }
        })), this.isItemVisible(this.itemsToShow[0]) && 0 === this.container.scrollTop ? this.prevBtnElement.setAttribute("disabled", "disabled") : this.prevBtnElement.removeAttribute("disabled"), this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) ? this.nextBtnElement.setAttribute("disabled", "disabled") : this.nextBtnElement.removeAttribute("disabled"), 1 < this.totalPages && this.togglePagination(!0), this.totalPages <= 1 && this.togglePagination(!1)
    }
    togglePagination(t) {
        t ? (this.paginationElement?.classList.remove("d-none-important"), this.paginationElement?.classList.add("d-flex")) : (this.paginationElement?.classList.remove("d-flex"), this.paginationElement?.classList.add("d-none-important"))
    }
    isItemVisible(t, e = 0) {
        e = this.container.clientHeight + this.container.scrollTop - e;
        return t.offsetTop + t.clientHeight - 1 <= Math.ceil(e) && t.offsetTop >= this.container.scrollTop
    }
    onButtonClick(t) {
        t.preventDefault();
        let e = 1,
            s = 0;
        window.matchMedia("(min-width: 769px)").matches && (e = t.currentTarget.dataset.step), 0 != this.container.scrollTop && !this.isItemVisible(this.itemsToShow[this.itemsToShow.length - 1]) || (s = this.gutter), this.itemScrollPosition = "next" === t.currentTarget.name ? this.container.scrollTop - s + e * this.itemOffset : this.container.scrollTop + s - e * this.itemOffset, window.requestAnimationFrame(() => this.container.scrollTo({
            top: this.itemScrollPosition,
            behavior: "smooth"
        }))
    }
    bindEventHandlers() {
        this.prevBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.nextBtnElement.addEventListener("click", this.onButtonClick.bind(this)), this.container.addEventListener("scroll", SHTHelper.debounce(this.updateCarousel.bind(this), 100))
    }
    setActiveMedia() {
        var t = this.$("sht-vert-carousel-itm.is-active-item");
        t && (this.container.scrollTo({
            top: t.offsetTop,
            behavior: "auto"
        }), t = this.slideshow.$(`sht-carousel-itm[data-media-id="${t.dataset.mediaTargetId}"]`), this.slideshow.$$(".js-product-slideshow-item").forEach(t => {
            t.classList.remove("d-block"), "true" == this.slideshow.hide_variant && t.classList.add("d-none")
        }), t.classList.add("d-block"), "true" == this.slideshow.hide_variant) && t.classList.remove("d-none")
    }
}
customElements.define("sht-vert-carousel", SHTVerticalCarousel);
class SHTProductSlideShowItem extends SHTCustomComponent {
    constructor() {
        super(), this.openGalleryButton = this.$(".js-product-media-open-gallery-btn"), this.openGalleryButton && this.openGalleryButton.addEventListener("click", t => {
            this.openDialogGallery(t)
        }), this.slideshow = this.closest("sht-prd-slideshow"), this.parent = this.closest("sht-carousel-itm"), this.prepare()
    }
    openDialogGallery(t) {
        var e = SHTHelper.qs("#" + t.currentTarget.dataset.galleryDialogId);
        e && (e.showModal(t.currentTarget, !0), this.slideshow.pauseAllVideo())
    }
    prepare() {
        window.matchMedia("(max-width: 459px)").matches ? "true" == this.slideshow.hide_variant && this.parent.classList.remove("d-none") : this.parent.classList.contains("d-block") || "true" == this.slideshow.hide_variant && this.parent.classList.add("d-none"), new ResizeObserver(t => {
            window.matchMedia("(max-width: 459px)").matches ? "true" == this.slideshow.hide_variant && this.parent.classList.remove("d-none") : this.parent.classList.contains("d-block") || "true" == this.slideshow.hide_variant && this.parent.classList.add("d-none")
        }).observe(document.body)
    }
}
customElements.define("sht-prd-slideshow-itm", SHTProductSlideShowItem);
class SHTProductSlideShow extends SHTCustomComponent {
    constructor() {
        super(), this.carousel = SHTHelper.qs(`sht-carousel[data-section-id="${this.dataset.section}"]`), this.thumb_carousel = SHTHelper.qs(`sht-vert-carousel[data-section="${this.dataset.section}"]`), this.$$(".js-slideshow-btn-thumb").forEach((t, e) => {
            0 === e && t.closest(".js-product-slideshow-thumb").classList.add("is-active-item"), t.addEventListener("click", this.setActiveMedia.bind(this, t))
        }), this.hide_variant = this.dataset.hideVariantImage
    }
    setActiveMedia(t) {
        var e = this.$(`[data-media-id="${t.dataset.target}"]`),
            t = t.closest("sht-vert-carousel-itm");
        window.matchMedia("(max-width: 768px)").matches ? (this.pauseAllVideo(), this.$$(".js-product-slideshow-thumb").forEach(t => {
            t.classList.remove("is-active-item")
        }), t.classList.add("is-active-item"), this.carousel.querySelector(".js-carousel-items").scrollTo({
            left: e.offsetLeft,
            behavior: "smooth"
        })) : (this.$$(".js-product-slideshow-item").forEach(t => {
            t.classList.remove("d-block"), "true" == this.hide_variant && t.classList.add("d-none")
        }), this.$$(".js-product-slideshow-thumb").forEach(t => {
            t.classList.remove("is-active-item")
        }), e.classList.add("d-block"), "true" == this.hide_variant && e.classList.remove("d-none"), t.classList.add("is-active-item"), this.playActiveVideo(e), this.playActiveModel(e))
    }
    pauseAllModel() {
        SHTHelper.qsa("sht-prd-media-itm-model").forEach(t => {
            t.modelViewerUI && t.modelViewerUI.pause()
        })
    }
    pauseAllVideo() {
        this.$$(".js-media-item-youtube").forEach(t => {
            t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }), this.$$(".js-media-item-vimeo").forEach(t => {
            t.contentWindow.postMessage('{"method":"pause"}', "*")
        }), this.$$(".js-media-item-video").forEach(t => t.pause())
    }
    playActiveVideo(t) {
        this.pauseAllVideo()
    }
    playActiveModel(t) {}
}
customElements.define("sht-prd-slideshow", SHTProductSlideShow);
class SHTProductMediaItemDeferredVideo extends SHTCustomComponent {
    constructor() {
        super(), this.itemDeferredVideoImageElem = this.$(".js-product-media-item-deferred-video-image"), this.itemDeferredVideoImageElem && this.itemDeferredVideoImageElem.addEventListener("click", t => {
            this.loadContent()
        })
    }
    loadContent() {
        var t;
        if (!this.getAttribute("loaded")) return t = this.$("template").content.firstElementChild.cloneNode(!0), this.appendChild(t), this.isLoaded(!0), this.itemDeferredVideoImageElem && this.itemDeferredVideoImageElem.remove(), !0
    }
    isLoaded(t) {
        t ? this.setAttribute("loaded", !0) : this.removeAttribute("loaded")
    }
}
customElements.define("sht-prd-media-itm-deferred-video", SHTProductMediaItemDeferredVideo);
class SHTProductMediaItemModel extends SHTCustomComponent {
    constructor() {
        super(), this.itemModelImageElem = this.$(".js-product-media-item-model-image"), this.itemModelImageElem && this.itemModelImageElem.addEventListener("click", t => {
            this.loadContent()
        })
    }
    loadModelViewerUICss() {
        var t;
        SHTHelper.qs("#model-viewer-ui") || ((t = document.createElement("link")).setAttribute("href", "https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css"), t.setAttribute("rel", "stylesheet"), t.setAttribute("media", "all"), t.setAttribute("id", "model-viewer-ui"), document.getElementsByTagName("head")[0].appendChild(t))
    }
    loadContent() {
        var t;
        this.getAttribute("loaded") || ((t = document.createElement("div")).appendChild(this.$("template").content.firstElementChild.cloneNode(!0)), this.setAttribute("loaded", !0), this.itemModelImageElem && this.itemModelImageElem.remove(), this.appendChild(t.querySelector("model-viewer")).focus(), this.loadModelViewerUICss(), Shopify.loadFeatures([{
            name: "model-viewer-ui",
            version: "1.0",
            onLoad: this.setupModelViewerUI.bind(this)
        }]))
    }
    setupModelViewerUI(t) {
        t || (this.modelViewerUI = new Shopify.ModelViewerUI(this.$("model-viewer")))
    }
}
customElements.define("sht-prd-media-itm-model", SHTProductMediaItemModel);
class SHTMap extends SHTCustomComponent {
    constructor() {
        super(), this.iframe = this.$(".js-map-iframe"), this.bindEventHandlers()
    }
    loadIframeContent() {
        new IntersectionObserver((t, e) => {
            t.forEach(t => {
                t.isIntersecting && (this.dispatchEvent(new CustomEvent("loadingStart", {
                    detail: {
                        ele: this.iframe,
                        parent: this
                    }
                })), this.execute(), e.unobserve(t.target))
            })
        }, {
            rootMargin: "0px 0px -100px 0px"
        }).observe(this)
    }
    bindEventHandlers() {
        this.iframe.addEventListener("load", function() {
            this.dispatchEvent(new CustomEvent("loadingEnd", {
                detail: {
                    ele: this.iframe,
                    parent: this
                }
            })), this.setAttribute("loaded", !0)
        }.bind(this))
    }
    execute() {
        this.setIframeSrc()
    }
    setIframeSrc() {
        var t = `https://maps.google.com/maps?z=${this.dataZoom}&t=${this.dataType}&q=${this.dataLocation.replace(/"/g,"")}&ie=UTF8&&output=embed`;
        this.iframe.src = t, this.iframe.removeAttribute("srcdoc")
    }
    static get observedAttributes() {
        return ["data-zoom", "data-type", "data-location"]
    }
    attributeChangedCallback(t, e, s) {
        e !== s && (Shopify.designMode ? this.execute() : this.loadIframeContent())
    }
    connectedCallback() {}
    disconnectedCallback() {}
    get dataZoom() {
        return this.getAttribute("data-zoom")
    }
    get dataType() {
        return this.getAttribute("data-type")
    }
    get dataLocation() {
        return this.getAttribute("data-location")
    }
    set dataZoom(t) {
        this.setAttribute("data-zoom", t)
    }
    set dataType(t) {
        this.setAttribute("data-type", t)
    }
    set dataLocation(t) {
        this.setAttribute("data-location", t)
    }
}
customElements.define("sht-map", SHTMap);
class SHTMenuDrawer extends SHTCoreDrawer {}
customElements.define("sht-menu-drwer", SHTMenuDrawer);
class SHTMenuDrawerOpener extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    init() {
        this.triggerBtnElement = this.$(".js-menu-drawer-trigger"), this.menuDrawerElement = SHTHelper.qs("sht-menu-drwer"), this.menuDrawerBodyElement = this.menuDrawerElement.querySelector(".js-menu-drawer-body"), this.menuDrawerContentElement = SHTHelper.qs(".js-menu-drawer-content"), this.triggerBtnElement.addEventListener("click", t => {
            this.menuDrawerBodyElement.innerHTML = this.menuDrawerContentElement.innerHTML, setTimeout(() => {
                this.menuDrawerElement.openDrawer(t.target)
            }, 0)
        })
    }
}
customElements.define("sht-menu-drwer-opner", SHTMenuDrawerOpener);
class SHTCarouselTrigger extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        Shopify.designMode ? setTimeout(() => {
            this.init()
        }, 1e3) : this.init()
    }
    init() {
        this.trigger = this.$$(".js-carousel-trigger"), this.carouselWebElement = SHTHelper.qs("#" + this.dataset.carouselTarget), this.carousel = this.carouselWebElement.querySelector(".js-carousel-items"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        for (let t = 0, e = this.trigger.length; t < e; t++) this.trigger[t].addEventListener("click", t => {
            this.setActiveCarouselElement(t.currentTarget)
        });
        this.carouselWebElement.addEventListener("itemChanged", t => {
            this.setButtonVisibility(!1);
            t = this.$(`[aria-describedby="${t.detail.currentElement.id}"]`);
            t.setAttribute("aria-current", "true"), t.classList.add("hotspot-item--active")
        })
    }
    setActiveCarouselElement(t) {
        t = this.carousel.querySelector("#" + t.getAttribute("aria-describedby", ""));
        t && this.carousel.scrollTo({
            left: t.offsetLeft,
            behavior: "smooth"
        })
    }
    setButtonVisibility(s) {
        if (this.trigger)
            for (let t = 0, e = this.trigger.length; t < e; t++) s ? (this.trigger[t].setAttribute("aria-current", "true"), this.trigger[t].classList.add("hotspot-item--active")) : (this.trigger[t].removeAttribute("aria-current"), this.trigger[t].classList.remove("hotspot-item--active"))
    }
}
customElements.define("sht-carousel-trig", SHTCarouselTrigger);
class SHTAccordion extends SHTCustomComponent {
    constructor() {
        super(), this.properties = this.dataset.properties ? JSON.parse(this.dataset.properties) : {}, this.accordionItems = this.$$(".js-accordion-item"), this.accordionTriggers = this.$$(".js-accordion-trigger"), this.accordionTrigger = this.$(".js-accordion-trigger"), this.accordionContents = this.$$(".js-accordion-content"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.accordionTriggers.forEach(t => {
            t.addEventListener("click", t => {
                t.preventDefault(), this.onTriggerClick(t.currentTarget)
            })
        })
    }
    onTriggerClick(t) {
        var e = "true" === t.getAttribute("aria-expanded");
        this.properties.multiple || this.toggleAll(), this.toggle(!e, t)
    }
    toggle(t, e) {
        e.setAttribute("aria-expanded", "" + t), t ? e.classList.add("open") : e.classList.remove("open");
        e = this.$("#" + e.getAttribute("aria-controls"));
        t ? (e.classList.add("open"), e.style.maxHeight = this.calculateMaxHeightContent(e) + "px") : (e.classList.remove("open"), e.style.maxHeight = "0px")
    }
    open() {
        this.toggle(!0)
    }
    close() {
        this.toggle(!1)
    }
    toggleAll() {
        this.accordionTriggers.forEach(t => {
            t.setAttribute("aria-expanded", "false"), t.classList.remove("open")
        }), this.accordionContents.forEach(t => {
            t.classList.remove("open"), t.style.maxHeight = "0px"
        })
    }
    calculateMaxHeightContent(t) {
        return t.scrollHeight
    }
}
customElements.define("sht-accordion", SHTAccordion);
class SHTFeaturedVariantSelector extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    init() {
        this.elms = {
            radio_elms: this.$$(".js-featured-variant-radio-item"),
            form: SHTHelper.qs("#featuredProductForm-" + this.dataset.section),
            price: SHTHelper.qs("#featuredProductPrice-" + this.dataset.section),
            product_form: SHTHelper.qs(`sht-featured-prd-frm[data-section="${this.dataset.section}"]`),
            inventory_tracking: SHTHelper.qs("#featuredInventoryTracking-" + this.dataset.section),
            sku: SHTHelper.qs("#featuredSku-" + this.dataset.section),
            variant_picker: SHTHelper.qs("#featuredVariantPicker-" + this.dataset.section),
            quantity_input: SHTHelper.qs("#featuredProductQuantity-" + this.dataset.section),
            slideshow: SHTHelper.qs(`sht-prd-slideshow[data-section="${this.dataset.section}"]`),
            thumb_carousel: SHTHelper.qs(`sht-vert-carousel[data-section="${this.dataset.section}"]`),
            carousel: SHTHelper.qs(`sht-carousel[data-section-id="${this.dataset.section}"]`),
            variant_options: this.$$(".js-variant-option-value")
        }, this.price_selector = "#featuredProductPrice-" + this.dataset.section, this.inventory_tracking_selector = "#featuredInventoryTracking-" + this.dataset.section, this.sku_selector = "#featuredSku-" + this.dataset.section, this.variant_picker_selector = "#featuredVariantPicker-" + this.dataset.section, this.quantity_input_selector = "#featuredProductQuantity-" + this.dataset.section, this.slideshow_selector = `sht-prd-slideshow[data-section="${this.dataset.section}"]`, this.selected_variants = null, this.variant_data = null, this.elms.form && (this.setSelectedVariants(), this.setCurrentVariant(), this.bindEventHandlers(), "dropdown" == this.select_type ? this.updateSelectedVariantsOnOptionNameByDropDown() : this.updateSelectedVariantsOnOptionName(), this.setUnavailableOptions())
    }
    bindEventHandlers() {
        this.addEventListener("change", this.onVariantChangeHandle.bind(this))
    }
    onVariantChangeHandle() {
        this.setSelectedVariants(), this.setCurrentVariant(), this.toggleAddButton(!0, "", !1), this.removeErrorMessage(), "dropdown" == this.select_type && this.updateVariantStatuses(), this.currentVariant ? (this.updateVariantInput(), this.renderProductInfo(), this.setActiveMedia(), this.setUnavailableOptions()) : (this.toggleAddButton(!0, "", !0), this.setUnavailable(), this.checkOutStock(), "dropdown" == this.select_type ? this.updateSelectedVariantsOnOptionNameByDropDown() : this.updateSelectedVariantsOnOptionName())
    }
    checkOutStock() {
        var t = this.elms.inventory_tracking;
        t && (t.innerHTML = `
      <span class="product-inventory-tracking icon-dot-shadow product--outstock p-relative color-error">
        ${SHTLanguage.product.OUT_OF_STOCK}
      </span>
      `)
    }
    updateVariantStatuses() {
        let a = this.variant_data.filter(t => this.querySelector(":checked").value === t.option1),
            o = [...this.querySelectorAll(".js-selectbox-wrapper")];
        o.forEach((t, s) => {
            if (0 !== s) {
                var i = [...t.querySelectorAll("option")];
                let e = o[s - 1].querySelector(":checked").value;
                var r = a.filter(t => t.available && t["option" + s] === e).map(t => t["option" + (s + 1)]),
                    i = (this.setSelectOptionAvailability(i, r), [...t.querySelectorAll('input[type="radio"]')]);
                0 < i.length && this.setColorSwatchSelectOptionAvailability(i, r)
            }
        })
    }
    setSelectOptionAvailability(t, e) {
        t.forEach(t => {
            e.includes(t.getAttribute("value")) ? t.innerText = t.getAttribute("value") : t.innerText = SHTLanguage.product.PRODUCT_UNAVAILABLE_WITH_OPTION.replace("[value]", t.getAttribute("value"))
        })
    }
    setColorSwatchSelectOptionAvailability(t, s) {
        t.forEach(t => {
            var e = this.querySelector(`div.js-variant-option-value[data-value="${t.getAttribute("data-variant-value").replace(/"/g,'\\"')}"]`);
            s.includes(t.getAttribute("value")) ? e && e.classList.remove("product-option--unavailable") : e && e.classList.add("product-option--unavailable")
        })
    }
    updateSelectedVariantsOnOptionNameByDropDown() {
        this.selected_variants.forEach((t, e) => {
            var e = t + "-" + e,
                e = this.$(`.js-variant-select-item .js-variant-item[data-variant-value="${e.replace(/"/g,'\\"')}"]`);
            e && (e = e.getAttribute("data-variant-name"), e = this.$(`.js-variant-select-option-name[data-option-name="${e.replace(/"/g,'\\"')}"]`)) && (e.innerHTML = t)
        })
    }
    updateSelectedVariantsOnOptionName() {
        this.selected_variants.forEach((t, e) => {
            var e = t + "-" + e,
                e = this.$(`.js-variant-item[data-variant-value="${e.replace(/"/g,'\\"')}"]`);
            e && (e = e.getAttribute("name"), e = this.$(`.js-variant-radio-option-name[data-option-name="${e.replace(/"/g,'\\"')}"]`)) && (e.innerHTML = t)
        })
    }
    removeErrorMessage() {
        this.elms.product_form && this.elms.product_form.handleErrorMessage()
    }
    renderProductInfo() {
        fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=` + this.dataset.section).then(t => t.text()).then(t => {
            var t = (new DOMParser).parseFromString(t, "text/html"),
                e = this.elms.sku,
                s = t.querySelector(this.sku_selector),
                e = (e && (e.innerHTML = "", s) && (e.innerHTML = s.innerHTML), this.elms.inventory_tracking),
                s = t.querySelector(this.inventory_tracking_selector),
                e = (e && (e.innerHTML = "", s) && (e.innerHTML = s.innerHTML), this.elms.price),
                s = t.querySelector(this.price_selector),
                e = (s && e && (e.innerHTML = s.innerHTML), this.elms.price && this.elms.price.classList.remove("visibility-hidden"), this.elms.quantity_input),
                s = t.querySelector(this.quantity_input_selector);
            e && s && (e.innerHTML = s.innerHTML), "false" == this.elms.slideshow.hide_variant && (e = this.elms.slideshow, s = t.querySelector(this.slideshow_selector), e) && s && (e.innerHTML = s.innerHTML), this.toggleAddButton(!this.currentVariant.available, SHTLanguage.product.PRODUCT_SOLD_OUT), "dropdown" == this.select_type ? this.updateSelectedVariantsOnOptionNameByDropDown() : this.updateSelectedVariantsOnOptionName(), this.elms.inventory_tracking && this.elms.inventory_tracking.classList.remove("d-none")
        })
    }
    updateVariantInput() {
        [this.elms.form, this.elms.installment_form].forEach(t => {
            t && ((t = t.querySelector('input[name="id"]')).value = this.currentVariant.id, t.dispatchEvent(new Event("change", {
                bubbles: !0
            })))
        })
    }
    setActiveMedia() {
        var t, e;
        this.currentVariant.featured_media && (e = this.currentVariant.featured_media.id, t = this.elms.slideshow.querySelector(`sht-carousel-itm[data-media-id="${this.dataset.section}-${e}"]`), e = this.elms.slideshow.querySelector(`sht-vert-carousel-itm[data-media-target-id="${this.dataset.section}-${e}"]`), window.matchMedia("(max-width: 768px)").matches ? (this.elms.slideshow.querySelectorAll(".js-product-slideshow-thumb").forEach(t => {
            t.classList.remove("is-active-item")
        }), this.elms.carousel.querySelector(".js-carousel-items").scrollTo({
            left: t.offsetLeft,
            behavior: "smooth"
        }), e && (e.classList.add("is-active-item"), this.elms.thumb_carousel.querySelector(".js-carousel-items").scrollTo({
            left: e.offsetLeft,
            behavior: "auto"
        }))) : (this.elms.slideshow.querySelectorAll(".js-product-slideshow-item").forEach(t => {
            t.classList.remove("d-block"), "true" == this.elms.slideshow.hide_variant && t.classList.add("d-none")
        }), this.elms.slideshow.querySelectorAll(".js-product-slideshow-thumb").forEach(t => {
            t.classList.remove("is-active-item")
        }), t.classList.add("d-block"), "true" == this.elms.slideshow.hide_variant && t.classList.remove("d-none"), e && (e.classList.add("is-active-item"), this.elms.thumb_carousel.querySelector(".js-carousel-items").scrollTo({
            top: e.offsetTop,
            behavior: "auto"
        }))), this.elms.slideshow.pauseAllVideo())
    }
    setUnavailable() {
        var t, e = this.elms.form;
        e && (t = (e = e.querySelector(".js-featured-product-form-submit-btn")).querySelector(".js-featured-product-form-submit-btn-text"), e) && (t.textContent = SHTLanguage.product.PRODUCT_UNAVAILABLE, this.elms.inventory_tracking && this.elms.inventory_tracking.classList.add("d-none"), this.elms.price) && this.elms.price.classList.add("visibility-hidden")
    }
    getVariantData() {
        return this.variant_data = this.variant_data || JSON.parse(this.$('[type="application/json"]').textContent), this.variant_data.map(s => {
            s.my_options = [], s.options.forEach((t, e) => {
                s.my_options.push(t + "-" + e)
            })
        }), this.variant_data
    }
    setCurrentVariant() {
        this.currentVariant = this.getVariantData().find(t => !t.options.map((t, e) => this.selected_variants[e] === t).includes(!1))
    }
    toggleAddButton(t = !0, e, s) {
        var i, r = this.elms.form;
        r && (i = (r = r.querySelector(".js-featured-product-form-submit-btn")).querySelector(".js-featured-product-form-submit-btn-text"), r) && (t ? (r.setAttribute("disabled", "disabled"), e && (i.textContent = e)) : (r.removeAttribute("disabled"), i.textContent = SHTLanguage.product.PRODUCT_ADD_TO_CART))
    }
    toggleUnavailableOptions(e = !1) {
        this.elms.variant_options.forEach(t => {
            t.classList.toggle("product-option--unavailable", e)
        })
    }
    setUnavailableOptions() {
        if ("dropdown" != this.select_type) {
            this.toggleUnavailableOptions(!1), this.variant_data = this.variant_data || this.getVariantData(), this.selected_variant_id = this.elms.form.querySelector('input[name="id"]').value, this.current_variant = this.variant_data.find(t => t.id === Number(this.selected_variant_id));
            let {
                available: r,
                options: a,
                my_options: o,
                options: {
                    length: n
                }
            } = this.current_variant;
            if (2 < n) {
                let i = Object.keys(a),
                    t = [];
                for (let s = 0; s < n; s++)
                    for (let e = s + 1; e < n; e++) {
                        var l;
                        i[s] && i[e] && (l = this.variant_data.filter(t => t.my_options[i[s]] === this.current_variant.my_options[i[s]] && t.my_options[i[e]] === this.current_variant.my_options[i[e]] && 1 == t.available), t = [...t, ...l])
                    }
                let e = [],
                    s = [];
                t.length && ((t = [...t, this.current_variant]).forEach(t => {
                    t = t.my_options;
                    e = [...e, ...t]
                }), s = [...new Set(e)], 0 == r) && (s = s.filter(t => !o.includes(t))), this.toggleUnavailableOptions(!0), s.length && s.forEach(t => {
                    this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`) && this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`).classList.toggle("product-option--unavailable", !1)
                })
            } else if (1 < n) {
                let t = [],
                    e = [],
                    s = [];
                for (let e = 0; e < n; e++) {
                    var i = this.variant_data.filter(t => t.my_options[e] === this.current_variant.my_options[e] && 1 == t.available);
                    t = [...t, ...i]
                }
                t.length && ((t = [...t, this.current_variant]).forEach(t => {
                    t = t.my_options;
                    e = [...e, ...t]
                }), s = [...new Set(e)], 0 == r) && (s = s.filter(t => !o.includes(t))), this.toggleUnavailableOptions(!0), s.length && s.forEach(t => {
                    this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`) && this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`).classList.toggle("product-option--unavailable", !1)
                })
            } else {
                let e = [],
                    t = [],
                    s = this.variant_data.filter(t => 1 == t.available);
                (s = s.length ? [...s, this.current_variant] : s).forEach(t => {
                    t = t.my_options;
                    e = [...e, ...t]
                }), t = [...new Set(e)], 0 == r && (t = t.filter(t => !o.includes(t))), this.toggleUnavailableOptions(!0), t.length && t.forEach(t => {
                    this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`) && this.$(`[data-value="${t.replace(/"/g,'\\"')}"]`).classList.toggle("product-option--unavailable", !1)
                })
            }
            return !0
        }
    }
}
class SHTFeaturedVariantRadios extends SHTFeaturedVariantSelector {
    constructor() {
        super()
    }
    setSelectedVariants() {
        var t = Array.from(this.$$(".js-featured-variant-radio-container"));
        this.selected_variants = t.map(t => Array.from(t.querySelectorAll(".js-featured-variant-radio-item")).find(t => t.checked).value)
    }
}
customElements.define("sht-featured-variant-radios", SHTFeaturedVariantRadios);
class SHTFeaturedVariantSelects extends SHTFeaturedVariantSelector {
    constructor() {
        super(), this.$ = this.querySelector.bind(this), this.$$ = this.querySelectorAll.bind(this), this.select_type = "dropdown"
    }
    setSelectedVariants() {
        this.selected_variants = Array.from(this.$$(".js-variant-select-item"), t => t.value)
    }
}
customElements.define("sht-featured-variant-selects", SHTFeaturedVariantSelects);
class SHTFeaturedVariantSwatchSelect extends HTMLElement {
    constructor() {
        super(), this.$ = this.querySelector.bind(this), this.$$ = this.querySelectorAll.bind(this)
    }
    init() {
        this.radios = this.$$(".js-variant-radio-item"), this.select_id = this.dataset.selectId, this.select_element = document.querySelector("#" + this.select_id), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.radios.forEach(t => {
            t.addEventListener("click", t => {
                t.preventDefault(), Array.from(this.radios, t => {
                    t.checked = !1
                }), setTimeout(() => {
                    t.target.checked = !0
                }), this.select_element && (this.select_element.querySelector(`option[value="${t.target.value.replace(/"/g,'\\"')}"]`).selected = !0, this.select_element.dispatchEvent(new Event("change", {
                    bubbles: !0
                })))
            })
        })
    }
    connectedCallback() {
        this.init()
    }
}
customElements.define("sht-featured-variant-swatch-select", SHTFeaturedVariantSwatchSelect);
class SHTFeaturedProductForm extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    init() {
        this.elms = {
            form: this.$("form"),
            submit_btn: this.$('[type="submit"]'),
            error_wrapper: this.$(".js-featured-product-form-error-wrapper"),
            error_message: this.$(".js-featured-product-form-error-message"),
            spinner: this.$(".js-featured-product-form-spinner"),
            quantity_input_container: SHTHelper.qs("#featuredProductQuantity-" + this.dataset.section),
            sticky_header: SHTHelper.qs("sht-sticky-header"),
            announcement_bar: SHTHelper.qs("sht-ann-bar"),
            header_cart_status: SHTHelper.qs("#headerCartStatus")
        }, this.cartNotification = SHTHelper.qs("sht-cart-noti"), this.cartDrawer = SHTHelper.qs("sht-cart-drwr"), this.cartDrawerForm = SHTHelper.qs("sht-cart-drwr-frm"), this.mainCartForm = SHTHelper.qs("sht-cart-frm"), this.elms.form && (this.elms.form.querySelector("[name=id]").disabled = !1, this.bindEventHandlers())
    }
    bindEventHandlers() {
        this.elms.form.addEventListener("submit", this.onSubmitHandler.bind(this))
    }
    onSubmitHandler(t) {
        if (t.preventDefault(), !this.elms.submit_btn.classList.contains("loading")) {
            this.handleErrorMessage(), this.elms.submit_btn.setAttribute("aria-disabled", !0), this.elms.submit_btn.setAttribute("disabled", !0), this.elms.submit_btn.classList.add("loading"), this.elms.spinner.classList.remove("hidden"), this.elms.header_cart_status && this.elms.header_cart_status.classList.remove("header-cart-status--animate");
            let t = this.cartNotification.getSectionsToRender(),
                e = (this.cartDrawer && (t = [...t, ...this.cartDrawer.getSectionsToRender()]), this.mainCartForm && (t = [...t, ...this.mainCartForm.getSectionsToRender(!1)]), new FormData(this.elms.form));
            e.append("sections", t.map(t => t.id)), e.append("sections_url", window.location.pathname), SHTHelper.fetchConfigHTTP.body = e, fetch("" + routes.cart_add_url, SHTHelper.fetchConfigHTTP).then(t => t.json()).then(t => {
                t.status ? this.handleErrorMessage(t.description) : (t.id || (t.id = e.get("id")), this.cartNotification.renderContents(t), this.cartDrawerForm && this.cartDrawerForm.renderContents(t), this.mainCartForm && this.mainCartForm.renderContents(t), this.elms.quantity_input_container && "add-to-cart" == this.elms.quantity_input_container.dataset.show && (this.elms.quantity_input_container.classList.remove("d-none"), this.elms.quantity_input_container.querySelector("input").value = 1))
            }).catch(t => {
                console.error(t)
            }).finally(() => {
                this.elms.submit_btn.classList.remove("loading"), this.elms.submit_btn.removeAttribute("aria-disabled"), this.elms.submit_btn.removeAttribute("disabled"), this.elms.spinner.classList.add("hidden")
            })
        }
    }
    handleErrorMessage(t = !1) {
        this.elms.error_wrapper.toggleAttribute("hidden", !t), t && (this.elms.error_message.textContent = t)
    }
}
customElements.define("sht-featured-prd-frm", SHTFeaturedProductForm);
class SHTProductComparison extends SHTCustomComponent {
    constructor() {
        super()
    }
    init() {
        this.view_button = this.$(".js-product-comparison-view-more-btn"), this.view_button_label = this.$(".js-product-comparison-view-more-btn-label"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.view_button?.addEventListener("click", t => {
            this.hidden_elements = this.$$(".js-product-comparison-hidden-item"), this.view_button.classList.toggle("is-more", !this.view_button.classList.contains("is-more")), this.view_button_label.textContent = this.view_button.classList.contains("is-more") ? this.view_button.dataset.viewLess : this.view_button.dataset.viewMore;
            for (let t = 0, e = this.hidden_elements.length; t < e; t++) this.hidden_elements[t].classList.toggle("d-none-important", !this.hidden_elements[t].classList.contains("d-none-important"))
        })
    }
    connectedCallback() {
        this.init()
    }
}
customElements.define("sht-product-comparison", SHTProductComparison);
class SHTTabs extends SHTCustomComponent {
    constructor() {
        super(), this.tabLinks = this.$$(".js-tab-link"), this.tabPanels = this.$$(".js-tab-panel"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        this.tabLinks.forEach(function(t, e, s) {
            t.addEventListener("click", function(t) {
                t.preventDefault(), this.tabLinkEventHandler(t.target)
            }.bind(this))
        }.bind(this))
    }
    tabLinkEventHandler(t) {
        var e = t.getAttribute("href").replace("#", ""),
            e = (this.tabPanels.forEach(function(t) {
                t.classList.remove("d-block", "tab__panel--active"), t.classList.add("d-none")
            }.bind(this)), this.tabLinks.forEach(function(t) {
                t.classList.remove("tab__link--active")
            }.bind(this)), this.$(`[data-tab-content-id=${e}]`));
        e.classList.remove("d-none"), e.classList.add("d-block", "tab__panel--active"), t.classList.add("tab__link--active")
    }
    connectedCallback() {}
    disconnectedCallback() {}
}
customElements.define("sht-tabs", SHTTabs);
class SHTReadMore extends SHTCustomComponent {
    constructor() {
        super()
    }
    init() {
        this.content = this.$(".js-expandable-content"), this.btn = this.$(".js-expandable-content-btn"), this.content.scrollHeight > this.content.clientHeight ? this.content.classList.add("expandable-content--expandable") : this.content.setAttribute("data-expanded", "true"), this.bindEventHandlers()
    }
    bindEventHandlers() {
        let e = this.content.clientHeight;
        this.btn.addEventListener("click", t => {
            "true" === this.content.getAttribute("data-expanded") ? (this.content.setAttribute("data-expanded", "false"), this.content.style.maxHeight = e + "px", this.btn.innerHTML = this.btn.getAttribute("data-view-more")) : (this.content.setAttribute("data-expanded", "true"), this.content.style.maxHeight = this.content.scrollHeight + "px", this.btn.innerHTML = this.btn.getAttribute("data-view-less"))
        })
    }
    connectedCallback() {
        this.init()
    }
}
customElements.define("sht-read-more", SHTReadMore);
class SHTMovingImage extends SHTCustomComponent {
    constructor() {
        super()
    }
    init() {
        this.moving_image_container = this.$(".js-moving-image-container"), this.moving_image_container, this.moving_image_container.style.setProperty("--container-height", this.moving_image_container.offsetHeight + "px"), window.addEventListener("resize", t => {
            this.moving_image_container.style.setProperty("--container-height", this.moving_image_container.offsetHeight + "px")
        })
    }
    connectedCallback() {
        this.init()
    }
}
if (customElements.define("sht-moving-image", SHTMovingImage), !customElements.get("sht-predictive-srch")) {
    class p4 extends SHTCustomComponent {
        constructor() {
            super(), this.cachedRequests = new Map, this.resultsPanelMaxHeight = 0, this.elms = {
                predictive_search_form: this.$(".js-predictive-search-form"),
                predictive_search_input: this.$(".js-predictive-search-input"),
                predictive_search_results: this.$(".js-predictive-search-results"),
                predictive_search_result_panel: this.$(".js-predictive-search-results-panel"),
                predictive_search_result_items: this.$(".js-predictive-search-result-items"),
                predictive_search_message_placeholder: this.$(".js-predictive-search-message-placeholder"),
                predictive_search_loading: this.$(".js-predictive-search-loading"),
                predictive_close_button: this.$(".js-predictive-search-close-trigger"),
                header: this.closest("sht-header"),
                header_search_open_trigger: this.closest("sht-header")?.querySelector(".js-search-open-trigger"),
                predictive_search_product_type: this.$(".js-predictive-search-product-type"),
                predictive_search_btn_open_product_type: this.$(".js-predictive-search-btn-open-product-type"),
                body: document.body,
                product_type: this.$(".js-search-product-type")
            };
            let t = this.getAttribute("data-search-type");
            t = "" != t ? "product," + t : "product", this.url = {
                searchUrl: routes.predictive_search_url,
                queryParameters: {
                    section_id: "sht-predictive-srch",
                    resources: {
                        type: t,
                        limit: 10,
                        options: {
                            unavailable_products: "last",
                            fields: "product_type"
                        }
                    }
                }
            }, this.shopifyFeaturesJson = JSON.parse(SHTHelper.qs('#shopify-features[type="application/json"]').textContent), this.code = "", this.bindEventHandlers()
        }
        bindEventHandlers() {
            this.elms.predictive_search_form.addEventListener("submit", this.onSubmitHandle.bind(this)), this.elms.predictive_search_input.addEventListener("input", SHTHelper.debounce(t => {
                this.onInputHandle(t)
            }, 300).bind(this)), this.elms.predictive_search_product_type?.addEventListener("change", t => {
                this.elms.product_type && (this.elms.product_type.value = this.elms.predictive_search_product_type.value), "" !== this.elms.predictive_search_product_type.value ? this.elms.predictive_search_btn_open_product_type.classList.add("field__search_icon--active") : this.elms.predictive_search_btn_open_product_type.classList.remove("field__search_icon--active"), this.elms.predictive_search_input.dispatchEvent(new Event("input"))
            }), this.elms.predictive_search_input.addEventListener("focus", this.onInputFocusHandle.bind(this)), this.addEventListener("focusout", this.onFocusOutHandle.bind(this)), this.elms.predictive_close_button.addEventListener("click", this.closeSearchResults.bind(this)), this.addEventListener("keyup", t => {
                this.code = t.code.toUpperCase(), "ESCAPE" === t.code.toUpperCase() && this.closeSearchResults()
            })
        }
        onInputFocusHandle(t) {
            var e = this.getSearchTerm();
            this.openSearchResults(e)
        }
        getSearchTerm() {
            return this.elms.predictive_search_input.value.trim()
        }
        openSearchResults(t) {
            t.length ? this.togglePlaceHolderMessage(!1) : (this.resetSearchResultPanel(), this.togglePlaceHolderMessage(!0), this.toggleLoading(!1), this.toggleLoadingContainer(!1), this.toggleResults(!1)), this.toggleOpen(!0), this.toggleSearchResults(!0), this.elms.predictive_search_input.setAttribute("aria-expanded", !0)
        }
        resetSearchResultPanel() {
            this.elms.predictive_search_result_items.innerHTML = ""
        }
        toggleResults(t) {
            t ? (this.setAttribute("results", !0), setTimeout(function() {
                this.classList.add("is-result-show")
            }.bind(this), 300)) : (this.removeAttribute("results"), this.classList.remove("is-result-show"))
        }
        toggleOpen(t) {
            t ? (this.setAttribute("open", !0), this.elms.header.classList.add("header--predictive-search-open"), this.elms.body.classList.add("o-hidden")) : (this.removeAttribute("open"), this.elms.header.classList.remove("header--predictive-search-open"), this.elms.body.classList.remove("o-hidden"))
        }
        async onInputHandle(t) {
            var e, s;
            this.shopifyFeaturesJson.predictiveSearch && "ESCAPE" !== this.code && (e = this.getSearchTerm(), this.openSearchResults(e), this.resetSearchResultPanel(), e.length) && ("false" === this.dataset.showSearchFilter ? (s = await this.getSearchResults(e), this.renderSearchResultPanel(s)) : (s = await this.getSearchResultsWithMultipleRequests(e), this.renderSearchResultPanel(s)))
        }
        buildUrl(t) {
            var e, s = [];
            return "" != this.elms.predictive_search_product_type.value ? (e = `${this.url.searchUrl}?q=product_type:${encodeURIComponent(this.elms.predictive_search_product_type.value+" AND "+t)}&resources[limit]=10&resources[limit_scope]=each&resources[type]=product&section_id=predictive-search`, s.push(fetch(e))) : (e = `${this.url.searchUrl}?q=${encodeURIComponent(t)}&resources[limit]=10&resources[limit_scope]=each&resources[type]=product&section_id=predictive-search`, s.push(fetch(e))), this.getAttribute("data-search-type") && (e = `${this.url.searchUrl}?q=${encodeURIComponent(t)}&resources[type]=${this.getAttribute("data-search-type")}&resources[limit]=10&resources[limit_scope]=each&section_id=predictive-search`, s.push(fetch(e))), s
        }
        async getSearchResultsWithMultipleRequests(t) {
            var e = this.elms.predictive_search_product_type.value.replace(/\s/g, "-").toLowerCase() + t.replace(/\s/g, "-").toLowerCase(),
                s = this.cachedRequests.get(e);
            return s || (s = this.buildUrl(t), t = await this.fetchResultsWithMultipleRequests(s), this.cachedRequests.set(e, t), t)
        }
        async fetchResultsWithMultipleRequests(t) {
            return this.toggleLoading(!0), this.toggleLoadingContainer(!0), await Promise.all(t).then(function(t) {
                return Promise.all(t.map(function(t) {
                    return t.text()
                }))
            }).then(function(s) {
                let i = "";
                this.toggleLoading(!1), this.toggleLoadingContainer(!1);
                for (let t = 0, e = s.length; t < e; t++) {
                    var r = (new DOMParser).parseFromString(s[t], "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
                    i += r
                }
                return i
            }.bind(this)).catch(function(t) {
                return this.closeSearchResults(), console.error(t), ""
            }.bind(this))
        }
        renderSearchResultPanel(t) {
            this.elms.predictive_search_result_items.innerHTML = t, this.toggleResults(!0), this.toggleLoading(!1), this.toggleLoadingContainer(!1), SHTHelper.trapFocus(this)
        }
        async getSearchResults(t) {
            var e = t.replace(/\s/g, "-").toLowerCase(),
                s = this.cachedRequests.get(e);
            return s || (s = await this.fetchResults(t), this.cachedRequests.set(e, s), s)
        }
        onSubmitHandle(t) {
            this.getSearchTerm() || t.preventDefault(), this.$('input[name="type"]').value = "product"
        }
        async fetchResults(t) {
            t = `${this.url.searchUrl}?q=${encodeURIComponent(t)}&resources[type]=${this.url.queryParameters.resources.type}&resources[limit]=10&resources[limit_scope]=each&section_id=predictive-search`, this.toggleLoading(!0), this.toggleLoadingContainer(!0), t = await fetch(t).then(t => {
                if (t.ok) return t.text();
                throw t = new Error(t.status), this.closeSearchResults(), t
            }).then(t => (this.toggleLoading(!1), this.toggleLoadingContainer(!1), (new DOMParser).parseFromString(t, "text/html").querySelector("#shopify-section-predictive-search").innerHTML)).catch(t => (this.closeSearchResults(), console.error(t), ""));
            return t
        }
        toggleSearchResults(t) {
            (t = this.shopifyFeaturesJson.predictiveSearch ? t : !1) ? this.elms.predictive_search_results.toggleAttribute("hidden", !1): this.elms.predictive_search_results.setAttribute("hidden", !0)
        }
        toggleLoading(t) {
            t ? this.elms.predictive_search_loading.toggleAttribute("hidden", !1) : this.elms.predictive_search_loading.setAttribute("hidden", !0)
        }
        togglePlaceHolderMessage(t) {
            t ? this.elms.predictive_search_message_placeholder.toggleAttribute("hidden", !1) : this.elms.predictive_search_message_placeholder.setAttribute("hidden", !0)
        }
        onFocusOutHandle(t) {
            let e = window.matchMedia("(max-width: 768px)").matches;
            setTimeout(() => {
                this.contains(document.activeElement) || e || this.closeSearchResults(!0)
            })
        }
        toggleLoadingContainer(t) {
            t ? this.setAttribute("loading", !0) : this.removeAttribute("loading")
        }
        closeSearchResults(t = !1) {
            this.toggleOpen(!1), this.toggleLoading(!1), this.toggleLoadingContainer(!1), this.togglePlaceHolderMessage(!1), this.toggleResults(!1), this.resetSearchResultPanel(), this.toggleSearchResults(!1), this.elms.header_search_open_trigger && !t && SHTHelper.removeTrapFocus(this.elms.header_search_open_trigger), this.resultsPanelMaxHeight = 0, this.elms.predictive_search_result_panel.removeAttribute("style"), this.elms.predictive_search_input.value = "", this.elms.predictive_search_input.setAttribute("aria-expanded", !1)
        }
        calculateResultsPanelMaxHeight() {
            return this.resultsPanelMaxHeight = window.innerHeight - SHTHelper.qid("shopify-section-header").getBoundingClientRect().bottom, this.resultsPanelMaxHeight
        }
    }
    customElements.define("sht-predictive-srch", p4)
}

function SHTInitStyleVariable() {
    var t = SHTHelper.qs("sht-header"),
        e = SHTHelper.qs(".js-top-bar"),
        s = SHTHelper.qs("sht-predictive-srch"),
        i = SHTHelper.qs(".js-header-logo");
    SHTHelper.qde.style.setProperty("--header-height", t ? t.offsetHeight + "px" : "0px"), SHTHelper.qde.style.setProperty("--header-width", t ? t.offsetWidth + "px" : "0px"), SHTHelper.qde.style.setProperty("--top-bar-height", e ? e.offsetHeight + "px" : "0px"), SHTHelper.qde.style.setProperty("--predictive-search-top", s ? s.offsetTop + "px" : "0px"), SHTHelper.qde.style.setProperty("--header-logo-width", i ? i.offsetWidth + "px" : "0px"), SHTHelper.qde.style.setProperty("--scrollbar-width", window.innerWidth - document.body.offsetWidth + "px")
}
window.SHTProductMediaItemModel = {
    isMouseenter: !1,
    loadShopifyXR() {
        Shopify.loadFeatures([{
            name: "shopify-xr",
            version: "1.0",
            onLoad: this.setupShopifyXR.bind(this)
        }])
    },
    setupShopifyXR(t) {
        t || (window.ShopifyXR ? (SHTHelper.qsa('[id^="ProductJSON-"]').forEach(t => {
            window.ShopifyXR.addModels(JSON.parse(t.textContent)), t.remove()
        }), window.ShopifyXR.setupXRElements()) : document.addEventListener("shopify_xr_initialized", () => this.setupShopifyXR()))
    }
}, Shopify.designMode ? (SHTHelper.qsa("[data-shopify-xr-hidden]").forEach(t => t.classList.add("hidden")), window.SHTProductMediaItemModel && window.SHTProductMediaItemModel.loadShopifyXR()) : window.SHTProductMediaItemModel && (window.addEventListener("scroll", function(t) {
    window.SHTProductMediaItemModel.isMouseenter || window.SHTProductMediaItemModel.loadShopifyXR(), window.SHTProductMediaItemModel.isMouseenter = !0
}, !1), ["mouseenter", "touchstart", "mouseover"].forEach(function(t) {
    SHTHelper.qs("body").addEventListener(t, function(t) {
        window.SHTProductMediaItemModel.isMouseenter || window.SHTProductMediaItemModel.loadShopifyXR(), window.SHTProductMediaItemModel.isMouseenter = !0
    })
})), ["mousemove", "touchstart"].forEach(function(t) {
    SHTHelper.qs("body").addEventListener(t, function(t) {
        document.body.classList.add("is-body-hover"), window.requestAnimationFrame(SHTInitStyleVariable)
    }, {
        once: !0
    })
}), window.addEventListener("scroll", function(t) {
    document.body.classList.add("is-body-hover"), window.requestAnimationFrame(SHTInitStyleVariable)
}, {
    once: !0
}), window.addEventListener("resize", t => {
    window.requestAnimationFrame(SHTInitStyleVariable)
});
class SHTDialogQuickBuy extends SHTDialogCore {
    constructor() {
        super()
    }
    showModal(t) {
        SHTHelper.preventStickyHeaderReveal(), this.opener = t, this.opener?.setAttribute("disabled", "disabled"), this.processData(t)
    }
    processData(t) {
        this.productElement = null, fetch(t.getAttribute("data-product-url")).then(t => t.text()).then(t => {
            t = (new DOMParser).parseFromString(t, "text/html");
            this.productElement = t.querySelector(".section-product-quick-buy"), window.Shopify && Shopify.PaymentButton && Shopify.PaymentButton.init(), this.body.innerHTML = this.productElement.innerHTML, this.executeScriptElements(this.body), window.SHTProductMediaItemModel && window.SHTProductMediaItemModel.loadShopifyXR()
        }).finally(() => {
            this.toggleAttribute("hidden", !1), this.classList.add("is-active"), this.opener?.removeAttribute("disabled")
        })
    }
    closeModal() {
        this.setAttribute("hidden", !0), this.classList.remove("is-active"), setTimeout(() => {
            this.body.innerHTML = ""
        }, 300)
    }
    executeScriptElements(t) {
        t = t.querySelectorAll("script");
        Array.from(t).forEach(t => {
            let e = document.createElement("script");
            Array.from(t.attributes).forEach(t => {
                e.setAttribute(t.name, t.value)
            }), e.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(e, t)
        })
    }
}
customElements.define("sht-dialog-quickbuy", SHTDialogQuickBuy);
class SHTMarquee extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    calculationPaddingSection() {
        this.heightSection = this.offsetHeight, this.heightSection = this.heightSection < 18 ? 18 : 96 < this.heightSection ? 96 : this.heightSection, this.closest(".js-running-content").style.setProperty("--spacing-padding-block", this.heightSection + "px")
    }
    init() {
        this.distance = this.$(".js-marquee-item").offsetWidth, this.speed = this.dataset.speed, this.style.setProperty("--marquee-duration", this.distance / this.speed + "s")
    }
}
if (customElements.define("sht-marquee", SHTMarquee), !customElements.get("sht-sticky-compare")) {
    class Qf extends SHTCustomComponent {
        constructor() {
            super()
        }
        init() {
            this.$ = this.querySelector.bind(this), this.$$ = this.querySelectorAll.bind(this), this.is_enabled = this.dataset.isEnabled, this.section_id = this.dataset.sectionId, this.current_scroll_top = 0, this.container_height = 0, this.sticky_bounds = {}, this.style_sticky = window.getComputedStyle(this), this.style_sticky_margin_bottom = parseInt(this.style_sticky.marginBottom, 0), this.container = SHTHelper.qs("#" + this.section_id), this.footer_element = document.querySelector(".js-footer"), this.container_padding_top = parseInt(window.getComputedStyle(this).getPropertyValue("padding-top")), this.bindEventHandlers()
        }
        bindEventHandlers() {
            window.addEventListener("scroll", this.onScrollHandle.bind(this), !1)
        }
        onScrollHandle() {
            var t = document.documentElement.scrollHeight - document.documentElement.clientHeight,
                t = null !== this.footer_element ? t - this.footer_element.offsetHeight : 10 + t,
                e = this.offsetTop + this.offsetHeight + this.style_sticky_margin_bottom + this.offsetTop + this.container_padding_top,
                s = window.pageYOffset || document.documentElement.scrollTop || 0,
                t = Math.ceil(s) >= t,
                e = 1 - e / s;
            s > this.current_scroll_top && 0 <= e && !t ? requestAnimationFrame(this.reveal.bind(this)) : s > this.current_scroll_top && 0 <= e && t ? requestAnimationFrame(this.hide.bind(this)) : s < this.current_scroll_top && 0 <= e && !t && requestAnimationFrame(this.reveal.bind(this)), this.current_scroll_top = s
        }
        connectedCallback() {
            this.init()
        }
        hide() {
            this.classList.remove("opacity-1"), this.classList.add("hidden-xs", "opacity-0")
        }
        reveal() {
            this.classList.add("opacity-1"), this.classList.remove("hidden-xs", "opacity-0")
        }
        reset() {
            this.classList.remove("opacity-1"), this.classList.add("hidden-xs", "opacity-0")
        }
        disconnectedCallback() {
            window.removeEventListener("scroll", this.onScrollHandle.bind(this))
        }
    }
    customElements.define("sht-sticky-compare", Qf)
}
if (!customElements.get("sht-dialog-compare")) {
    class Xf extends SHTDialogCore {
        constructor() {
            super()
        }
        init() {
            this.collectionCompare = SHTHelper.qs(".js-collections-compare"), this.clearAllBtn = this.$(".js-btn-clear-all"), this.btnShowProducts = this.$(".js-btn-compare"), this.handleEventListeners()
        }
        connectedCallback() {
            this.init()
        }
        handleEventListeners() {
            let t = this.getArrayFromLocalStorage();
            this.clearAllBtn.addEventListener("click", () => {
                this.collectionCompare.clearAllProducts(t), this.collectionCompare.updateStickyCompare(0), this.body.innerHTML = "", localStorage.removeItem("sht-compare-product"), this.closeModal()
            }), this.btnShowProducts.addEventListener("click", () => {
                setTimeout(() => {
                    this.setAttribute("hidden", !0), this.classList.remove("is-active"), this.body.innerHTML = ""
                }, 1e3)
            })
        }
        showModal(t) {
            SHTHelper.preventStickyHeaderReveal(), this.opener = t, this.opener?.setAttribute("disabled", "disabled"), this.processData(t), document.body.classList.add("o-hidden")
        }
        getArrayFromLocalStorage() {
            var t = localStorage.getItem("sht-compare-product");
            return JSON.parse(t)
        }
        fetchProductHTML(t) {
            return fetch(t).then(t => t.text()).then(t => {
                t = (new DOMParser).parseFromString(t, "text/html").querySelector(".section-product-compare");
                return window.Shopify && Shopify.PaymentButton && Shopify.PaymentButton.init(), t.innerHTML
            })
        }
        processData(t) {
            var e = this.getArrayFromLocalStorage();
            e && (this.productElement = null, e = e.map(t => t.url + "?view=product-compare"), Promise.all(e.map(e => this.fetchProductHTML(e).catch(t => (console.error(`Failed to fetch product from ${e}:`, t), null)))).then(t => {
                this.body.innerHTML = "", t.forEach((t, e) => {
                    var s = document.createElement("div");
                    s.innerHTML = t;
                    let i = s.firstElementChild,
                        r = document.createElement("button");
                    r.classList.add("btn", "btn-link", "btn-small", "maw-fit-content", "remove-product-button", "js-remove-product-button"), r.textContent = "Remove", i.appendChild(r), r.addEventListener("click", () => {
                        this.removeProduct(i, r)
                    }), this.body.appendChild(i)
                }), this.executeScriptElements(this.body), window.SHTProductMediaItemModel && window.SHTProductMediaItemModel.loadShopifyXR()
            }).catch(t => {
                console.error("One of the promises failed:", t)
            }).finally(() => {
                this.toggleAttribute("hidden", !1), this.classList.add("is-active"), this.opener?.removeAttribute("disabled")
            }))
        }
        removeProduct(t, e) {
            let s = e.parentNode.dataset.product;
            t.remove();
            e = this.getArrayFromLocalStorage();
            e && (this.collectionCompare.removeStateProduct(s), -1 !== (t = e.findIndex(t => t.id === s)) && e.splice(t, 1), this.collectionCompare.updateLocalStorage(e), this.collectionCompare.updateStickyCompare(e.length)), 0 == e.length && this.closeModal()
        }
        closeModal() {
            this.setAttribute("hidden", !0), this.classList.remove("is-active"), document.body.classList.remove("o-hidden"), setTimeout(() => {
                this.body.innerHTML = ""
            }, 100)
        }
        executeScriptElements(t) {
            t = t.querySelectorAll("script");
            Array.from(t).forEach(t => {
                let e = document.createElement("script");
                Array.from(t.attributes).forEach(t => {
                    e.setAttribute(t.name, t.value)
                }), e.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(e, t)
            })
        }
    }
    customElements.define("sht-dialog-compare", Xf)
}
class SHTCollectionCompare extends SHTCustomComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        this.init()
    }
    init() {
        this.btnCompares = this.$$(".js-btn-add-to-compare"), this.stickyCompare = SHTHelper.qs(".js-sticky-compare"), this.productCounter = SHTHelper.qsa(".js-sticky-compare-counter"), this.productsArray = this.getArrayFromLocalStorage() || [], this.btnShowProducts = SHTHelper.qs(".js-btn-compare"), this.updateStatesProduct(this.productsArray), this.handleEvents()
    }
    handleEvents() {
        this.btnCompares.forEach(s => {
            s.addEventListener("click", () => {
                this.productsArray = this.getArrayFromLocalStorage() || [];
                var t = s.getAttribute("data-product-id"),
                    e = s.getAttribute("data-product-url");
                this.productsArray.length < 3 ? (this.addProductToArray(t, e), this.changeStateIcon(s), this.updateStickyCompare(this.productsArray.length)) : alert("You can only add a maximum of 3 products to compare.")
            })
        })
    }
    addProductToArray(t, e) {
        e = {
            id: t,
            url: e
        };
        this.checkProductValid(t, this.productsArray) && 0 != this.productsArray.length || (this.productsArray.push(e), this.updateLocalStorage(this.productsArray))
    }
    checkProductValid(e, t) {
        return t.some(t => t.id === e)
    }
    changeStateIcon(t) {
        t.closest(".js-product-card-wrapper").querySelectorAll(".js-btn-add-to-compare").forEach(t => {
            t.classList.add("active")
        })
    }
    updateLocalStorage(t) {
        localStorage.setItem("sht-compare-product", JSON.stringify(t))
    }
    getArrayFromLocalStorage() {
        var t = localStorage.getItem("sht-compare-product");
        return JSON.parse(t)
    }
    updateStickyCompare(e) {
        1 <= e ? this.stickyCompare?.classList.remove("d-none-important") : this.stickyCompare?.classList.add("d-none-important"), 1 == e ? this.btnShowProducts?.setAttribute("disabled", "disabled") : this.btnShowProducts?.removeAttribute("disabled"), this.productCounter.forEach(t => {
            t.innerText = e
        })
    }
    updateStatesProduct(t) {
        var e;
        t && (e = t.length, t?.forEach(t => {
            this.$$(`.js-btn-add-to-compare[data-product-id="${t.id}"]`).forEach(t => {
                t.classList.add("active")
            })
        }), this.updateStickyCompare(e))
    }
    clearAllProducts() {
        this.$$(".js-btn-add-to-compare").forEach(t => {
            t.classList.remove("active")
        })
    }
    removeStateProduct(t) {
        this.$$(`.js-btn-add-to-compare[data-product-id="${t}"]`).forEach(t => {
            t.classList.remove("active")
        })
    }
}
if (customElements.define("sht-collections-compare", SHTCollectionCompare), !customElements.get("sht-dialog-show-products")) {
    class Y5 extends SHTDialogCore {
        constructor() {
            super(), this.collectionCompare = SHTHelper.qs(".js-collections-compare"), this.btnShowProducts = this.$(".js-btn-compare"), this.handleEventListeners()
        }
        handleEventListeners() {
            this.initResizeListener()
        }
        showModal(t) {
            SHTHelper.preventStickyHeaderReveal(), this.opener = t, this.opener?.setAttribute("disabled", "disabled"), document.body.classList.add("o-hidden"), this.processData(t)
        }
        getArrayFromLocalStorage() {
            var t = localStorage.getItem("sht-compare-product");
            return JSON.parse(t)
        }
        fetchProductHTML(t) {
            return fetch(t).then(t => t.text()).then(t => {
                t = (new DOMParser).parseFromString(t, "text/html").querySelector(".section-view-product-compare");
                return window.Shopify && Shopify.PaymentButton && Shopify.PaymentButton.init(), t.innerHTML
            })
        }
        processData(t) {
            var e = this.getArrayFromLocalStorage();
            this.body.style.setProperty("--block-size", e.length), e && (this.productElement = null, e = e.map(t => t.url + "?view=show-products-compare"), Promise.all(e.map(t => this.fetchProductHTML(t))).then(t => {
                this.body.innerHTML = "", t.forEach((t, e) => {
                    var s = document.createElement("div");
                    s.innerHTML = t;
                    let i = s.firstElementChild,
                        r = i.querySelector(".js-button-remove");
                    t = document.createElement("button");
                    t.classList.add("btn", "btn-link", "btn-small", "maw-fit-content", "remove-product-button", "js-remove-product-button"), t.textContent = "Remove", r.appendChild(t), t.addEventListener("click", () => {
                        this.removeProduct(i, r)
                    }), this.body.appendChild(i)
                }), setTimeout(() => {
                    this.calculateMaxHeightContents(".js-product-comparison-item"), this.calculateMaxHeightContents(".js-product-comparison-variant"), this.calculateMaxHeightContents(".js-product-comparison-des")
                }, 100), this.executeScriptElements(this.body), window.SHTProductMediaItemModel && window.SHTProductMediaItemModel.loadShopifyXR()
            }).catch(t => {
                console.error("Lỗi promise:", t)
            }).finally(() => {
                this.toggleAttribute("hidden", !1), this.classList.add("is-active"), this.opener?.removeAttribute("disabled")
            }))
        }
        initResizeListener() {
            window.addEventListener("resize", () => {
                this.closeModal()
            })
        }
        calculateMaxHeightContents(t) {
            t = this.body.querySelectorAll(t);
            let e = [],
                s = (t.forEach(t => {
                    e.push(t.clientHeight)
                }), Math.max(...e));
            t.forEach(t => {
                t.style.height = s + "px"
            })
        }
        removeProduct(t, e) {
            let s = e.dataset.product;
            console.log(s), t.remove();
            e = this.getArrayFromLocalStorage();
            e && (this.collectionCompare.removeStateProduct(s), -1 !== (t = e.findIndex(t => t.id === s)) && e.splice(t, 1), this.collectionCompare.updateLocalStorage(e), this.collectionCompare.updateStickyCompare(e.length), this.body.style.setProperty("--block-size", e.length)), 1 == e.length && this.closeModal()
        }
        closeModal() {
            this.setAttribute("hidden", !0), this.classList.remove("is-active"), document.body.classList.remove("o-hidden"), setTimeout(() => {
                this.body.innerHTML = ""
            }, 10)
        }
        executeScriptElements(t) {
            t = t.querySelectorAll("script");
            Array.from(t).forEach(t => {
                let e = document.createElement("script");
                Array.from(t.attributes).forEach(t => {
                    e.setAttribute(t.name, t.value)
                }), e.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(e, t)
            })
        }
    }
    customElements.define("sht-dialog-show-products", Y5)
}
class SHTPopup extends SHTCustomComponent {
    constructor() {
        super(), this.sticky_popup = SHTHelper.qs("sht-sticky-popup"), this.properties = JSON.parse(this.dataset.props), this.myStorage = window.sessionStorage, this.sessionStorageName = Shopify.theme.name.toLowerCase() + "-popup-display", this.cartNotification = SHTHelper.qs("sht-cart-noti"), this.isOpen = !1, this.buffer = 100, this.myScrollHeight = document.body.scrollHeight || SHTHelper.qde.scrollHeight || 0, this.myWindowHeight = window.innerHeight || SHTHelper.qde.clientHeight || 0, this.elms = {
            close_btn: this.$(".js-popup-close-btn"),
            body: SHTHelper.qs("body")
        }, this.triggerOn = this.properties.triggerOn, this.timeOnPage = 1e3 * parseInt(this.properties.delayTime), this.scrollEventHandle = this.onScrollEventHandle.bind(this), this.bindEventHandlers()
    }
    bindEventHandlers() {
        "time-on-page" !== this.triggerOn || this.getPopupStatus() || setTimeout(() => {
            this.togglePopup(!0)
        }, this.timeOnPage), this.elms.close_btn.addEventListener("click", this.onCloseBtnClickHandle.bind(this)), window.addEventListener("scroll", this.scrollEventHandle), this.cartNotification && "after-closing-cart-notification" === this.triggerOn && this.cartNotification.addEventListener("closed", t => {
            this.getPopupStatus() || this.togglePopup(!0)
        }), this.popupAttrObserve()
    }
    onScrollEventHandle(t) {
        var e, s;
        "reaching-to-footer" !== this.triggerOn ? window.removeEventListener("scroll", this.scrollEventHandle) : (this.myScrollHeight = document.body.scrollHeight || SHTHelper.qde.scrollHeight || 0, e = (window.pageYOffset || SHTHelper.qde.scrollTop || document.body.scrollTop || 0) + this.buffer + this.myWindowHeight >= this.myScrollHeight, s = this.getPopupStatus(), "reaching-to-footer" !== this.triggerOn || !e || null !== this.getAttribute("open") && "" !== this.getAttribute("open") || s || this.togglePopup(!0))
    }
    togglePopup(t) {
        t ? (this.toggleOpen(!0), this.properties.showSticky && this.sticky_popup && this.sticky_popup.removeStickyPopupStatus()) : (this.toggleOpen(!1), this.setPopupStatus())
    }
    toggleOpen(t) {
        t ? (this.style.setProperty("--height", this.clientHeight + "px"), this.elms.body.classList.add("is-popup-show"), this.setAttribute("open", !0)) : (this.elms.body.classList.remove("is-popup-show"), this.removeAttribute("open"), SHTHelper.removeTrapFocus())
    }
    onCloseBtnClickHandle(t) {
        t.preventDefault(), this.properties.showSticky && this.sticky_popup && (this.sticky_popup.getStickyPopupStatus() || this.sticky_popup.openStickyPopup()), this.togglePopup(!1)
    }
    setPopupStatus() {
        this.myStorage.setItem(this.sessionStorageName, !1)
    }
    getPopupStatus() {
        return Shopify.designMode ? "" : this.myStorage.getItem(this.sessionStorageName)
    }
    popupAttrObserve() {
        new MutationObserver((t, e) => {
            t.forEach(async t => {
                "open" == t.attributeName && (this.hasAttribute("open") ? (await this.animationsComplete(), this.dispatchEvent(new Event("opened")), SHTHelper.trapFocus(this)) : (SHTHelper.removeTrapFocus(), await this.animationsComplete(), this.dispatchEvent(new Event("closed"))))
            })
        }).observe(this, {
            attributes: !0
        })
    }
    animationsComplete() {
        return Promise.allSettled(this.getAnimations().map(t => t.finished))
    }
    removePopupStatus() {
        this.myStorage.removeItem(this.sessionStorageName)
    }
}
customElements.define("sht-popup", SHTPopup);
class SHTStickyPopup extends SHTCustomComponent {
    constructor() {
        super(), this.myStorage = window.sessionStorage, this.popup = SHTHelper.qs("sht-popup"), this.sessionStickyStorageName = Shopify.theme.name.toLowerCase() + "-sticky-popup-display", this.elms = {
            close_btn: this.$(".js-sticky-popup-close-btn"),
            open_popup_btn: this.$(".js-sticky-popup-reopen-btn")
        }, this.max_height = 0, this.init(), this.bindEventHandlers()
    }
    init() {
        var t = this.getStickyPopupStatus(),
            e = this.popup.getPopupStatus();
        null == t && "false" == e && this.openStickyPopup()
    }
    removeStickyPopupStatus() {
        this.myStorage.removeItem(this.sessionStickyStorageName)
    }
    bindEventHandlers() {
        this.elms.close_btn.addEventListener("click", this.onCloseBtnClickHandle.bind(this)), this.elms.open_popup_btn.addEventListener("click", this.onOpenPopupBtnClickHandle.bind(this))
    }
    onOpenPopupBtnClickHandle(t) {
        t.preventDefault(), this.popup.removePopupStatus(), this.popup.togglePopup(!0), this.hideStickyPopup()
    }
    onCloseBtnClickHandle(t) {
        t.preventDefault(), this.closeStickyPopup()
    }
    setStickyPopupStatus() {
        this.myStorage.setItem(this.sessionStickyStorageName, !1)
    }
    getStickyPopupStatus() {
        return Shopify.designMode ? "" : this.myStorage.getItem(this.sessionStickyStorageName)
    }
    closeStickyPopup() {
        this.classList.add("popup-sticky-hide"), this.setStickyPopupStatus()
    }
    hideStickyPopup() {
        this.classList.add("popup-sticky-hide")
    }
    openStickyPopup() {
        this.style.setProperty("--height", this.clientHeight + "px"), this.style.setProperty("--width", this.clientWidth + "px"), this.classList.remove("popup-sticky-hide")
    }
}
customElements.define("sht-sticky-popup", SHTStickyPopup);
class SHTCountDown extends SHTCustomComponent {
    constructor() {
        super()
    }
    init() {
        if (this.isExpired = JSON.parse(this.dataset.isExpired), this.isExpired) return !0;
        this.timeZoneName = this.dataset.timeZoneName, this.timeZoneOffset = this.dataset.timeZoneOffset, this.endTime = this.dataset.endTime, this.endDate = this.dataset.endDate, this.hideOnEnd = JSON.parse(this.dataset.hideOnEnd), this.validateDateValue(this.endDate) || (this.endDate = this.getCurrentDateTime(!0)), this.validateTimeValue(this.endTime) || (this.endTime = "23:59:59"), this.expiredAt = new Date(this.convertDateStringToISOString(this.endDate + ":" + this.endTime)).getTime(), this.currentTime = this.convertDateTimeToSpecificTimeZone(this.getCurrentDateTime()), this.daysElement = this.$(".js-counter-days"), this.hoursElement = this.$(".js-counter-hours"), this.minutesElement = this.$(".js-counter-minutes"), this.secondsElement = this.$(".js-counter-seconds"), this.messageElement = this.$(".js-counter-message"), this.counterElement = this.$(".js-counter");
        let r = setInterval(() => {
            var t, e, s, i = this.expiredAt - this.currentTime;
            i <= 0 ? (clearInterval(r), this.setCounter({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }), "" != this.messageElement.innerHTML && this.messageElement.classList.remove("d-none"), this.hideOnEnd && this.counterElement.classList.add("d-none-important")) : (t = Math.floor(i / 864e5), e = Math.floor(i % 864e5 / 36e5), s = Math.floor(i % 36e5 / 6e4), i = Math.floor(i % 6e4 / 1e3), this.setCounter({
                days: t,
                hours: e,
                minutes: s,
                seconds: i
            }), this.currentTime = this.currentTime + 1e3)
        }, 1e3)
    }
    connectedCallback() {
        this.init()
    }
    getCurrentDateTime(t = !1) {
        var e = new Date,
            s = e.getFullYear(),
            i = String(e.getMonth() + 1).padStart(2, "0"),
            r = String(e.getDate()).padStart(2, "0"),
            a = String(e.getHours()).padStart(2, "0"),
            o = String(e.getMinutes()).padStart(2, "0"),
            e = String(e.getSeconds()).padStart(2, "0");
        return t ? s + `-${i}-` + r : s + `-${i}-${r} ${a}:${o}:` + e
    }
    convertDateTimeToSpecificTimeZone(t, e = !0) {
        var t = new Date(t),
            s = "-" === this.timeZoneOffset[0];
        let i = 60 * (60 * parseInt(this.timeZoneOffset.substring(1, 3)) + parseInt(this.timeZoneOffset.substring(3, 5))) * 1e3;
        s && (i = -i);
        s = new Date(t.getTime() + i);
        return e ? s.getTime() : s.toISOString()
    }
    setCounter({
        days: t,
        hours: e,
        minutes: s,
        seconds: i
    }) {
        this.daysElement.textContent = t < 10 ? "0" + t : t, this.hoursElement.textContent = e < 10 ? "0" + e : e, this.minutesElement.textContent = s < 10 ? "0" + s : s, this.secondsElement.textContent = i < 10 ? "0" + i : i
    }
    convertDateStringToISOString(t) {
        return t.replace(/:/, "T") + ".000Z"
    }
    validateDateValue(t) {
        return !!/^\d{4}-\d{2}-\d{2}$/.test(t)
    }
    validateTimeValue(t) {
        return !!/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(t)
    }
}
customElements.define("sht-countdown", SHTCountDown);
class SHTProductComparisonVariantSelector extends SHTFeaturedVariantSelector {
    constructor() {
        super()
    }
    init() {
        this.elms = {
            radio_elms: this.$$(".js-featured-variant-radio-item"),
            form: SHTHelper.qs(`#productComparisonForm-${this.dataset.section}-` + this.dataset.block),
            price: SHTHelper.qs(`#productComparisonPrice-${this.dataset.section}-` + this.dataset.block),
            product_form: SHTHelper.qs(`sht-featured-prd-frm[data-section="${this.dataset.section}"]`),
            inventory_tracking: SHTHelper.qs(`#productComparisonInventoryTracking-${this.dataset.section}-` + this.dataset.block),
            variant_picker: SHTHelper.qs(`#productComparisonVariantPicker-${this.dataset.section}-` + this.dataset.block),
            slideshow: SHTHelper.qs(`sht-prd-slideshow[data-block="${this.dataset.block}"]`),
            variant_options: this.$$(".js-variant-option-value")
        }, this.price_selector = `#productComparisonPrice-${this.dataset.section}-` + this.dataset.block, this.inventory_tracking_selector = `#productComparisonInventoryTracking-${this.dataset.section}-` + this.dataset.block, this.variant_picker_selector = `#productComparisonVariantPicker-${this.dataset.section}-` + this.dataset.block, this.slideshow_selector = `sht-prd-slideshow[data-section="${this.dataset.section}"]`, this.selected_variants = null, this.variant_data = null, this.elms.form && (this.setSelectedVariants(), this.setCurrentVariant(), this.bindEventHandlers(), this.updateSelectedVariantsOnOptionName(), this.setUnavailableOptions())
    }
    setActiveMedia() {
        var t;
        this.currentVariant.featured_media && (t = this.currentVariant.featured_media.id, t = this.elms.slideshow.querySelector(`sht-prd-comparison-itm[data-comparison="${this.dataset.block}-${t}"]`), this.elms.slideshow.querySelectorAll(".js-product-slideshow-item").forEach(t => {
            t.classList.remove("d-block"), "true" == this.elms.slideshow.hide_variant && t.classList.add("d-none")
        }), this.elms.slideshow.querySelectorAll(".js-product-slideshow-thumb").forEach(t => {
            t.classList.remove("is-active-item")
        }), t.classList.add("d-block"), "true" == this.elms.slideshow.hide_variant && t.classList.remove("d-none"), this.elms.slideshow.pauseAllVideo())
    }
}
class SHTProductComparisonVariantRadios extends SHTProductComparisonVariantSelector {
    constructor() {
        super()
    }
    setSelectedVariants() {
        var t = Array.from(this.$$(".js-featured-variant-radio-container"));
        this.selected_variants = t.map(t => Array.from(t.querySelectorAll(".js-featured-variant-radio-item")).find(t => t.checked).value)
    }
}
customElements.define("sht-product-comparison-variant-radios", SHTProductComparisonVariantRadios);