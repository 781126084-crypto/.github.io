const DOW = ["MON / 周一", "TUE / 周二", "WED / 周三", "THU / 周四", "FRI / 周五", "SAT / 周六", "SUN / 周日"];
const deepClone = value => JSON.parse(JSON.stringify(value));

const exerciseBank = {
  "背阔肌 / 大圆肌": ["正面中立握高位下拉", "助力引体向上", "单臂绳索下拉", "直臂绳索下拉"],
  "中下斜方肌 / 菱形肌": ["胸托宽肘划船", "坐姿绳索划船", "T 杆划船", "反向飞鸟"],
  "三角肌中束": ["绳索侧平举", "哑铃侧平举", "器械侧平举"],
  "三角肌后束": ["反向飞鸟", "绳索面拉", "胸托宽肘划船"],
  "上胸锁骨部": ["20°–35°上斜史密斯卧推", "上斜哑铃卧推", "低位向上绳索夹胸"],
  "胸大肌中部": ["平板哑铃卧推", "自由杠铃卧推", "俯卧撑"],
  "股四头肌": ["高脚杯深蹲", "史密斯深蹲", "腿举", "坐姿腿屈伸"],
  "臀大肌 / 臀中肌": ["保加利亚分腿蹲", "臀推", "反向弓步", "绳索后撤弓步"],
  "腘绳肌": ["罗马尼亚硬拉", "坐姿腿弯举", "俯卧腿弯举", "哑铃单腿硬拉"],
  "核心抗旋转 / 抗伸展": ["Pallof Press", "Dead bug", "腹肌轮", "平板支撑"],
  "肱二头肌": ["锤式弯举", "杠铃弯举", "上斜哑铃弯举"],
  "肱三头肌": ["过顶绳索臂屈伸", "绳索下压", "窄距俯卧撑"]
};
const muscleOptions = Object.keys(exerciseBank);

const shoulderMobility = {
  label: "肩颈 / 肩背舒展", duration: "20–25 分钟", reason: "把胸椎转动、肩胛上旋和胸前放松串起来。做完应该更顺，不该更酸。",
  items: [
    {name:"侧卧开书", instruction:"侧躺，双膝弯曲并叠在一起；上侧手臂沿地面向后打开，胸口跟着转，膝盖不要分开。", dose:"每侧 2 组 × 6 次；转到末端停 2 次呼吸"},
    {name:"靠墙滑臂", instruction:"后脑、上背和肋骨轻贴墙，前臂贴墙向上滑；全程不要耸肩，也不要挺腰。", dose:"3 组 × 8 次；每次慢慢上、慢慢下"},
    {name:"门框胸肌拉伸", instruction:"前臂扶门框，手肘略低于肩；身体小步向前，直到胸前轻微牵拉，不要硬压肩头。", dose:"每侧 3 次 × 40 秒；正常呼吸"}
  ]
};
const hipMobility = {
  label: "髋胯舒展与控制", duration: "20–25 分钟", reason: "同时练髋内外旋、放松髋前侧，并用臀桥重新建立骨盆和臀部发力。",
  items: [
    {name:"90/90 坐姿换边", instruction:"坐直，双膝都弯约 90°；双脚尽量留在原地，两侧膝盖一起缓慢倒向另一边，不要用手甩过去。", dose:"3 组 × 每侧 6 次；幅度以骨盆不疼为准"},
    {name:"半跪髋屈肌拉伸", instruction:"一膝跪地，先轻收尾骨并夹紧后侧臀部，再把身体整体向前移动；腰不要向后折。", dose:"每侧 3 次 × 40 秒；只到髋前侧轻拉"},
    {name:"臀桥停顿", instruction:"仰卧屈膝，脚跟放在膝盖下方；先轻收骨盆，再用臀部抬起，顶部不要挺腰。", dose:"3 组 × 12 次；顶部夹臀停 2 秒"}
  ]
};
const fullMobility = {
  label: "全身低强度恢复", duration: "20–30 分钟", reason: "用轻松活动结束一周，帮助身体从训练兴奋切换到恢复，不补课、不追求拉伸极限。",
  items: [
    {name:"轻松散步", instruction:"选择能自然对话的速度，肩膀放松，步幅自然，不把它走成冲刺有氧。", dose:"连续 12–15 分钟"},
    {name:"猫牛式配合呼吸", instruction:"四点跪姿，吸气时胸口向前、骨盆微抬；呼气时缓慢拱背，动作跟着呼吸走。", dose:"2 组 × 6 次完整呼吸"},
    {name:"儿童式侧向伸展", instruction:"臀部向脚跟坐，双手向前；两手再走向一侧，让对侧背阔和腰侧轻微拉开。", dose:"每侧 3 次 × 30 秒"}
  ]
};

const warmups = {
  upper: {
    summary:"先升温，再让胸椎和肩胛恢复顺畅。这样进入下拉、划船或卧推时，更容易用目标肌群而不是耸肩顶颈。",
    items:[["快走或单车 3 分钟","身体微热即可，不制造疲劳。"],["侧卧开书 6 次 / 侧","让胸椎先能转动，减少腰和颈代偿。"],["靠墙滑臂 8 次","检查肩胛能否顺畅上旋且不耸肩。"],["主动作轻重量 2 组","用约正式重量的 40% 和 60% 各做一组。"]]
  },
  lower: {
    summary:"先提高髋膝温度，再确认髋的旋转、深蹲轨迹和髋铰链。目标是让正式组从第一组就稳定。",
    items:[["坡走或单车 3 分钟","髋膝微热即可。"],["90/90 换边 6 次 / 侧","观察左右髋旋转是否差很多。"],["自重深蹲或髋铰链 8 次","找回足底、膝盖和骨盆的轨迹。"],["主动作轻重量 2 组","逐级进入工作重量，不直接上重。"]]
  }
};
const cooldowns = {
  upper: {
    summary:"把训练后最容易紧的胸前、背阔和后肩轻轻拉开，再用慢呼吸降低兴奋度。拉伸不是越疼越有效。",
    items:[["门框胸肌拉伸 30–40 秒 / 侧","缓解胸前紧和肩膀向前缩的感觉。"],["背阔肌侧向拉伸 30–40 秒 / 侧","舒缓腋后侧，保持手臂上举空间。"],["鼻吸口呼 5 次","呼气比吸气略长，让身体切回恢复。"]]
  },
  lower: {
    summary:"轻柔处理髋前侧、臀后侧和小腿，目的是恢复走路和关节活动，不是再制造一次训练刺激。",
    items:[["半跪髋屈肌拉伸 30–40 秒 / 侧","舒缓久坐和腿部训练后的髋前紧张。"],["90/90 前倾 30 秒 / 侧","轻柔舒缓臀后侧，不强压髋关节。"],["小腿墙面拉伸 30 秒 / 侧","恢复踝背屈和走路舒适度。"]]
  }
};

