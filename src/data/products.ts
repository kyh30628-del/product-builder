export type Style = 'backpacking' | 'auto' | 'glamping' | 'caravan';
export type GroupSize = 'solo' | 'duo' | 'family' | 'large';
export type Budget = 'low' | 'mid' | 'high' | 'premium';
export type Season = 'spring_fall' | 'summer' | 'winter' | 'all';
export type Priority = 'light' | 'durable' | 'convenient' | 'value';

export interface QuizAnswers {
  style: Style;
  group: GroupSize;
  budget: Budget;
  season: Season;
  priority: Priority;
}

export interface GearProduct {
  id: string;
  name: string;
  brand: string;
  category: '텐트' | '침낭' | '버너' | '의자' | '랜턴' | '매트' | '쿠킹' | '기타';
  price: number;
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  imgClass: string;
  tags: string[];
  description: string;
  buyUrl: string;
  weight?: string;
  matchTags: {
    styles: Style[];
    groups: GroupSize[];
    budgets: Budget[];
    seasons: Season[];
    priorities: Priority[];
  };
}

export interface VehicleProduct {
  id: string;
  name: string;
  brand: string;
  type: '카라반' | '캠핑카' | '밴캠퍼';
  price: number;
  priceDisplay: string;
  rentalPerNight?: number;
  rentalDisplay?: string;
  capacity: number;
  length: string;
  beds: number;
  rating: number;
  reviewCount: number;
  imgClass: string;
  features: string[];
  description: string;
  country: string;
  matchTags: {
    groups: GroupSize[];
    budgets: Budget[];
    priorities: Priority[];
  };
}

