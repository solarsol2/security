/* KCOP 상품·카테고리 데이터 (기준표: docs/products.md)
 * img가 null이면 자리 표시 패널로 그린다.
 * ship: 'global' 해외배송 7–12일 / 'local' 국내 재고 1–2일
 */
window.KCOP_DATA = (function () {
  var categories = [
    { id: 'walk', label: '귀갓길', desc: '밤길, 혼자 걷는 길' },
    { id: 'home', label: '우리집', desc: '현관과 창문부터' },
    { id: 'travel', label: '여행', desc: '공항에서 숙소까지' },
    { id: 'privacy', label: '프라이버시', desc: '보이지 않게, 남지 않게' },
    { id: 'set', label: '세트', desc: '상황별 묶음 할인' }
  ];

  function p(id, name, cats, price, listPrice, badge, img, ship, extra) {
    var o = { id: id, name: name, categories: cats, price: price, listPrice: listPrice || null, badge: badge || null, img: img || null, ship: ship || 'global' };
    for (var k in extra) o[k] = extra[k];
    return o;
  }

  var products = [
    p('p01', '130dB 안심 경보기 키링', ['walk'], 12900, 16900, 'best', 'assets/img/p01.webp'),
    p('p02', '스테인리스 안심 호루라기 2개입', ['walk', 'travel'], 6900, 8900, 'local', 'assets/img/p02.webp', 'local'),
    p('p03', '클립형 LED 세이프티 라이트', ['walk'], 9900, null, 'new'),
    p('p04', '반사 슬랩 밴드 2개입', ['walk'], 5900),
    p('p05', '도어 스토퍼 알람', ['home', 'travel'], 9900, 12900, 'best', 'assets/img/p05.webp'),
    p('p06', '문·창문 열림 감지 센서 2개입', ['home'], 14900, 18900, null, 'assets/img/p06.webp'),
    p('p07', '무타공 보조 도어 가드', ['home'], 18900, null, 'new'),
    p('p08', '창문 잠금 스토퍼 2개입', ['home'], 7900, null, 'local', null, 'local'),
    p('p09', '현관 외시경 가리개', ['home'], 4900),
    p('p10', 'TSA 여행용 자물쇠 2개입', ['travel'], 15900, 19900),
    p('p11', 'RFID 차단 여권 지갑', ['travel', 'privacy'], 19900, null, null, 'assets/img/p11.webp'),
    p('p12', '숙소용 휴대 도어락', ['travel', 'home'], 16900, 21900, 'best', 'assets/img/p12.webp'),
    p('p13', '분실 방지 블루투스 태그', ['travel'], 24900, null, 'new'),
    p('p14', '몰래카메라 탐지기', ['privacy', 'travel'], 39900, 49900, 'best', 'assets/img/p14.webp'),
    p('p15', '개인정보 가림 롤러 스탬프', ['privacy', 'home'], 7900, null, 'local', null, 'local'),
    p('p16', '웹캠 슬라이드 커버 3개입', ['privacy'], 3900, null, 'soldout', null, 'global', { soldout: true }),
    p('p17', '귀갓길 안심 세트', ['set', 'walk'], 23900, 28700, 'set', null, 'global', { parts: ['p01', 'p03', 'p04'] }),
    p('p18', '자취 시작 세트', ['set', 'home'], 29900, 37600, 'set', null, 'global', { parts: ['p05', 'p06', 'p08', 'p09'] }),
    p('p19', '여행 안심 세트', ['set', 'travel'], 42900, 52700, 'set', null, 'global', { parts: ['p10', 'p11', 'p12'] }),
    p('p20', '숙소 점검 세트', ['set', 'travel', 'privacy'], 47900, 56800, 'set', null, 'global', { parts: ['p12', 'p14'] })
  ];

  var curations = [
    { id: 'newhome', label: '혼자 사는 집', title: '이사 첫날, 현관부터 챙기세요', text: '문이 열리면 알려주는 센서, 밀리지 않는 도어 스토퍼, 밖에서 들여다볼 수 없는 외시경 가리개까지. 공구 없이 10분이면 끝납니다.', items: ['p18', 'p05', 'p06', 'p07', 'p09', 'p08'] },
    { id: 'night', label: '늦은 귀갓길', title: '퇴근길이 늦어지는 날에도', text: '가방에 걸어두면 한 번에 당겨 울리는 경보기와 멀리서도 눈에 띄는 라이트. 손이 가장 빨리 닿는 곳에 두세요.', items: ['p17', 'p01', 'p03', 'p04', 'p02', 'p13'] },
    { id: 'trip', label: '여행 가방', title: '짐 쌀 때 같이 넣어두면 좋은 것', text: '수하물 자물쇠와 여권 지갑은 기본, 처음 묵는 숙소를 위한 휴대 도어락까지 한 번에 준비하세요.', items: ['p19', 'p12', 'p10', 'p11', 'p13', 'p02'] },
    { id: 'stay', label: '숙소 점검', title: '체크인하고 5분, 먼저 확인하세요', text: '렌즈 반사를 찾아내는 탐지기로 방을 한 번 둘러보고, 문에는 휴대 도어락을 걸어두면 마음 편히 쉴 수 있습니다.', items: ['p20', 'p14', 'p12', 'p05', 'p11', 'p15'] }
  ];

  return { categories: categories, products: products, curations: curations };
})();
