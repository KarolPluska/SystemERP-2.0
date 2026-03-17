/* ==========================================================================
   ZEGGER TECH COPYRIGHT HEADER - (C) 2019-2025 Zegger Tech Sp. z o.o.
   External modal bundle: Akcesoria +
   ========================================================================== */
;(() => {
  if (window.__ZEGGER_ACCESSORIES_MODAL_BUNDLE__) return;
  window.__ZEGGER_ACCESSORIES_MODAL_BUNDLE__ = true;

  const TYPE_LABELS = {
    furtka: 'Furtka',
    brama2s: 'Brama dwuskrzydłowa',
    przesuwna: 'Brama przesuwna',
    automaty: 'Automaty',
    multibox: 'Multibox',
    slup: 'Słupek'
  };
  const FILTERS = [
    { key: 'all', label: 'Wszystko' },
    { key: 'furtka', label: 'Furtka' },
    { key: 'brama2s', label: 'Dwuskrzydłowe' },
    { key: 'przesuwna', label: 'Przesuwne' },
    { key: 'automaty', label: 'Automaty' },
    { key: 'multibox', label: 'Multibox' },
    { key: 'slup', label: 'Słupek' }
  ];
  const ITEMS = [
    { name: 'Klamka/klamka + zestaw montażowy czarna', price: 52, cats: ['furtka', 'brama2s'] },
    { name: 'Klamka/pochwyt + zestaw montażowy czarny', price: 52, cats: ['furtka', 'brama2s'] },
    { name: 'Pochwyt/pochwyt + zestaw montażowy czarny', price: 52, cats: ['furtka', 'brama2s'] },
    { name: 'Klamka/klamka + zestaw montażowy nierdzewna', price: 102, cats: ['furtka', 'brama2s'] },
    { name: 'Klamka/pochwyt + zestaw montażowy nierdzewny', price: 102, cats: ['furtka', 'brama2s'] },
    { name: 'Pochwyt/pochwyt + zestaw montażowy nierdzewny', price: 102, cats: ['furtka', 'brama2s'] },
    { name: 'Wkładka bębenkowa (Niklowana)', price: 55, cats: ['furtka', 'brama2s'] },
    { name: 'Wkładka bębenkowa (Mosiężna)', price: 55, cats: ['furtka', 'brama2s'] },
    { name: 'Zamek uniwersalny (Niklowana)', price: 56, cats: ['furtka', 'brama2s'] },
    { name: 'Zamek uniwersalny (Mosiężna)', price: 56, cats: ['furtka', 'brama2s'] },
    { name: 'Zamek hakowy do bramy przesuwnej', price: 67.85, cats: ['przesuwna'] },
    { name: 'Elektrozaczep', price: 97, cats: ['furtka'] },
    { name: 'Zaczep furtki RAL', price: 27, cats: ['furtka'] },
    { name: 'Kasetka pod elektrozaczep RAL', price: 105, cats: ['furtka'] },
    { name: 'Antaba RAL jednostronna', price: 0, cats: ['furtka'], quoteOnly: true },
    { name: 'Antaba RAL dwustronna', price: 0, cats: ['furtka'], quoteOnly: true },
    { name: 'Zawias na blaszce RAL bramowy/furtkowy', price: 33.35, cats: ['furtka'] },
    { name: 'Rygiel Ocynk', price: 45, cats: ['brama2s'] },
    { name: 'Odbójnik dolny, Stal + RAL', price: 42, cats: ['brama2s'] },
    { name: 'Odbójnik dolny, Gumowy + RAL 9005', price: 52, cats: ['brama2s'] },
    { name: 'Uchwyt górny 40/60 RAL', price: 56.35, cats: ['przesuwna'] },
    { name: 'Najazd dolny RAL', price: 67.85, cats: ['przesuwna'] },
    { name: 'Koło najazdu bramy z odbojnikiem', price: 40.25, cats: ['przesuwna'] },
    { name: 'Listwa zębata stalowa + komplet montażowy', price: 46.0, cats: ['przesuwna'] },
    { name: 'Listwa zębata nylonowa + komplet montażowy', price: 46.0, cats: ['przesuwna'] },
    { name: 'Wózek lekki bramy przesuwnej z podstawą / 2 szt.', price: 282.9, cats: ['przesuwna'] },
    { name: 'Wózek ciężki bramy przesuwnej z podstawą / 2 szt.', price: 418.6, cats: ['przesuwna'] },
    { name: 'Obudowa wózka lekkiego/ciężkiego', price: 33.35, cats: ['przesuwna'] },
    { name: 'Zaślepka zewnętrzna 60x40', price: 2.65, cats: ['slup'] },
    { name: 'Zaślepka wewnętrzna 60x60', price: 4.6, cats: ['slup'] },
    { name: 'Zaślepka wewnętrzna 80x80', price: 5.75, cats: ['slup'] },
    { name: 'Zaślepka wewnętrzna 100x100', price: 6.33, cats: ['slup'] },
    { name: 'Stopa montażowa RAL 60x40', price: 40.25, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 - 2000 mm', price: 43, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 - 2300 mm', price: 50, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 - 2600 mm', price: 56, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 - 2000 mm', price: 50, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 - 2300 mm', price: 61, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 - 2600 mm', price: 66, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 - 3000 mm', price: 114, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 na stopie - 1300 mm', price: 167, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 na stopie - 1600 mm', price: 178, cats: ['slup'] },
    { name: 'Słup 60x40x1,2 na stopie - 2000 mm', price: 192, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 na stopie - 1300 mm', price: 199, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 na stopie - 1600 mm', price: 209, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 na stopie - 2000 mm', price: 229, cats: ['slup'] },
    { name: 'Słup 60x40x1,5 na stopie - 3000 mm', price: 343, cats: ['slup'] },
    { name: 'Słup 60x60x2 - 2000 mm', price: 143, cats: ['slup'] },
    { name: 'Słup 60x60x2 - 2300 mm', price: 161, cats: ['slup'] },
    { name: 'Słup 60x60x2 - 2500 mm', price: 173, cats: ['slup'] },
    { name: 'Słup 60x60x2 / z nitonakrętkami - 2000 mm', price: 154, cats: ['slup'] },
    { name: 'Słup 60x60x2 / z nitonakrętkami - 2300 mm', price: 172, cats: ['slup'] },
    { name: 'Słup 60x60x2 / z nitonakrętkami - 2500 mm', price: 184, cats: ['slup'] },
    { name: 'Słup 60x60x2 na stopie - 1300 mm', price: 224, cats: ['slup'] },
    { name: 'Słup 60x60x2 na stopie - 1600 mm', price: 244, cats: ['slup'] },
    { name: 'Słup 60x60x2 na stopie - 1800 mm', price: 257, cats: ['slup'] },
    { name: 'Słup 60x60x2 na stopie - 2000 mm', price: 270, cats: ['slup'] },
    { name: 'Słup 80x80x2 - 2000 mm', price: 189, cats: ['slup'] },
    { name: 'Słup 80x80x2 - 2300 mm', price: 214, cats: ['slup'] },
    { name: 'Słup 80x80x2 - 2500 mm', price: 231, cats: ['slup'] },
    { name: 'Słup 80x80x2 / z nitonakrętkami - 2000 mm', price: 198, cats: ['slup'] },
    { name: 'Słup 80x80x2 / z nitonakrętkami - 2300 mm', price: 226, cats: ['slup'] },
    { name: 'Słup 80x80x2 / z nitonakrętkami - 2500 mm', price: 242, cats: ['slup'] },
    { name: 'Słup 80x80x2 na stopie - 1300 mm', price: 266, cats: ['slup'] },
    { name: 'Słup 80x80x2 na stopie - 1600 mm', price: 293, cats: ['slup'] },
    { name: 'Słup 80x80x2 na stopie - 1800 mm', price: 309, cats: ['slup'] },
    { name: 'Słup 80x80x2 na stopie - 2000 mm', price: 329, cats: ['slup'] },
    { name: 'Słup 80x80x3 - 2000 mm', price: 262, cats: ['slup']},
    { name: 'Słup 80x80x3 - 2300 mm', price: 298, cats: ['slup']},
    { name: 'Słup 80x80x3 - 2500 mm', price: 322, cats: ['slup']},
    { name: 'Słup 80x80x3 / z nitonakrętkami - 2000 mm', price: 274, cats: ['slup']},
    { name: 'Słup 80x80x3 / z nitonakrętkami - 2300 mm', price: 310, cats: ['slup']},
    { name: 'Słup 80x80x3 / z nitonakrętkami - 2500 mm', price: 333, cats: ['slup']},
    { name: 'Słup 100x100x2 - 2000 mm', price: 253, cats: ['slup']},
    { name: 'Słup 100x100x2 - 2300 mm', price: 288, cats: ['slup']},
    { name: 'Słup 100x100x2 - 2500 mm', price: 311, cats: ['slup']},
    { name: 'Słup 100x100x2 / z nitonakrętkami - 2000 mm', price: 265, cats: ['slup']},
    { name: 'Słup 100x100x2 / z nitonakrętkami - 2300 mm', price: 299, cats: ['slup']},
    { name: 'Słup 100x100x2 / z nitonakrętkami - 2500 mm', price: 322, cats: ['slup']},
    { name: 'Słup 100x100x2 na stopie - 1300 mm', price: 311, cats: ['slup']},
    { name: 'Słup 100x100x2 na stopie - 1600 mm', price: 345, cats: ['slup']},
    { name: 'Słup 100x100x2 na stopie - 1800 mm', price: 369, cats: ['slup']},
    { name: 'Słup 100x100x2 na stopie - 2000 mm', price: 391, cats: ['slup']},
    { name: 'Słup 100x100x3 - 2000 mm', price: 372, cats: ['slup']},
    { name: 'Słup 100x100x3 - 2300 mm', price: 426, cats: ['slup']},
    { name: 'Słup 100x100x3 - 2500 mm', price: 460, cats: ['slup']},
    { name: 'Słup 100x100x3 / z nitonakrętkami - 2000 mm', price: 385, cats: ['slup']},
    { name: 'Słup 100x100x3 / z nitonakrętkami - 2300 mm', price: 437, cats: ['slup']},
    { name: 'Słup 100x100x3 / z nitonakrętkami - 2500 mm', price: 472, cats: ['slup']},
    { name: 'Pilot TOUSEK RS 433/868 2-kanałowy', price: 99.0, cats: ['automaty'] },
    { name: 'Pilot TOUSEK RS 433/868 4-kanałowy', price: 139.0, cats: ['automaty'] },
    { name: 'Pilot CAME TOP 433/868', price: 93.0, cats: ['automaty'] },
    { name: 'Lampa TOUSEK LED + uchwyt montażowy', price: 295.0, cats: ['automaty'] },
    { name: 'Lampa CAME KRX LED + uchwyt montażowy', price: 199.0, cats: ['automaty'] },
    { name: 'Antena zewnętrzna Tousek do lamp RS 433/868', price: 105.0, cats: ['automaty'] },
    { name: 'Napęd TOUSEK SLIM CLR 2-Skrzydłowy komplet', price: 3795.0, cats: ['automaty', 'brama2s'] },
    { name: 'Napęd TOUSEK SONIC 25 komplet', price: 3575.0, cats: ['automaty', 'brama2s'] },
    { name: 'Napęd CAME AXI 25 SAFE ATOMO komplet', price: 2390.0, cats: ['automaty', 'brama2s'] },
    { name: 'Napęd TOUSEK PULL TSA komplet', price: 2099.0, cats: ['automaty', 'przesuwna'] },
    { name: 'Napęd TOUSEK PULL T8 Komplet', price: 2059.0, cats: ['automaty', 'przesuwna'] },
    { name: 'Napęd CAME BXV 6 SAFE ATOMO komplet', price: 1899.0, cats: ['automaty', 'przesuwna'] },
    { name: 'Napęd CAME BXV 10 komplet', price: 2099.0, cats: ['automaty', 'przesuwna'] },
    { name: 'Słupek Multibox', price: 2999.0, cats: ['multibox'], fromPrice: true },
    { name: 'Skrzynka na listy', price: 599.0, cats: ['multibox'] },
    { name: 'Wideodomofon CAME LVKITEPV04', price: 1499.0, cats: ['multibox'] },
    { name: 'Domofon CAME LCKIPEC04', price: 889.0, cats: ['multibox'] }
  ];
  const ITEM_BY_NAME = new Map(ITEMS.map((item) => [item.name, item]));
  const IMAGES = {
    'Klamka/klamka + zestaw montażowy czarna': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a7.png',
    'Klamka/pochwyt + zestaw montażowy czarny': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a8.png',
    'Pochwyt/pochwyt + zestaw montażowy czarny': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a9.png',
    'Klamka/klamka + zestaw montażowy nierdzewna': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a10.png',
    'Klamka/pochwyt + zestaw montażowy nierdzewny': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a11.png',
    'Pochwyt/pochwyt + zestaw montażowy nierdzewny': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a12.png',
    'Wkładka bębenkowa (Niklowana)': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a1.png',
    'Wkładka bębenkowa (Mosiężna)': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a2.png',
    'Zamek uniwersalny (Niklowana)': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a13.png',
    'Zamek uniwersalny (Mosiężna)': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a13.png',
    'Elektrozaczep': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a17.png',
    'Zaczep furtki RAL': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a16.png',
    'Kasetka pod elektrozaczep RAL': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a15.png',
    'Antaba RAL jednostronna': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a18.png',
    'Antaba RAL dwustronna': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a18.png',
    'Zawias na blaszce RAL bramowy/furtkowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a19.png',
    'Rygiel Ocynk': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a20.png',
    'Odbójnik dolny, Stal + RAL': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a21.png',
    'Odbójnik dolny, Gumowy + RAL 9005': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a22.png',
    'Zamek hakowy do bramy przesuwnej': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a14.png',
    'Uchwyt górny 40/60 RAL': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a23.png',
    'Najazd dolny RAL': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a24.png',
    'Koło najazdu bramy z odbojnikiem': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a25.png',
    'Listwa zębata stalowa + komplet montażowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a26.png',
    'Listwa zębata nylonowa + komplet montażowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a26.png',
    'Wózek lekki bramy przesuwnej z podstawą / 2 szt.': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a27.png',
    'Wózek ciężki bramy przesuwnej z podstawą / 2 szt.': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a28.png',
    'Obudowa wózka lekkiego/ciężkiego': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a29.png',
    'Zaślepka zewnętrzna 60x40': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a3.png',
    'Zaślepka wewnętrzna 60x60': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a4.png',
    'Zaślepka wewnętrzna 80x80': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a4.png',
    'Zaślepka wewnętrzna 100x100': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a4.png',
    'Stopa montażowa RAL 60x40': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a5.png',
    'Słup 60x40x1,2 - 2000 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,2 - 2300 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,2 - 2600 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 - 2000 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 - 2300 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 - 2600 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 - 3000 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,2 na stopie - 1300 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,2 na stopie - 1600 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,2 na stopie - 2000 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 na stopie - 1300 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 na stopie - 1600 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 na stopie - 2000 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x40x1,5 na stopie - 3000 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S60x40.png',
    'Słup 60x60x2 - 2000 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 - 2300 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 - 2500 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 / z nitonakrętkami - 2000 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 / z nitonakrętkami - 2300 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 / z nitonakrętkami - 2500 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 na stopie - 1300 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 na stopie - 1600 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 na stopie - 1800 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 60x60x2 na stopie - 2000 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S60x60.png',
    'Słup 80x80x2 - 2000 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 - 2300 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 - 2500 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 / z nitonakrętkami - 2000 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 / z nitonakrętkami - 2300 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 / z nitonakrętkami - 2500 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 na stopie - 1300 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 na stopie - 1600 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 na stopie - 1800 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x2 na stopie - 2000 mm':              'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 100x100x2 - 2000 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 - 2300 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 - 2500 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 / z nitonakrętkami - 2000 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 / z nitonakrętkami - 2300 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 / z nitonakrętkami - 2500 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 na stopie - 1300 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 na stopie - 1600 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 na stopie - 1800 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x2 na stopie - 2000 mm':            'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 80x80x3 - 2000 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x3 - 2300 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x3 - 2500 mm':                        'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x3 / z nitonakrętkami - 2000 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x3 / z nitonakrętkami - 2300 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 80x80x3 / z nitonakrętkami - 2500 mm':     'https://zegger.pl/wp-content/uploads/2026/03/S80x80.png',
    'Słup 100x100x3 - 2000 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x3 - 2300 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x3 - 2500 mm':                      'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x3 / z nitonakrętkami - 2000 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x3 / z nitonakrętkami - 2300 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Słup 100x100x3 / z nitonakrętkami - 2500 mm':   'https://zegger.pl/wp-content/uploads/2026/03/S100x100.png',
    'Pilot TOUSEK RS 433/868 2-kanałowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a30.png',
    'Pilot TOUSEK RS 433/868 4-kanałowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a30.png',
    'Pilot CAME TOP 433/868': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a30.png',
    'Lampa TOUSEK LED + uchwyt montażowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a31.png',
    'Lampa CAME KRX LED + uchwyt montażowy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a31.png',
    'Antena zewnętrzna Tousek do lamp RS 433/868': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a37-kopia.png',
    'Napęd TOUSEK SLIM CLR 2-Skrzydłowy komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a32.png',
    'Napęd TOUSEK SONIC 25 komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a32.png',
    'Napęd CAME AXI 25 SAFE ATOMO komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a32.png',
    'Napęd TOUSEK PULL TSA komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a33.png',
    'Napęd TOUSEK PULL T8 Komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a33.png',
    'Napęd CAME BXV 6 SAFE ATOMO komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a33.png',
    'Napęd CAME BXV 10 komplet': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a33.png',
    'Słupek Multibox': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a34.png',
    'Skrzynka na listy': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a35.png',
    'Wideodomofon CAME LVKITEPV04': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a36.png',
    'Domofon CAME LCKIPEC04': 'https://zegger.pl/wp-content/uploads/2025/10/Kal-a36.png'
  };
  const SPECS = {
    'Napęd TOUSEK SLIM CLR 2-Skrzydłowy komplet': { kind: 'brama2s', width: '2,5 m', weight: '150 kg' },
    'Napęd TOUSEK SONIC 25 komplet': { kind: 'brama2s', width: '2,5 m', weight: '200 kg' },
    'Napęd CAME AXI 25 SAFE ATOMO komplet': { kind: 'brama2s', width: '2,5 m', weight: '150 kg' },
    'Napęd TOUSEK PULL TSA komplet': { kind: 'przesuwna', max: 'do 400 kg' },
    'Napęd TOUSEK PULL T8 Komplet': { kind: 'przesuwna', max: 'do 800 kg' },
    'Napęd CAME BXV 6 SAFE ATOMO komplet': { kind: 'przesuwna', max: 'do 600 kg' },
    'Napęd CAME BXV 10 komplet': { kind: 'przesuwna', max: 'do 1000 kg' }
  };

  const qtyState = Object.create(null);
  window.motorsData = Array.isArray(window.motorsData) ? window.motorsData : [];
  window.autoState = window.autoState || { brama2s: { name: 'none', qty: 0 }, przesuwna: { name: 'none', qty: 0 } };

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
      return;
    }
    fn();
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function clampQty(value) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  function parseMoney(text) {
    if (!text) return 0;
    const normalized = String(text).replace(/\s/g, '').replace('zł', '').replace(',', '.');
    const numeric = parseFloat(normalized.replace(/[^\d.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function vatOn() {
    const checkbox = document.getElementById('vat');
    return !!(checkbox && checkbox.checked);
  }

  function money(value) {
    return Number(value || 0).toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' zł';
  }

  function svgFallback(label) {
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='20' fill='%23999'>" + escapeHtml(label) + "</text></svg>";
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function thumbUrlFor(item) {
    if (!item || !item.name) return svgFallback('Akcesoria');
    if (IMAGES[item.name]) return IMAGES[item.name];
    if ((item.cats || []).includes('multibox')) return svgFallback('Multibox');
    if ((item.cats || []).includes('slup')) return svgFallback('Słupek');
    if ((item.cats || []).includes('automaty')) return svgFallback('Automaty');
    return svgFallback('Akcesoria');
  }

  function fallbackLabelFor(item) {
    if (!item) return 'Akcesoria';
    if ((item.cats || []).includes('multibox')) return 'Multibox';
    if ((item.cats || []).includes('slup')) return 'Słupek';
    if ((item.cats || []).includes('automaty')) return 'Automaty';
    return 'Akcesoria';
  }

  function typeLabelForCats(cats) {
    const filtered = (cats || []).filter((cat) => cat !== 'automaty');
    const labelCats = filtered.length ? filtered : cats || [];
    return labelCats.map((cat) => TYPE_LABELS[cat] || cat).join(' • ');
  }

  function specTextForItem(item) {
    const spec = item && SPECS[item.name];
    if (!spec) return '';
    if (spec.kind === 'brama2s') {
      return 'Szer./waga: ' + spec.width + ' / ' + spec.weight;
    }
    return 'Maks. waga: ' + spec.max;
  }

  function buildModalMarkup() {
    const chipsHtml = FILTERS.map((filter, index) => {
      return '<button class="z-chip' + (index === 0 ? ' active' : '') + '" data-filter="' + filter.key + '" type="button">' + escapeHtml(filter.label) + '</button>';
    }).join('');

    return '' +
      '<div class="z-modal-backdrop" id="motorsModal" aria-hidden="true" role="dialog">' +
        '<div class="z-modal" role="document">' +
          '<div class="z-modal-head">' +
            '<div class="z-modal-title">Akcesoria - konfigurator</div>' +
            '<button class="z-modal-close" id="motorsClose" type="button">Zamknij</button>' +
          '</div>' +
          '<div class="z-modal-body">' +
            '<div class="z-tools">' +
              '<input id="motorsSearch" class="z-search" type="search" placeholder="Szukaj akcesoriów">' +
              '<div class="z-chips">' + chipsHtml + '</div>' +
            '</div>' +
            '<table class="z-table">' +
              '<thead>' +
                '<tr><th>Miniatura</th><th>Nazwa akcesorium</th><th>Typ</th><th>Cena</th><th style="text-align:right;">Ilość</th></tr>' +
              '</thead>' +
              '<tbody id="motorsRows"></tbody>' +
            '</table>' +
            '<div class="z-bottom">' +
              '<div class="z-mini-sum" id="motorsMiniSum">Suma: 0,00 zł</div>' +
              '<div class="z-actions"><span class="z-muted">Zmiany są zapisywane automatycznie.</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function ensureModalMounted() {
    if (document.getElementById('motorsModal')) return;
    if (!document.body) return;
    document.body.insertAdjacentHTML('beforeend', buildModalMarkup());
  }

  function ensureModalStyles() {
    if (document.getElementById('zeggerMotorsModalStyles')) return;
    const style = document.createElement('style');
    style.id = 'zeggerMotorsModalStyles';
    style.textContent =
      '#motorsModal .z-thumb{display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f6f7f9;border-radius:10px;min-width:72px;min-height:52px}' +
      '#motorsModal .z-thumb img{display:block;width:100%;height:100%;object-fit:contain}' +
      '#motorsModal .z-subtxt{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.25}' +
      '#motorsModal .z-price-cell{white-space:nowrap}' +
      '#motorsSummary{margin-top:6px;font-size:13px;color:var(--muted);display:none}';
    document.head.appendChild(style);
  }

  function ensureSummaryBox() {
    let summary = document.getElementById('motorsSummary');
    if (summary) return summary;
    const button = document.getElementById('motorsBtn');
    if (!button || !button.parentNode) return null;
    summary = document.createElement('div');
    summary.id = 'motorsSummary';
    const buttonRow = button.closest('.z-actions');
    if (buttonRow && buttonRow.parentNode) {
      buttonRow.insertAdjacentElement('afterend', summary);
    } else {
      button.insertAdjacentElement('afterend', summary);
    }
    return summary;
  }

  function ensureFallbackButton() {
    if (document.getElementById('motorsBtn')) return;
    const extras = document.getElementById('extrasBox');
    if (!extras) return;
    const button = document.createElement('button');
    button.className = 'btn secondary';
    button.id = 'motorsBtn';
    button.type = 'button';
    button.textContent = 'Akcesoria +';
    extras.appendChild(button);
    ensureSummaryBox();
  }

  function portalizeModal() {
    const backdrop = document.getElementById('motorsModal');
    if (backdrop && backdrop.parentNode !== document.body) {
      document.body.appendChild(backdrop);
    }
  }

  function setPriceHeader() {
    const headCell = document.querySelector('#motorsModal thead th:nth-child(4)');
    if (headCell) {
      headCell.textContent = 'Cena (' + (vatOn() ? 'brutto' : 'netto') + ')';
    }
  }

  function buildRowMarkup(item) {
    const currentQty = clampQty(qtyState[item.name] || 0);
    const imageUrl = thumbUrlFor(item);
    const specText = specTextForItem(item);
    const noteText = item.quoteOnly ? 'Na wymiar - wycena indywidualna' : '';
    const typeLabel = typeLabelForCats(item.cats);
    const unitPriceText = item.quoteOnly ? 'na zapytanie' : ((item.fromPrice ? 'od ' : '') + money(vatOn() ? item.price * 1.23 : item.price));

    return '' +
      '<tr data-name="' + escapeHtml(item.name) + '" data-cats="' + escapeHtml(item.cats.join(' ')) + '">' +
        '<td class="z-img"><div class="z-thumb"><img loading="lazy" alt="' + escapeHtml(item.name) + '" src="' + escapeHtml(imageUrl) + '"></div></td>' +
        '<td>' +
          escapeHtml(item.name) +
          (specText ? '<div class="z-subtxt">' + escapeHtml(specText) + '</div>' : '') +
          (noteText ? '<div class="z-subtxt">' + escapeHtml(noteText) + '</div>' : '') +
        '</td>' +
        '<td>' + escapeHtml(typeLabel) + '</td>' +
        '<td class="z-price-cell" data-net="' + escapeHtml(item.price) + '" data-quote="' + (item.quoteOnly ? '1' : '0') + '" data-from="' + (item.fromPrice ? '1' : '0') + '">' + escapeHtml(unitPriceText) + '</td>' +
        '<td style="text-align:right;">' +
          '<div class="z-qty" data-name="' + escapeHtml(item.name) + '" data-price="' + escapeHtml(item.price) + '">' +
            '<button class="zminus" type="button">-</button>' +
            '<input class="zinput" type="number" min="0" value="' + currentQty + '">' +
            '<button class="zplus" type="button">+</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
  }

  function renderRows() {
    const tbody = document.getElementById('motorsRows');
    if (!tbody) return;
    tbody.innerHTML = ITEMS.map(buildRowMarkup).join('');
    tbody.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', function handleError() {
        const row = this.closest('tr');
        const item = row ? ITEM_BY_NAME.get(row.getAttribute('data-name')) : null;
        this.removeEventListener('error', handleError);
        this.src = svgFallback(fallbackLabelFor(item));
      });
    });
    setPriceHeader();
  }

  function getActiveFilter() {
    const activeChip = document.querySelector('#motorsModal .z-chip.active');
    return activeChip ? activeChip.getAttribute('data-filter') : 'all';
  }

  function applyFilter() {
    const search = document.getElementById('motorsSearch');
    const query = (search ? search.value : '').trim().toLowerCase();
    const filter = getActiveFilter();
    document.querySelectorAll('#motorsRows tr').forEach((row) => {
      const name = (row.getAttribute('data-name') || '').toLowerCase();
      const cats = (row.getAttribute('data-cats') || '').toLowerCase();
      const matchesQuery = !query || name.includes(query) || cats.includes(query);
      const matchesFilter = filter === 'all' || cats.split(/\s+/).includes(filter);
      row.style.display = matchesQuery && matchesFilter ? '' : 'none';
    });
  }

  function refreshPriceCells() {
    document.querySelectorAll('#motorsRows .z-price-cell').forEach((cell) => {
      const net = parseFloat(cell.dataset.net || '0') || 0;
      if (cell.dataset.quote === '1') {
        cell.textContent = 'na zapytanie';
        return;
      }
      const prefix = cell.dataset.from === '1' ? 'od ' : '';
      cell.textContent = prefix + money(vatOn() ? net * 1.23 : net);
    });
    setPriceHeader();
  }

  function refreshMiniSum() {
    let sum = 0;
    document.querySelectorAll('#motorsRows .z-qty').forEach((wrap) => {
      const qty = clampQty(wrap.querySelector('.zinput') ? wrap.querySelector('.zinput').value : 0);
      const price = parseFloat(wrap.dataset.price || '0') || 0;
      if (qty <= 0) return;
      sum += (vatOn() ? price * 1.23 : price) * qty;
    });
    const total = document.getElementById('motorsMiniSum');
    if (total) total.textContent = 'Suma: ' + money(sum);
  }

  function updateSummary() {
    const summary = ensureSummaryBox();
    if (!summary) return;
    const selected = window.motorsData || [];
    if (!selected.length) {
      summary.textContent = '';
      summary.style.display = 'none';
      return;
    }
    summary.textContent = 'Wybrane akcesoria: ' + selected.map((item) => item.name + ' × ' + item.qty).join(', ');
    summary.style.display = '';
  }

  function buildCompatMap(type) {
    const map = {};
    ITEMS.forEach((item) => {
      if ((item.cats || []).includes(type) && (item.cats || []).includes('automaty')) {
        const qty = clampQty(qtyState[item.name] || 0);
        if (qty > 0) map[item.name] = qty;
      }
    });
    return map;
  }

  function syncCompatState() {
    const nextState = {
      brama2s: { name: 'none', qty: 0 },
      przesuwna: { name: 'none', qty: 0 }
    };

    ['brama2s', 'przesuwna'].forEach((type) => {
      ITEMS.some((item) => {
        const qty = clampQty(qtyState[item.name] || 0);
        if (qty > 0 && item.cats.includes(type) && item.cats.includes('automaty')) {
          nextState[type] = { name: item.name, qty: qty };
          return true;
        }
        return false;
      });
    });

    window.autoState.brama2s = nextState.brama2s;
    window.autoState.przesuwna = nextState.przesuwna;
    document.dispatchEvent(new CustomEvent('zegger:autoChanged', {
      detail: {
        state: window.autoState,
        all: {
          brama2s: buildCompatMap('brama2s'),
          przesuwna: buildCompatMap('przesuwna')
        }
      }
    }));
  }

  function collectMotorsFromState() {
    const selected = ITEMS.reduce((list, item) => {
      const qty = clampQty(qtyState[item.name] || 0);
      if (qty > 0) {
        list.push({ name: item.name, qty: qty, unitNet: item.price });
      }
      return list;
    }, []);
    window.motorsData = selected;
    updateSummary();
    syncCompatState();
    return selected;
  }

  function syncStateFromDom() {
    document.querySelectorAll('#motorsRows .z-qty').forEach((wrap) => {
      const input = wrap.querySelector('.zinput');
      const name = wrap.dataset.name;
      qtyState[name] = clampQty(input ? input.value : 0);
      if (input) input.value = qtyState[name];
    });
    return collectMotorsFromState();
  }

  function injectMotors() {
    const tbody = document.getElementById('tbody');
    const sumEl = document.getElementById('sum');
    if (!tbody || !sumEl) return;

    tbody.querySelectorAll('tr[data-motor="1"]').forEach((row) => row.remove());

    const selected = window.motorsData || [];
    const vatFactor = vatOn() ? 1.23 : 1;
    let motorsSum = 0;

    selected.forEach((item) => {
      const unit = (item.unitNet || 0) * vatFactor;
      const total = unit * (item.qty || 0);
      motorsSum += total;
      const row = document.createElement('tr');
      row.setAttribute('data-motor', '1');
      row.innerHTML =
        '<td>' + escapeHtml(item.name) + '</td>' +
        '<td>' + escapeHtml(String(item.qty)) + ' szt.</td>' +
        '<td>' + escapeHtml(money(unit)) + '</td>' +
        '<td>' + escapeHtml(money(total)) + '</td>';
      tbody.appendChild(row);
    });

    let base = 0;
    tbody.querySelectorAll('tr:not([data-motor="1"]) td:nth-child(4)').forEach((cell) => {
      base += parseMoney(cell.textContent);
    });
    sumEl.textContent = money(base + motorsSum);
  }

  function closeModal() {
    const modal = document.getElementById('motorsModal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const extras = document.getElementById('extrasBox');
    if (extras) extras.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openModal() {
    const modal = document.getElementById('motorsModal');
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const search = document.getElementById('motorsSearch');
    if (search) {
      window.setTimeout(() => search.focus(), 30);
    }
  }

  function toggleAutomaty(force) {
    const modal = document.getElementById('motorsModal');
    if (!modal) return;
    const shouldOpen = typeof force === 'boolean' ? force : !modal.classList.contains('show');
    if (shouldOpen) openModal();
    else closeModal();
  }

  function clearSelections() {
    Object.keys(qtyState).forEach((key) => {
      qtyState[key] = 0;
    });
    document.querySelectorAll('#motorsRows .zinput').forEach((input) => {
      input.value = '0';
    });
    collectMotorsFromState();
    refreshMiniSum();
    injectMotors();
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('#motorsBtn');
      if (button) {
        event.preventDefault();
        openModal();
        return;
      }

      const closeButton = event.target.closest('#motorsClose');
      if (closeButton) {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.target.id === 'motorsModal' && event.target.classList.contains('z-modal-backdrop')) {
        closeModal();
        return;
      }

      const chip = event.target.closest('#motorsModal .z-chip');
      if (chip) {
        document.querySelectorAll('#motorsModal .z-chip').forEach((node) => {
          node.classList.toggle('active', node === chip);
        });
        applyFilter();
        return;
      }

      const minus = event.target.closest('#motorsModal .zminus');
      const plus = event.target.closest('#motorsModal .zplus');
      if (!minus && !plus) return;

      event.preventDefault();
      event.stopPropagation();

      const wrap = event.target.closest('.z-qty');
      if (!wrap) return;
      const input = wrap.querySelector('.zinput');
      const nextValue = Math.max(0, clampQty(input ? input.value : 0) + (plus ? 1 : -1));
      if (input) {
        input.value = String(nextValue);
      }
      qtyState[wrap.dataset.name] = nextValue;
      collectMotorsFromState();
      refreshMiniSum();
      injectMotors();
    }, true);

    document.addEventListener('input', (event) => {
      if (event.target && event.target.id === 'motorsSearch') {
        applyFilter();
        return;
      }

      if (!event.target || !event.target.classList.contains('zinput')) return;
      const wrap = event.target.closest('.z-qty');
      if (!wrap) return;
      qtyState[wrap.dataset.name] = clampQty(event.target.value);
      event.target.value = String(qtyState[wrap.dataset.name]);
      collectMotorsFromState();
      refreshMiniSum();
      injectMotors();
    }, true);

    document.addEventListener('change', (event) => {
      if (event.target && event.target.id === 'vat') {
        refreshPriceCells();
        refreshMiniSum();
        injectMotors();
      }
    }, true);

    document.addEventListener('click', (event) => {
      if (event.target && event.target.id === 'reset') {
        window.setTimeout(clearSelections, 0);
      }
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.getElementById('motorsModal') && document.getElementById('motorsModal').classList.contains('show')) {
        closeModal();
      }
    });
  }

  function init() {
    ensureFallbackButton();
    ensureModalMounted();
    ensureModalStyles();
    portalizeModal();
    ensureSummaryBox();
    renderRows();
    bindEvents();
    collectMotorsFromState();
    applyFilter();
    refreshMiniSum();
    refreshPriceCells();
    injectMotors();
  }

  window.svgFallback = window.svgFallback || svgFallback;
  window.thumbUrlFor = window.thumbUrlFor || thumbUrlFor;
  window.collectMotorsFromModal = function collectMotorsFromModal() {
    return syncStateFromDom();
  };
  window.injectMotors = injectMotors;
  window.toggleAutomaty = toggleAutomaty;
  window.applyFilter_PATCH = applyFilter;
  window.refreshMiniSum_PATCH = refreshMiniSum;
  window.openAccModal = function openAccModal() {
    portalizeModal();
    openModal();
  };

  onReady(init);
})();