export const gearProducts: GearProduct[] = [
  // ── 텐트 ──────────────────────────────────────────────────────────────
  {
    id: 'msr-hubba-hubba-nx2',
    name: 'MSR Hubba Hubba NX 2인용',
    brand: 'MSR',
    category: '텐트',
    price: 720000,
    priceDisplay: '720,000',
    rating: 4.9,
    reviewCount: 1820,
    imgClass: 'img-product-tent',
    tags: ['2인용', '3시즌', '초경량 1.72kg', '더블월'],
    description: '등산·백패킹의 전설. 1.72kg 초경량에 폭풍우도 버티는 내구성. MSR 대표 텐트.',
    buyUrl: 'https://www.msrgear.com',
    weight: '1.72kg',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo', 'duo'],
      budgets: ['high', 'premium'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light', 'durable'],
    },
  },
  {
    id: 'big-agnes-copper-spur-ul2',
    name: 'Big Agnes Copper Spur HV UL2',
    brand: 'Big Agnes',
    category: '텐트',
    price: 890000,
    priceDisplay: '890,000',
    rating: 4.8,
    reviewCount: 1340,
    imgClass: 'img-product-tent',
    tags: ['2인용', '3시즌', '1.09kg', '프리스탠딩'],
    description: '백패킹 텐트 중 최상급. 1.09kg 믿기 어려운 경량에 넉넉한 내부 공간.',
    buyUrl: 'https://www.bigagnes.com',
    weight: '1.09kg',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo', 'duo'],
      budgets: ['premium'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light'],
    },
  },
  {
    id: 'snow-peak-entry-pack-tt',
    name: 'Snow Peak Entry Pack TT',
    brand: 'Snow Peak',
    category: '텐트',
    price: 398000,
    priceDisplay: '398,000',
    rating: 4.7,
    reviewCount: 2140,
    imgClass: 'img-product-tent',
    tags: ['2인용', '터널형', '설치 쉬움', '이너+쉘'],
    description: '스노우피크 입문 스타터 패키지. 텐트+타프+매트 조합으로 바로 시작 가능.',
    buyUrl: 'https://www.snowpeak.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['duo', 'family'],
      budgets: ['mid'],
      seasons: ['spring_fall', 'summer'],
      priorities: ['convenient', 'value'],
    },
  },
  {
    id: 'coleman-sundome-4',
    name: 'Coleman Sundome 4인용',
    brand: 'Coleman',
    category: '텐트',
    price: 178000,
    priceDisplay: '178,000',
    rating: 4.5,
    reviewCount: 5420,
    imgClass: 'img-product-tent',
    tags: ['4인용', '돔형', '3시즌', '입문용'],
    description: '전 세계 베스트셀러. 가족 캠핑 첫 텐트로 검증된 가성비 끝판왕.',
    buyUrl: 'https://www.coleman.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['family', 'large'],
      budgets: ['low', 'mid'],
      seasons: ['spring_fall', 'summer'],
      priorities: ['value', 'convenient'],
    },
  },
  {
    id: 'naturehike-cloud-up-3',
    name: 'Naturehike Cloud-Up 3',
    brand: 'Naturehike',
    category: '텐트',
    price: 169000,
    priceDisplay: '169,000',
    rating: 4.4,
    reviewCount: 3890,
    imgClass: 'img-product-tent',
    tags: ['3인용', '경량 2.3kg', '가성비', '더블월'],
    description: '중국 최대 아웃도어 브랜드의 가성비 경량 텐트. 입문자에게 최적.',
    buyUrl: 'https://www.naturehike.com',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo', 'duo', 'family'],
      budgets: ['low'],
      seasons: ['spring_fall', 'summer'],
      priorities: ['value', 'light'],
    },
  },
  {
    id: 'hilleberg-niak',
    name: 'Hilleberg Niak',
    brand: 'Hilleberg',
    category: '텐트',
    price: 1480000,
    priceDisplay: '1,480,000',
    rating: 5.0,
    reviewCount: 340,
    imgClass: 'img-product-tent',
    tags: ['1인용', '4시즌', '1.8kg', '스웨덴製'],
    description: '극지 탐험에도 쓰이는 스웨덴 힐레베르그. 악천후 0순위 선택지.',
    buyUrl: 'https://www.hilleberg.com',
    weight: '1.8kg',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo'],
      budgets: ['premium'],
      seasons: ['winter', 'all'],
      priorities: ['durable'],
    },
  },

  // ── 침낭 ──────────────────────────────────────────────────────────────
  {
    id: 'western-mountaineering-ultralite',
    name: 'Western Mountaineering UltraLite',
    brand: 'Western Mountaineering',
    category: '침낭',
    price: 760000,
    priceDisplay: '760,000',
    rating: 4.9,
    reviewCount: 980,
    imgClass: 'img-product-bag',
    tags: ['머미형', '850필파워', '±10°C', '850g'],
    description: '미국 최고급 침낭 브랜드. 850+ 필파워 구스다운으로 가볍고 따뜻함 압도.',
    buyUrl: 'https://www.westernmountaineering.com',
    weight: '850g',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo', 'duo'],
      budgets: ['premium'],
      seasons: ['winter', 'all'],
      priorities: ['light', 'durable'],
    },
  },
  {
    id: 'snow-peak-ofuton-wide-lx',
    name: 'Snow Peak Ofuton Wide LX',
    brand: 'Snow Peak',
    category: '침낭',
    price: 389000,
    priceDisplay: '389,000',
    rating: 4.8,
    reviewCount: 1560,
    imgClass: 'img-product-bag',
    tags: ['이불형', '두 개 연결', '0°C', '가족용'],
    description: '캠핑용 이불 침낭의 원조. 2개 연결해 커플·가족 함께 사용 가능.',
    buyUrl: 'https://www.snowpeak.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['duo', 'family'],
      budgets: ['high'],
      seasons: ['spring_fall', 'all'],
      priorities: ['convenient', 'durable'],
    },
  },
  {
    id: 'marmot-trestles-elite-eco-20',
    name: 'Marmot Trestles Elite Eco 20',
    brand: 'Marmot',
    category: '침낭',
    price: 220000,
    priceDisplay: '220,000',
    rating: 4.6,
    reviewCount: 2230,
    imgClass: 'img-product-bag',
    tags: ['머미형', '-6°C', '재생소재', '3시즌'],
    description: '재활용 소재로 만든 친환경 하이킹 침낭. 합리적 가격의 정석.',
    buyUrl: 'https://www.marmot.com',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo', 'duo'],
      budgets: ['mid'],
      seasons: ['spring_fall', 'winter'],
      priorities: ['value', 'light'],
    },
  },
  {
    id: 'sea-to-summit-spark-sp2',
    name: 'Sea to Summit Spark SP2',
    brand: 'Sea to Summit',
    category: '침낭',
    price: 460000,
    priceDisplay: '460,000',
    rating: 4.7,
    reviewCount: 870,
    imgClass: 'img-product-bag',
    tags: ['초경량 332g', '여름용', '+9°C', '울트라드라이'],
    description: '332g 극초경량. 여름 백패킹 최강 선택지. 수분저항 RDS 구스다운.',
    buyUrl: 'https://www.seatosummit.com',
    weight: '332g',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo'],
      budgets: ['high'],
      seasons: ['summer'],
      priorities: ['light'],
    },
  },

  // ── 버너·쿠킹 ─────────────────────────────────────────────────────────
  {
    id: 'msr-pocketrocket-2',
    name: 'MSR PocketRocket 2',
    brand: 'MSR',
    category: '버너',
    price: 78000,
    priceDisplay: '78,000',
    rating: 4.8,
    reviewCount: 6240,
    imgClass: 'img-product-stove',
    tags: ['74g', '가스버너', '초경량', '백패킹 필수'],
    description: '백패킹 버너의 표준. 74g, 주먹 반만한 크기. 신뢰성 압도적.',
    buyUrl: 'https://www.msrgear.com',
    weight: '74g',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo', 'duo'],
      budgets: ['low', 'mid'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light', 'value'],
    },
  },
  {
    id: 'snow-peak-gigapower-auto',
    name: 'Snow Peak GigaPower Auto',
    brand: 'Snow Peak',
    category: '버너',
    price: 108000,
    priceDisplay: '108,000',
    rating: 4.9,
    reviewCount: 3890,
    imgClass: 'img-product-stove',
    tags: ['자동점화', '115g', '수직·수평 가스 사용', '바람막이'],
    description: '자동 점화 탑재. 스노우피크 대표 버너로 오토캠핑에서 최다 사용.',
    buyUrl: 'https://www.snowpeak.com',
    weight: '115g',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['solo', 'duo', 'family'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['convenient', 'durable'],
    },
  },
  {
    id: 'kovea-alpine-master-2',
    name: 'Kovea Alpine Master 2.0',
    brand: 'Kovea',
    category: '버너',
    price: 118000,
    priceDisplay: '118,000',
    rating: 4.8,
    reviewCount: 2760,
    imgClass: 'img-product-stove',
    tags: ['4,200kcal/h', '일체형', '강풍·저온', '한국산'],
    description: '한국 코베아 대표작. 강풍·저온에서도 안정적. 캠핑 버너 국민템.',
    buyUrl: 'https://www.kovea.com',
    matchTags: {
      styles: ['auto', 'backpacking'],
      groups: ['solo', 'duo', 'family'],
      budgets: ['mid'],
      seasons: ['winter', 'all'],
      priorities: ['durable', 'value'],
    },
  },
  {
    id: 'coleman-classic-2-burner',
    name: 'Coleman Classic 2-Burner',
    brand: 'Coleman',
    category: '쿠킹',
    price: 148000,
    priceDisplay: '148,000',
    rating: 4.7,
    reviewCount: 8920,
    imgClass: 'img-product-stove',
    tags: ['2구', '20,000BTU', '오토캠핑', '가족용'],
    description: '오토캠핑·단체 캠핑 필수템. 두 개 화구로 동시 요리 가능.',
    buyUrl: 'https://www.coleman.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['family', 'large'],
      budgets: ['low', 'mid'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['convenient', 'value'],
    },
  },

  // ── 의자 ──────────────────────────────────────────────────────────────
  {
    id: 'helinox-chair-one',
    name: 'Helinox Chair One',
    brand: 'Helinox',
    category: '의자',
    price: 219000,
    priceDisplay: '219,000',
    rating: 4.9,
    reviewCount: 5640,
    imgClass: 'img-product-chair',
    tags: ['890g', '폴딩', 'DAC 알루미늄', '캠핑 의자 최강'],
    description: '캠핑 의자의 기준. 890g으로 등에 메고 어디든. 한국 브랜드 자랑.',
    buyUrl: 'https://www.helinox.com',
    weight: '890g',
    matchTags: {
      styles: ['backpacking', 'auto', 'glamping'],
      groups: ['solo', 'duo', 'family'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer', 'winter', 'all'],
      priorities: ['light', 'durable'],
    },
  },
  {
    id: 'helinox-chair-zero',
    name: 'Helinox Chair Zero',
    brand: 'Helinox',
    category: '의자',
    price: 189000,
    priceDisplay: '189,000',
    rating: 4.8,
    reviewCount: 3210,
    imgClass: 'img-product-chair',
    tags: ['490g', '극초경량', '백패킹', '최소화'],
    description: '490g. 헬리녹스 라인업 중 가장 가벼운 의자. 1그램이 아쉬운 백패커용.',
    buyUrl: 'https://www.helinox.com',
    weight: '490g',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light'],
    },
  },
  {
    id: 'snow-peak-low-chair',
    name: 'Snow Peak Low Chair Short',
    brand: 'Snow Peak',
    category: '의자',
    price: 195000,
    priceDisplay: '195,000',
    rating: 4.7,
    reviewCount: 2080,
    imgClass: 'img-product-chair',
    tags: ['로우 타입', '알루미늄', '감성 캠핑', '접이식'],
    description: '낮은 좌석으로 모닥불 옆에서 가장 편안한 자세. 감성캠핑 필수템.',
    buyUrl: 'https://www.snowpeak.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['duo', 'family'],
      budgets: ['high'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['convenient', 'durable'],
    },
  },

  // ── 랜턴 ──────────────────────────────────────────────────────────────
  {
    id: 'goal-zero-lighthouse-600',
    name: 'Goal Zero Lighthouse 600',
    brand: 'Goal Zero',
    category: '랜턴',
    price: 195000,
    priceDisplay: '195,000',
    rating: 4.8,
    reviewCount: 3450,
    imgClass: 'img-product-lamp',
    tags: ['600루멘', 'USB충전', '핸드크랭크', '방수'],
    description: '충전·수동발전 겸용. USB로 스마트폰도 충전. 2023 아웃도어 어워드 수상.',
    buyUrl: 'https://www.goalzero.com',
    matchTags: {
      styles: ['auto', 'backpacking', 'glamping'],
      groups: ['solo', 'duo', 'family'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer', 'winter', 'all'],
      priorities: ['convenient', 'durable'],
    },
  },
  {
    id: 'snow-peak-gigapower-lantern',
    name: 'Snow Peak GigaPower Lantern Auto',
    brand: 'Snow Peak',
    category: '랜턴',
    price: 156000,
    priceDisplay: '156,000',
    rating: 4.9,
    reviewCount: 2180,
    imgClass: 'img-product-lamp',
    tags: ['가스', '220루멘', '자동점화', '맨틀 감성'],
    description: '맨틀 불꽃의 감성은 다른 어떤 조명도 따라올 수 없다. 오토캠핑의 상징.',
    buyUrl: 'https://www.snowpeak.com',
    matchTags: {
      styles: ['auto', 'glamping'],
      groups: ['duo', 'family'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer'],
      priorities: ['durable', 'convenient'],
    },
  },
  {
    id: 'black-diamond-orbit',
    name: 'Black Diamond Orbit Lantern',
    brand: 'Black Diamond',
    category: '랜턴',
    price: 72000,
    priceDisplay: '72,000',
    rating: 4.6,
    reviewCount: 4320,
    imgClass: 'img-product-lamp',
    tags: ['200루멘', 'USB-C충전', '접이식', '경량 130g'],
    description: '130g 경량에 3가지 밝기 조절. 백패킹·자전거 캠핑 최적.',
    buyUrl: 'https://www.blackdiamondequipment.com',
    weight: '130g',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo', 'duo'],
      budgets: ['low', 'mid'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light', 'value'],
    },
  },

  // ── 매트 ──────────────────────────────────────────────────────────────
  {
    id: 'thermarest-z-lite-sol',
    name: 'Therm-a-Rest Z Lite Sol',
    brand: 'Therm-a-Rest',
    category: '매트',
    price: 89000,
    priceDisplay: '89,000',
    rating: 4.7,
    reviewCount: 7640,
    imgClass: 'img-product-bag',
    tags: ['폼매트', '410g', '내구성 최강', 'R값 2.0'],
    description: '찢어지지 않는 폼 매트의 교과서. 30년간 변함없는 베스트셀러.',
    buyUrl: 'https://www.thermarest.com',
    weight: '410g',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo'],
      budgets: ['low'],
      seasons: ['spring_fall', 'summer'],
      priorities: ['durable', 'value'],
    },
  },
  {
    id: 'thermarest-neoair-xtherm-nxt',
    name: 'Therm-a-Rest NeoAir XTherm NXT',
    brand: 'Therm-a-Rest',
    category: '매트',
    price: 460000,
    priceDisplay: '460,000',
    rating: 4.9,
    reviewCount: 1340,
    imgClass: 'img-product-bag',
    tags: ['인플레이터블', 'R값 7.3', '430g', '4시즌'],
    description: '백패킹 인플레이터블 매트 세계 최고. R값 7.3으로 겨울 설지도 OK.',
    buyUrl: 'https://www.thermarest.com',
    weight: '430g',
    matchTags: {
      styles: ['backpacking'],
      groups: ['solo'],
      budgets: ['premium'],
      seasons: ['winter', 'all'],
      priorities: ['light', 'durable'],
    },
  },
  {
    id: 'nemo-tensor-regular',
    name: 'NEMO Tensor Regular',
    brand: 'NEMO',
    category: '매트',
    price: 235000,
    priceDisplay: '235,000',
    rating: 4.8,
    reviewCount: 2180,
    imgClass: 'img-product-bag',
    tags: ['인플레이터블', 'R값 3.5', '410g', '3시즌'],
    description: '소음 없는 배플 구조. 자다가 바스락거리지 않는 혁신적인 설계.',
    buyUrl: 'https://www.nemoequipment.com',
    weight: '410g',
    matchTags: {
      styles: ['backpacking', 'auto'],
      groups: ['solo', 'duo'],
      budgets: ['mid', 'high'],
      seasons: ['spring_fall', 'summer', 'all'],
      priorities: ['light', 'convenient'],
    },
  },
];