const ex = (muscle, name, sets, reps, rest, cue, why) => ({muscle,name,sets,reps,rest,cue,why});
const dayTemplates = {
  pull: {id:"pull", type:"train", short:"背宽＋肩中后束", focus:"建立 V 形与肩宽", muscles:["背阔肌 / 大圆肌","三角肌中束","三角肌后束","中下斜方肌 / 菱形肌"], why:"背阔制造 V 形，中束扩大正面肩宽，后束和中背补齐侧面、背面的肩部轮廓。", warmup:warmups.upper, cooldown:cooldowns.upper, mobility:shoulderMobility,
    exercises:[ex("背阔肌 / 大圆肌","正面中立握高位下拉",4,"8–12 次",90,"下放慢一点；肘向髋走，颈部保持放松。","建立背宽，不做颈后下拉。"),ex("中下斜方肌 / 菱形肌","胸托宽肘划船",3,"8–12 次",90,"胸口贴稳，拉到顶端停一下，不耸肩。","建立中背层次，同时减少腰部代偿。"),ex("三角肌中束","绳索侧平举",3,"12–20 次",60,"手肘带动，抬到肩高附近，别用斜方肌甩。","直接增加肩宽。"),ex("三角肌后束","反向飞鸟",3,"12–20 次",60,"肩胛保持自然，手臂向两侧打开。","补足后肩轮廓。"),ex("肱二头肌","锤式弯举",2,"10–15 次",60,"上臂固定，慢慢放下。","补手臂连接，不抢背部恢复。")]
  },
  quad: {id:"quad",type:"train",short:"腿前侧＋臀＋核心",focus:"建立下肢比例与骨盆稳定",muscles:["股四头肌","臀大肌 / 臀中肌","腘绳肌","核心抗旋转 / 抗伸展"],why:"深蹲和单腿动作维持整体比例；腿弯举补足过去缺少的屈膝训练，核心帮助骨盆保持稳定。",warmup:warmups.lower,cooldown:cooldowns.lower,mobility:hipMobility,
    exercises:[ex("股四头肌","史密斯深蹲",4,"8–10 次",120,"下蹲慢一点，膝盖跟脚尖方向一致。","稳定建立腿前侧和臀部力量。"),ex("臀大肌 / 臀中肌","保加利亚分腿蹲",3,"8–10 次 / 侧",90,"前脚踩稳，身体略前倾，左右都做同样幅度。","提高单腿和骨盆稳定。"),ex("股四头肌","腿举",3,"10–15 次",90,"臀部不离开靠垫，膝盖不要锁死。","增加下肢有效训练量。"),ex("腘绳肌","坐姿腿弯举",3,"10–15 次",75,"卷到底停一下，再慢慢伸直。","补足腿后侧屈膝功能。"),ex("核心抗旋转 / 抗伸展","Pallof Press",3,"8–12 次 / 侧",45,"推出后停 2 秒，身体不要被绳索拉转。","建立腹部抗旋转能力。")]
  },
  push: {id:"push",type:"train",short:"上胸＋肩＋中背",focus:"建立上胸高度与肩背立体感",muscles:["上胸锁骨部","三角肌中束","三角肌后束","中下斜方肌 / 菱形肌","肱三头肌"],why:"上胸填补锁骨下方，中束增加肩宽；穿插中背动作，让肩胛稳定而不是整堂课都向前推。",warmup:warmups.upper,cooldown:cooldowns.upper,mobility:hipMobility,
    exercises:[ex("上胸锁骨部","20°–35°上斜史密斯卧推",4,"6–10 次",120,"下放到上胸附近，肩膀别耸；推起时不要弹。","主攻上胸，角度过高会更偏前三角。"),ex("上胸锁骨部","低位向上绳索夹胸",3,"12–15 次",60,"双手向斜上方合拢，顶端夹胸停一下。","补上胸缩短位刺激。"),ex("中下斜方肌 / 菱形肌","胸托宽肘划船",3,"10–15 次",75,"胸口贴稳，肘略向外，顶端停一下。","让中背和后肩保持层次。"),ex("三角肌中束","哑铃侧平举",3,"12–20 次",60,"重量宁轻勿甩，肩膀始终远离耳朵。","本周第二次肩宽刺激。"),ex("肱三头肌","过顶绳索臂屈伸",2,"10–15 次",60,"手肘朝前，伸直时不要挺腰。","补充手臂后侧长头。")]
  },
  posterior: {id:"posterior",type:"train",short:"后链＋肩背补量",focus:"完善臀腿后侧并补肩线",muscles:["腘绳肌","臀大肌 / 臀中肌","背阔肌 / 大圆肌","三角肌后束","核心抗旋转 / 抗伸展"],why:"后链维持全身比例和髋功能；肩背用小剂量补量，持续塑造肩线，但不把一周疲劳拉满。",warmup:warmups.lower,cooldown:cooldowns.lower,mobility:shoulderMobility,
    exercises:[ex("腘绳肌","罗马尼亚硬拉",4,"6–10 次",120,"杠铃贴腿，髋向后；腿后侧拉到位就起身。","主力后链动作，不用腰弯下去。"),ex("臀大肌 / 臀中肌","臀推",3,"8–12 次",90,"先收骨盆，顶部夹臀停一下，不要过度挺腰。","补臀部缩短位力量。"),ex("腘绳肌","坐姿腿弯举",3,"10–15 次",75,"卷到底停一下，再慢慢伸直。","强化腿后侧完整功能。"),ex("背阔肌 / 大圆肌","直臂绳索下拉",3,"12–15 次",60,"手臂近乎伸直，肘向髋走，不含胸。","低疲劳补背阔。"),ex("核心抗旋转 / 抗伸展","腹肌轮",3,"6–10 次",60,"只推出到腰不塌的位置，呼气收回。","训练腹部抗伸展。")]
  },
  shoulderRest: {id:"shoulderRest",type:"rest",short:"肩颈与肩背恢复",focus:"让胸椎和肩胛重新顺畅",muscles:["胸椎活动","肩胛控制","胸前放松"],why:"这不是再练一次肩膀，而是用低疲劳活动改善卡住的感觉，为下一次上肢训练恢复活动范围。",mobility:shoulderMobility,recovery:["保持约 8,000 步，不追求额外消耗","全套辅助控制在轻松强度，做完应当更顺","出现疼痛、麻木或无力时停止并评估"]},
  hipRest: {id:"hipRest",type:"rest",short:"髋胯恢复＋轻有氧",focus:"让髋活动更顺，不制造腿部酸痛",muscles:["髋内外旋","髋屈肌","臀部控制"],why:"用具体的髋活动和轻有氧恢复关节感觉，为下一次深蹲或髋铰链训练准备位置。",mobility:hipMobility,recovery:["保持约 8,000 步","可选 20 分钟轻松单车或坡走，能正常说话","腿部酸痛高时取消额外有氧"]},
  resetRest: {id:"resetRest",type:"rest",short:"完整恢复＋周复盘",focus:"让疲劳真正下降",muscles:["全身轻活动","睡眠准备","训练复盘"],why:"不补课。真正恢复后，下一周才能继续提高输出；用记录决定调整，不凭情绪临时加练。",mobility:fullMobility,recovery:["轻松完成 7,000–9,000 步","尽量在 00:00 前关灯，保证约 8 小时睡眠","查看周报，再生成下一周"]}
};

