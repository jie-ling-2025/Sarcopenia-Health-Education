export interface QuestionnaireQuestion {
  id: string;
  category: string;
  text: string;
  options: {
    label: string;
    score: number;
    description: string;
  }[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'meat' | 'seafood' | 'egg_dairy' | 'soy_beans' | 'others';
  protein: number; // protein in grams
  servingSize: string; // e.g. "100g", "1顆"
  calories: number; // optional calories
  icon: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  target: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string[];
  reps: string;
  sets: string;
  safetyTips: string[];
  durationSeconds: number; // timer default
}

export const SARC_F_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'strength',
    category: '肌肉力量 (Strength)',
    text: '當您提起或搬運 10 磅（約 4.5 公斤，如一大包米或兩大瓶水）的重物時，您會感到困難嗎？',
    options: [
      { label: '完全不困難', score: 0, description: '能輕鬆提起與搬運重物' },
      { label: '有些困難', score: 1, description: '提起時需要稍微用力，感到些微吃力' },
      { label: '非常困難 / 無法完成', score: 2, description: '幾乎無法提起，或必須尋求協助' }
    ]
  },
  {
    id: 'walking',
    category: '行走輔助 (Assistance in walking)',
    text: '您在步行通過一個房間（約 4-5 公尺）時，會感到困難嗎？是否需要使用拐杖、助行器或扶著家具？',
    options: [
      { label: '完全不困難', score: 0, description: '行走自如，不需要任何輔助工具' },
      { label: '有些困難', score: 1, description: '能獨立走完但感到吃力，或速度較慢' },
      { label: '非常困難 / 需要輔助或無法完成', score: 2, description: '需要使用助行器、拐杖，或必須有人扶持' }
    ]
  },
  {
    id: 'chair_rise',
    category: '椅子起立 (Rise from a chair)',
    text: '當您從椅子或床上站起來時，您會感到困難嗎？是否需要用手大力支撐或需要旁人協助？',
    options: [
      { label: '完全不困難', score: 0, description: '能輕鬆流暢地站起' },
      { label: '有些困難', score: 1, description: '需要用雙手撐住扶手，或起立過程有些吃力' },
      { label: '非常困難 / 無法完成', score: 2, description: '需要旁人拉一把，或者多次嘗試才能勉強站起' }
    ]
  },
  {
    id: 'stair_climbing',
    category: '爬樓梯 (Climb stairs)',
    text: '您在爬上一層樓梯（約 10 階）時，會感到困難嗎？',
    options: [
      { label: '完全不困難', score: 0, description: '可以順暢地爬完十階樓梯' },
      { label: '有些困難', score: 1, description: '需要抓著扶手慢慢爬，中途需要休息' },
      { label: '非常困難 / 無法完成', score: 2, description: '膝蓋或體力無法支撐，無法完成爬樓梯' }
    ]
  },
  {
    id: 'falls',
    category: '跌倒次數 (Falls)',
    text: '在過去的一年裡，您總共跌倒過幾次？',
    options: [
      { label: '0 次', score: 0, description: '過去一年沒有跌倒紀錄' },
      { label: '1 - 3 次', score: 1, description: '偶有失去平衡跌倒的情況' },
      { label: '4 次或以上', score: 2, description: '頻繁跌倒，可能平衡能力或肌力顯著衰退' }
    ]
  }
];

export const PROTEIN_FOODS: FoodItem[] = [
  { id: 'chicken_breast', name: '雞胸肉', category: 'meat', protein: 31, servingSize: '100g', calories: 165, icon: '🍗' },
  { id: 'beef_loin', name: '牛肉 (里肌)', category: 'meat', protein: 26, servingSize: '100g', calories: 180, icon: '🥩' },
  { id: 'pork_loin', name: '豬里肌肉', category: 'meat', protein: 25, servingSize: '100g', calories: 155, icon: '🍖' },
  { id: 'salmon', name: '鮭魚排', category: 'seafood', protein: 22, servingSize: '100g', calories: 206, icon: '🐟' },
  { id: 'shrimp', name: '鮮蝦', category: 'seafood', protein: 20, servingSize: '100g', calories: 99, icon: '🍤' },
  { id: 'egg', name: '水煮蛋 / 雞蛋', category: 'egg_dairy', protein: 7, servingSize: '1顆 (大)', calories: 75, icon: '🥚' },
  { id: 'greek_yogurt', name: '無糖希臘優格', category: 'egg_dairy', protein: 10, servingSize: '100g', calories: 95, icon: '🍧' },
  { id: 'milk', name: '全脂鮮乳', category: 'egg_dairy', protein: 8, servingSize: '240ml (一杯)', calories: 150, icon: '🥛' },
  { id: 'firm_tofu', name: '傳統板豆腐', category: 'soy_beans', protein: 8.5, servingSize: '100g', calories: 88, icon: '⬜' },
  { id: 'soy_milk', name: '無糖豆漿', category: 'soy_beans', protein: 7.5, servingSize: '240ml (一杯)', calories: 80, icon: '🥛' },
  { id: 'edamame', name: '水煮毛豆仁', category: 'soy_beans', protein: 12, servingSize: '100g', calories: 125, icon: '🫛' },
  { id: 'black_beans', name: '黑豆 (熟)', category: 'soy_beans', protein: 15, servingSize: '100g', calories: 140, icon: '🫘' }
];

