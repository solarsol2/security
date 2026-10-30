/* KCOP 공통: 유틸, 상품 카드, 장바구니 수량, FAQ */
(function () {
  var D = window.KCOP_DATA;

  function escape(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function won(n) { return n.toLocaleString('ko-KR') + '원'; }
  function find(id) {
    for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i];
    return null;
  }
  function catLabel(id) {
    for (var i = 0; i < D.categories.length; i++) if (D.categories[i].id === id) return D.categories[i].label;
    return '';
  }

  var BADGE = { best: 'BEST', new: 'NEW', set: 'SET', local: '국내배송', soldout: '품절' };

  function card(prod) {
    var rate = prod.listPrice ? Math.round((1 - prod.price / prod.listPrice) * 100) : 0;
    var media = prod.img
      ? '<img src="' + prod.img + '" alt="" loading="lazy" width="900" height="900">'
      : '<div class="ph"><span class="ph__label">' + prod.id + '.png 준비 중</span></div>';
    var parts = prod.parts ? prod.parts.length + '종 구성' : catLabel(prod.categories[0]);
    var ship = prod.ship === 'local' ? '국내 재고 · 1–2일 도착' : '해외배송 · 7–12일 도착';
    return '<li class="card' + (prod.soldout ? ' card--soldout' : '') + '">' +
      '<div class="card__media"><a class="card__link" href="product.html?id=' + prod.id + '" tabindex="-1" aria-hidden="true">' + media + '</a>' +
        (prod.badge ? '<span class="card__badges"><span class="badge badge--' + prod.badge + '">' + BADGE[prod.badge] + '</span></span>' : '') +
        (prod.soldout ? '' : '<button class="card__cart" type="button" data-cart="' + prod.id + '" aria-label="' + escape(prod.name) + ' 장바구니 담기"><svg class="icon icon--sm"><use href="#i-bag"/></svg></button>') +
      '</div>' +
      '<p class="card__cat">' + escape(parts) + '</p>' +
      '<a class="card__name" href="product.html?id=' + prod.id + '">' + escape(prod.name) + '</a>' +
      '<p class="card__price">' +
        (rate ? '<span class="card__rate">' + rate + '%</span>' : '') +
        '<span class="card__now">' + won(prod.price) + '</span>' +
        (prod.listPrice ? '<span class="card__was">' + won(prod.listPrice) + '</span>' : '') +
      '</p>' +
      '<p class="card__ship">' + (prod.soldout ? '재입고 알림 신청 가능' : ship) + '</p>' +
    '</li>';
  }

  /* 장바구니: 시안 단계에서는 수량 표시만 */
  var KEY = 'kcop.cart';
  function readCart() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function writeCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function renderCount() {
    var n = readCart().reduce(function (s, it) { return s + it.qty; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n; el.hidden = n === 0;
    });
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cart]');
    if (!btn) return;
    var id = btn.getAttribute('data-cart'), c = readCart(), hit = null;
    c.forEach(function (it) { if (it.id === id) hit = it; });
    hit ? hit.qty++ : c.push({ id: id, qty: 1 });
    writeCart(c); renderCount();
  });

  /* FAQ 아코디언 */
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq__q');
    if (!q) return;
    var open = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', String(!open));
    document.getElementById(q.getAttribute('aria-controls')).hidden = open;
  });

  window.KCOP = { escape: escape, won: won, find: find, card: card, catLabel: catLabel };
  renderCount();
  document.dispatchEvent(new Event('kcop:ready'));
})();