export const vehicleProducts: VehicleProduct[] = [
  // ── 카라반 ────────────────────────────────────────────────────────────
  {
    id: 'airstream-bambi-16rb',
    name: 'Airstream Bambi 16RB (2024)',
    brand: 'Airstream',
    type: '카라반',
    price: 68000000,
    priceDisplay: '6,800만원~',
    rentalPerNight: 320000,
    rentalDisplay: '32만원~/박',
    capacity: 2,
    length: '4.87m',
    beds: 1,
    rating: 4.9,
    reviewCount: 156,
    imgClass: 'img-caravan-luxury',
    country: '🇺🇸 미국',
    features: ['에어컨', '히터', '주방', '욕실', '퀸베드'],
    description: '에어스트림 엔트리 모델. 알루미늄 쉘의 아이코닉한 실루엣. 2인 여행에 완벽한 컴팩트 럭셔리.',
    matchTags: {
      groups: ['duo'],
      budgets: ['premium'],
      priorities: ['durable', 'convenient'],
    },
  },
  {
    id: 'airstream-flying-cloud-25fb',
    name: 'Airstream Flying Cloud 25FB (2024)',
    brand: 'Airstream',
    type: '카라반',
    price: 98000000,
    priceDisplay: '9,800만원~',
    rentalPerNight: 450000,
    rentalDisplay: '45만원~/박',
    capacity: 4,
    length: '7.62m',
    beds: 2,
    rating: 5.0,
    reviewCount: 98,
    imgClass: 'img-caravan-luxury',
    country: '🇺🇸 미국',
    features: ['에어컨', '히터', '풀키친', '욕실', '퀸베드', '번크베드'],
    description: '에어스트림 패밀리 플래그십. 퀸베드+번크베드로 가족 4인 완벽 수용. 캠핑카의 롤스로이스.',
    matchTags: {
      groups: ['family', 'large'],
      budgets: ['premium'],
      priorities: ['durable', 'convenient'],
    },
  },
  {
    id: 'knaus-sport-400-qd',
    name: 'Knaus Sport & Fun 400 QD (2024)',
    brand: 'Knaus',
    type: '카라반',
    price: 52000000,
    priceDisplay: '5,200만원~',
    rentalPerNight: 220000,
    rentalDisplay: '22만원~/박',
    capacity: 4,
    length: '6.80m',
    beds: 2,
    rating: 4.7,
    reviewCount: 234,
    imgClass: 'img-caravan-luxury',
    country: '🇩🇪 독일',
    features: ['에어컨', '히터', '주방', '욕실', '더블베드', '번크베드'],
    description: '독일 크나우스 2024 신형. 유럽에서 가장 많이 팔린 카라반 브랜드. 품질·가격 최적 균형.',
    matchTags: {
      groups: ['family'],
      budgets: ['high', 'premium'],
      priorities: ['durable', 'convenient'],
    },
  },
  {
    id: 'fendt-bianco-selection-390',
    name: 'Fendt Bianco Selection 390 SFB',
    brand: 'Fendt Caravan',
    type: '카라반',
    price: 58000000,
    priceDisplay: '5,800만원~',
    rentalPerNight: 250000,
    rentalDisplay: '25만원~/박',
    capacity: 4,
    length: '7.30m',
    beds: 2,
    rating: 4.8,
    reviewCount: 187,
    imgClass: 'img-caravan-luxury',
    country: '🇩🇪 독일',
    features: ['에어컨', '히터', '풀키친', '욕실', '더블베드', '파노라마창'],
    description: '독일 펜트 카라반. 파노라마 창으로 자연을 실내에서도 만끽. 프리미엄 독일 장인정신.',
    matchTags: {
      groups: ['duo', 'family'],
      budgets: ['high', 'premium'],
      priorities: ['durable', 'convenient'],
    },
  },

  // ── 캠핑카 ────────────────────────────────────────────────────────────
  {
    id: 'vw-california-ocean-t61',
    name: 'VW California Ocean T6.1 (2023)',
    brand: 'Volkswagen',
    type: '캠핑카',
    price: 78000000,
    priceDisplay: '7,800만원~',
    rentalPerNight: 280000,
    rentalDisplay: '28만원~/박',
    capacity: 4,
    length: '4.90m',
    beds: 2,
    rating: 4.9,
    reviewCount: 312,
    imgClass: 'img-caravan-van',
    country: '🇩🇪 독일',
    features: ['팝업루프', '2단침대', '주방', '냉장고', '히터', '4WD 옵션'],
    description: '폭스바겐코리아 공식 판매. 팝업 루프로 2단 침대. 일상과 캠핑을 자유롭게 오가는 아이콘.',
    matchTags: {
      groups: ['duo', 'family'],
      budgets: ['premium'],
      priorities: ['convenient', 'durable'],
    },
  },
  {
    id: 'mercedes-marco-polo-horizon',
    name: 'Mercedes-Benz Marco Polo Horizon',
    brand: 'Mercedes-Benz',
    type: '캠핑카',
    price: 95000000,
    priceDisplay: '9,500만원~',
    rentalPerNight: 380000,
    rentalDisplay: '38만원~/박',
    capacity: 4,
    length: '5.14m',
    beds: 2,
    rating: 4.9,
    reviewCount: 198,
    imgClass: 'img-caravan-van',
    country: '🇩🇪 독일',
    features: ['팝업루프', '2단침대', '주방', '냉장고', '히터', 'MBUX'],
    description: '메르세데스-벤츠 코리아 공식 판매. MBUX 인포테인먼트와 최고급 마감재. 캠핑카 최정점.',
    matchTags: {
      groups: ['duo', 'family'],
      budgets: ['premium'],
      priorities: ['convenient', 'durable'],
    },
  },
  {
    id: 'hyundai-staria-lounge-camper',
    name: '현대 스타리아 라운지 캠퍼 (2022)',
    brand: 'Hyundai',
    type: '캠핑카',
    price: 47000000,
    priceDisplay: '4,700만원~',
    rentalPerNight: 180000,
    rentalDisplay: '18만원~/박',
    capacity: 4,
    length: '5.25m',
    beds: 2,
    rating: 4.7,
    reviewCount: 876,
    imgClass: 'img-caravan-van',
    country: '🇰🇷 한국',
    features: ['팝업루프', '폴딩침대', '냉장고', '싱크대', '에어컨', '전동도어'],
    description: '현대차 공식 캠핑카. 스타리아 기반으로 일상과 캠핑 겸용. 국산차 특유의 A/S망.',
    matchTags: {
      groups: ['family', 'duo'],
      budgets: ['high'],
      priorities: ['convenient', 'value'],
    },
  },
  {
    id: 'ford-transit-nugget-active',
    name: 'Ford Transit Custom Nugget Active (Westfalia)',
    brand: 'Ford × Westfalia',
    type: '캠핑카',
    price: 82000000,
    priceDisplay: '8,200만원~',
    rentalPerNight: 300000,
    rentalDisplay: '30만원~/박',
    capacity: 4,
    length: '4.97m',
    beds: 2,
    rating: 4.8,
    reviewCount: 234,
    imgClass: 'img-caravan-van',
    country: '🇩🇪 독일',
    features: ['팝업루프', '2단침대', '주방', '냉장고', '히터', '솔라패널'],
    description: '포드와 웨스트팔리아 콜라보. 솔라패널 기본 탑재로 외부 전기 없이도 자립 가능.',
    matchTags: {
      groups: ['duo', 'family'],
      budgets: ['premium'],
      priorities: ['durable', 'convenient'],
    },
  },

  // ── 밴캠퍼 ────────────────────────────────────────────────────────────
  {
    id: 'hyundai-solati-camper',
    name: '현대 쏠라티 캠핑카 (정식 컨버전)',
    brand: 'Hyundai',
    type: '밴캠퍼',
    price: 72000000,
    priceDisplay: '7,200만원~',
    rentalPerNight: 230000,
    rentalDisplay: '23만원~/박',
    capacity: 4,
    length: '5.92m',
    beds: 2,
    rating: 4.8,
    reviewCount: 423,
    imgClass: 'img-caravan-rv',
    country: '🇰🇷 한국',
    features: ['에어컨', '히터', '주방', '욕실', '고정침대', '태양광'],
    description: '국내에서 가장 많이 팔린 캠핑카 베이스. 쏠라티 컨버전으로 넓은 공간 확보.',
    matchTags: {
      groups: ['family', 'duo'],
      budgets: ['high', 'premium'],
      priorities: ['convenient', 'durable'],
    },
  },
];

