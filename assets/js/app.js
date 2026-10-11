/* KCOP 공통 스크립트: 아이콘, 장바구니, 헤더, 오버레이(장바구니·검색·로그인·견적·문서), 토스트 */
(function () {
  'use strict';

  var DATA = window.KCOP_DATA;
  var KCOP = (window.KCOP = {});

  /* ---------- Icons ---------- */
  var ICONS = {
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4M12 8h.01"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 8.7 5 8.7-5"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="11.5" cy="11.5" r="3.5"/><path d="m16.5 16.5-2.5-2.5"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    headset: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    bell: '<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
    door: '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3M13 20h9M10 12v.01"/><path d="M13 4.56v16.16a1 1 0 0 1-1.24.97L5 20V5.56a2 2 0 0 1 1.52-1.94l4-1A2 2 0 0 1 13 4.56Z"/>',
    luggage: '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>'
  };

  function injectSprite() {
    var symbols = Object.keys(ICONS).map(function (k) {
      return '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>';
    }).join('');
    var holder = document.createElement('div');
    holder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' + symbols + '</svg>';
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }

  KCOP.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  };

  /* ---------- Utils ---------- */
  KCOP.won = function (n) { return n.toLocaleString('ko-KR') + '원'; };
  // 제품 사진 자리 표시 (실사 교체 전까지 사용할 촬영 가이드 텍스트)
  KCOP.placeholder = function (text, w, h) {
    return 'https://placehold.co/' + w + 'x' + (h || w) + '/182132/858FA0/png?text=' +
      encodeURIComponent(text).replace(/%20/g, '+').replace(/%0A/g, '%5Cn');
  };
  KCOP.getProduct = function (id) {
    return DATA.products.filter(function (p) { return p.id === id; })[0] || null;
  };
  KCOP.categoryLabel = function (id) {
    var c = DATA.categories.filter(function (c) { return c.id === id; })[0];
    return c ? c.label : '';
  };
  KCOP.categoryIcon = function (id) {
    var c = DATA.categories.filter(function (c) { return c.id === id; })[0];
    return (c && c.icon) || 'shield';
  };
  KCOP.discount = function (p) {
    return p.listPrice ? Math.round((1 - p.price / p.listPrice) * 100) : 0;
  };
  KCOP.escape = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // 해외구매대행 평균 도착 예정일 (주문일 기준 +7 ~ +12일)
  KCOP.arrivalRange = function () {
    var days = ['일', '월', '화', '수', '목', '금', '토'];
    function fmt(offset) {
      var d = new Date();
      d.setDate(d.getDate() + offset);
      return (d.getMonth() + 1) + '월 ' + d.getDate() + '일(' + days[d.getDay()] + ')';
    }
    return fmt(7) + ' ~ ' + fmt(12);
  };

  KCOP.media = function (p, w, extraClass) {
    var src = p.imgSrc || KCOP.placeholder(p.img, w);
    return '<div class="media ' + (extraClass || '') + '">' +
      '<img src="' + src + '" width="' + w + '" height="' + w + '" alt="' + KCOP.escape(p.name) + '" loading="lazy" decoding="async"' +
      ' data-fallback-icon="' + KCOP.categoryIcon(p.categories[0]) + '">' +
      '</div>';
  };

  // 이미지 로드 실패 시 카테고리 아이콘 패널로 대체
  function applyFallback(img) {
    if (img.dataset.failed) return;
    img.dataset.failed = '1';
    var box = img.parentNode;
    box.classList.add('media--fallback');
    var span = document.createElement('span');
    span.className = 'media__fallback';
    span.innerHTML = KCOP.icon(img.dataset.fallbackIcon || 'shield');
    box.appendChild(span);
  }
  function watchImages() {
    document.addEventListener('error', function (e) {
      var t = e.target;
      if (t && t.tagName === 'IMG' && t.hasAttribute('data-fallback-icon')) applyFallback(t);
    }, true);
    document.querySelectorAll('img[data-fallback-icon]').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) applyFallback(img);
    });
  }

  /* ---------- Product card ---------- */
  KCOP.productCard = function (p) {
    var off = KCOP.discount(p);
    return '<article class="product-card" data-product-id="' + p.id + '">' +
      '<a class="product-card__link" href="product.html?id=' + p.id + '">' +
        '<div class="product-card__media">' + KCOP.media(p, 640) +
          (p.badge ? '<span class="badge badge--' + p.badge.toLowerCase() + '">' + p.badge + '</span>' : '') +
        '</div>' +
        '<div class="product-card__body">' +
          '<p class="product-card__cat">' + KCOP.categoryLabel(p.categories[0]) + '</p>' +
          '<h3 class="product-card__name">' + KCOP.escape(p.name) + '</h3>' +
          '<p class="product-card__summary">' + KCOP.escape(p.summary) + '</p>' +
          '<p class="price">' +
            (off ? '<span class="price__off">' + off + '%</span>' : '') +
            '<strong class="price__now">' + KCOP.won(p.price) + '</strong>' +
            (p.listPrice ? '<del class="price__was">' + KCOP.won(p.listPrice) + '</del>' : '') +
          '</p>' +
        '</div>' +
      '</a>' +
      '<button type="button" class="product-card__add" data-quick-add="' + p.id + '" aria-label="' + KCOP.escape(p.name) + ' 장바구니 담기">' +
        KCOP.icon('plus') + '<span>담기</span></button>' +
    '</article>';
  };

  /* ---------- Storage ---------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }

  /* ---------- Cart ---------- */
  var FREE_SHIP = 30000;
  var SHIP_FEE = 3000;

  var cart = KCOP.cart = {
    items: load('kcop.cart', []),
    persist: function () {
      save('kcop.cart', this.items);
      document.dispatchEvent(new CustomEvent('cart:change'));
    },
    add: function (id, option, qty) {
      var key = id + '|' + (option || '');
      var found = this.items.filter(function (i) { return i.key === key; })[0];
      if (found) found.qty = Math.min(99, found.qty + qty);
      else this.items.push({ key: key, id: id, option: option || '', qty: qty });
      this.persist();
    },
    setQty: function (key, qty) {
      this.items.forEach(function (i) { if (i.key === key) i.qty = Math.max(1, Math.min(99, qty)); });
      this.persist();
    },
    remove: function (key) {
      this.items = this.items.filter(function (i) { return i.key !== key; });
      this.persist();
    },
    clear: function () { this.items = []; this.persist(); },
    unitPrice: function (item) {
      var p = KCOP.getProduct(item.id);
      if (!p) return 0;
      var extra = 0;
      if (p.options && item.option) {
        p.options.values.forEach(function (v) { if (v.name === item.option) extra = v.extra || 0; });
      }
      return p.price + extra;
    },
    count: function () { return this.items.reduce(function (s, i) { return s + i.qty; }, 0); },
    subtotal: function () {
      var self = this;
      return this.items.reduce(function (s, i) { return s + self.unitPrice(i) * i.qty; }, 0);
    },
    shipping: function () {
      var sub = this.subtotal();
      return sub === 0 || sub >= FREE_SHIP ? 0 : SHIP_FEE;
    },
    total: function () { return this.subtotal() + this.shipping(); }
  };
  KCOP.FREE_SHIP = FREE_SHIP;

  /* ---------- Toast ---------- */
  var toastTimer;
  KCOP.toast = function (msg, action) {
    var t = document.querySelector('[data-toast]');
    t.innerHTML = KCOP.icon('check', 'toast__icon') + '<span>' + msg + '</span>' +
      (action ? '<button type="button" class="toast__action">' + action.label + '</button>' : '');
    if (action) t.querySelector('.toast__action').addEventListener('click', action.onClick);
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-visible'); }, 3200);
  };

  /* ---------- Layers (drawer / modal) ---------- */
  var lastFocus = null;
  KCOP.openLayer = function (name) {
    var layer = document.querySelector('[data-layer="' + name + '"]');
    if (!layer) return;
    KCOP.closeLayers();
    var gnb = document.querySelector('[data-gnb].is-open');
    if (gnb) gnb.classList.remove('is-open');
    lastFocus = document.activeElement;
    layer.hidden = false;
    requestAnimationFrame(function () { layer.classList.add('is-open'); });
    document.documentElement.classList.add('is-locked');
    var focusable = layer.querySelector('[data-autofocus]') || layer.querySelector('button, input, a');
    if (focusable) setTimeout(function () { focusable.focus(); }, 60);
  };
  KCOP.closeLayers = function () {
    document.querySelectorAll('[data-layer].is-open').forEach(function (layer) {
      layer.classList.remove('is-open');
      setTimeout(function () { if (!layer.classList.contains('is-open')) layer.hidden = true; }, 280);
    });
    document.documentElement.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  /* ---------- Shell markup (공통 오버레이) ---------- */
  function shellMarkup() {
    var chips = ['도어 스토퍼', '경보기', '호루라기', '몰래카메라', '지갑'].map(function (k) {
      return '<button type="button" class="chip" data-search-chip="' + k + '">' + k + '</button>';
    }).join('');

    return '' +
    /* Cart drawer */
    '<div class="layer layer--drawer" data-layer="cart" hidden>' +
      '<div class="layer__dim" data-close></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">' +
        '<header class="drawer__head"><h2 id="cart-title" class="drawer__title">장바구니 <span data-cart-count-label></span></h2>' +
        '<button type="button" class="icon-btn" data-close aria-label="장바구니 닫기">' + KCOP.icon('close') + '</button></header>' +
        '<div class="drawer__ship" data-ship-progress></div>' +
        '<div class="drawer__body" data-cart-list></div>' +
        '<footer class="drawer__foot" data-cart-foot></footer>' +
      '</aside>' +
    '</div>' +

    /* Search */
    '<div class="layer layer--search" data-layer="search" hidden>' +
      '<div class="layer__dim" data-close></div>' +
      '<div class="search-panel" role="dialog" aria-modal="true" aria-label="상품 검색">' +
        '<div class="container">' +
          '<form class="search-panel__form" data-search-form role="search">' +
            KCOP.icon('search', 'search-panel__icon') +
            '<input class="search-panel__input" type="search" placeholder="어떤 안전용품을 찾으세요?" aria-label="검색어" data-search-input data-autofocus autocomplete="off">' +
            '<button type="button" class="icon-btn" data-close aria-label="검색 닫기">' + KCOP.icon('close') + '</button>' +
          '</form>' +
          '<div class="search-panel__chips"><span class="search-panel__label">많이 찾는 검색어</span>' + chips + '</div>' +
          '<ul class="search-panel__results" data-search-results></ul>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* Login */
    '<div class="layer layer--modal" data-layer="login" hidden>' +
      '<div class="layer__dim" data-close></div>' +
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="login-title">' +
        '<button type="button" class="icon-btn modal__close" data-close aria-label="닫기">' + KCOP.icon('close') + '</button>' +
        '<h2 id="login-title" class="modal__title">로그인</h2>' +
        '<p class="modal__desc">주문 조회와 배송 알림을 한 곳에서 확인하세요.</p>' +
        '<form class="form" data-login-form novalidate>' +
          '<div class="field"><label class="field__label" for="login-email">이메일</label>' +
          '<input class="field__input" id="login-email" type="email" name="email" placeholder="name@example.com" required data-autofocus>' +
          '<p class="field__error"></p></div>' +
          '<div class="field"><label class="field__label" for="login-pw">비밀번호</label>' +
          '<input class="field__input" id="login-pw" type="password" name="password" placeholder="8자 이상" minlength="8" required>' +
          '<p class="field__error"></p></div>' +
          '<button type="submit" class="btn btn--primary btn--block">로그인</button>' +
          '<p class="form__note">데모 사이트입니다. 형식에 맞는 아무 이메일과 8자 이상 비밀번호로 로그인됩니다.</p>' +
        '</form>' +
      '</div>' +
    '</div>' +

    /* Quote */
    '<div class="layer layer--modal" data-layer="quote" hidden>' +
      '<div class="layer__dim" data-close></div>' +
      '<div class="modal modal--wide" role="dialog" aria-modal="true" aria-labelledby="quote-title">' +
        '<button type="button" class="icon-btn modal__close" data-close aria-label="닫기">' + KCOP.icon('close') + '</button>' +
        '<div data-quote-body>' +
          '<p class="eyebrow">Bulk Order</p>' +
          '<h2 id="quote-title" class="modal__title">단체 구매 견적 요청</h2>' +
          '<p class="modal__desc">20개 이상 구매하시면 수량별 단가와 로고 각인 가능 여부를 영업일 기준 1일 안에 안내해 드립니다.</p>' +
          '<form class="form form--grid" data-quote-form novalidate>' +
            '<div class="field"><label class="field__label" for="q-org">기관·회사명</label><input class="field__input" id="q-org" name="org" required placeholder="예) 한빛대학교 생활관" data-autofocus><p class="field__error"></p></div>' +
            '<div class="field"><label class="field__label" for="q-name">담당자</label><input class="field__input" id="q-name" name="name" required placeholder="이름"><p class="field__error"></p></div>' +
            '<div class="field"><label class="field__label" for="q-phone">연락처</label><input class="field__input" id="q-phone" name="phone" type="tel" required placeholder="010-0000-0000" data-phone><p class="field__error"></p></div>' +
            '<div class="field"><label class="field__label" for="q-qty">예상 수량</label><select class="field__input" id="q-qty" name="qty" required><option value="">선택</option><option>20–49개</option><option>50–99개</option><option>100–299개</option><option>300개 이상</option></select><p class="field__error"></p></div>' +
            '<div class="field field--full"><label class="field__label" for="q-item">관심 상품</label><select class="field__input" id="q-item" name="item">' +
              DATA.products.map(function (p) { return '<option>' + p.name + '</option>'; }).join('') +
              '<option>여러 상품 / 상담 후 결정</option></select></div>' +
            '<div class="field field--full"><label class="field__label" for="q-memo">요청 사항 <span class="field__optional">선택</span></label><textarea class="field__input" id="q-memo" name="memo" rows="3" placeholder="납품 희망일, 포장 방식, 로고 각인 등"></textarea></div>' +
            '<button type="submit" class="btn btn--primary btn--block field--full">견적 요청하기</button>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* Policy docs */
    '<div class="layer layer--modal" data-layer="doc" hidden>' +
      '<div class="layer__dim" data-close></div>' +
      '<div class="modal modal--wide modal--doc" role="dialog" aria-modal="true" aria-labelledby="doc-title">' +
        '<button type="button" class="icon-btn modal__close" data-close aria-label="닫기">' + KCOP.icon('close') + '</button>' +
        '<div data-doc-body></div>' +
      '</div>' +
    '</div>' +

    '<div class="toast" data-toast role="status" aria-live="polite"></div>' +
    '<button type="button" class="to-top" data-to-top aria-label="맨 위로">' + KCOP.icon('arrowUp') + '</button>';
  }

  var DOCS = {
    terms: {
      title: '이용약관',
      body: '<h3>제1조 (목적)</h3><p>이 약관은 KCOP(이하 "회사")가 운영하는 온라인 스토어에서 제공하는 해외구매대행 서비스의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정합니다.</p>' +
        '<h3>제2조 (서비스의 성격)</h3><p>회사는 이용자의 요청에 따라 해외 판매처에서 상품을 구매하여 국내로 배송하는 구매대행 서비스를 제공합니다. 상품은 개인 사용 목적으로 통관되며, 수입신고 시 이용자의 개인통관고유부호가 사용됩니다.</p>' +
        '<h3>제3조 (주문 취소)</h3><p>해외 판매처에 발주하기 전까지는 전액 환불됩니다. 발주 이후에는 현지 반품 비용과 국제 배송비가 발생할 수 있습니다.</p>' +
        '<h3>제4조 (교환 및 반품)</h3><p>상품 수령 후 7일 이내에 신청할 수 있습니다. 상품 불량이나 오배송은 회사가 비용을 부담하며, 단순 변심은 왕복 배송비를 이용자가 부담합니다.</p>'
    },
    privacy: {
      title: '개인정보처리방침',
      body: '<h3>1. 수집 항목</h3><p>이름, 연락처, 이메일, 배송지 주소, 개인통관고유부호</p>' +
        '<h3>2. 이용 목적</h3><p>주문 처리, 수입 통관 신고, 배송 및 고객 상담</p>' +
        '<h3>3. 보유 기간</h3><p>전자상거래법에 따라 계약·청약철회 기록은 5년, 소비자 불만 처리 기록은 3년간 보관 후 파기합니다.</p>' +
        '<h3>4. 제3자 제공</h3><p>통관 및 배송을 위해 관세청, 통관 대행사, 국내 택배사에 필요한 최소한의 정보만 제공합니다.</p>'
    },
    business: {
      title: '사업자 정보',
      body: '<dl class="doc-list"><dt>상호</dt><dd>KCOP</dd><dt>대표</dt><dd>홍길동</dd><dt>사업자등록번호</dt><dd>000-00-00000</dd>' +
        '<dt>통신판매업 신고</dt><dd>제2026-서울마포-0000호</dd><dt>주소</dt><dd>서울특별시 마포구 월드컵북로 00, 0층</dd><dt>개인정보보호책임자</dt><dd>홍길동 (privacy@kcop.kr)</dd></dl>' +
        '<p class="form__note">포트폴리오용 데모 사이트로, 표시된 사업자 정보는 예시입니다.</p>'
    }
  };

  /* ---------- Cart rendering ---------- */
  function renderCart() {
    var count = cart.count();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.classList.toggle('is-empty', count === 0);
    });
    var label = document.querySelector('[data-cart-count-label]');
    if (label) label.textContent = count ? count + '개' : '';

    var list = document.querySelector('[data-cart-list]');
    var foot = document.querySelector('[data-cart-foot]');
    var ship = document.querySelector('[data-ship-progress]');
    if (!list) return;

    if (!cart.items.length) {
      list.innerHTML = '<div class="empty">' + KCOP.icon('bag', 'empty__icon') +
        '<p class="empty__title">장바구니가 비어 있습니다</p><p class="empty__text">일상에 필요한 안전용품을 담아보세요.</p>' +
        '<a class="btn btn--outline" href="index.html#products" data-close>상품 둘러보기</a></div>';
      foot.innerHTML = '';
      ship.innerHTML = '';
      return;
    }

    var sub = cart.subtotal();
    var left = KCOP.FREE_SHIP - sub;
    var pct = Math.min(100, Math.round(sub / KCOP.FREE_SHIP * 100));
    ship.innerHTML = '<p>' + (left > 0
      ? KCOP.icon('truck') + '<span><strong>' + KCOP.won(left) + '</strong> 더 담으면 무료배송</span>'
      : KCOP.icon('check') + '<span><strong>무료배송</strong> 조건을 채웠습니다</span>') + '</p>' +
      '<div class="progress"><span style="width:' + pct + '%"></span></div>';

    list.innerHTML = '<ul class="cart-list">' + cart.items.map(function (i) {
      var p = KCOP.getProduct(i.id);
      if (!p) return '';
      return '<li class="cart-item">' +
        '<a href="product.html?id=' + p.id + '" class="cart-item__thumb">' + KCOP.media(p, 200) + '</a>' +
        '<div class="cart-item__info">' +
          '<a href="product.html?id=' + p.id + '" class="cart-item__name">' + KCOP.escape(p.name) + '</a>' +
          (i.option ? '<p class="cart-item__opt">' + KCOP.escape(i.option) + '</p>' : '') +
          '<div class="cart-item__row">' +
            '<div class="stepper stepper--sm">' +
              '<button type="button" data-qty-dec="' + i.key + '" aria-label="수량 줄이기"' + (i.qty <= 1 ? ' disabled' : '') + '>' + KCOP.icon('minus') + '</button>' +
              '<span aria-live="polite">' + i.qty + '</span>' +
              '<button type="button" data-qty-inc="' + i.key + '" aria-label="수량 늘리기">' + KCOP.icon('plus') + '</button>' +
            '</div>' +
            '<strong class="cart-item__price">' + KCOP.won(cart.unitPrice(i) * i.qty) + '</strong>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="cart-item__remove" data-remove="' + i.key + '" aria-label="삭제">' + KCOP.icon('close') + '</button>' +
      '</li>';
    }).join('') + '</ul>';

    foot.innerHTML =
      '<dl class="summary">' +
        '<div><dt>상품 금액</dt><dd>' + KCOP.won(sub) + '</dd></div>' +
        '<div><dt>배송비</dt><dd>' + (cart.shipping() ? KCOP.won(cart.shipping()) : '무료') + '</dd></div>' +
        '<div class="summary__total"><dt>결제 예정 금액</dt><dd>' + KCOP.won(cart.total()) + '</dd></div>' +
      '</dl>' +
      '<a class="btn btn--primary btn--block btn--lg" href="checkout.html">주문하기</a>' +
      '<p class="drawer__note">' + KCOP.icon('info') + '해외구매대행 상품으로, 결제 시 개인통관고유부호가 필요합니다.</p>';
  }

  KCOP.addToCart = function (id, option, qty) {
    var p = KCOP.getProduct(id);
    if (!p) return;
    if (p.options && !option) option = p.options.values[0].name;
    cart.add(id, option, qty || 1);
    KCOP.toast('장바구니에 담았습니다', {
      label: '장바구니 보기',
      onClick: function () { KCOP.openLayer('cart'); }
    });
    var btn = document.querySelector('.header [data-cart-open]');
    if (btn) { btn.classList.remove('is-bump'); void btn.offsetWidth; btn.classList.add('is-bump'); }
  };

  /* ---------- Search ---------- */
  function renderSearch(q) {
    var box = document.querySelector('[data-search-results]');
    q = q.trim().toLowerCase().replace(/\s+/g, '');
    if (!q) { box.innerHTML = ''; return; }
    var hits = DATA.products.filter(function (p) {
      return (p.name + p.keywords + p.summary).toLowerCase().replace(/\s+/g, '').indexOf(q) > -1;
    });
    box.innerHTML = hits.length ? hits.map(function (p) {
      return '<li><a class="search-hit" href="product.html?id=' + p.id + '">' +
        '<span class="search-hit__thumb">' + KCOP.media(p, 160) + '</span>' +
        '<span class="search-hit__name">' + KCOP.escape(p.name) + '</span>' +
        '<span class="search-hit__price">' + KCOP.won(p.price) + '</span>' + KCOP.icon('chevronRight') + '</a></li>';
    }).join('') : '<li class="search-panel__empty">검색 결과가 없습니다. 다른 단어로 찾아보세요.</li>';
  }

  /* ---------- Auth (demo) ---------- */
  KCOP.user = load('kcop.user', null);
  function renderAuth() {
    document.querySelectorAll('[data-login-open]').forEach(function (b) {
      b.textContent = KCOP.user ? KCOP.user.name + '님' : '로그인';
      b.setAttribute('aria-label', KCOP.user ? '로그아웃' : '로그인');
    });
  }

  /* ---------- Form validation ---------- */
  KCOP.validateField = function (input) {
    var field = input.closest('.field');
    var err = field && field.querySelector('.field__error');
    var msg = '';
    var v = input.value.trim();
    if (input.required && !v) msg = '필수 입력 항목입니다.';
    else if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = '이메일 형식을 확인해 주세요.';
    else if (v && input.hasAttribute('data-phone') && !/^01[016-9]-?\d{3,4}-?\d{4}$/.test(v)) msg = '휴대폰 번호 형식을 확인해 주세요.';
    else if (v && input.minLength > 0 && v.length < input.minLength) msg = input.minLength + '자 이상 입력해 주세요.';
    else if (v && input.hasAttribute('data-pccc') && !/^P\d{12}$/i.test(v)) msg = 'P로 시작하는 13자리를 입력해 주세요.';
    input.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
    return !msg;
  };
  KCOP.validateForm = function (form) {
    var ok = true, first = null;
    form.querySelectorAll('.field__input').forEach(function (input) {
      if (!KCOP.validateField(input)) { ok = false; first = first || input; }
    });
    if (first) first.focus();
    return ok;
  };
  function bindLiveValidation(root) {
    root.addEventListener('blur', function (e) {
      if (e.target.classList && e.target.classList.contains('field__input')) KCOP.validateField(e.target);
    }, true);
    root.addEventListener('input', function (e) {
      var t = e.target;
      if (t.hasAttribute && t.hasAttribute('data-phone')) {
        var d = t.value.replace(/\D/g, '').slice(0, 11);
        t.value = d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3) : d.slice(0, 3) + '-' + d.slice(3, d.length - 4) + '-' + d.slice(-4);
      }
      if (t.classList && t.classList.contains('is-invalid')) KCOP.validateField(t);
    });
  }

  /* ---------- Header / notice ---------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    var toTop = document.querySelector('[data-to-top]');
    var onScroll = function () {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (toTop) toTop.classList.toggle('is-visible', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var notice = document.querySelector('[data-notice]');
    if (notice) {
      var today = new Date().toDateString();
      if (load('kcop.noticeHidden', '') === today) notice.remove();
      else {
        notice.addEventListener('click', function (e) {
          if (e.target.closest('[data-notice-today]')) save('kcop.noticeHidden', today);
          if (e.target.closest('[data-notice-today], [data-notice-close]')) {
            notice.classList.add('is-hidden');
            setTimeout(function () { notice.remove(); }, 300);
          }
        });
      }
    }

    // mobile menu
    var gnb = document.querySelector('[data-gnb]');
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-menu-open]')) {
        gnb.classList.add('is-open');
        document.documentElement.classList.add('is-locked');
      } else if (e.target.closest('[data-menu-close]') || (gnb && gnb.classList.contains('is-open') && e.target.closest('.gnb__link'))) {
        gnb.classList.remove('is-open');
        document.documentElement.classList.remove('is-locked');
      }
    });
  }

  /* ---------- Global events ---------- */
  function bindEvents() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      var el;
      if ((el = t.closest('[data-quick-add]'))) { e.preventDefault(); KCOP.addToCart(el.dataset.quickAdd); return; }
      if (t.closest('[data-cart-open]')) { KCOP.openLayer('cart'); return; }
      if (t.closest('[data-search-open]')) { KCOP.openLayer('search'); return; }
      if (t.closest('[data-quote-open]')) { e.preventDefault(); resetQuote(); KCOP.openLayer('quote'); return; }
      if ((el = t.closest('[data-doc]'))) {
        e.preventDefault();
        var doc = DOCS[el.dataset.doc];
        document.querySelector('[data-doc-body]').innerHTML = '<h2 id="doc-title" class="modal__title">' + doc.title + '</h2><div class="doc">' + doc.body + '</div>';
        KCOP.openLayer('doc');
        return;
      }
      if (t.closest('[data-login-open]')) {
        if (KCOP.user) {
          KCOP.user = null; save('kcop.user', null); renderAuth();
          KCOP.toast('로그아웃되었습니다');
        } else KCOP.openLayer('login');
        return;
      }
      if (t.closest('[data-close]')) {
        KCOP.closeLayers();
        return;
      }
      if ((el = t.closest('[data-qty-inc]'))) { var k = el.dataset.qtyInc; cart.setQty(k, find(k).qty + 1); return; }
      if ((el = t.closest('[data-qty-dec]'))) { var k2 = el.dataset.qtyDec; cart.setQty(k2, find(k2).qty - 1); return; }
      if ((el = t.closest('[data-remove]'))) { cart.remove(el.dataset.remove); return; }
      if ((el = t.closest('[data-search-chip]'))) {
        var input = document.querySelector('[data-search-input]');
        input.value = el.dataset.searchChip; renderSearch(input.value); input.focus();
        return;
      }
      if (t.closest('[data-to-top]')) window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function find(key) { return cart.items.filter(function (i) { return i.key === key; })[0]; }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        KCOP.closeLayers();
        var gnb = document.querySelector('[data-gnb].is-open');
        if (gnb) { gnb.classList.remove('is-open'); document.documentElement.classList.remove('is-locked'); }
      }
    });

    var sInput = document.querySelector('[data-search-input]');
    sInput.addEventListener('input', function () { renderSearch(sInput.value); });
    document.querySelector('[data-search-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      var first = document.querySelector('.search-hit');
      if (first) location.href = first.getAttribute('href');
    });

    var loginForm = document.querySelector('[data-login-form]');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!KCOP.validateForm(loginForm)) return;
      var email = loginForm.email.value.trim();
      KCOP.user = { email: email, name: email.split('@')[0] };
      save('kcop.user', KCOP.user);
      renderAuth();
      KCOP.closeLayers();
      loginForm.reset();
      KCOP.toast(KCOP.escape(KCOP.user.name) + '님, 반갑습니다');
      document.dispatchEvent(new CustomEvent('auth:change'));
    });

    document.addEventListener('submit', function (e) {
      if (!e.target.matches('[data-quote-form]')) return;
      e.preventDefault();
      var form = e.target;
      if (!KCOP.validateForm(form)) return;
      document.querySelector('[data-quote-body]').innerHTML =
        '<div class="done">' + KCOP.icon('check', 'done__icon') +
        '<h2 class="modal__title">견적 요청이 접수되었습니다</h2>' +
        '<p class="modal__desc">' + KCOP.escape(form.name.value) + '님, 입력하신 ' + KCOP.escape(form.phone.value) +
        '로 영업일 기준 1일 안에 연락드리겠습니다.</p>' +
        '<button type="button" class="btn btn--primary" data-close>확인</button></div>';
    });

    bindLiveValidation(document);
    document.addEventListener('cart:change', renderCart);
  }

  var quoteTemplate = '';
  function resetQuote() {
    var body = document.querySelector('[data-quote-body]');
    if (!quoteTemplate) quoteTemplate = body.innerHTML;
    else body.innerHTML = quoteTemplate;
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
  KCOP.initReveal = initReveal;

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    injectSprite();
    var shell = document.createElement('div');
    shell.innerHTML = shellMarkup();
    while (shell.firstChild) document.body.appendChild(shell.firstChild);
    resetQuote();
    initHeader();
    bindEvents();
    renderCart();
    renderAuth();
    document.dispatchEvent(new CustomEvent('kcop:ready'));
    watchImages();
    initReveal();
  });
})();
