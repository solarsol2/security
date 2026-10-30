# 이미지 생성 프롬프트

ChatGPT(이미지 생성), Gemini 같은 도구에 그대로 붙여 넣어 쓰세요. 프롬프트는 영어가 결과가 더 안정적입니다.

## 사용 방법
1. **공통 스타일 문장**을 각 프롬프트 뒤에 붙입니다. 사진 톤을 통일하는 문장입니다.
2. **단품(p01–p16)을 먼저** 만듭니다. 세트(p17–p20)를 만들 때는 앞에서 만든 단품 이미지를 함께 첨부하고 "use these exact products"라고 쓰면 상품 모양이 맞춰집니다.
3. 마음에 드는 결과는 **원본 PNG 그대로** 파일명대로 저장해 전달해 주세요. 자르기, 워터마크 제거, WebP 변환은 제가 합니다.
4. 사람이 나오는 컷은 **얼굴이 나오지 않게** 했습니다. 실존 인물처럼 보이는 문제와 어색한 얼굴 표현을 피하기 위해서입니다.

---

## 공통 스타일 문장

**상품컷 (1:1)**
```
Minimal product photography in the style of a Japanese lifestyle brand catalog. Soft diffused natural daylight from the left, warm off-white seamless background (#F4F1EC), very soft natural shadow, product centered with generous empty margin around it (product occupies about 55% of the frame), true-to-life matte materials, muted warm neutral palette, high detail, square 1:1. No text, no logos, no brand names, no watermark, no props unless described.
```

**라이프스타일컷 (사람·공간)**
```
Calm, clean lifestyle photography for a Korean safety goods store. Soft natural light, warm neutral tones (oatmeal, linen, light oak, soft gray), tidy and uncluttered space, reassuring and gentle mood, nothing threatening or dark, shallow depth of field, shot on 35mm lens. If a person appears, show only hands, shoulders or back, never the face. No text, no logos, no watermark.
```

---

## 1. 메인 첫 화면 (Hero)
| 파일명 | 비율 | 프롬프트 |
| --- | --- | --- |
| `hero-desktop.png` | 16:9 | A tidy small apartment entryway in morning light: light oak shelf by the front door, a linen tote bag hanging on a hook, a woman's hand placing house keys with a small beige keyring alarm onto the shelf, a white door slightly out of focus on the right. Lots of empty space on the left side for headline text. + 라이프스타일 공통 문장 |
| `hero-mobile.png` | 4:5 | 위와 같은 장면을 세로로. 상단 1/3을 비워 문구가 들어갈 자리를 둡니다. "vertical composition, empty space in the upper third" 추가 |

## 2. 카테고리 (4:3)
| 파일명 | 프롬프트 |
| --- | --- |
| `cat-walk.png` | Back view of a young woman walking home on a quiet, well-lit residential street at early evening, warm streetlights, a small light clipped to her tote bag strap glowing softly, calm atmosphere. + 라이프스타일 공통 |
| `cat-home.png` | Close-up of a clean white front door interior in a studio apartment, a small white door sensor mounted near the top edge, a door stopper on light wood floor, soft daylight. + 라이프스타일 공통 |
| `cat-travel.png` | A neat hotel room corner: sand-colored hard-shell suitcase standing upright, a passport wallet and small travel lock on the white bedsheet, soft window light. + 라이프스타일 공통 |
| `cat-privacy.png` | A minimal desk by a window: laptop with a small slide cover over the webcam, a cardboard parcel box with the shipping label being rolled over by a privacy roller stamp, hands only. + 라이프스타일 공통 |
| `cat-set.png` | Overhead flat lay of several small safety items neatly arranged inside an open kraft paper gift box with linen tissue paper, on a light oak table. + 라이프스타일 공통 |

