class ProductTabs {
  constructor() {
    this.init();
  }

  init() {
    this.tabs = document.querySelectorAll('.product-tabs__tab');
    this.panels = document.querySelectorAll('.product-tabs__panel');
    
    this.populateRatingBadge();
    
    if (this.tabs.length === 0) return;
    
    this.bindEvents();
    this.moveReviewsToTab();
    this.simplifyStarRating();
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.handleTabClick(e));
    });
  }

  handleTabClick(e) {
    const clickedTab = e.currentTarget;
    const targetPanel = clickedTab.getAttribute('data-tab');
    
    this.tabs.forEach(tab => tab.classList.remove('product-tabs__tab--active'));
    this.panels.forEach(panel => panel.classList.remove('product-tabs__panel--active'));
    
    clickedTab.classList.add('product-tabs__tab--active');
    
    const activePanel = document.querySelector(`[data-panel="${targetPanel}"]`);
    if (activePanel) {
      activePanel.classList.add('product-tabs__panel--active');
    }
  }

  moveReviewsToTab() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    
    let attempts = 0;
    const maxAttempts = 40;
    let reviewsMoved = false;
    
    const possibleSelectors = [
      '[id*="klaviyo"]',
      '[class*="klaviyo"]',
      '[id*="reviews"]',
      '[class*="reviews"]',
      '[id*="shopify-product-reviews"]',
      '.product__info[class*="ord-"]'
    ];
    
    const tryMoveReviews = () => {
      if (reviewsMoved) return true;
      
      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        
        for (const element of elements) {
          const text = element.textContent.toLowerCase();
          
          if ((text.includes('customer reviews') || 
               text.includes('review') || 
               text.includes('write a review') ||
               element.querySelector('[class*="review"]') ||
               element.querySelector('[id*="review"]')) &&
              !element.closest('.product-tabs')) {
            
            reviewsContainer.innerHTML = '';
            const reviewsContent = element.cloneNode(true);
            reviewsContainer.appendChild(reviewsContent);
            
            element.style.display = 'none';
            element.setAttribute('data-moved-to-tabs', 'true');
            
            reviewsMoved = true;
            return true;
          }
        }
      }
      return false;
    };
    
    const checkForReviews = setInterval(() => {
      attempts++;
      
      if (tryMoveReviews()) {
        clearInterval(checkForReviews);
        if (this.observer) this.observer.disconnect();
        return;
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(checkForReviews);
      }
    }, 500);
    
    this.observer = new MutationObserver((mutations) => {
      if (reviewsMoved) {
        this.observer.disconnect();
        return;
      }
      
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          if (tryMoveReviews()) {
            clearInterval(checkForReviews);
            this.observer.disconnect();
            return;
          }
        }
      }
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  simplifyStarRating() {
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkForStarRating = setInterval(() => {
      attempts++;
      
      const possibleSelectors = [
        '[id*="klaviyo"]',
        '[class*="klaviyo"]',
        '[class*="star_rating"]',
        '[id*="star_rating"]',
        '.shopify-block'
      ];
      
      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        
        for (const element of elements) {
          const text = element.textContent.toLowerCase();
          
          if ((text.includes('reviews') || text.includes('rating')) && 
              !element.hasAttribute('data-simplified') &&
              !element.closest('.product-tabs')) {
            
            const ratingMatch = text.match(/(\d+\.?\d*)\s*\/\s*5/);
            
            let reviewCount = '0';
            const textAfterRating = ratingMatch ? text.split(ratingMatch[0])[1] || text : text;
            const reviewCountMatch = textAfterRating.match(/(\d+)\s*reviews?/i);
            if (reviewCountMatch) {
              reviewCount = reviewCountMatch[1];
            }
            
            if (ratingMatch) {
              const rating = ratingMatch[1];
              
              const simplifiedRating = document.createElement('div');
              simplifiedRating.className = 'simplified-star-rating';
              simplifiedRating.style.cssText = 'display: flex; align-items: center; gap: 6px; margin: 12px 0; font-size: 14px;';
              simplifiedRating.innerHTML = `
                <span style="font-size: 18px; color: #000;">★</span>
                <span style="font-weight: 600; color: #000;">${rating}</span>
                <span style="color: #666; font-weight: 400;">(${reviewCount} ratings)</span>
              `;
              
              element.innerHTML = '';
              element.appendChild(simplifiedRating);
              element.setAttribute('data-simplified', 'true');
              
              clearInterval(checkForStarRating);
              return;
            }
          }
        }
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(checkForStarRating);
      }
    }, 500);
  }

  populateRatingBadge() {
    const badgeContainer = document.querySelector('.js-product-rating-badge');
    if (!badgeContainer) return;

    let attempts = 0;
    const maxAttempts = 20;

    const checkForRating = setInterval(() => {
      attempts++;

      const possibleSelectors = [
        '[id*="klaviyo"]',
        '[class*="klaviyo"]',
        '[class*="star_rating"]',
        '[id*="star_rating"]',
        '.shopify-block'
      ];

      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);

        for (const element of elements) {
          const text = element.textContent.toLowerCase();

          if (text.includes('reviews') || text.includes('rating')) {
            const ratingMatch = text.match(/(\d+\.?\d*)\s*\/\s*5/);
            
            let reviewCount = '0';
            const textAfterRating = ratingMatch ? text.split(ratingMatch[0])[1] || text : text;
            const reviewCountMatch = textAfterRating.match(/(\d+)\s*reviews?/i);
            if (reviewCountMatch) {
              reviewCount = reviewCountMatch[1];
            }

            if (ratingMatch) {
              const rating = ratingMatch[1];

              badgeContainer.innerHTML = `
                <span class="rating-badge__star">★</span>
                <span class="rating-badge__score">${rating}</span>
                <span class="rating-badge__count">(${reviewCount}+ Ratings)</span>
              `;
              badgeContainer.classList.add('rating-badge--visible');

              clearInterval(checkForRating);
              return;
            }
          }
        }
      }

      if (attempts >= maxAttempts) {
        clearInterval(checkForRating);
      }
    }, 500);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductTabs();
  });
} else {
  new ProductTabs();
}
