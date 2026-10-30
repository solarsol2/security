/* 메인: 카테고리 수, 상황별 큐레이션 탭, 전체 상품 탭 */
(function () {
  var D = window.KCOP_DATA, K = window.KCOP;

  // 카테고리별 상품 수
  document.querySelectorAll('[data-cat-count]').forEach(function (el) {
    var id = el.getAttribute('data-cat-count');
    el.textContent = D.products.filter(function (p) { return p.categories.indexOf(id) > -1; }).length;
  });

  // 탭 공통: 버튼 클릭 → onSelect(id)
  function tabs(root, onSelect) {
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.tabs__btn');
      if (!btn) return;
      root.querySelectorAll('.tabs__btn').forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); });
      onSelect(btn.getAttribute('data-id'));
    });
  }

  // 상황별 큐레이션
  var curTabs = document.getElementById('curation-tabs');
  var curTitle = document.getElementById('curation-title');
  var curText = document.getElementById('curation-text');
  var curGrid = document.getElementById('curation-grid');
  curTabs.innerHTML = D.curations.map(function (c, i) {
    return '<button class="tabs__btn" type="button" role="tab" data-id="' + c.id + '" aria-selected="' + (i === 0) + '">' + K.escape(c.label) + '</button>';
  }).join('');
  function showCuration(id) {
    var c = D.curations.filter(function (x) { return x.id === id; })[0];
    curTitle.textContent = c.title;
    curText.textContent = c.text;
    curGrid.innerHTML = c.items.map(function (pid) { return K.card(K.find(pid)); }).join('');
  }
  tabs(curTabs, showCuration);
  showCuration(D.curations[0].id);

  // 세트 목록
  var setList = document.getElementById('set-list');
  setList.innerHTML = D.products.filter(function (p) { return p.parts; }).map(function (p) {
    var names = p.parts.map(function (id) { return K.find(id).name.replace(/ \d개입$/, ''); });
    var off = Math.round((1 - p.price / p.listPrice) * 100);
    return '<li><a class="setitem" href="product.html?id=' + p.id + '">' +
      '<div><p class="setitem__name">' + K.escape(p.name) + '</p><p class="setitem__parts">' + K.escape(names.join(' · ')) + '</p></div>' +
      '<p class="setitem__price"><span class="setitem__off">' + off + '%</span><strong>' + K.won(p.price) + '</strong></p>' +
    '</a></li>';
  }).join('');

  // 전체 상품
  var allTabs = document.getElementById('all-tabs');
  var allGrid = document.getElementById('all-grid');
  allTabs.innerHTML = [{ id: 'all', label: '전체' }].concat(D.categories).map(function (c, i) {
    return '<button class="tabs__btn" type="button" role="tab" data-id="' + c.id + '" aria-selected="' + (i === 0) + '">' + K.escape(c.label) + '</button>';
  }).join('');
  function showAll(id) {
    var list = D.products.filter(function (p) { return id === 'all' || p.categories.indexOf(id) > -1; });
    if (id === 'all') list = ['p01', 'p12', 'p14', 'p05', 'p17', 'p02', 'p06', 'p11'].map(K.find);
    allGrid.innerHTML = list.map(K.card).join('');
  }
  tabs(allTabs, showAll);
  showAll('all');
})();