## 3. 상품 단품 (1:1, 각 프롬프트 + 상품컷 공통 문장)
| 파일명 | 프롬프트 |
| --- | --- |
| `p01.png` | A compact personal safety alarm keyring, rounded rectangular body in oat beige matte plastic, a small pull pin attached to a metal key ring, tiny LED window on top. |
| `p02.png` | Two slim stainless steel emergency whistles, one brushed silver and one matte black, each with a thin gray lanyard, lying diagonally side by side. |
| `p03.png` | A small clip-on LED safety light, round white matte body with a soft gray silicone clip, gently glowing, attached to the edge of a beige canvas bag strap. |
| `p04.png` | Two reflective slap wristbands coiled loosely, one light gray and one navy, subtle reflective sheen. |
| `p05.png` | A white wedge-shaped door stopper alarm with a gray rubber non-slip base and a small on/off switch, placed on light oak floor at the bottom edge of a white door. |
| `p06.png` | A pair of compact white magnetic door and window sensors, each with a main body and a smaller magnet piece, arranged neatly. |
| `p07.png` | A brushed silver adhesive door guard latch (no-drill secondary door lock with a swing bar), shown at a slight angle. |
| `p08.png` | Two small white window lock stoppers for sliding windows with a gray thumb screw. |
| `p09.png` | A small round magnetic door peephole cover in matte white with a slide flap, mounted on a light gray door surface. |
| `p10.png` | Two TSA-approved 3-digit combination luggage locks, one sand beige and one navy, with steel shackles. |
| `p11.png` | A slim RFID-blocking passport wallet in taupe vegan leather, partly open showing card slots and a passport inside (no text visible on the passport). |
| `p12.png` | A portable travel door lock for hotel rooms: small metal latch piece and a compact matte gray block, shown with a soft pouch. |
| `p13.png` | Two small round Bluetooth tracker tags in white, one attached to a sand-colored key ring, one lying flat. |
| `p14.png` | A compact handheld hidden camera detector in matte white, slim body with a small lens viewer and a single button, standing upright. |
| `p15.png` | A privacy roller stamp for hiding personal information, white and light gray body with a visible patterned roller, next to a small piece of cardboard with the pattern partially applied. |
| `p16.png` | Three ultra-thin webcam slide covers in black, white and gray, arranged in a row. |

## 4. 세트 (1:1, 해당 단품 이미지를 함께 첨부)
| 파일명 | 프롬프트 |
| --- | --- |
| `p17.png` | Use these exact products. Flat lay of the keyring alarm, clip-on LED light and two reflective wristbands neatly arranged inside an open kraft paper box. + 상품컷 공통 |
| `p18.png` | Use these exact products. Flat lay of the door stopper alarm, two door sensors, two window stoppers and the peephole cover arranged in a neat grid inside an open kraft paper box. + 상품컷 공통 |
| `p19.png` | Use these exact products. The two travel locks, passport wallet and portable door lock arranged neatly next to a small canvas travel pouch. + 상품컷 공통 |
| `p20.png` | Use these exact products. The hidden camera detector and portable door lock placed side by side on a folded white hotel towel. + 상품컷 공통 |

## 5. 신뢰·브랜드 섹션 (4:3)
| 파일명 | 프롬프트 |
| --- | --- |
| `trust-inspect.png` | Hands in light cotton gloves inspecting a small white safety device at a clean workbench, a printed checklist and small cardboard boxes nearby, bright tidy workspace. + 라이프스타일 공통 |
| `trust-pack.png` | Neatly stacked kraft cardboard shipping boxes with paper tape on a light wood table, a roll of tissue paper beside them, soft daylight. + 라이프스타일 공통 |
| `trust-delivery.png` | A kraft parcel box placed in front of a white apartment door on a doormat, soft morning light, calm and safe feeling. + 라이프스타일 공통 |

## 6. 기획전 배너 (21:9)
| 파일명 | 프롬프트 |
| --- | --- |
| `banner-travel.png` | Wide shot of an airport window lounge in soft morning light, a sand-colored suitcase and a linen tote on a bench, planes softly blurred outside, empty space on the left for text. + 라이프스타일 공통 |
| `banner-newhome.png` | Wide shot of a bright empty studio apartment on moving day, a few kraft boxes on light wood floor, sunlight through sheer curtains, empty space on the right for text. + 라이프스타일 공통 |

---

**우선순위:** 시간이 부족하면 `hero-desktop`, 카테고리 5장, 단품 16장 순서로 먼저 만들어 주세요. 나머지는 v1 사진이나 단색 자리 표시로 잠시 대신하겠습니다.
