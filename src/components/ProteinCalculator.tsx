import React, { useState, useMemo } from 'react';
import { PROTEIN_FOODS, FoodItem } from '../types';
import { Calculator, Utensils, AlertTriangle, HelpCircle, Plus, Minus, Check, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProteinCalculator() {
  const [weight, setWeight] = useState<number>(60);
  const [activity, setActivity] = useState<string>('active');
  const [hasKidneyDisease, setHasKidneyDisease] = useState<boolean>(false);
  const [selectedFoods, setSelectedFoods] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Multiplier options
  const activityLevels = [
    {
      id: 'sedentary',
      label: '久坐 / 輕度活動',
      multiplier: 1.1,
      description: '日常活動少，無運動習慣。銀髮族仍需約 1.1 - 1.2 g/kg 來對抗肌肉老化。'
    },
    {
      id: 'active',
      label: '一般活動 / 規律散步',
      multiplier: 1.3,
      description: '常做輕度家事、慢跑或規律散步者。建議 1.2 - 1.3 g/kg。'
    },
    {
      id: 'resistance',
      label: '規律進行阻力訓練',
      multiplier: 1.5,
      description: '每週配合下肢、上肢肌力鍛鍊者，需要更多原料增肌。建議 1.4 - 1.6 g/kg。'
    }
  ];

  const selectedActivity = activityLevels.find(a => a.id === activity) || activityLevels[1];

  // Calculate daily protein goal
  const dailyProteinGoal = useMemo(() => {
    if (hasKidneyDisease) {
      // CKD standard limit is usually 0.6 - 0.8 g/kg
      return Math.round(weight * 0.8 * 10) / 10;
    }
    return Math.round(weight * selectedActivity.multiplier * 10) / 10;
  }, [weight, selectedActivity.multiplier, hasKidneyDisease]);

  // Recommended protein per meal (assuming 3 equal meals for optimal synthesis)
  const proteinPerMeal = useMemo(() => {
    return Math.round((dailyProteinGoal / 3) * 10) / 10;
  }, [dailyProteinGoal]);

  // Handle adding food
  const handleAddFood = (foodId: string) => {
    setSelectedFoods(prev => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1
    }));
  };

  // Handle removing food
  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(prev => {
      const current = prev[foodId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[foodId];
        return copy;
      }
      return { ...prev, [foodId]: current - 1 };
    });
  };

  const handleClearPlanner = () => {
    setSelectedFoods({});
  };

  // Total protein currently in the meal plan
  const plannedProteinTotal = useMemo(() => {
    return Object.keys(selectedFoods).reduce((sum: number, foodId) => {
      const count = selectedFoods[foodId] || 0;
      const food = PROTEIN_FOODS.find(f => f.id === foodId);
      if (food) {
        return sum + (food.protein * count);
      }
      return sum;
    }, 0);
  }, [selectedFoods]);

  const plannedCaloriesTotal = useMemo(() => {
    return Object.keys(selectedFoods).reduce((sum: number, foodId) => {
      const count = selectedFoods[foodId] || 0;
      const food = PROTEIN_FOODS.find(f => f.id === foodId);
      if (food && food.calories) {
        return sum + (food.calories * count);
      }
      return sum;
    }, 0);
  }, [selectedFoods]);

  const progressPercentage = Math.min(100, Math.round((plannedProteinTotal / dailyProteinGoal) * 100));

  // Filter foods by category
  const filteredFoods = useMemo(() => {
    if (activeCategory === 'all') return PROTEIN_FOODS;
    if (activeCategory === 'plant') {
      return PROTEIN_FOODS.filter(f => f.category === 'soy_beans');
    }
    if (activeCategory === 'animal') {
      return PROTEIN_FOODS.filter(f => f.category === 'meat' || f.category === 'seafood' || f.category === 'egg_dairy');
    }
    return PROTEIN_FOODS;
  }, [activeCategory]);

  return (
    <div className="bg-gradient-to-b from-emerald-50/50 via-white to-white rounded-3xl border-2 border-emerald-100/90 p-6 md:p-8 shadow-sm" id="protein-calculator-panel">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-xs flex-shrink-0 mt-0.5">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">蛋白質攝取量計算與配餐助手</h2>
          <p className="text-base text-slate-500 font-medium mt-1">試算每日黃金蛋白質目標，規劃日常補肌肉健康餐盤</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8" id="calculator-grid">
        {/* Left column: Controls & calculation */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-5" id="calculator-controls">
            {/* Weight input */}
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2 flex justify-between items-center">
                <span>1. 請輸入您的體重</span>
                <span className="text-emerald-600 font-extrabold text-xl">{weight} <span className="text-sm font-medium text-slate-500">公斤 (kg)</span></span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="35"
                  max="110"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  id="weight-slider"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>35 kg</span>
                <span>60 kg</span>
                <span>85 kg</span>
                <span>110 kg</span>
              </div>
            </div>

            {/* Kidney warning toggle */}
            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="chk-kidney"
                  checked={hasKidneyDisease}
                  onChange={(e) => setHasKidneyDisease(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 rounded text-amber-600 focus:ring-amber-500 accent-amber-600"
                />
                <label htmlFor="chk-kidney" className="text-base font-bold text-amber-900 cursor-pointer select-none">
                  您是否患有「慢性腎臟病 (未洗腎)」？
                  <span className="block font-normal text-amber-850 mt-0.5 leading-normal">
                    💡 慢性腎臟病友須採取低蛋白飲食（約 0.6 - 0.8g/kg/day）以減輕腎臟負擔。增肌飲食前請先諮詢腎臟專科醫師與營養師。
                  </span>
                </label>
              </div>
            </div>

            {/* Activity level selection */}
            {!hasKidneyDisease && (
              <div className="space-y-2.5">
                <label className="block text-base font-bold text-slate-700">2. 選擇您的身體活動狀況</label>
                <div className="space-y-2">
                  {activityLevels.map((lvl) => {
                    const isSelected = activity === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setActivity(lvl.id)}
                        className={`w-full text-left p-3 rounded-xl border text-base transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/30 text-emerald-950 ring-1 ring-emerald-500 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                        id={`btn-act-${lvl.id}`}
                      >
                        <div className="flex justify-between font-bold mb-1">
                          <span>{lvl.label}</span>
                          <span className="text-emerald-600">x{lvl.multiplier}倍體重</span>
                        </div>
                        <p className="text-slate-500 font-normal leading-normal">{lvl.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Target Results Display Card */}
          <div className="bg-emerald-950 text-white p-5 rounded-2xl shadow-xs relative overflow-hidden" id="target-result-card">
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <Calculator className="w-40 h-40" />
            </div>
            
            <span className="text-base font-bold tracking-wider text-emerald-300 uppercase block mb-1">
              {hasKidneyDisease ? '⚠️ 腎臟病友限定限制量' : '💡 銀髮防肌少黃金目標'}
            </span>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-4xl font-extrabold text-emerald-300">{dailyProteinGoal}</span>
              <span className="text-base font-bold text-emerald-200">克 (g) / 每日</span>
            </div>

            <div className="border-t border-emerald-800/80 pt-3 space-y-2 text-base">
              <div className="flex justify-between">
                <span className="text-emerald-200/90">每餐平均應攝取：</span>
                <span className="font-extrabold text-emerald-200">{proteinPerMeal} 克</span>
              </div>
              <p className="text-base text-emerald-200/70 leading-normal mt-1">
                💡 <strong>每餐均勻攝取 25 - 30 克</strong> 優質蛋白質，比起一整天集中在某一餐吃，最能活化肌肉合成效率！
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Meal Planner */}
        <div className="xl:col-span-7 flex flex-col space-y-5">
          {/* Progress Bar of Meal Planner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100" id="progress-container">
            <div className="flex flex-col gap-1 text-base mb-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-emerald-600" /> 餐盤蛋白質累積進度
              </span>
              <span className="font-extrabold text-slate-950">
                {plannedProteinTotal} / {dailyProteinGoal} 克 ({progressPercentage}%)
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="bg-emerald-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex flex-col gap-1 text-base text-slate-500 mt-2 sm:flex-row sm:items-center sm:justify-between">
              <span>累積熱量：{plannedCaloriesTotal} 大卡 (kcal)</span>
              {progressPercentage >= 100 ? (
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> 已達標！太棒了！
                </span>
              ) : (
                <span>還差 {Math.max(0, Math.round((dailyProteinGoal - plannedProteinTotal) * 10) / 10)} 克達標</span>
              )}
            </div>
          </div>

          {/* Interactive Planner Layout */}
          <div className="flex-1 border border-slate-100 rounded-2xl overflow-hidden flex flex-col" id="food-selection-module">
            {/* Category tabs */}
            <div className="bg-slate-50 p-2 border-b border-slate-100 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`min-h-12 w-full px-3 py-2.5 text-left text-base font-bold rounded-lg transition-colors sm:text-center ${
                  activeCategory === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                全部優質食材
              </button>
              <button
                onClick={() => setActiveCategory('animal')}
                className={`min-h-12 w-full px-3 py-2.5 text-left text-base font-bold rounded-lg transition-colors sm:text-center ${
                  activeCategory === 'animal' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                動物性蛋白 (吸收率高)
              </button>
              <button
                onClick={() => setActiveCategory('plant')}
                className={`min-h-12 w-full px-3 py-2.5 text-left text-base font-bold rounded-lg transition-colors flex items-center gap-1 sm:justify-center sm:text-center ${
                  activeCategory === 'plant' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-500" /> 植物性蛋白 (低膽固醇)
              </button>
            </div>

            {/* Food Grid list */}
            <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3" id="foods-grid-list">
              {filteredFoods.map((food) => {
                const count = selectedFoods[food.id] || 0;
                return (
                  <div 
                    key={food.id}
                    className={`min-w-0 p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors sm:items-center ${
                      count > 0 ? 'bg-emerald-50/20 border-emerald-200' : 'bg-white border-slate-150 hover:border-slate-250'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="text-2xl" role="img" aria-label={food.name}>{food.icon}</span>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-slate-800">{food.name}</h4>
                        <p className="text-base text-slate-500 mt-0.5">
                          一份 {food.servingSize} ‧ <span className="text-slate-600 font-semibold">{food.protein}g 蛋白質</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                      {count > 0 && (
                        <>
                          <button
                            onClick={() => handleRemoveFood(food.id)}
                            className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                            title="減少一份"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-extrabold text-emerald-700 w-4 text-center">{count}</span>
                        </>
                      )}
                      <button
                        onClick={() => handleAddFood(food.id)}
                        className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-700 transition-colors cursor-pointer"
                        title="增加一份"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Summary Footer */}
            {Object.keys(selectedFoods).length > 0 && (
              <div className="bg-slate-50 p-3 border-t border-slate-100 flex flex-col items-start justify-between gap-3 text-base sm:flex-row sm:items-center" id="planner-cart-summary">
                <div className="text-slate-600 leading-relaxed">
                  已選：
                  {Object.entries(selectedFoods).map(([foodId, count]) => {
                    const food = PROTEIN_FOODS.find(f => f.id === foodId);
                    return food ? `${food.name} x${count} ` : '';
                  })}
                </div>
                <button
                  onClick={handleClearPlanner}
                  className="min-h-11 rounded-lg border border-rose-200 bg-white px-4 py-2 text-base font-bold text-rose-700 hover:bg-rose-50 hover:text-rose-900 flex-shrink-0 cursor-pointer"
                >
                  清空餐盤
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
