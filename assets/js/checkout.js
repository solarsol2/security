/* 주문/결제 (데모: 실제 결제는 진행되지 않음) */
document.addEventListener('kcop:ready', function () {
  'use strict';
  var root = document.querySelector('[data-checkout]');
  var cart = KCOP.cart;
  var I = KCOP.icon;
  var esc = KCOP.escape;

  function steps(current) {
    var names = ['장바구니', '주문/결제', '주문 완료'];
    return '<ol class="steps">' + names.map(function (n, i) {
      var cls = i + 1 < current ? 'is-done' : i + 1 === current ? 'is-current' : '';
      return '<li class="' + cls + '"><span>' + (i + 1 < current ? '✓' : i + 1) + '</span><b>' + n + '</b></li>';
    }).join('') + '</ol>';
  }

  function lines(items) {
    return '<ul class="order-lines">' + items.map(function (i) {
      var p = KCOP.getProduct(i.id);
      if (!p) return '';
      return '<li class="order-line">' + KCOP.media(p, 160) +
        '<div><p class="order-line__name">' + esc(p.name) + '</p><p class="order-line__meta">' +
        (i.option ? esc(i.option) + ' · ' : '') + i.qty + '개</p></div>' +
        '<span class="order-line__price">' + KCOP.won(cart.unitPrice(i) * i.qty) + '</span></li>';
    }).join('') + '</ul>';
  }

  function summary() {
    return '<dl class="summary">' +
      '<div><dt>상품 금액</dt><dd>' + KCOP.won(cart.subtotal()) + '</dd></div>' +
      '<div><dt>배송비</dt><dd>' + (cart.shipping() ? KCOP.won(cart.shipping()) : '무료') + '</dd></div>' +
      '<div><dt>관·부가세</dt><dd>면세 (150달러 이하)</dd></div>' +
      '<div class="summary__total"><dt>최종 결제 금액</dt><dd>' + KCOP.won(cart.total()) + '</dd></div></dl>';
  }

  function renderEmpty() {
    root.innerHTML = '<div class="container"><div class="page-head"><h1 class="page-head__title">주문/결제</h1>' + steps(2) + '</div>' +
      '<div class="empty">' + I('bag', 'empty__icon') + '<p class="empty__title">주문할 상품이 없습니다</p>' +
      '<p class="empty__text">장바구니에 상품을 담은 뒤 다시 시도해 주세요.</p>' +
      '<a class="btn btn--primary" href="index.html#products">상품 둘러보기</a></div></div>';
  }

  function renderForm() {
    root.innerHTML =
      '<div class="container">' +
        '<div class="page-head"><h1 class="page-head__title">주문/결제</h1>' + steps(2) + '</div>' +
        '<form class="checkout" data-order-form novalidate>' +
          '<div class="checkout__form">' +
            '<fieldset class="fieldset"><legend class="fieldset__title">주문자 정보</legend><div class="form form--grid">' +
              '<div class="field"><label class="field__label" for="o-name">이름</label><input class="field__input" id="o-name" name="name" required autocomplete="name" placeholder="홍길동"><p class="field__error"></p></div>' +
              '<div class="field"><label class="field__label" for="o-phone">휴대폰 번호</label><input class="field__input" id="o-phone" name="phone" type="tel" required data-phone autocomplete="tel" placeholder="010-0000-0000"><p class="field__error"></p></div>' +
              '<div class="field field--full"><label class="field__label" for="o-email">이메일</label><input class="field__input" id="o-email" name="email" type="email" required autocomplete="email" placeholder="주문·배송 안내를 받을 이메일"><p class="field__error"></p></div>' +
            '</div></fieldset>' +

            '<fieldset class="fieldset"><legend class="fieldset__title">배송지</legend><div class="form form--grid">' +
              '<div class="field field--full"><label class="field__label" for="o-zip">주소</label>' +
                '<div class="addr-row"><input class="field__input" id="o-zip" name="zip" required readonly placeholder="우편번호">' +
                '<button type="button" class="btn btn--outline" data-postcode>주소 검색</button></div><p class="field__error"></p></div>' +
              '<div class="field field--full"><input class="field__input" name="addr1" required readonly placeholder="기본 주소" aria-label="기본 주소"><p class="field__error"></p></div>' +
              '<div class="field field--full"><input class="field__input" name="addr2" placeholder="상세 주소 (동·호수)" aria-label="상세 주소"></div>' +
              '<div class="field field--full"><label class="field__label" for="o-memo">배송 요청사항 <span class="field__optional">선택</span></label>' +
                '<select class="field__input" id="o-memo" name="memo"><option>문 앞에 놓아주세요</option><option>경비실에 맡겨주세요</option><option>배송 전 연락 바랍니다</option><option>택배함에 넣어주세요</option></select></div>' +
            '</div></fieldset>' +

            '<fieldset class="fieldset"><legend class="fieldset__title">통관 정보 <small>해외구매대행 필수</small></legend><div class="form">' +
              '<div class="field"><label class="field__label" for="o-pccc">개인통관고유부호</label>' +
                '<input class="field__input" id="o-pccc" name="pccc" required data-pccc maxlength="13" placeholder="P로 시작하는 13자리" autocomplete="off" spellcheck="false">' +
                '<p class="field__error"></p>' +
                '<p class="field__help">주문자 이름과 부호의 명의가 같아야 통관이 지연되지 않습니다. <a href="https://unipass.customs.go.kr/csp/persIndex.do" target="_blank" rel="noopener">발급·조회하기</a></p></div>' +
            '</div></fieldset>' +

            '<fieldset class="fieldset"><legend class="fieldset__title">결제 수단</legend>' +
              '<div class="pay-methods">' +
                '<div class="pay-method"><input type="radio" name="pay" id="pay-card" value="신용·체크카드" checked><label for="pay-card">신용·체크카드</label></div>' +
                '<div class="pay-method"><input type="radio" name="pay" id="pay-kakao" value="카카오페이"><label for="pay-kakao">카카오페이</label></div>' +
                '<div class="pay-method"><input type="radio" name="pay" id="pay-bank" value="무통장 입금"><label for="pay-bank">무통장 입금</label></div>' +
              '</div>' +
            '</fieldset>' +
          '</div>' +

          '<aside class="checkout__aside"><div class="order-box">' +
            '<h2 class="order-box__title">주문 상품 ' + cart.count() + '개</h2>' +
            lines(cart.items) + summary() +
            '<div class="checks">' +
              '<label class="check check--all"><input type="checkbox" data-check-all> 아래 내용에 모두 동의합니다</label>' +
              '<label class="check"><input type="checkbox" data-check required> [필수] 구매 조건 확인 및 결제 진행 동의 <a href="#" data-doc="terms">보기</a></label>' +
              '<label class="check"><input type="checkbox" data-check required> [필수] 개인정보 수집·이용 및 통관 목적 제3자 제공 동의 <a href="#" data-doc="privacy">보기</a></label>' +
              '<label class="check"><input type="checkbox" data-check required> [필수] 해외구매대행 상품으로 교환·반품 조건이 다를 수 있음을 확인했습니다</label>' +
              '<p class="field__error" data-check-error></p>' +
            '</div>' +
            '<button type="submit" class="btn btn--primary btn--block btn--lg">' + KCOP.won(cart.total()) + ' 결제하기</button>' +
            '<p class="form__note order-box__note">포트폴리오 데모로, 실제 결제는 진행되지 않습니다.</p>' +
          '</div></aside>' +
        '</form>' +
      '</div>';

    var form = root.querySelector('[data-order-form]');
    var all = form.querySelector('[data-check-all]');
    var checks = form.querySelectorAll('[data-check]');
    all.addEventListener('change', function () { checks.forEach(function (c) { c.checked = all.checked; }); });
    checks.forEach(function (c) {
      c.addEventListener('change', function () {
        all.checked = Array.prototype.every.call(checks, function (x) { return x.checked; });
      });
    });

    form.pccc.addEventListener('input', function () { form.pccc.value = form.pccc.value.toUpperCase().replace(/[^P0-9]/g, ''); });
    form.querySelector('[data-postcode]').addEventListener('click', function () { openPostcode(form); });
    form.zip.addEventListener('click', function () { openPostcode(form); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = KCOP.validateForm(form);
      var agreed = Array.prototype.every.call(checks, function (x) { return x.checked; });
      form.querySelector('[data-check-error]').textContent = agreed ? '' : '필수 항목에 모두 동의해 주세요.';
      if (!ok || !agreed) {
        if (ok && !agreed) all.focus();
        return;
      }
      complete(form);
    });
  }

  // 다음(카카오) 우편번호 서비스 — 불러오지 못하면 직접 입력으로 전환
  function openPostcode(form) {
    function run() {
      new window.daum.Postcode({
        oncomplete: function (d) {
          form.zip.value = d.zonecode;
          form.addr1.value = d.roadAddress || d.jibunAddress;
          KCOP.validateField(form.zip); KCOP.validateField(form.addr1);
          form.addr2.focus();
        }
      }).open();
    }
    if (window.daum && window.daum.Postcode) return run();
    var s = document.createElement('script');
    s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    s.onload = run;
    s.onerror = function () {
      form.zip.readOnly = false; form.addr1.readOnly = false;
      form.zip.focus();
      KCOP.toast('주소 검색을 불러오지 못했습니다. 직접 입력해 주세요.');
    };
    document.head.appendChild(s);
  }

  function complete(form) {
    var d = new Date();
    var no = 'KC' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 90000) + 10000);
    var snapshot = cart.items.slice();
    var total = cart.total();
    var pay = form.querySelector('input[name="pay"]:checked').value;
    var addr = form.addr1.value + ' ' + form.addr2.value;
    root.innerHTML =
      '<div class="container"><div class="complete">' + I('check', 'done__icon') +
        '<h1 class="complete__title">주문이 완료되었습니다</h1>' +
        '<p class="complete__text">' + esc(form.name.value) + '님, 해외 판매처에 발주를 시작했습니다.<br>배송 단계가 바뀔 때마다 ' + esc(form.phone.value) + '로 알려드립니다.</p>' +
        '<div class="order-box complete__box">' +
          '<dl class="pdp__meta complete__meta">' +
            '<div><dt>주문번호</dt><dd><strong>' + no + '</strong></dd></div>' +
            '<div><dt>도착 예정</dt><dd><strong>' + KCOP.arrivalRange() + '</strong></dd></div>' +
            '<div><dt>배송지</dt><dd>' + esc(addr) + '</dd></div>' +
            '<div><dt>결제 수단</dt><dd>' + esc(pay) + ' · ' + KCOP.won(total) + '</dd></div>' +
          '</dl>' +
          '<div class="complete__lines">' + lines(snapshot) + '</div>' +
        '</div>' +
        '<div class="complete__actions"><a class="btn btn--primary btn--lg" href="index.html">홈으로</a>' +
        '<a class="btn btn--outline btn--lg" href="index.html#products">쇼핑 계속하기</a></div>' +
      '</div></div>';
    cart.clear();
    window.scrollTo(0, 0);
  }

  if (cart.items.length) renderForm(); else renderEmpty();
  // 결제 화면에서 장바구니를 수정하면 다시 그리되, 입력 중인 값은 유지 (완료 화면은 그대로)
  document.addEventListener('cart:change', function () {
    var form = root.querySelector('[data-order-form]');
    if (!form) return;
    if (!cart.items.length) return renderEmpty();
    var values = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el.type !== 'checkbox') values[el.name] = el.type === 'radio' ? (el.checked ? el.value : values[el.name]) : el.value;
    });
    renderForm();
    var next = root.querySelector('[data-order-form]');
    Object.keys(values).forEach(function (name) {
      var el = next.elements[name];
      if (!el || values[name] === undefined) return;
      el.value = values[name];
    });
  });
});