const patterns = [
  ["pull","quad","shoulderRest","push","hipRest","posterior","resetRest"],
  ["push","posterior","shoulderRest","pull","hipRest","quad","resetRest"],
  ["quad","pull","hipRest","push","shoulderRest","posterior","resetRest"],
  ["posterior","push","shoulderRest","quad","hipRest","pull","resetRest"]
];
const phaseCopy = {
  baseline:{name:"重新校准",title:"先做稳，再决定要不要加。",load:"基线周 · 留有余力",reason:"上一周记录不足，所以不自动加量。先把 4 次训练、睡眠和身体感受记完整。"},
  advance:{name:"小幅推进",title:"恢复允许，只增加一个变量。",load:"推进周 · 加次数优先",reason:"上一周完成和恢复表现良好。先让每个工作组多做 1 次，达到次数上限后再小幅加重量。"},
  hold:{name:"巩固稳定",title:"不追数字，把每一组做得更像。",load:"巩固周 · 处方不变",reason:"上一周整体可完成，但还没有同时满足加量条件。保持重量和组数，优先动作稳定。"},
  reduce:{name:"主动减量",title:"先恢复，再继续推进。",load:"减量周 · 总量约 -20%",reason:"上一周出现明显酸痛、动作变形、身体受限或睡眠不足。本周每个动作少 1 组。"}
};

function makeWeek(number, mode) {
  const copy = phaseCopy[mode] || phaseCopy.baseline;
  const pattern = patterns[(number - 1) % patterns.length];
  const week = {number,name:copy.name,title:copy.title,load:copy.load,reason:copy.reason,sourceMode:mode,days:pattern.map(id => deepClone(dayTemplates[id]))};
  if (mode === "reduce") week.days.forEach(day => day.exercises?.forEach(item => item.sets = Math.max(1,item.sets - 1)));
  return week;
}

const initialWeeks = () => [makeWeek(1,"baseline"),makeWeek(2,"hold"),makeWeek(3,"advance"),makeWeek(4,"hold")];
const goals = [
  {rank:"01",title:"三角肌中束",effect:"决定正面肩宽和肩腰比，是薄肌轮廓最直接的视觉杠杆。",dose:"每周 10–14 组 · 2–3 次"},
  {rank:"02",title:"三角肌后束",effect:"形成侧面和背面的肩帽，让手臂与背部有清楚分界。",dose:"每周 8–12 组 · 2–3 次"},
  {rank:"03",title:"背阔肌 / 大圆肌",effect:"制造 V 形，让腰部在视觉上更窄。",dose:"每周 10–14 组 · 2 次"},
  {rank:"04",title:"上胸锁骨部",effect:"填充锁骨下方，建立上身正面的立体感。",dose:"每周 8–10 组 · 2 次"},
  {rank:"05",title:"中下斜方 / 菱形肌",effect:"稳定肩胛并建立中背层次，减少全靠颈部发力。",dose:"每周 6–10 组 · 2 次"},
  {rank:"06",title:"前锯肌 / 肩袖",effect:"帮助肩胛贴合和上旋，是肩背顺畅的基础。",dose:"每周 4–8 轻量组"},
  {rank:"07",title:"腹部抗旋转 / 抗伸展",effect:"建立腰腹张力；腹肌清晰度仍主要由体脂决定。",dose:"每周 6–10 组 · 2–3 次"},
  {rank:"08",title:"臀腿后链",effect:"保持全身运动感和比例，并提高髋关节控制。",dose:"每周 8–12 组 · 2 次"}
];

const foodCategories = [
  {id:"eggs",name:"鸡蛋",unit:"个",variants:[{id:"egg",label:"1 个鸡蛋",protein:6.5}],defaultCount:3,defaultVariant:"egg"},
  {id:"dairy",name:"牛奶 / 酸奶",unit:"份",variants:[{id:"milk",label:"牛奶 250ml",protein:8},{id:"yogurt",label:"高蛋白酸奶 200g",protein:18}],defaultCount:1,defaultVariant:"yogurt"},
  {id:"beef",name:"生重瘦牛肉",unit:"份",variants:[{id:"beef250",label:"生重瘦牛肉 250g",protein:50}],defaultCount:1,defaultVariant:"beef250"},
  {id:"mix",name:"鱼 / 虾 / 豆腐",unit:"份",variants:[{id:"fish",label:"熟鱼肉 180g",protein:36},{id:"shrimp",label:"熟虾仁 200g",protein:40},{id:"tofu",label:"北豆腐 200g",protein:16}],defaultCount:1,defaultVariant:"fish"}
];