export function scoreGear(product: GearProduct, answers: QuizAnswers): number {
  let score = 0;
  if (product.matchTags.styles.includes(answers.style)) score += 3;
  if (product.matchTags.groups.includes(answers.group)) score += 2;
  if (product.matchTags.budgets.includes(answers.budget)) score += 2;
  if (product.matchTags.seasons.includes(answers.season)) score += 2;
  if (product.matchTags.priorities.includes(answers.priority)) score += 3;
  return score;
}

export function scoreVehicle(product: VehicleProduct, answers: QuizAnswers): number {
  let score = 0;
  if (product.matchTags.groups.includes(answers.group)) score += 3;
  if (product.matchTags.budgets.includes(answers.budget)) score += 3;
  if (product.matchTags.priorities.includes(answers.priority)) score += 2;
  return score;
}

export function getRecommendations(answers: QuizAnswers) {
  const scoredGear = gearProducts
    .map(p => ({ product: p, score: scoreGear(p, answers) }))
    .filter(x => x.score >= 4)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating);

  const byCategory = new Map<string, GearProduct[]>();
  for (const { product } of scoredGear) {
    const list = byCategory.get(product.category) ?? [];
    if (list.length < 2) list.push(product);
    byCategory.set(product.category, list);
  }
  const topGear = Array.from(byCategory.values()).flat().slice(0, 8);

  const isVehicleSeeker = answers.style === 'caravan';
  const caravans = isVehicleSeeker
    ? vehicleProducts
        .filter(v => v.type === '카라반')
        .map(p => ({ product: p, score: scoreVehicle(p, answers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(x => x.product)
    : vehicleProducts
        .filter(v => v.type === '카라반')
        .map(p => ({ product: p, score: scoreVehicle(p, answers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map(x => x.product);

  const campervans = vehicleProducts
    .filter(v => v.type === '캠핑카' || v.type === '밴캠퍼')
    .map(p => ({ product: p, score: scoreVehicle(p, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, isVehicleSeeker ? 3 : 2)
    .map(x => x.product);

  return { gear: topGear, caravans, campervans };
}
