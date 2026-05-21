/**
 * Gulf Fruits — Cart Metafields Sync
 *
 * COMPLETE FLOW:
 * Cart Page → collectAllData() → saveToCartAttributes() + saveToCartMetafields()
 *           ↓
 * Order Placed → Shopify auto-copies note_attributes to order
 *           ↓
 * Shopify Flow → reads order.customAttributes → writes to order metafields
 *           ↓
 * Order Page shows: custom.delivery_time | custom.delivery | custom.test_notes
 */

const CartMetafields = (() => {
  const SHOP_DOMAIN  = window.Shopify?.shop || '';
  const API_VERSION  = '2024-10';
  const INVALID_VALS     = ['', 'Not Selected', 'لم يتم التحديد', 'undefined', 'null'];

  function clean(val) {
    const v = (val || '').toString().trim();
    return INVALID_VALS.includes(v) ? '' : v;
  }

  // ── Collect ALL data from cart page ──────────────────────────────────────

  function collectAllData() {

    // 1. Delivery Date — input first, fallback to display span
    const deliveryDate = clean(document.getElementById('datepicker')?.value)
                      || clean(document.getElementById('date-view-ld')?.textContent);

    // 2. Delivery Time — input first, fallback to display span; normalize "and" → "-"
    const deliveryTime = (clean(document.getElementById('local_delivery')?.value)
                      || clean(document.getElementById('timeslot-view-ld')?.textContent))
                      .replace(' and ', ' - ');

    // 3. Emirates/Location — from location-view-ld span
    const emirates = clean(document.getElementById('location-view-ld')?.textContent);

    // 4. Delivery Type — dropdown
    const deliveryType = clean(document.getElementById('deliveryType')?.value);

    // 5. Order Note — visible textarea
    const orderNote = clean(document.getElementById('cartNoteDummy')?.value);

    // 6. Full address from selected radio button (shipping_address)
    const radio   = document.querySelector('input[name="shipping_address"]:checked');
    const name     = clean(radio?.getAttribute('data-name'));
    const address1 = clean(radio?.getAttribute('data-address1'));
    const address2 = clean(radio?.getAttribute('data-address2'));
    const city     = clean(radio?.getAttribute('data-city'));
    const province = clean(radio?.getAttribute('data-province'));
    const country  = clean(radio?.getAttribute('data-country'));
    const phone    = clean(radio?.getAttribute('data-phone'));
    const email    = clean(radio?.getAttribute('data-email'));
    const fullAddress = [address1, address2].filter(Boolean).join(', ');

    return {
      name,
      fullAddress,
      city,
      province,
      country,
      phone,
      email,
      deliveryDate,
      deliveryTime,
      emirates: emirates || province,   // fallback to province if span empty
      deliveryType,
      orderNote,
  
    };
  }

  // ── Console log — verify every field ─────────────────────────────────────

  function logData(d) {
    console.group('%c[CartMetafields] All Cart Data', 'color:#2196F3;font-weight:bold');
    console.log('👤 Name          :', d.name          || '⚠ EMPTY');
    console.log('🏠 Address       :', d.fullAddress   || '⚠ EMPTY');
    console.log('🌆 City          :', d.city          || '⚠ EMPTY');
    console.log('🗺  Province      :', d.province      || '⚠ EMPTY');
    console.log('📞 Phone         :', d.phone         || '⚠ EMPTY');
    console.log('📧 Email         :', d.email         || '⚠ EMPTY');
     console.log('📅 Delivery Date :', d.deliveryDate  || '⚠ EMPTY');
    console.log('⏰ Delivery Time :', d.deliveryTime  || '⚠ EMPTY');
    console.log('🇦🇪 Emirates     :', d.emirates      || '⚠ EMPTY');
    console.log('🚚 Delivery Type :', d.deliveryType  || '⚠ EMPTY');
    console.log('📝 Order Note    :', d.orderNote     || '⚠ EMPTY');
    console.groupEnd();
  }

  // ── Save to cart.attributes via /cart/update.js ───────────────────────────
  // These become order.note_attributes → Flow reads them

  async function saveToCartAttributes(d) {
    const attributes = {};
    if (d?.deliveryType)  attributes['Delivery Type']  = d.deliveryType;
    if (d?.deliveryDate)  attributes['Delivery Date']  = d.deliveryDate;
    if (d?.deliveryTime)  attributes['Delivery Time']  = d.deliveryTime;
    if (d?.emirates)      attributes['Emirates']        = d.emirates;
    if (d?.fullAddress)   attributes['Address']         = d.fullAddress;
    if (d?.orderNote)     attributes['Order Note']      = d.orderNote;

    if (!Object.keys(attributes).length) return;

    try {
      const res  = await fetch('/cart/update.js', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ attributes }),
      });
      const cart = await res.json();
      console.log('%c[CartMetafields] cart attributes saved ✓', 'color:#4CAF50', {
        attributes: cart.attributes,
      });
    } catch (e) {
      console.error('[CartMetafields] cart attributes save error:', e);
    }
  }

  // ── Save to cart metafields via Storefront API ────────────────────────────
  // namespace: custom — matches order metafield definitions exactly
  // custom.delivery_time | custom.delivery | custom.test_notes

  async function saveToCartMetafields(d) {
    const STOREFRONT_TOKEN = window.__storefrontToken || '';
    if (!STOREFRONT_TOKEN) {
      console.warn('[CartMetafields] Storefront token missing — skipping metafield write');
      return;
    }

    // Get cart GID
    let cartId;
    try {
      const res  = await fetch('/cart.js');
      const cart = await res.json();
      if (!cart.token) throw new Error('No cart token');
      cartId = `gid://shopify/Cart/${cart.token}`;
    } catch (e) {
      console.error('[CartMetafields] Cart token error:', e);
      return;
    }

    // Build values for 3 order metafield definitions
    const deliverySummary = [
      d.name          ? `Name: ${d.name}`                    : '',
      d.fullAddress   ? `Address: ${d.fullAddress}`          : '',
      d.city          ? `City: ${d.city}`                    : '',
      d.phone         ? `Phone: ${d.phone}`                  : '',
      d.email         ? `Email: ${d.email}`                  : '',
      d.deliveryDate  ? `Delivery Date: ${d.deliveryDate}`   : '',
      d.deliveryTime  ? `Delivery Time: ${d.deliveryTime}`   : '',
      d.emirates      ? `Emirates: ${d.emirates}`            : '',
    ].filter(Boolean).join('\n');

    // Only write fields that have values
    const toWrite = {
      delivery_time: d.deliveryTime,    // → custom.delivery_time (single line)
      delivery_type: d.deliveryType,    // → custom.delivery_type (single line)
      delivery:      deliverySummary,   // → custom.delivery      (multi line)
      test_notes:    d.orderNote,       // → custom.test_notes    (multi line)
    };

    const metafields = Object.entries(toWrite)
      .filter(([, v]) => v && v.trim())
      .map(([key, value]) => ({
        namespace: 'custom',
        key,
        value: String(value),
        type: (key === 'delivery_time' || key === 'delivery_type') ? 'single_line_text_field' : 'multi_line_text_field',
      }));

    if (!metafields.length) {
      console.log('[CartMetafields] No values to write to metafields yet');
      return;
    }

    const mutation = `
      mutation cartMetafieldsSet($cartId: ID!, $metafields: [CartMetafieldsSetInput!]!) {
        cartMetafieldsSet(cartId: $cartId, metafields: $metafields) {
          cart { id }
          userErrors { field message }
        }
      }
    `;

    try {
      const res  = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: mutation, variables: { cartId, metafields } }),
      });
      const json   = await res.json();
      const errors = json?.data?.cartMetafieldsSet?.userErrors;

      if (errors?.length) {
        console.error('[CartMetafields] Metafield errors:', errors);
      } else {
        console.log('%c[CartMetafields] Cart metafields saved via Storefront API ✓', 'color:#4CAF50', {
          cartId,
          delivery_time: toWrite.delivery_time || '(empty)',
          delivery:      toWrite.delivery      || '(empty)',
          test_notes:    toWrite.test_notes    || '(empty)',
          delivery_type: d.deliveryType        || '(empty)',
        });
      }
    } catch (e) {
      console.error('[CartMetafields] Storefront API error:', e);
    }
  }

  // ── Sync hidden form inputs so cart form POST always has fresh data ─────────

  function syncHiddenFields(d) {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };
    set('attr-delivery-date', d.deliveryDate);
    set('attr-delivery-time', d.deliveryTime);
    set('attr-emirates',      d.emirates);
    set('attr-address',       d.fullAddress);
    set('attr-order-note',    d.orderNote);
  }

  // ── Main sync ─────────────────────────────────────────────────────────────

  async function syncDeliveryData() {
    const data = collectAllData();
    logData(data);
    syncHiddenFields(data);
    await saveToCartAttributes(data);
    await saveToCartMetafields(data);
  }

  // ── Event listeners ───────────────────────────────────────────────────────

  function init() {
    // Order note textarea
    const noteEl = document.getElementById('cartNoteDummy');
    if (noteEl) {
      noteEl.addEventListener('input',  syncDeliveryData);
      noteEl.addEventListener('change', syncDeliveryData);
    }

    // Delivery type dropdown
    const typeEl = document.getElementById('deliveryType');
    if (typeEl) typeEl.addEventListener('change', syncDeliveryData);

    // Initial sync
    syncDeliveryData();
  }

  return { init, syncDeliveryData };
})();

document.addEventListener('DOMContentLoaded', CartMetafields.init);
window.CartMetafields = CartMetafields;
