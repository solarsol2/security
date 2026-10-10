/* 메인: 카테고리 탭 + 상품 그리드 */
document.addEventListener('kcop:ready', function () {
  'use strict';
  var DATA = window.KCOP_DATA;
  var tabs = document.querySelector('[data-tabs]');
  var grid = document.querySelector('[data-product-grid]');

  function countOf(cat) {
    return cat === 'all' ? DATA.products.length
      : DATA.products.filter(function (p) { return p.categories.indexOf(cat) > -1; }).length;
  }

  tabs.innerHTML = DATA.categories.map(function (c) {
    return '<button type="button" role="tab" class="tabs__tab" data-tab="' + c.id + '" aria-selected="false">' +
      c.label + '<span class="tabs__count">' + countOf(c.id) + '</span></button>';
  }).join('');

  function select(cat) {
    if (!DATA.categories.some(function (c) { return c.id === cat; })) cat = 'all';
    tabs.querySelectorAll('[data-tab]').forEach(function (t) {
      var on = t.dataset.tab === cat;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
    });
    document.querySelectorAll('[data-cat-link]').forEach(function (a) {
      a.classList.toggle('is-current', a.dataset.catLink === cat && a.classList.contains('gnb__link'));
    });
    var list = DATA.products.filter(function (p) { return cat === 'all' || p.categories.indexOf(cat) > -1; });
    grid.classList.remove('is-swapping');
    void grid.offsetWidth;
    grid.classList.add('is-swapping');
    grid.innerHTML = list.map(KCOP.productCard).join('');
  }

  tabs.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (!t) return;
    select(t.dataset.tab);
    history.replaceState(null, '', '?cat=' + t.dataset.tab + '#products');
  });

  // 같은 페이지 안의 카테고리 링크는 새로고침 없이 필터링
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cat-link]');
    if (!a) return;
    e.preventDefault();
    select(a.dataset.catLink);
    history.replaceState(null, '', '?cat=' + a.dataset.catLink + '#products');
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  select(new URLSearchParams(location.search).get('cat') || 'all');
});
