(function(){
  const qs = (s)=>document.querySelector(s);
  const today = new Date();
  qs('#dateLabel').textContent = today.toLocaleDateString();

  // === 擴充後的食物資料庫 (新增夜市小吃、湯品、滷味，總計約 200 項) ===
  const foodDatabase = [
    // === 核心主食/基礎 (約 10 項) ===
    {"name": "白飯 (1碗)", "cal": 280}, 
    {"name": "白飯 (半碗)", "cal": 140}, // <-- NEW
    {"name": "糙米飯 (1碗)", "cal": 264}, 
    {"name": "烤地瓜 (中)", "cal": 250},
    {"name": "饅頭 (1個)", "cal": 280}, 
    {"name": "原味吐司 (2片)", "cal": 150},
    
    // === 經典早餐/麵點 (已新增鹹豆漿、飯糰、燒餅油條) ===
    {"name": "水餃 (10顆)", "cal": 450}, 
    {"name": "鍋貼 (5個)", "cal": 350}, 
    {"name": "小籠包 (5個)", "cal": 300},
    {"name": "小籠包 (8顆)", "cal": 450}, 
    {"name": "肉包 (1個)", "cal": 220}, 
    {"name": "鹹豆漿", "cal": 200}, 
    {"name": "飯糰 (傳統)", "cal": 400}, 
    {"name": "燒餅油條 (一份)", "cal": 480}, 
    {"name": "原味蛋餅", "cal": 280},
    {"name": "鮪魚三明治", "cal": 300}, 
    {"name": "肉鬆三明治", "cal": 330}, 
    {"name": "燒肉蛋吐司", "cal": 485}, 
    {"name": "火腿蛋吐司", "cal": 266}, 
    {"name": "鐵板麵 (蘑菇)", "cal": 550},
    {"name": "蘿蔔糕 (2塊)", "cal": 250},
    {"name": "法式吐司 (2片)", "cal": 280},
    
    // === 台灣小吃/夜市精選 (飯類優化) ===
    {"name": "蚵仔煎", "cal": 400}, 
    {"name": "大腸麵線 (小碗)", "cal": 350}, 
    {"name": "肉圓 (1顆, 油炸)", "cal": 280},
    {"name": "肉羹麵 (一碗)", "cal": 520}, 
    {"name": "魷魚羹麵 (一碗)", "cal": 550}, 
    {"name": "當歸鴨麵線", "cal": 480}, 
    {"name": "胡椒餅 (1個)", "cal": 350}, 
    {"name": "臭豆腐 (油炸, 6塊)", "cal": 350},
    {"name": "地瓜球 (小份)", "cal": 300}, 
    {"name": "炸花枝丸 (5顆)", "cal": 320}, 
    {"name": "炸雞排 (不切)", "cal": 600}, 
    {"name": "鹹酥雞 (一小份)", "cal": 450},
    {"name": "甜不辣 (夜市, 一份)", "cal": 380},
    {"name": "雞蛋糕 (3個)", "cal": 200}, 
    {"name": "藥燉排骨 (一碗)", "cal": 450}, 
    {"name": "麻辣臭豆腐", "cal": 380}, 
    {"name": "潤餅 (1捲)", "cal": 350}, 
    {"name": "炒米粉 (小份)", "cal": 320}, 
    {"name": "炒飯 (蝦仁/肉絲)", "cal": 600}, 
    {"name": "炒飯 (飯減半)", "cal": 460}, // <-- NEW (600 - 140 = 460)
    {"name": "炒粿條", "cal": 550}, 
    {"name": "廣東粥", "cal": 300}, 
    {"name": "米糕 (筒仔)", "cal": 260},
    {"name": "碗粿 (1個)", "cal": 280},
    {"name": "滷肉飯 (小碗)", "cal": 450}, 
    {"name": "滷肉飯 (無飯)", "cal": 170}, // <-- NEW (450 - 280 = 170)
    {"name": "雞肉飯 (小碗)", "cal": 400}, 
    {"name": "雞肉飯 (無飯)", "cal": 120}, // <-- NEW (400 - 280 = 120)

    // === 便當類 (優化) ===
    {"name": "排骨飯 (炸/傳統)", "cal": 750}, 
    {"name": "排骨飯 (少飯/飯減半)", "cal": 610}, // <-- NEW (750 - 140 = 610)
    {"name": "排骨飯 (無飯/飯全扣)", "cal": 470}, // <-- NEW (750 - 280 = 470)
    
    {"name": "焢肉飯", "cal": 800}, 
    {"name": "焢肉飯 (少飯/飯減半)", "cal": 660}, // <-- NEW (800 - 140 = 660)
    {"name": "焢肉飯 (無飯/飯全扣)", "cal": 520}, // <-- NEW (800 - 280 = 520)
    
    {"name": "雞腿便當 (炸)", "cal": 800}, 
    {"name": "雞腿便當 (少飯/飯減半)", "cal": 660}, // <-- NEW (800 - 140 = 660)
    {"name": "雞腿便當 (無飯/飯全扣)", "cal": 520}, // <-- NEW (800 - 280 = 520)
    
    {"name": "三寶飯 (燒臘)", "cal": 850}, 
    {"name": "三寶飯 (少飯/飯減半)", "cal": 710}, // <-- NEW (850 - 140 = 710)
    {"name": "三寶飯 (無飯/飯全扣)", "cal": 570}, // <-- NEW (850 - 280 = 570)
    
    {"name": "牛肉麵 (紅燒)", "cal": 550}, 
    {"name": "陽春麵 (湯)", "cal": 280}, 
    {"name": "乾麵 (肉燥)", "cal": 350}, 
    {"name": "乾意麵 (肉燥)", "cal": 420}, 
    {"name": "榨菜肉絲麵 (湯)", "cal": 350}, 
    {"name": "餛飩麵 (湯)", "cal": 400}, 
    {"name": "紅油抄手 (小份)", "cal": 350}, 
    {"name": "麻醬麵 (小碗)", "cal": 480}, 
    {"name": "肉燥飯 (小碗)", "cal": 350}, 
    {"name": "擔仔麵", "cal": 200},
    {"name": "米粉湯", "cal": 250}, 
    {"name": "鍋燒意麵", "cal": 500}, 
    
    // === 湯品/輕食/滷味 (新增約 20 項) ===
    {"name": "貢丸湯 (1碗)", "cal": 150}, 
    {"name": "魚丸湯 (1碗)", "cal": 120}, 
    {"name": "蛋花湯 (1碗)", "cal": 80}, 
    {"name": "酸辣湯 (1碗)", "cal": 180}, 
    {"name": "玉米濃湯 (1碗)", "cal": 200}, 
    {"name": "四神湯", "cal": 220}, 
    {"name": "蛤蜊湯 (1碗)", "cal": 100}, 
    {"name": "燙青菜 (清燙)", "cal": 50},
    {"name": "燙青菜 (加肉燥)", "cal": 150},
    {"name": "滷豆腐 (1塊)", "cal": 100}, 
    {"name": "滷貢丸 (1顆)", "cal": 80},
    {"name": "滷海帶 (1條)", "cal": 20}, 
    {"name": "滷蛋 (1顆)", "cal": 90},
    {"name": "滷豆干 (3塊)", "cal": 150}, 
    {"name": "滷豬頭皮 (小份)", "cal": 200}, 
    {"name": "滷大腸 (小份)", "cal": 250}, 
    {"name": "豬血糕 (1塊)", "cal": 130}, 
    {"name": "皮蛋豆腐", "cal": 180}, 
    
    // === 便利商店輕食/飲品 (約 15 項) ===
    {"name": "7-11 紐奧良烤雞三明治", "cal": 300},
    {"name": "7-11 御飯糰 (鮪魚)", "cal": 220},
    {"name": "7-11 凱薩沙拉", "cal": 200},
    {"name": "7-11 大亨堡 (熱狗+醬)", "cal": 380},
    {"name": "7-11 拿鐵 (大/冰)", "cal": 148}, 
    {"name": "7-11 拿鐵 (特大/冰)", "cal": 220}, 
    {"name": "全家拿鐵 (大/冰)", "cal": 169}, 
    {"name": "全家拿鐵 (特大/冰)", "cal": 289}, 
    {"name": "全家義式肉醬千層麵", "cal": 450},
    {"name": "全家番茄義大利麵", "cal": 400},
    {"name": "茶葉蛋", "cal": 75},

    // === 蛋白質/蔬菜 (約 10 項) ===
    {"name": "無糖豆漿 (500ml)", "cal": 150}, 
    {"name": "雞胸肉 (100g, 水煮)", "cal": 165},
    {"name": "鮭魚 (100g, 烤)", "cal": 208},
    {"name": "豆腐 (100g)", "cal": 76},
    {"name": "荷包蛋 (1顆)", "cal": 70},
    {"name": "水煮蛋 (1顆)", "cal": 78},
    
    // === 點心/飲料/甜品 (新增約 20 項) ===
    {"name": "珍珠奶茶 (大杯)", "cal": 550}, 
    {"name": "全糖果汁 (500ml)", "cal": 250},
    {"name": "可樂 (330ml)", "cal": 140}, 
    {"name": "波霸厚鮮奶", "cal": 600},
    {"name": "檸檬愛玉 (全糖)", "cal": 200}, 
    {"name": "粉圓冰 (一碗)", "cal": 350}, 
    {"name": "豆花 (花生)", "cal": 300}, 
    {"name": "紅豆湯 (一碗)", "cal": 280}, 
    {"name": "炸雞 (1塊)", "cal": 300},
    {"name": "薯條 (小份)", "cal": 230}, 
    {"name": "冰淇淋 (1球)", "cal": 250},
    {"name": "蛋糕 (1塊)", "cal": 380},
    {"name": "可頌麵包 (1個)", "cal": 350},
    {"name": "甜甜圈 (1個)", "cal": 280}, 
    {"name": "巧克力 (1條)", "cal": 200},
    {"name": "蘋果 (1顆)", "cal": 95},
    {"name": "香蕉 (1根)", "cal": 105},
    {"name": "優格 (1杯)", "cal": 150},
    {"name": "泡麵 (1碗)", "cal": 450},
    {"name": "科學麵 (1包)", "cal": 200}, 
    {"name": "茶葉蛋", "cal": 75}
  ];
  // ========================================================


  // localStorage key
  const STATE_KEY = 'calzen-state';
  const MONTHLY_KEY = 'calzen-monthly';
  let state = load();

  // BMR calculation logic
  function calcBmr(gender, age, weight, height){
    if(gender === 'male'){
      // 男：(10 * 體重) + (6.25 * 身高) - (5 * 年齡) + 5
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
    } else {
      // 女：(10 * 體重) + (6.25 * 身高) - (5 * 年齡) - 161
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
    }
  }

  // === 優化後的熱量計算邏輯 (納入體重變數進行計算) ===
  function calcEx(e){ 
    // 獲取體重。從 BMR 計算區塊的體重輸入欄位取得，若無則預設 70kg 進行保守計算。
    // 注意：這裡假設體重輸入欄位的 ID 是 #weightInput，這是從 BMR 區塊的事件監聽器推測而來。
    const weight = parseFloat(qs('#weightInput')?.value) || 70;
    let t = 0;

    if(e.type==='steps'){ 
      // 1. 步數消耗：總步數 * (體重 * 0.00045) 卡 (針對 98kg 進行優化)
      const totalSteps = e.value || 0;
      t += totalSteps * (weight * 0.00045); 
      
      // 2. 超慢跑消耗：分鐘數 * (體重 * 0.062) 卡 (針對 98kg 進行優化)
      if(e.jog) {
        t += e.jog * (weight * 0.062); 
      }
      return Math.round(t); 
    } else return e.value||0; // HIIT 維持不變
  }
  // =============================================

  function calcTotalIntake(){ return state.foods.reduce((sum, f) => sum + (f.cal || 0), 0); }
  function calcTotalBurned(){ return state.exercises.reduce((sum, e) => sum + calcEx(e), 0); }
  function calcTotalExpenditure(){ return (state.bmr || 0) + calcTotalBurned(); }
  function calcDeficit(){ return calcTotalExpenditure() - calcTotalIntake(); }

  // Label generation logic
  function exLabel(e){ 
    if(e.type==='steps') return `總步數 ${e.value.toLocaleString()} 步` + (e.jog?` + 超慢跑 ${e.jog} 分鐘(額外熱量)`:''); 
    return `HIIT (${e.value} 卡)`; 
  }
  function foodLabel(f){ return f.name + ` (${f.cal} 卡)`; }

  // State management
  function load(){
    const stored = localStorage.getItem(STATE_KEY);
    return stored ? JSON.parse(stored) : { bmr: 0, foods: [], exercises: [], monthly: {} };
  }
  function save(){
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }
  
  function updateAndSave(){
    render();
    save();
  }

  // Render functions
  function renderFoods(){
    const list = qs('#foodList');
    list.innerHTML='';
    state.foods.forEach((f, i)=>{
      const tpl = qs('#foodTpl').content.cloneNode(true);
      tpl.querySelector('.name').textContent = f.name;
      tpl.querySelector('.cal').textContent = `${f.cal.toLocaleString()} 卡`;
      const delBtn = tpl.querySelector('.del');
      delBtn.addEventListener('click', ()=>{ state.foods.splice(i, 1); updateAndSave(); });
      list.appendChild(tpl);
    });
  }

  function renderExercises(){
    const list = qs('#exerciseList');
    list.innerHTML='';
    state.exercises.forEach((e, i)=>{
      const tpl = qs('#exTpl').content.cloneNode(true);
      tpl.querySelector('.name').textContent = exLabel(e);
      const burned = calcEx(e);
      tpl.querySelector('.cal').textContent = `${burned.toLocaleString()} 卡`;
      const delBtn = tpl.querySelector('.del');
      delBtn.addEventListener('click', ()=>{ state.exercises.splice(i, 1); updateAndSave(); });
      list.appendChild(tpl);
    });
  }

  function renderStats(){
    const totalIntake = calcTotalIntake();
    const totalBurned = calcTotalBurned();
    const totalExpenditure = calcTotalExpenditure();
    const deficit = calcDeficit();

    qs('#displayIntake').textContent = totalIntake.toLocaleString();
    qs('#totalExpenditure').textContent = totalExpenditure.toLocaleString();
    qs('#bmrLine').textContent = `BMR ${state.bmr.toLocaleString()} + 運動 ${totalBurned.toLocaleString()}`;

    const deficitCard = qs('#deficitCard');
    qs('#deficitValue').textContent = `${deficit > 0 ? '+' : ''}${deficit.toLocaleString()}`;
    
    deficitCard.classList.remove('good', 'bad', 'neutral');
    if(deficit > 0){
      deficitCard.classList.add('good');
      qs('#deficitText').textContent = '✅ 達成熱量赤字！';
    } else {
      deficitCard.classList.add('bad');
      qs('#deficitText').textContent = '❌ 未達熱量赤字';
    }
  }

  function renderMonth(){
    const monthStats = qs('#monthStats');
    monthStats.innerHTML='';
    const keys = Object.keys(state.monthly).sort().reverse();
    if(!keys.length){
      monthStats.innerHTML='<div class="muted">本月還沒有記錄</div>';
      return;
    }
    keys.forEach(k=>{
      const r = state.monthly[k];
      const el = qs('#monthTpl').content.cloneNode(true);
      el.querySelector('strong').textContent = r.date;
      el.querySelector('.muted').textContent = `攝取 ${r.intake.toLocaleString()} 卡 · 消耗 ${r.bmr.toLocaleString()} + ${r.burned.toLocaleString()} 卡`;
      
      const deficitDiv = el.querySelector('.meta div');
      deficitDiv.className = r.deficit > 0 ? 'good' : 'bad';
      deficitDiv.textContent = `${r.deficit > 0 ? '+' : ''}${r.deficit.toLocaleString()} 卡`;
      
      monthStats.appendChild(el);
    });
  }


  function render(){
    qs('#bmrInput').value = state.bmr || '';
    renderFoods();
    renderExercises();
    renderStats();
    renderMonth();
  }
  
  // Initialization and Event Listeners
  render();

  // BMR Calculation Toggle
  qs('#toggleBmrCalc').addEventListener('click', ()=>{
    qs('#bmrCalc').classList.toggle('hidden');
    // Hide results when re-opening calculator
    qs('#calculatedBmr').textContent = '';
  });

  // BMR Auto-calculation
  qs('#bmrCalc').addEventListener('input', ()=>{
    const gender = qs('#gender').value;
    const age = parseInt(qs('#ageInput').value);
    const weight = parseFloat(qs('#weightInput').value);
    const height = parseFloat(qs('#heightInput').value);

    if(age && weight && height){
      const bmr = calcBmr(gender, age, weight, height);
      qs('#calculatedBmr').textContent = `計算結果：${bmr.toLocaleString()} 卡`;
      qs('#calculatedBmr').dataset.bmr = bmr;
      qs('#setBmrBtn').disabled = false;
    } else {
      qs('#calculatedBmr').textContent = '請輸入完整資訊';
      qs('#setBmrBtn').disabled = true;
    }
  });

  // Set BMR from calculated value or direct input
  qs('#setBmrBtn').addEventListener('click', ()=>{
    const calculatedBmr = qs('#calculatedBmr').dataset.bmr;
    if(calculatedBmr){
      state.bmr = parseInt(calculatedBmr);
      updateAndSave();
      qs('#bmrCalc').classList.add('hidden');
    }
  });
  qs('#bmrInput').addEventListener('input', ()=>{
    const bmr = parseInt(qs('#bmrInput').value);
    state.bmr = bmr || 0;
    updateAndSave();
  });


  // Add Food manually
  qs('#addFoodBtn').addEventListener('click', ()=>{
    const name = qs('#foodName').value.trim();
    const cal = parseInt(qs('#foodCal').value);
    if(name && cal > 0){
      state.foods.push({name, cal});
      qs('#foodName').value = '';
      qs('#foodCal').value = '';
      updateAndSave();
    } else {
      alert('請輸入有效的食物名稱和卡路里數');
    }
  });

  // Add Exercise
  qs('#addExBtn').addEventListener('click', ()=>{
    const type = qs('#exType').value;
    const value = parseFloat(qs('#exValue').value);
    const jog = parseFloat(qs('#jogMin').value) || 0;

    if(type === 'steps' && value > 0){
      state.exercises.push({type, value, jog});
      qs('#exValue').value = '';
      qs('#jogMin').value = '';
      updateAndSave();
    } else if (type === 'hiit' && value > 0) {
      state.exercises.push({type, value});
      qs('#exValue').value = '';
      updateAndSave();
    } else {
      alert('請輸入有效的運動數據');
    }
  });


  // Save Daily Record
  qs('#saveBtn').addEventListener('click', ()=>{
    if(state.foods.length === 0){
        alert('請先記錄飲食！');
        return;
    }

    const date = new Date().toLocaleDateString();
    const rec = {date, intake:calcTotalIntake(), burned:calcTotalBurned(), bmr:state.bmr, deficit:calcDeficit(), foods:state.foods, exercises:state.exercises};
    state.monthly[date]=rec; 
    
    // Reset state for the new day after saving
    state.foods = [];
    state.exercises = [];
    
    save(); 
    alert('🌿 今日記錄已儲存'); 
    renderMonth();
    render(); // Re-render to show the new empty state
  });

  // Food Search (優化：清理符號和空格，讓中文搜尋更寬鬆、穩健)
  qs('#searchInput').addEventListener('input', ()=>{ 
    const searchResults = qs('#searchResults'); 
    searchResults.innerHTML=''; 
    
    const qRaw = qs('#searchInput').value.trim(); 
    if(!qRaw) return; 
    
    // 關鍵優化：移除所有空格、半形/全形括號，並轉為小寫
    const qClean = qRaw.replace(/[\s\(\)\（\）\/]/g, '').toLowerCase(); 

    // 篩選出包含關鍵字的食物，最多顯示 10 個結果
    const hits = foodDatabase.filter(f=>{
      // 對資料庫中的名稱也進行相同的清理，以確保準確比對
      const foodNameClean = f.name.replace(/[\s\(\)\（\）\/]/g, '').toLowerCase();
      return foodNameClean.includes(qClean);
    }).slice(0,10); 
    
    hits.forEach(h=>{ 
      const b = document.createElement('button'); 
      b.className='item'; 
      b.innerHTML = `<div>${h.name}</div><div class='meta'><div>${h.cal} 卡</div></div>`; 
      
      b.addEventListener('click', ()=>{ 
        state.foods.push({name:h.name,cal:h.cal}); 
        updateAndSave(); 
        qs('#searchInput').value=''; 
        searchResults.innerHTML=''; 
      }); 
      searchResults.appendChild(b); 
    }); 
  });


  function renderMonth(){ 
    const monthStats = qs('#monthStats'); 
    monthStats.innerHTML=''; 
    const keys = Object.keys(state.monthly).sort().reverse(); 
    if(!keys.length){ 
      monthStats.innerHTML='<div class="muted">本月還沒有記錄</div>'; 
      return; 
    } 
    keys.forEach(k=>{ 
      const r = state.monthly[k]; 
      const el = qs('#monthTpl').content.cloneNode(true);
      el.querySelector('strong').textContent = r.date;
      el.querySelector('.muted').textContent = `攝取 ${r.intake.toLocaleString()} 卡 · 消耗 ${r.bmr.toLocaleString()} + ${r.burned.toLocaleString()} 卡`;
      
      const deficitDiv = el.querySelector('.meta div');
      deficitDiv.className = r.deficit > 0 ? 'good' : 'bad';
      deficitDiv.textContent = `${r.deficit > 0 ? '+' : ''}${r.deficit.toLocaleString()} 卡`;
      
      monthStats.appendChild(el); 
    }); 
  }


})();