function safeParse(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch (_) { return fallback; } }
const storedWeeks = safeParse("carbonPlanWeeksV2", null);
const storedLogsV2 = safeParse("carbonTrainingLogsV2", null);
const legacyLogs = safeParse("carbonTrainingLogs", {});
const migratedLegacyLogs = Object.fromEntries(Object.entries(legacyLogs).map(([key,log])=>{
  const oldSoreness=Number(log.soreness), stiffness=Math.max(Number(log.shoulder)||0,Number(log.hip)||0), oldRpe=Number(log.rpe);
  return [key,{completed:Boolean(log.completed),sleep:log.sleep??"",soreness:Number.isFinite(oldSoreness)?(oldSoreness>=7?'high':oldSoreness>=4?'medium':'low'):'',finish:Number.isFinite(oldRpe)?(oldRpe>=9?'form_break':oldRpe<=6?'easy':'just'):'',body:stiffness?(stiffness>=7?'limited':stiffness>=4?'tight_ok':'smooth'):'',notes:log.notes||'',updatedAt:log.updatedAt||new Date().toISOString()}];
}));
const state = {
  weeks: Array.isArray(storedWeeks) && storedWeeks[0]?.days ? storedWeeks : initialWeeks(),
  week: Number(localStorage.getItem("carbonSelectedWeekV2") || 1),
  day: Number(localStorage.getItem("carbonSelectedDayV2") || (new Date().getDay() || 7)),
  logs: storedLogsV2 || migratedLegacyLogs,
  food: safeParse("carbonProteinBuilderV2", null) || Object.fromEntries(foodCategories.map(f => [f.id,{count:f.defaultCount,variant:f.defaultVariant}]))
};
if (!storedLogsV2 && Object.keys(migratedLegacyLogs).length) localStorage.setItem("carbonTrainingLogsV2",JSON.stringify(migratedLegacyLogs));
state.week = Math.max(1, Math.min(state.week,state.weeks.length));
state.day = Math.max(1, Math.min(state.day,7));
let editingDaySlot = 1;
let draggedSlot = null;

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
const average = arr => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0;
const currentWeek = () => state.weeks[state.week-1];
const currentDay = () => currentWeek().days[state.day-1];
const logKey = (week,day) => `w${week}d${day}`;
const saveWeeks = () => localStorage.setItem("carbonPlanWeeksV2",JSON.stringify(state.weeks));

function getWeekLogs(weekNumber) {
  const week = state.weeks[weekNumber-1];
  if (!week) return [];
  return week.days.map((day,index)=>({day,index:index+1,log:state.logs[logKey(weekNumber,index+1)]})).filter(x=>x.log);
}
function getReport(weekNumber) {
  const week = state.weeks[weekNumber-1];
  if (!week) return {logs:[],completed:0,total:0,completion:0,sleep:0,mode:"baseline"};
  const logs = getWeekLogs(weekNumber);
  const training = week.days.map((day,index)=>({day,index:index+1,log:state.logs[logKey(weekNumber,index+1)]})).filter(x=>x.day.type==="train");
  const completed = training.filter(x=>x.log?.completed).length;
  const sleepValues = logs.map(x=>Number(x.log.sleep)).filter(x=>Number.isFinite(x)&&x>0);
  const sleep = average(sleepValues);
  const hasHigh = logs.some(x=>x.log.soreness==="high");
  const hasLimited = logs.some(x=>x.log.body==="limited");
  const hasFormBreak = logs.some(x=>x.log.finish==="form_break");
  const smoothCount = logs.filter(x=>x.log.body==="smooth").length;
  const completion = training.length ? completed/training.length : 0;
  let mode = "hold";
  if (!logs.length) mode = "baseline";
  else if (completion < .5 || hasHigh || hasLimited || hasFormBreak || (sleep && sleep < 6.5)) mode = "reduce";
  else if (completion >= .75 && sleep >= 7 && !hasHigh && !hasLimited && !hasFormBreak && smoothCount >= Math.max(1,Math.floor(logs.length/2))) mode = "advance";
  const soreness = hasHigh ? "高" : logs.some(x=>x.log.soreness==="medium") ? "中" : logs.some(x=>x.log.soreness==="low") ? "低" : "待记录";
  const body = hasLimited ? "明显受限" : logs.some(x=>x.log.body==="tight_ok") ? "有点紧" : logs.some(x=>x.log.body==="smooth") ? "顺畅" : "待记录";
  const finish = hasFormBreak ? "出现动作变形" : logs.some(x=>x.log.finish==="just") ? "正好完成" : logs.some(x=>x.log.finish==="easy") ? "有余力" : "待记录";
  return {logs,completed,total:training.length,completion,sleep,mode,soreness,body,finish};
}

