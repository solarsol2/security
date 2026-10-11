/* 상품 상세 */
document.addEventListener('kcop:ready', function () {
  'use strict';
  var DATA = window.KCOP_DATA;
  var root = document.querySelector('[data-pdp]');
  var id = new URLSearchParams(location.search).get('id');
  var p = KCOP.getProduct(id);
  var I = KCOP.icon;
  var esc = KCOP.escape;

  if (!p) {
    root.innerHTML = '<div class="container"><div class="empty">' + I('info', 'empty__icon') +
      '<p class="empty__title">상품을 찾을 수 없습니다</p><p class="empty__text">판매가 종료되었거나 주소가 잘못되었습니다.</p>' +
      '<a class="btn btn--primary" href="index.html#products">전체 상품 보기</a></div></div>';
    return;
  }

  document.title = p.name + ' — KCOP';
  var cat = p.categories[0];
  var state = { option: p.options ? p.options.values[0].name : '', qty: 1 };
  var off = KCOP.discount(p);

  function optionExtra() {
    if (!p.options) return 0;
    var v = p.options.values.filter(function (v) { return v.name === state.option; })[0];
    return (v && v.extra) || 0;
  }

  var optionsHtml = p.options ? '<div class="option-group"><span class="option-group__label">' + p.options.label +
    '<span data-option-label>' + esc(state.option) + '</span></span><div class="options">' +
    p.options.values.map(function (v, i) {
      return '<button type="button" class="option" data-option="' + esc(v.name) + '" aria-pressed="' + (i === 0) + '">' +
        esc(v.name) + (v.extra ? '<small>+' + KCOP.won(v.extra) + '</small>' : '') + '</button>';
    }).join('') + '</div></div>' : '';

  root.innerHTML =
    '<div class="container">' +
      '<nav class="breadcrumb" aria-label="현재 위치"><a href="index.html">홈</a>' + I('chevronRight') +
        '<a href="index.html?cat=' + cat + '#products">' + KCOP.categoryLabel(cat) + '</a>' + I('chevronRight') +
        '<span aria-current="page">' + esc(p.name) + '</span></nav>' +

      '<div class="pdp">' +
        '<div class="pdp__gallery"><div class="pdp__main" data-zoom>' + KCOP.media(p, 1200) + '</div></div>' +

        '<div class="pdp__info">' +
          '<p class="pdp__cat">' + KCOP.categoryLabel(cat) + (p.badge ? ' · ' + p.badge : '') + '</p>' +
          '<h1 class="pdp__title">' + esc(p.name) + '</h1>' +
          '<p class="pdp__summary">' + esc(p.summary) + '</p>' +
          '<p class="price pdp__price">' + (off ? '<span class="price__off">' + off + '%</span>' : '') +
            '<strong class="price__now">' + KCOP.won(p.price) + '</strong>' +
            (p.listPrice ? '<del class="price__was">' + KCOP.won(p.listPrice) + '</del>' : '') + '</p>' +
          '<dl class="pdp__meta">' +
            '<div><dt>도착 예정</dt><dd><strong>' + KCOP.arrivalRange() + '</strong><small>오늘 결제 기준 · 해외구매대행</small></dd></div>' +
            '<div><dt>배송비</dt><dd>3,000원 <small>30,000원 이상 구매 시 무료</small></dd></div>' +
            '<div><dt>통관</dt><dd>목록통관 · 개인통관고유부호 필요</dd></div>' +
          '</dl>' +
          (p.notice ? '<p class="pdp__notice">' + I('info') + '<span>' + esc(p.notice) + '</span></p>' : '') +
          optionsHtml +
          '<div class="pdp__qty"><span class="option-group__label option-group__label--inline">수량</span>' +
            '<div class="stepper"><button type="button" data-step="-1" aria-label="수량 줄이기" disabled>' + I('minus') + '</button>' +
            '<input type="text" inputmode="numeric" value="1" aria-label="수량" data-qty>' +
            '<button type="button" data-step="1" aria-label="수량 늘리기">' + I('plus') + '</button></div></div>' +
          '<div class="pdp__total"><span>총 상품 금액</span><strong data-total></strong></div>' +
          '<div class="pdp__actions">' +
            '<button type="button" class="btn btn--outline btn--lg" data-add>장바구니</button>' +
            '<button type="button" class="btn btn--primary btn--lg" data-buy>바로 구매</button>' +
          '</div>' +
          '<ul class="pdp__perks">' +
            '<li>' + I('scan') + '현지 물류센터에서 작동·구성품 검수 후 출고</li>' +
            '<li>' + I('refresh') + '불량·오배송 시 회수 없이 새 상품 재발송</li>' +
            '<li>' + I('truck') + '국제·국내 배송 단계별 문자 안내</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<nav class="pdp-tabs" aria-label="상품 정보"><div class="container"><ul class="pdp-tabs__list">' +
      '<li><a class="pdp-tabs__link is-active" href="#detail">상세정보</a></li>' +
      '<li><a class="pdp-tabs__link" href="#howto">사용 방법</a></li>' +
      '<li><a class="pdp-tabs__link" href="#shipping">배송·통관</a></li>' +
      '<li><a class="pdp-tabs__link" href="#returns">교환·반품</a></li>' +
    '</ul></div></nav>' +

    '<div class="container">' +
      '<section class="pdp-section" id="detail">' +
        '<header class="pdp-section__head"><h2 class="pdp-section__title">상세정보</h2><p class="pdp-section__sub">KCOP이 직접 사용해 보고 정리한 핵심 기능입니다.</p></header>' +
        '<div class="pdp-section__body">' +
          '<ol class="features">' + p.features.map(function (f, i) {
            return '<li class="feature"><span class="feature__num">0' + (i + 1) + '</span><div><h3 class="feature__title">' + esc(f.title) + '</h3><p class="feature__text">' + esc(f.text) + '</p></div></li>';
          }).join('') + '</ol>' +
          '<table class="spec"><caption>제품 사양</caption><tbody>' + p.specs.map(function (s) {
            return '<tr><th scope="row">' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>';
          }).join('') + '</tbody></table>' +
        '</div>' +
      '</section>' +

      '<section class="pdp-section" id="howto">' +
        '<header class="pdp-section__head"><h2 class="pdp-section__title">사용 방법</h2><p class="pdp-section__sub">한글 사용설명서가 함께 동봉됩니다.</p></header>' +
        '<div class="pdp-section__body"><ol class="howto">' + p.howto.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ol></div>' +
      '</section>' +

      '<section class="pdp-section" id="shipping">' +
        '<header class="pdp-section__head"><h2 class="pdp-section__title">배송·통관</h2><p class="pdp-section__sub">해외구매대행 상품입니다.</p></header>' +
        '<div class="pdp-section__body"><table class="info-table"><tbody>' +
          '<tr><th scope="row">배송 방법</th><td>항공 특송 → 국내 택배 (CJ대한통운)</td></tr>' +
          '<tr><th scope="row">배송 기간</th><td>결제일 기준 평균 7–12일. 현지 연휴·통관 검사 시 지연될 수 있습니다.</td></tr>' +
          '<tr><th scope="row">배송비</th><td>3,000원 · 30,000원 이상 구매 시 무료 (국제 배송비 포함)</td></tr>' +
          '<tr><th scope="row">통관</th><td>개인 사용 목적 목록통관. 주문자와 수령인의 개인통관고유부호·이름이 같아야 합니다.</td></tr>' +
          '<tr><th scope="row">관·부가세</th><td>미화 150달러 이하 면세. 같은 날 입항한 물품은 합산 과세될 수 있습니다.</td></tr>' +
        '</tbody></table></div>' +
      '</section>' +

      '<section class="pdp-section" id="returns">' +
        '<header class="pdp-section__head"><h2 class="pdp-section__title">교환·반품</h2><p class="pdp-section__sub">수령 후 7일 이내 신청</p></header>' +
        '<div class="pdp-section__body"><ul class="info-list">' +
          '<li>불량·오배송: 사진 확인 후 회수 없이 새 상품을 재발송하거나 전액 환불합니다.</li>' +
          '<li>단순 변심: 국내 반품지로 보내주시면 왕복 배송비 6,000원을 차감하고 환불합니다.</li>' +
          '<li>해외 발주 후에는 주문 취소 시 현지 반품 비용이 발생할 수 있습니다.</li>' +
          '<li>포장을 훼손했거나 사용 흔적이 있는 상품은 교환·반품이 어렵습니다.</li>' +
        '</ul></div>' +
      '</section>' +
    '</div>' +

    '<section class="related" aria-labelledby="related-title"><div class="container">' +
      '<header class="section-head"><p class="section-head__index">More</p><div class="section-head__main"><h2 id="related-title" class="section-head__title">함께 보면 좋은 상품</h2></div></header>' +
      '<div class="product-grid">' + related().map(KCOP.productCard).join('') + '</div>' +
    '</div></section>' +

    '<div class="buybar"><button type="button" class="btn btn--outline btn--lg" data-add>장바구니</button>' +
      '<button type="button" class="btn btn--primary btn--lg" data-buy>바로 구매</button></div>';

  function related() {
    var same = DATA.products.filter(function (x) {
      return x.id !== p.id && x.categories.some(function (c) { return p.categories.indexOf(c) > -1; });
    });
    var rest = DATA.products.filter(function (x) { return x.id !== p.id && same.indexOf(x) === -1; });
    return same.concat(rest).slice(0, 4);
  }

  var qtyInput = root.querySelector('[data-qty]');
  var dec = root.querySelector('[data-step="-1"]');
  function update() {
    qtyInput.value = state.qty;
    dec.disabled = state.qty <= 1;
    root.querySelector('[data-total]').textContent = KCOP.won((p.price + optionExtra()) * state.qty);
    var lbl = root.querySelector('[data-option-label]');
    if (lbl) lbl.textContent = state.option;
  }
  update();

  root.addEventListener('click', function (e) {
    var t = e.target, el;
    if ((el = t.closest('[data-option]'))) {
      state.option = el.dataset.option;
      root.querySelectorAll('[data-option]').forEach(function (b) { b.setAttribute('aria-pressed', b === el); });
      update();
    } else if ((el = t.closest('[data-step]'))) {
      state.qty = Math.max(1, Math.min(99, state.qty + Number(el.dataset.step)));
      update();
    } else if (t.closest('[data-add]')) {
      KCOP.addToCart(p.id, state.option, state.qty);
    } else if (t.closest('[data-buy]')) {
      KCOP.cart.add(p.id, state.option, state.qty);
      location.href = 'checkout.html';
    } else if ((el = t.closest('[data-zoom] .media'))) {
      el.classList.toggle('is-zoom');
    }
  });

  qtyInput.addEventListener('change', function () {
    var n = parseInt(qtyInput.value.replace(/\D/g, ''), 10);
    state.qty = isNaN(n) ? 1 : Math.max(1, Math.min(99, n));
    update();
  });

  // 확대 시 마우스 위치를 따라 이동
  var zoomBox = root.querySelector('[data-zoom] .media');
  zoomBox.addEventListener('mousemove', function (e) {
    if (!zoomBox.classList.contains('is-zoom')) return;
    var r = zoomBox.getBoundingClientRect();
    var img = zoomBox.querySelector('img');
    img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
  });
  zoomBox.addEventListener('mouseleave', function () { zoomBox.classList.remove('is-zoom'); });

  // 탭 스크롤 스파이
  var links = root.querySelectorAll('.pdp-tabs__link');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    root.querySelectorAll('.pdp-section').forEach(function (s) { io.observe(s); });
  }
});