export const RESISTANCE_EXERCISES: ExerciseItem[] = [
  {
    id: 'chair_squat',
    name: '椅子坐站起立訓練',
    target: '大腿前側 (股四頭肌)、臀部肌肉、下肢核心力量',
    difficulty: 'easy',
    description: [
      '選擇一張穩固、不帶輪子的椅子，雙腳與肩同寬平貼地面。',
      '雙手交叉胸前或向前平伸以保持平衡。',
      '吸氣，臀部慢慢往後推，就像要坐下一般，直到臀部輕觸椅面。',
      '呼氣，大腿與臀部用力將身體推回站立姿勢，過程中膝蓋不內夾。'
    ],
    reps: '10 - 12 次',
    sets: '2 - 3 組',
    safetyTips: [
      '若體力不足或平衡不佳，可將雙手扶著桌邊、椅面或前方牆壁進行。',
      '膝蓋應與腳尖方向一致，不要超過腳尖太多或向內塌陷。'
    ],
    durationSeconds: 40
  },
  {
    id: 'wall_push_up',
    name: '安全靠牆伏地挺身訓練',
    target: '胸部肌肉、肩膀前側、上肢與核心穩定度',
    difficulty: 'easy',
    description: [
      '面對穩固的牆壁站立，雙腳距離牆壁約一到兩步距離。',
      '雙手伸直，手掌平貼牆面，寬度略寬於肩膀，高度與肩同高。',
      '吸氣，屈肘，身體保持一直線，慢慢將胸部貼近牆面。',
      '呼氣，手掌用力推牆，將身體推回起始位置。'
    ],
    reps: '8 - 12 次',
    sets: '2 - 3 組',
    safetyTips: [
      '腳底要踩穩，防滑。過程中肚子要微縮，背部不要過度凹陷或拱起。',
      '推牆時動作要平緩，不要用爆發力撞擊關節。'
    ],
    durationSeconds: 40
  },
  {
    id: 'calf_raise',
    name: '站姿提踵 (墊腳尖) 訓練',
    target: '小腿肌群 (腓腸肌、比目魚肌)、腳踝關節穩定性、平衡力',
    difficulty: 'easy',
    description: [
      '站立，雙手扶著穩固的椅背或桌緣，雙腳與肩同寬。',
      '慢慢將腳跟抬起，用腳趾與前腳掌支撐全身重量。',
      '在最高點停留 1-2 秒，感受小腿肌肉收縮。',
      '慢慢將腳跟放回地面，動作保持控制，避免直接重摔。'
    ],
    reps: '12 - 15 次',
    sets: '3 組',
    safetyTips: [
      '務必扶著穩定的家具以防重心不穩跌倒。',
      '抬起與放下的過程要緩慢，不可利用彈性上下晃動。'
    ],
    durationSeconds: 30
  },
  {
    id: 'seated_leg_extension',
    name: '坐姿直膝抬腿訓練',
    target: '大腿前側 (股四頭肌)、關節液循環、膝關節保護力',
    difficulty: 'easy',
    description: [
      '坐在椅子上，背部挺直，雙腳自然垂下貼地，雙手握住椅邊。',
      '單側大腿用力，慢慢將膝蓋打直、抬起一隻腳直到與地面平行。',
      '腳尖朝上勾起，在最高點保持大腿緊繃 3-5 秒。',
      '緩慢放下，換另一隻腳交替進行。'
    ],
    reps: '每側 10 - 12 次',
    sets: '2 - 3 組',
    safetyTips: [
      '背部不要駝背或往後仰，用大腿與核心的力量維持姿勢。',
      '如果想要增加強度，可以綁上輕量沙包或裝滿水的寶特瓶。'
    ],
    durationSeconds: 45
  }
];