function renderWeekSwitcher() {
  $("#weekSwitcher").innerHTML = state.weeks.map((week,index)=>`<button class="week-btn ${state.week===index+1?"active":""}" data-week="${index+1}">W${index+1} · ${week.name}</button>`).join("");
  $$("#weekSwitcher [data-week]").forEach(btn=>btn.onclick=()=>selectWeek(Number(btn.dataset.week)));
}
function renderHero() {
  const week=currentWeek(), report=getReport(state.week);
  $("#weekEyebrow").textContent=`W${String(state.week).padStart(2,"0")} · ${week.name}`;
  $("#weekTitle").textContent=week.title;
  $("#weekSummary").textContent=`这不是封闭周期。完成本周记录后，下一周会根据恢复状态生成“推进、保持或减量”，你仍可手动调整顺序和动作。`;
  $("#weekReason").textContent=week.reason;
  $("#weekLoadTag").textContent=week.load;
  const pct=Math.round(report.completion*100);
  $("#completionRing").style.setProperty("--value",`${pct*3.6}deg`); $("#completionPercent").textContent=`${pct}%`; $("#completionCount").textContent=`${report.completed} / ${report.total}`;
}
function moveDay(from,to) {
  const week=currentWeek(); if(to<1||to>7||from===to)return;
  [week.days[from-1],week.days[to-1]]=[week.days[to-1],week.days[from-1]]; saveWeeks(); state.day=to; renderAll();
}
function dayCardMarkup(day,slot,plan=false) {
  const done=state.logs[logKey(state.week,slot)]?.completed;
  return `<article class="day-card ${!plan&&state.day===slot?"active":""} ${done?"complete":""}" data-slot="${slot}" draggable="true">
    <button class="day-select-area" type="button" data-select-day="${slot}"><div class="dow">${DOW[slot-1]}</div><h3>${day.short}</h3><p>${day.focus}</p><span class="tag ${day.type==="rest"?"rest":""}">${day.type==="train"?"训练":"恢复"}</span></button>
    <div class="card-actions"><button type="button" data-move="-1" data-slot="${slot}" aria-label="向前移动">←</button><button type="button" data-edit-day="${slot}">编辑</button><button type="button" data-move="1" data-slot="${slot}" aria-label="向后移动">→</button></div>
  </article>`;
}
function wireDayCards(scope) {
  scope.querySelectorAll("[data-select-day]").forEach(btn=>btn.onclick=()=>selectDay(Number(btn.dataset.selectDay)));
  scope.querySelectorAll("[data-edit-day]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();openDayDialog(Number(btn.dataset.editDay));});
  scope.querySelectorAll("[data-move]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();const from=Number(btn.dataset.slot);moveDay(from,from+Number(btn.dataset.move));});
  scope.querySelectorAll(".day-card").forEach(card=>{
    card.addEventListener("dragstart",()=>{draggedSlot=Number(card.dataset.slot);card.classList.add("dragging");});
    card.addEventListener("dragend",()=>{draggedSlot=null;card.classList.remove("dragging");});
    card.addEventListener("dragover",e=>{e.preventDefault();card.classList.add("drag-over");});
    card.addEventListener("dragleave",()=>card.classList.remove("drag-over"));
    card.addEventListener("drop",e=>{e.preventDefault();card.classList.remove("drag-over");if(draggedSlot)moveDay(draggedSlot,Number(card.dataset.slot));});
  });
}
function renderDayGrid() { const grid=$("#dayGrid"); grid.innerHTML=currentWeek().days.map((d,i)=>dayCardMarkup(d,i+1)).join(""); wireDayCards(grid); }
function renderChecklist(items) { return `<div class="check-list">${items.map((item,i)=>`<div class="check-item"><span class="check-num">${i+1}</span><div><strong>${item[0]||item}</strong>${item[1]?`<p>${item[1]}</p>`:""}</div></div>`).join("")}</div>`; }
function renderMobility(mobility) { return `<section class="detail-section mobility-block"><div class="section-kicker">独立辅助 · ${mobility.duration||"20–30 分钟"}</div><h3>${mobility.label}</h3><p class="section-reason">${mobility.reason}</p><div class="mobility-grid">${mobility.items.slice(0,3).map((item,i)=>`<article><span>0${i+1}</span><h4>${item.name}</h4><p>${item.instruction}</p><strong>${item.dose}</strong></article>`).join("")}</div></section>`; }
function renderDayDetail() {
  const day=currentDay();
  const train = day.type==="train" ? `
    <section class="detail-section"><div class="section-kicker">01 · 训练前热身</div><h3>先把今天要用的部位叫醒</h3><p class="section-reason">${day.warmup.summary}</p>${renderChecklist(day.warmup.items)}</section>
    <section class="detail-section main-training"><div class="section-kicker">02 · 主训练</div><h3>先看肌群，再看动作</h3><div class="exercise-stack">${day.exercises.slice(0,5).map((item,index)=>`<article class="exercise-row"><div class="exercise-index">0${index+1}</div><div class="exercise-muscle"><span>核心肌群</span><strong>${item.muscle}</strong></div><div class="exercise-action"><h4>${item.name}</h4><p>${item.why}</p></div><div class="plain-prescription"><strong>${item.sets} 组 · 每组 ${item.reps}</strong><span>组间休息 ${item.rest} 秒</span><p>${item.cue}</p></div></article>`).join("")}</div></section>
    <section class="detail-section"><div class="section-kicker">03 · 训练后调整</div><h3>让用过的部位恢复长度和呼吸</h3><p class="section-reason">${day.cooldown.summary}</p>${renderChecklist(day.cooldown.items)}</section>` : `
    <section class="detail-section"><div class="section-kicker">今日恢复任务</div><h3>休息日不是补课日</h3>${renderChecklist(day.recovery||[])}</section>`;
  $("#dayDetail").innerHTML=`<div class="detail-head"><div><div class="eyebrow">DAY ${String(state.day).padStart(2,"0")} · ${day.type==="train"?"TRAIN":"RECOVER"}</div><h2>${day.short}</h2><p>${day.why}</p><div class="muscle-row">${day.muscles.map(m=>`<span class="muscle-chip">${m}</span>`).join("")}</div></div><div class="detail-actions"><span class="status-chip ${day.type==="train"?"red":"green"}">${day.focus}</span><button class="ghost-btn" id="editCurrentDay" type="button">编辑当天</button></div></div>${train}${renderMobility(day.mobility)}`;
  $("#editCurrentDay").onclick=()=>openDayDialog(state.day);
}

function loadLogForm() { const log=state.logs[logKey(state.week,state.day)]||{}; $("#completedInput").checked=Boolean(log.completed); ["sleep","soreness","finish","body","notes"].forEach(key=>{const el=$(`#${key}Input`);if(el)el.value=log[key]??"";}); $("#saveNote").textContent=""; }
function saveLog(event) { event.preventDefault(); const sleep=$("#sleepInput").value; state.logs[logKey(state.week,state.day)]={completed:$("#completedInput").checked,sleep:sleep===""?"":Number(sleep),soreness:$("#sorenessInput").value,finish:$("#finishInput").value,body:$("#bodyInput").value,notes:$("#notesInput").value.trim(),updatedAt:new Date().toISOString()}; localStorage.setItem("carbonTrainingLogsV2",JSON.stringify(state.logs)); $("#saveNote").textContent="已保存。周报和下一周判断已同步更新。"; renderHero();renderDayGrid();renderReports(); }
function selectWeek(week) { state.week=clamp(week,1,state.weeks.length); localStorage.setItem("carbonSelectedWeekV2",state.week); renderAll(); }
function selectDay(day) { state.day=clamp(day,1,7); localStorage.setItem("carbonSelectedDayV2",state.day); renderDayGrid();renderDayDetail();loadLogForm(); if(innerWidth<800)$("#dayDetail").scrollIntoView({behavior:"smooth",block:"start"}); }

function addNextWeek() {
  const previousNumber=state.weeks.length, mode=getReport(previousNumber).mode;
  const week=makeWeek(previousNumber+1,mode); state.weeks.push(week); saveWeeks(); state.week=week.number; state.day=1; localStorage.setItem("carbonSelectedWeekV2",state.week); renderAll();
  switchView("plan"); setTimeout(()=>$("#planGrid").scrollIntoView({behavior:"smooth",block:"start"}),50);
}
function renderQuickGoals(){$("#quickGoals").innerHTML=goals.slice(0,4).map(g=>`<article class="goal-card" data-rank="${g.rank}"><span class="tag">优先 ${g.rank}</span><h3>${g.title}</h3><p>${g.effect}</p><div class="dose">${g.dose}</div></article>`).join("");}
function renderPlan(){
  $("#timeline").innerHTML=state.weeks.map((week,index)=>`<button class="timeline-card ${state.week===index+1?"active":""}" data-plan-week="${index+1}"><span>W${index+1}</span><strong>${week.name}</strong><small>${week.load}</small></button>`).join("")+`<button class="timeline-add" id="timelineAdd" type="button">＋<span>下一周</span></button>`;
  $$("[data-plan-week]").forEach(btn=>btn.onclick=()=>selectWeek(Number(btn.dataset.planWeek))); $("#timelineAdd").onclick=addNextWeek;
  const week=currentWeek(); $("#planWeekLabel").textContent=`WEEK ${String(state.week).padStart(2,"0")} · ${week.load}`; $("#planWeekTitle").textContent=week.title; $("#planWeekLogic").textContent=week.reason;
  const grid=$("#planGrid"); grid.innerHTML=week.days.map((d,i)=>dayCardMarkup(d,i+1,true)).join("");wireDayCards(grid);
}
function fmtSleep(value){return value?`${value.toFixed(1)} 小时`:"待记录";}
function reportCopy(mode){
  if(mode==="advance")return{label:"推进",cls:"green",title:"下一周：小幅推进",text:"先让每个工作组增加 1 次。所有组都达到次数上限、动作仍稳定时，再增加 2.5%–5% 重量；不要同时增加重量和组数。"};
  if(mode==="reduce")return{label:"减量",cls:"red",title:"下一周：主动减量",text:"每个动作减少 1 组，约等于总量下降 20%。优先把睡眠、明显酸痛、动作变形或身体受限处理好。"};
  if(mode==="baseline")return{label:"等待数据",cls:"amber",title:"先完成这一周，再决定",text:"记录训练是否完成、睡眠、酸痛、完成状态和身体感受。数据不足时不会自动加量。"};
  return{label:"保持",cls:"amber",title:"下一周：保持并巩固",text:"处方先不变。把每一组的动作幅度、目标肌群感受和最后几次稳定性做得更一致。"};
}
function renderReports(){
  const select=$("#reportWeekSelect"); select.innerHTML=state.weeks.map((w,i)=>`<option value="${i+1}">W${i+1} · ${w.name}</option>`).join(""); const week=Math.min(Number(select.dataset.selected||state.week),state.weeks.length); select.value=week;
  const r=getReport(week); $("#reportStats").innerHTML=[["完成率",`${Math.round(r.completion*100)}%`],["平均睡眠",fmtSleep(r.sleep)],["肌肉酸痛",r.soreness],["完成状态",r.finish],["肩颈 / 髋",r.body]].map(x=>`<div class="stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  const copy=reportCopy(r.mode); $("#recommendationCard").innerHTML=`<div class="recommendation-icon">→</div><div><span class="status-chip ${copy.cls}">${copy.label}</span><h3>${copy.title}</h3><p>${copy.text}</p></div>`;
}
function renderGoals(){$("#goalGrid").innerHTML=goals.map(g=>`<article class="goal-card" data-rank="${g.rank}"><span class="tag">优先 ${g.rank}</span><h3>${g.title}</h3><p>${g.effect}</p><div class="dose">${g.dose}</div></article>`).join("");}

function getFoodVariant(category){const entry=state.food[category.id]||{count:0,variant:category.defaultVariant};return category.variants.find(v=>v.id===entry.variant)||category.variants[0];}
function renderProtein(){
  $("#proteinFoods").innerHTML=foodCategories.map(category=>{const entry=state.food[category.id]||{count:0,variant:category.defaultVariant};const variant=getFoodVariant(category);return `<div class="food-row"><div class="food-copy"><strong>${category.name}</strong>${category.variants.length>1?`<select data-food-variant="${category.id}">${category.variants.map(v=>`<option value="${v.id}" ${v.id===variant.id?"selected":""}>${v.label} · ${v.protein}g 蛋白</option>`).join("")}</select>`:`<small>${variant.label} · 约 ${variant.protein}g 蛋白</small>`}</div><div class="stepper"><button type="button" data-food="${category.id}" data-delta="-1">−</button><output>${entry.count||0} ${category.unit}</output><button type="button" data-food="${category.id}" data-delta="1">＋</button></div></div>`}).join("");
  const total=foodCategories.reduce((sum,c)=>{const entry=state.food[c.id]||{count:0};return sum+(entry.count||0)*getFoodVariant(c).protein;},0); const rounded=Math.round(total); $("#proteinTotal").textContent=`${rounded}g`; const diff=rounded-120; $("#proteinStatus").textContent=Math.abs(diff)<=5?"已接近 120g":diff<0?`还差约 ${Math.abs(diff)}g`:`高出约 ${diff}g`; $("#proteinTotal").style.color=Math.abs(diff)<=10?"var(--green)":"var(--red)";
  $$("[data-food]").forEach(btn=>btn.onclick=()=>{const id=btn.dataset.food,category=foodCategories.find(f=>f.id===id);const entry=state.food[id]||{count:0,variant:category.defaultVariant};entry.count=clamp((entry.count||0)+Number(btn.dataset.delta),0,12);state.food[id]=entry;saveFood();renderProtein();});
  $$('[data-food-variant]').forEach(select=>select.onchange=()=>{const id=select.dataset.foodVariant,category=foodCategories.find(f=>f.id===id);const entry=state.food[id]||{count:0,variant:category.defaultVariant};entry.variant=select.value;state.food[id]=entry;saveFood();renderProtein();});
}
function saveFood(){localStorage.setItem("carbonProteinBuilderV2",JSON.stringify(state.food));}
function resetProtein(){state.food=Object.fromEntries(foodCategories.map(f=>[f.id,{count:f.defaultCount,variant:f.defaultVariant}]));saveFood();renderProtein();}

function switchView(name){$$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));if(name==='plan')renderPlan();if(name==='report')renderReports();}

function openWeekDialog(){const week=currentWeek();$("#weekNameInput").value=week.name;$("#weekTitleInput").value=week.title;$("#weekReasonInput").value=week.reason;$("#weekDialog").showModal();}
function saveWeekEdit(event){event.preventDefault();const week=currentWeek();week.name=$("#weekNameInput").value.trim()||week.name;week.title=$("#weekTitleInput").value.trim()||week.title;week.reason=$("#weekReasonInput").value.trim()||week.reason;saveWeeks();$("#weekDialog").close();renderAll();}
function muscleSelect(value,index){const options=[...new Set([value,...muscleOptions])];return `<select class="muscle-edit" data-index="${index}">${options.map(m=>`<option ${m===value?"selected":""}>${m}</option>`).join("")}</select>`;}
function actionSelect(item,index){const options=exerciseBank[item.muscle]||[];return `<select class="action-preset" data-index="${index}"><option value="">从该肌群动作中筛选</option>${options.map(name=>`<option ${name===item.name?"selected":""}>${name}</option>`).join("")}</select>`;}
function renderExerciseEditors(exercises){
  $("#exerciseEditorList").innerHTML=exercises.slice(0,5).map((item,index)=>`<article class="exercise-edit-card" data-ex-index="${index}"><div class="edit-card-head"><strong>动作 ${index+1}</strong><div><button type="button" data-ex-move="-1" data-index="${index}">↑</button><button type="button" data-ex-move="1" data-index="${index}">↓</button><button type="button" class="danger-text" data-ex-remove="${index}">删除</button></div></div><div class="form-grid"><div class="field"><label>核心肌群</label>${muscleSelect(item.muscle,index)}</div><div class="field"><label>筛选参考动作</label>${actionSelect(item,index)}</div><div class="field full"><label>实际要做的动作（可直接打字）</label><input class="action-edit" value="${escapeHtml(item.name)}"></div><div class="field"><label>组数</label><input class="sets-edit" type="number" min="1" max="8" value="${item.sets}"></div><div class="field"><label>每组次数</label><input class="reps-edit" value="${escapeHtml(item.reps)}"></div><div class="field"><label>组间休息 / 秒</label><input class="rest-edit" type="number" min="20" max="300" step="5" value="${item.rest}"></div><div class="field"><label>怎么做（说人话）</label><input class="cue-edit" value="${escapeHtml(item.cue)}"></div><div class="field full"><label>为什么选它</label><input class="why-edit" value="${escapeHtml(item.why)}"></div></div></article>`).join("");
  $$(".muscle-edit").forEach(select=>select.onchange=()=>{const card=select.closest('.exercise-edit-card'),preset=card.querySelector('.action-preset');preset.innerHTML=`<option value="">从该肌群动作中筛选</option>${(exerciseBank[select.value]||[]).map(n=>`<option>${n}</option>`).join('')}`;});
  $$(".action-preset").forEach(select=>select.onchange=()=>{if(select.value)select.closest('.exercise-edit-card').querySelector('.action-edit').value=select.value;});
  $$('[data-ex-remove]').forEach(btn=>btn.onclick=()=>{const list=readExerciseEditors();list.splice(Number(btn.dataset.exRemove),1);renderExerciseEditors(list);});
  $$('[data-ex-move]').forEach(btn=>btn.onclick=()=>{const list=readExerciseEditors(),from=Number(btn.dataset.index),to=from+Number(btn.dataset.exMove);if(to<0||to>=list.length)return;[list[from],list[to]]=[list[to],list[from]];renderExerciseEditors(list);});
}
function readExerciseEditors(){return $$('.exercise-edit-card').map(card=>({muscle:card.querySelector('.muscle-edit').value,name:card.querySelector('.action-edit').value.trim(),sets:clamp(Number(card.querySelector('.sets-edit').value)||3,1,8),reps:card.querySelector('.reps-edit').value.trim()||'8–12 次',rest:clamp(Number(card.querySelector('.rest-edit').value)||60,20,300),cue:card.querySelector('.cue-edit').value.trim()||'动作保持稳定，不借力。',why:card.querySelector('.why-edit').value.trim()||'服务于当天目标肌群。'})).filter(x=>x.name);}
function renderMobilityEditors(mobility){$("#mobilityEditorList").innerHTML=(mobility.items||[]).slice(0,3).map((item,index)=>`<article class="mobility-edit-card"><span>0${index+1}</span><div class="form-grid"><div class="field full"><label>动作名称</label><input class="mob-name" value="${escapeHtml(item.name)}"></div><div class="field full"><label>具体怎么做</label><textarea class="mob-instruction">${escapeHtml(item.instruction)}</textarea></div><div class="field full"><label>做多久 / 做几次</label><input class="mob-dose" value="${escapeHtml(item.dose)}"></div></div></article>`).join("");}
function readMobilityEditors(){return $$('.mobility-edit-card').map(card=>({name:card.querySelector('.mob-name').value.trim(),instruction:card.querySelector('.mob-instruction').value.trim(),dose:card.querySelector('.mob-dose').value.trim()}));}
function openDayDialog(slot){editingDaySlot=slot;const day=currentWeek().days[slot-1];$("#dayDialogTitle").textContent=`编辑 ${DOW[slot-1].split('/')[1].trim()} · ${day.short}`;$("#dayTypeInput").value=day.type;$("#dayNameInput").value=day.short;$("#dayFocusInput").value=day.focus;$("#dayMusclesInput").value=day.muscles.join('、');$("#trainEditor").hidden=day.type!=="train";renderExerciseEditors(day.exercises||[]);renderMobilityEditors(day.mobility);$("#dayDialog").showModal();}
function saveDayEdit(event){event.preventDefault();const day=currentWeek().days[editingDaySlot-1],wasType=day.type,type=$("#dayTypeInput").value;day.type=type;day.short=$("#dayNameInput").value.trim()||day.short;day.focus=$("#dayFocusInput").value.trim()||day.focus;day.muscles=$("#dayMusclesInput").value.split(/[、,，]/).map(x=>x.trim()).filter(Boolean);if(type==='train'){day.warmup=day.warmup||deepClone(warmups.upper);day.cooldown=day.cooldown||deepClone(cooldowns.upper);day.exercises=readExerciseEditors().slice(0,5);if(!day.exercises.length&&wasType!=='train')day.exercises=[ex('背阔肌 / 大圆肌','正面中立握高位下拉',3,'8–12 次',90,'肘向髋走，颈部保持放松。','建立背宽。')];}else{day.recovery=day.recovery||['保持约 8,000 步','辅助练习保持轻松，做完应当更顺','不补做错过的力量训练'];}day.mobility.items=readMobilityEditors().slice(0,3);saveWeeks();$("#dayDialog").close();state.day=editingDaySlot;renderAll();}
function escapeHtml(value=''){return String(value).replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));}

function renderAll(){renderWeekSwitcher();renderHero();renderDayGrid();renderDayDetail();loadLogForm();renderQuickGoals();renderPlan();renderReports();renderGoals();renderProtein();}

function registerWebMCP(){
  const context=document.modelContext;if(!context?.registerTool)return;
  const safeWeek=input=>{const week=Number(input?.week);if(!Number.isInteger(week)||week<1||week>state.weeks.length)throw new Error(`week 必须是 1 到 ${state.weeks.length} 的整数`);return week;};
  const tools=[
    {name:'read_week_plan',title:'读取长期周训练计划',description:'读取任意已生成周的7天主题、核心肌群和训练动作。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1}},required:['week'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){const week=safeWeek(input),plan=state.weeks[week-1];return{week,focus:plan.name,load:plan.load,reason:plan.reason,days:plan.days.map((d,i)=>({day:i+1,type:d.type,theme:d.short,muscles:d.muscles,exercises:(d.exercises||[]).map(e=>({muscle:e.muscle,name:e.name,prescription:`${e.sets}组，每组${e.reps}，休息${e.rest}秒`,cue:e.cue}))}))};}},
    {name:'add_next_week',title:'生成下一周',description:'根据最近一周反馈生成可编辑的新一周，并自动变换训练日顺序。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(){addNextWeek();const week=state.weeks.length;return{created:true,week,focus:state.weeks[week-1].name,load:state.weeks[week-1].load};}},
    {name:'record_workout_feedback',title:'记录训练反馈',description:'用完成情况、睡眠、低中高酸痛、完成状态和身体感受记录训练。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1},day:{type:'integer',minimum:1,maximum:7},completed:{type:'boolean'},sleep:{type:'number',minimum:0,maximum:12},soreness:{type:'string',enum:['low','medium','high']},finish:{type:'string',enum:['easy','just','form_break']},body:{type:'string',enum:['smooth','tight_ok','limited']},notes:{type:'string',maxLength:500}},required:['week','day','completed'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){const week=safeWeek(input),day=Number(input.day);if(!Number.isInteger(day)||day<1||day>7)throw new Error('day 必须是 1 到 7 的整数');state.logs[logKey(week,day)]={...input,updatedAt:new Date().toISOString()};localStorage.setItem('carbonTrainingLogsV2',JSON.stringify(state.logs));renderAll();return{saved:true,week,day,recommendation:reportCopy(getReport(week).mode)};}},
    {name:'read_week_report',title:'读取周报',description:'读取指定周的完成率、睡眠与人话版恢复反馈。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1}},required:['week'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){const week=safeWeek(input),r=getReport(week);return{week,completionPercent:Math.round(r.completion*100),averageSleep:r.sleep,soreness:r.soreness,finish:r.finish,body:r.body,recommendation:reportCopy(r.mode)};}}
  ];
  tools.forEach(tool=>{try{void Promise.resolve(context.registerTool(tool)).catch(()=>{});}catch(_){}});
}

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  $("#logForm").addEventListener('submit',saveLog); $("#reportWeekSelect").addEventListener('change',e=>{e.currentTarget.dataset.selected=e.currentTarget.value;renderReports();}); $("#resetProtein").onclick=resetProtein;
  $$('.nav-btn').forEach(btn=>btn.onclick=()=>switchView(btn.dataset.view));
  ["#addWeek","#addWeekHero","#addWeekPlan"].forEach(id=>$(id).onclick=addNextWeek); ["#editWeekHero","#editWeekPlan"].forEach(id=>$(id).onclick=openWeekDialog);
  $("#saveWeekEdit").onclick=saveWeekEdit; $("#saveDayEdit").onclick=saveDayEdit;
  $("#dayTypeInput").onchange=e=>$("#trainEditor").hidden=e.target.value!=="train";
  $("#addExercise").onclick=()=>{const list=readExerciseEditors();if(list.length>=5)return;list.push(ex(muscleOptions[0],exerciseBank[muscleOptions[0]][0],3,'8–12 次',75,'动作保持稳定，不借力。','服务于当天目标肌群。'));renderExerciseEditors(list);};
  registerWebMCP();
});
