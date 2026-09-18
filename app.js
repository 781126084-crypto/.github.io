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

const profilePresets = {
  muscle: [
    {id:"combat",title:"搏击薄肌",caption:"肩宽、V 形背、紧实核心与运动感",pattern:["pull","quad","shoulderRest","push","hipRest","posterior","resetRest"],priorities:["三角肌中束","背阔肌 / 大圆肌","三角肌后束","腹部抗旋转 / 抗伸展","上胸锁骨部","臀腿后链","中下斜方 / 菱形肌","前锯肌 / 肩袖"]},
    {id:"upper",title:"上身立体",caption:"上胸、肩帽与背部层次更突出",pattern:["push","posterior","shoulderRest","pull","hipRest","quad","resetRest"],priorities:["上胸锁骨部","三角肌中束","三角肌后束","中下斜方 / 菱形肌","背阔肌 / 大圆肌","前锯肌 / 肩袖","腹部抗旋转 / 抗伸展","臀腿后链"]},
    {id:"balanced",title:"均衡运动感",caption:"上下肢比例、力量与体态共同推进",pattern:["quad","pull","hipRest","push","shoulderRest","posterior","resetRest"],priorities:["臀腿后链","背阔肌 / 大圆肌","三角肌中束","腹部抗旋转 / 抗伸展","上胸锁骨部","三角肌后束","中下斜方 / 菱形肌","前锯肌 / 肩袖"]}
  ],
  posture: [
    {id:"shoulder",title:"肩颈与圆肩",caption:"胸椎、肩胛上旋与后侧稳定",pattern:["pull","quad","shoulderRest","push","shoulderRest","posterior","resetRest"],priorities:["中下斜方 / 菱形肌","前锯肌 / 肩袖","三角肌后束","背阔肌 / 大圆肌","腹部抗旋转 / 抗伸展","三角肌中束","臀腿后链","上胸锁骨部"]},
    {id:"hip",title:"髋胯与骨盆",caption:"髋旋转、臀部控制与核心稳定",pattern:["quad","pull","hipRest","posterior","hipRest","push","resetRest"],priorities:["臀腿后链","腹部抗旋转 / 抗伸展","前锯肌 / 肩袖","中下斜方 / 菱形肌","背阔肌 / 大圆肌","三角肌后束","三角肌中束","上胸锁骨部"]},
    {id:"whole",title:"全身重新校准",caption:"肩胛、胸椎、髋与动作轨迹",pattern:["pull","quad","shoulderRest","push","hipRest","posterior","resetRest"],priorities:["前锯肌 / 肩袖","中下斜方 / 菱形肌","臀腿后链","腹部抗旋转 / 抗伸展","三角肌后束","背阔肌 / 大圆肌","三角肌中束","上胸锁骨部"]},
    {id:"headneck",title:"头前伸 / 胸椎",caption:"颈深屈肌、胸椎伸展与肩胛协同",pattern:["pull","quad","shoulderRest","push","shoulderRest","posterior","resetRest"],priorities:["中下斜方 / 菱形肌","前锯肌 / 肩袖","三角肌后束","腹部抗旋转 / 抗伸展","背阔肌 / 大圆肌","三角肌中束","臀腿后链","上胸锁骨部"]},
    {id:"asymmetry",title:"高低肩 / 肩胛差异",caption:"左右控制、上斜方代偿与肩胛贴合",pattern:["pull","posterior","shoulderRest","quad","shoulderRest","push","resetRest"],priorities:["前锯肌 / 肩袖","中下斜方 / 菱形肌","三角肌后束","腹部抗旋转 / 抗伸展","背阔肌 / 大圆肌","三角肌中束","臀腿后链","上胸锁骨部"]},
    {id:"breath",title:"呼吸 / 胸廓 / 核心",caption:"胸廓展开、肋骨控制与抗伸展稳定",pattern:["push","quad","shoulderRest","pull","hipRest","posterior","resetRest"],priorities:["腹部抗旋转 / 抗伸展","前锯肌 / 肩袖","中下斜方 / 菱形肌","臀腿后链","三角肌后束","背阔肌 / 大圆肌","三角肌中束","上胸锁骨部"]}
  ]
};

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
  food: safeParse("carbonProteinBuilderV2", null) || Object.fromEntries(foodCategories.map(f => [f.id,{count:f.defaultCount,variant:f.defaultVariant}])),
  profile: safeParse("carbonProfileV1", null),
  goalPriorities: safeParse("carbonGoalPrioritiesV1", null) || goals.map((g,index)=>({...g,score:10-index})),
  mbti: localStorage.getItem("carbonMbtiV1") || "",
  identityGender: localStorage.getItem("carbonIdentityGenderV1") || "male",
  priorityNote: localStorage.getItem("carbonPriorityNoteV1") || "当前顺序来自目标建档；开始记录后会按训练覆盖量自动校准。"
};
if (!storedLogsV2 && Object.keys(migratedLegacyLogs).length) localStorage.setItem("carbonTrainingLogsV2",JSON.stringify(migratedLegacyLogs));
state.week = Math.max(1, Math.min(state.week,state.weeks.length));
state.day = Math.max(1, Math.min(state.day,7));
let editingDaySlot = 1;
let draggedSlot = null;
let draggedGoal = null;
const profileImages = {goal:state.profile?.images?.goal||"",front:state.profile?.images?.front||"",back:state.profile?.images?.back||""};

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

function findPreset(mode,id){return (profilePresets[mode]||[]).find(item=>item.id===id)||profilePresets[mode]?.[0];}
function goalMeta(title){return goals.find(g=>g.title===title)||{title,effect:"根据最新资料动态调整投入。",dose:"按恢复情况安排"};}
function savePriorities(){localStorage.setItem("carbonGoalPrioritiesV1",JSON.stringify(state.goalPriorities));}
function personalizedPriorityTitles(profile,preset){
  const list=[...preset.priorities],notes=profile?.notes||"",promote=title=>{const at=list.indexOf(title);if(at>0)list.unshift(...list.splice(at,1));},demote=title=>{const at=list.indexOf(title);if(at>=0)list.push(...list.splice(at,1));};
  if(/上胸|胸弱|补胸|胸不够/.test(notes))promote("上胸锁骨部");
  if(/肩宽|中束|肩不够/.test(notes))promote("三角肌中束");
  if(/后束|后肩/.test(notes))promote("三角肌后束");
  if(/髋|胯|骨盆|臀/.test(notes))promote("臀腿后链");
  if(/核心|腰腹|腹肌/.test(notes))promote("腹部抗旋转 / 抗伸展");
  if(/背.{0,5}(不错|有基础|已经宽|比较强)/.test(notes))demote("背阔肌 / 大圆肌");
  if(/胸.{0,5}(不错|有基础|比较强)/.test(notes))demote("上胸锁骨部");
  return list;
}
function profilePriorityReason(profile,preset){
  const detail=profile?.notes?`你补充了“${profile.notes.slice(0,42)}${profile.notes.length>42?'…':''}”。`:"当前没有额外限制描述。";
  return `${preset.title}先把 ${personalizedPriorityTitles(profile,preset).slice(0,3).join("、")} 放在最前。${detail}`;
}
function applyProfileToPlan(profile){
  const preset=findPreset(profile.mode,profile.preset);
  const personalized=personalizedPriorityTitles(profile,preset);
  state.goalPriorities=personalized.map((title,index)=>({...goalMeta(title),score:Math.max(3,10-index)}));
  savePriorities();
  const modes=["baseline","hold","advance","hold"];
  for(let offset=0;offset<4;offset++){
    const number=state.week+offset, week=makeWeek(number,modes[offset]);
    week.days=preset.pattern.map(id=>deepClone(dayTemplates[id]));
    week.name=offset===0?`${preset.title} · 定位`:offset===1?"动作巩固":offset===2?"小幅推进":"恢复验证";
    week.title=offset===0?`先找到 ${personalized.slice(0,2).join("与")} 的发力。`:offset===1?"重复有效动作，把最后几次也做稳。":offset===2?"恢复允许时，只给优先肌群加一点。":"保留进步，同时检查关节与疲劳。";
    week.load=profile.mode==="posture"?(offset===2?"控制周 · 幅度优先":"校准周 · 不追力竭"):phaseCopy[modes[offset]].load;
    week.reason=profilePriorityReason(profile,preset)+(offset===2?" 本周只增加次数或重量中的一个变量。":" 每周仍保留 4 练与 3 个恢复日。") ;
    if(profile.mode==="posture") week.days.forEach(day=>day.exercises?.forEach(item=>item.sets=Math.max(2,item.sets-(offset===0?1:0))));
    state.weeks[number-1]=week;
  }
  state.weeks=state.weeks.filter(Boolean);
  saveWeeks();
}
function presetCards(mode,selected){
  return (profilePresets[mode]||[]).map(item=>`<label class="preset-label"><input type="radio" name="goalPreset" value="${item.id}" ${item.id===selected?"checked":""}><span class="preset-card"><b>${item.title}</b><small>${item.caption}</small><em>${item.priorities.slice(0,3).join(" / ")}</em></span></label>`).join("");
}
function setPreview(kind,data){
  profileImages[kind]=data||"";
  const img=$(`#${kind}ImagePreview`); if(!img)return;
  img.src=data||""; img.hidden=!data; img.closest(".upload-zone")?.classList.toggle("has-image",Boolean(data));
}
function renderProfileResult(){
  const box=$("#profileResult"); if(!box)return;
  const profile=state.profile;
  if(!profile){box.innerHTML=`<div class="profile-empty"><div class="empty-orbit"><span></span></div><div class="eyebrow">WAITING FOR SIGNAL</div><h2>你的训练重点还没被计算。</h2><p>先选目标方向。目标图、正背面照片和数据越完整，优先级越贴近你。</p><div class="empty-checks"><span>01 目标结构</span><span>02 当前基础</span><span>03 四周路径</span></div></div>`;return;}
  const preset=findPreset(profile.mode,profile.preset), top=state.goalPriorities.slice(0,3);
  box.innerHTML=`<div class="result-card"><div class="visual-head"><div><div class="eyebrow">PROFILE LOCKED</div><h2>${preset.title}</h2></div><span class="status-chip green">已同步计划</span></div><p>${profilePriorityReason(profile,preset)}</p>${bodyMapSvg(top.map(x=>x.title),"profile")}<div class="priority-stack">${top.map((item,index)=>`<div><span>0${index+1}</span><strong>${item.title}</strong><small>${index===0?"主重点":"支持位"}</small></div>`).join("")}</div><div class="profile-mini-data"><span>${profile.mode==="muscle"?"增肌塑形":"体态调整"}</span><span>${profile.weight?`${profile.weight} kg`:"体重未填"}</span><span>${profile.trainingAge==="experienced"?"1 年以上":profile.trainingAge==="regular"?"3–12 个月":"起步阶段"}</span></div>${profileImages.goal?`<div class="reference-thumb"><img src="${profileImages.goal}" alt="目标参考"><span>目标参考</span></div>`:""}</div>`;
}
function renderProfile(){
  const profile=state.profile, mode=profile?.mode||document.querySelector('input[name="profileMode"]:checked')?.value||"muscle";
  $$('input[name="profileMode"]').forEach(input=>input.checked=input.value===mode);
  $("#goalPresets").innerHTML=presetCards(mode,profile?.mode===mode?profile.preset:profilePresets[mode][0].id);
  if(profile){$("#heightInput").value=profile.height||"";$("#weightInput").value=profile.weight||"";$("#bodyFatInput").value=profile.bodyFat||"";$("#trainingAgeInput").value=profile.trainingAge||"starter";$("#profileNotesInput").value=profile.notes||"";}
  Object.entries(profileImages).forEach(([kind,data])=>setPreview(kind,data));
  $("#profileStatus").textContent=profile?`${findPreset(profile.mode,profile.preset).title} · W${state.week} 起效`:"尚未建档";
  renderProfileResult();
}
function readCompressedImage(file){
  return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(new Error("图片读取失败"));reader.onload=()=>{const img=new Image();img.onerror=()=>reject(new Error("图片格式不支持"));img.onload=()=>{const max=900,scale=Math.min(1,max/Math.max(img.width,img.height)),canvas=document.createElement("canvas");canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/jpeg",.74));};img.src=reader.result;};reader.readAsDataURL(file);});
}
async function handleProfileImage(kind,file){
  if(!file)return; const note=$("#profileSaveNote"); note.textContent="正在处理图片…";
  try{setPreview(kind,await readCompressedImage(file));note.textContent="图片已在本机准备好，提交后保存。";}catch(error){note.textContent=error.message;}
}
function saveProfile(event){
  event.preventDefault(); const mode=document.querySelector('input[name="profileMode"]:checked')?.value||"muscle", preset=document.querySelector('input[name="goalPreset"]:checked')?.value;
  if(!preset&&!profileImages.goal){$("#profileSaveNote").textContent="请至少选择一个目标方向，或上传目标参考图。";return;}
  const profile={mode,preset:preset||profilePresets[mode][0].id,height:Number($("#heightInput").value)||"",weight:Number($("#weightInput").value)||"",bodyFat:Number($("#bodyFatInput").value)||"",trainingAge:$("#trainingAgeInput").value,notes:$("#profileNotesInput").value.trim(),images:{...profileImages},updatedAt:new Date().toISOString()};
  state.profile=profile;
  try{localStorage.setItem("carbonProfileV1",JSON.stringify(profile));}catch(_){profile.images={};localStorage.setItem("carbonProfileV1",JSON.stringify(profile));$("#profileSaveNote").textContent="计划已生成；图片太大，未写入浏览器存储。";}
  applyProfileToPlan(profile); renderAll(); $("#profileSaveNote").textContent="已重算优先级，并更新从本周开始的 4 周计划。"; setTimeout(()=>switchView("today"),350);
}

function muscleFlags(labels=[]){
  const text=labels.join("|");
  return {upperChest:/上胸/.test(text),chest:/胸大肌/.test(text),sideDelt:/中束|肩宽/.test(text),rearDelt:/后束/.test(text),lats:/背阔|大圆/.test(text),midBack:/斜方|菱形|肩胛|胸椎/.test(text),arms:/二头|三头/.test(text),core:/核心|腹部/.test(text),quads:/股四|腿前/.test(text),glutes:/臀|髋/.test(text),hamstrings:/腘绳|后链/.test(text)};
}
function bodyMapSvg(labels=[],variant="day"){
  const f=muscleFlags(labels), hot=key=>`anatomy-hotspot ${key} ${f[key]?"active":""}`, lower=f.quads||f.glutes||f.hamstrings;
  const activeLabels=labels.slice(0,4).map(label=>`<span>${escapeHtml(label)}</span>`).join("");
  return `<div class="body-map anatomy-map ${lower?"lower-map":"upper-map"} ${variant}"><div class="anatomy-stage" role="img" aria-label="正面与背面肌肉纤维图，红色呼吸光标示本次目标肌群"><img src="./assets/anatomy-muscle-map.svg" alt="正面和背面人体肌肉纤维解剖图"><i class="${hot("upperChest")}"></i><i class="${hot("chest")}"></i><i class="${hot("sideDelt")} left"></i><i class="${hot("sideDelt")} right"></i><i class="${hot("arms")} left"></i><i class="${hot("arms")} right"></i><i class="${hot("core")}"></i><i class="${hot("quads")}"></i><i class="${hot("rearDelt")} left"></i><i class="${hot("rearDelt")} right"></i><i class="${hot("midBack")}"></i><i class="${hot("lats")}"></i><i class="${hot("glutes")}"></i><i class="${hot("hamstrings")}"></i><span class="anatomy-label front">FRONT / 正面</span><span class="anatomy-label back">BACK / 背面</span></div><div class="map-targets">${activeLabels||"<span>恢复与位置感</span>"}</div><div class="map-legend"><span><i class="pulse-dot"></i>红色呼吸光＝本次重点</span><span>用于位置识别，不作医学诊断</span></div></div>`;
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
  $("#dayDetail").innerHTML=`<div class="detail-head"><div><div class="eyebrow">DAY ${String(state.day).padStart(2,"0")} · ${day.type==="train"?"TRAIN":"RECOVER"}</div><h2>${day.short}</h2><p>${day.why}</p><div class="muscle-row">${day.muscles.map(m=>`<span class="muscle-chip">${m}</span>`).join("")}</div></div><div class="detail-actions"><span class="status-chip ${day.type==="train"?"red":"green"}">${day.focus}</span><button class="ghost-btn" id="editCurrentDay" type="button">编辑当天</button></div></div><section class="muscle-focus-panel"><div><div class="section-kicker">TARGET MAP · 发力位置</div><h3>${day.type==="train"?"亮起的区域，是今天应该优先感受到的位置":"今天只让这些区域恢复顺畅"}</h3><p>${day.type==="train"?"先在图上建立位置感，再用轻重量热身确认；关节疼痛不等于目标肌群发力。":"红色区域只作活动方向提示，不追求疲劳或极限幅度。"}</p></div>${bodyMapSvg(day.muscles)}</section>${train}${renderMobility(day.mobility)}`;
  $("#editCurrentDay").onclick=()=>openDayDialog(state.day);
}

function loadLogForm() { const log=state.logs[logKey(state.week,state.day)]||{}; $("#completedInput").checked=Boolean(log.completed); ["sleep","soreness","finish","body","notes"].forEach(key=>{const el=$(`#${key}Input`);if(el)el.value=log[key]??"";}); $("#saveNote").textContent=""; }
function saveLog(event) { event.preventDefault(); const sleep=$("#sleepInput").value; state.logs[logKey(state.week,state.day)]={completed:$("#completedInput").checked,sleep:sleep===""?"":Number(sleep),soreness:$("#sorenessInput").value,finish:$("#finishInput").value,body:$("#bodyInput").value,notes:$("#notesInput").value.trim(),updatedAt:new Date().toISOString()}; localStorage.setItem("carbonTrainingLogsV2",JSON.stringify(state.logs)); autoAdjustPriorities(false); $("#saveNote").textContent="已保存。周报、下一周判断和优先肌群已同步更新。"; renderHero();renderDayGrid();renderReports();renderGoals(); }
function selectWeek(week) { state.week=clamp(week,1,state.weeks.length); localStorage.setItem("carbonSelectedWeekV2",state.week); renderAll(); }
function selectDay(day) { state.day=clamp(day,1,7); localStorage.setItem("carbonSelectedDayV2",state.day); renderDayGrid();renderDayDetail();loadLogForm(); if(innerWidth<800)$("#dayDetail").scrollIntoView({behavior:"smooth",block:"start"}); }

function addNextWeek() {
  const previousNumber=state.weeks.length, mode=getReport(previousNumber).mode;
  const week=makeWeek(previousNumber+1,mode);
  if(state.profile){const preset=findPreset(state.profile.mode,state.profile.preset),base=preset.pattern,trainIds=base.filter(id=>dayTemplates[id].type==="train"),shift=previousNumber%trainIds.length;let trainSlot=0;week.days=base.map(id=>dayTemplates[id].type==="rest"?deepClone(dayTemplates[id]):deepClone(dayTemplates[trainIds[(trainSlot+++shift)%trainIds.length]]));week.reason=`延续 ${preset.title} 的重点，并根据 W${previousNumber} 的记录执行${mode==="advance"?"小幅推进":mode==="reduce"?"主动减量":"稳定巩固"}。`;}
  state.weeks.push(week); saveWeeks(); state.week=week.number; state.day=1; localStorage.setItem("carbonSelectedWeekV2",state.week); renderAll();
  switchView("plan"); setTimeout(()=>$("#planGrid").scrollIntoView({behavior:"smooth",block:"start"}),50);
}
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
function reportMetrics(weekNumber){
  const r=getReport(weekNumber), sample=!r.logs.length, seed=weekNumber%4;
  if(sample)return{sample,values:[72+seed*3,70+seed*2,68+seed,74+seed*2,76+seed],labels:["完成","睡眠","恢复","动作","连续"],report:r};
  const recovery=r.soreness==="高"?38:r.soreness==="中"?66:86, movement=r.body==="明显受限"?35:r.body==="有点紧"?68:88, form=r.finish==="出现动作变形"?44:r.finish==="正好完成"?82:r.finish==="有余力"?88:64;
  return{sample,values:[Math.round(r.completion*100),Math.round(clamp(r.sleep/8*100,0,100)),recovery,Math.round((movement+form)/2),Math.round(clamp(r.logs.length/7*100,0,100))],labels:["完成","睡眠","恢复","动作","连续"],report:r};
}
function radarPoints(values,cx=150,cy=145,radius=100){return values.map((value,index)=>{const angle=-Math.PI/2+index*Math.PI*2/values.length,r=radius*value/100;return`${(cx+Math.cos(angle)*r).toFixed(1)},${(cy+Math.sin(angle)*r).toFixed(1)}`;}).join(" ");}
function radarSvg(current,previous){
  const axes=current.labels.map((label,index)=>{const angle=-Math.PI/2+index*Math.PI*2/current.labels.length,x=150+Math.cos(angle)*126,y=145+Math.sin(angle)*126;return`<line x1="150" y1="145" x2="${150+Math.cos(angle)*100}" y2="${145+Math.sin(angle)*100}"/><text x="${x}" y="${y}">${label}</text>`;}).join("");
  const rings=[25,50,75,100].map(value=>`<polygon points="${radarPoints(Array(5).fill(value))}"/>`).join("");
  return `<div class="radar-wrap"><svg viewBox="0 0 300 290" role="img" aria-label="本周与上周训练状态雷达对比"><g class="radar-grid">${rings}${axes}</g><polygon class="radar-prev" points="${radarPoints(previous.values)}"/><polygon class="radar-now" points="${radarPoints(current.values)}"/>${current.values.map((value,index)=>{const angle=-Math.PI/2+index*Math.PI*2/5,r=100*value/100;return`<circle cx="${150+Math.cos(angle)*r}" cy="${145+Math.sin(angle)*r}" r="4"/>`;}).join("")}</svg><div class="metric-bars">${current.labels.map((label,index)=>`<div><span>${label}</span><i><b style="width:${current.values[index]}%"></b></i><strong>${current.values[index]}</strong></div>`).join("")}</div></div>`;
}
const mbtiProfiles={
  INTJ:{name:"结构设计者",trait:"习惯先看长期结构，再把变量逐一校准"},INTP:{name:"机制拆解者",trait:"喜欢理解动作为什么有效，再建立自己的方法"},
  ENTJ:{name:"推进统筹者",trait:"擅长给目标排序，并把决定转成执行"},ENTP:{name:"变化试验者",trait:"善于用新刺激保持兴趣，也需要稳定的主线"},
  INFJ:{name:"内在校准者",trait:"对细微变化敏感，适合把感受沉淀成节律"},INFP:{name:"价值守护者",trait:"愿意为真正认同的状态持续投入"},
  ENFJ:{name:"场域带动者",trait:"会把自己的进步变成可被他人感受到的能量"},ENFP:{name:"能量连接者",trait:"靠新鲜感点火，再用清晰反馈维持连续"},
  ISTJ:{name:"稳态保健官",trait:"重视可靠、秩序和长期可维护的身体系统"},ISFJ:{name:"日常照护者",trait:"擅长用稳定的小动作照顾长期状态"},
  ESTJ:{name:"执行调度者",trait:"会把抽象目标拆成今天必须完成的动作"},ESFJ:{name:"节律维系者",trait:"善于让训练进入可持续的生活节奏"},
  ISTP:{name:"动作工程师",trait:"对轨迹、效率和身体反馈有天然敏感度"},ISFP:{name:"身体感知者",trait:"通过动作质感建立属于自己的表达"},
  ESTP:{name:"现场反应者",trait:"在速度、力量和即时反馈中进入状态"},ESFP:{name:"动能表达者",trait:"会把身体变化转化成直观的存在感"}
};
function identityGrowth(top){
  if(/三角|背阔|斜方|菱形|肩袖/.test(top))return"它带动的不只是肩宽，而是展开感、边界感与更稳定的站姿存在感";
  if(/核心/.test(top))return"它正在把稳定从思考方式落到身体轴线，让动作和决策都更有中心";
  if(/臀|后链/.test(top))return"它正在补足身体的扎根感，让行动更稳，也更能持续输出";
  if(/上胸/.test(top))return"它正在增强正面表达，让上身轮廓更挺拔，但不会靠紧张和耸肩撑起来";
  return"它正在把你的自我理解，慢慢变成能被看见的身体秩序";
}
function identityBaseline(metrics,persona){
  if(persona)return`你更像一名${persona.name}：${persona.trait}。`;
  if(metrics.values[0]>=85&&metrics.values[2]>=70)return"你本身的优势是执行稳定，也愿意为恢复留出空间；不是靠一时兴奋硬顶。";
  if(metrics.values[0]>=80)return"你本身行动力很强，能把计划推进下去；下一步要让恢复也跟上执行速度。";
  return"你正在建立自己的训练节律：先把身体反馈看清，再把偶尔完成变成稳定重复。";
}
function identityTraining(top,week){
  if(/三角|背阔|斜方|菱形|肩袖/.test(top))return`W${week} 把 ${top} 放在最前，正在连接肩宽、肩胛控制和背部轮廓，让上半身不是“撑大”，而是有结构。`;
  if(/核心/.test(top))return`W${week} 以 ${top} 为主线，正在提高肋骨、骨盆和躯干之间的控制，让力量传递更完整。`;
  if(/臀|后链/.test(top))return`W${week} 重点推进 ${top}，正在让髋部发力、下肢稳定和全身运动感连成一条线。`;
  if(/上胸/.test(top))return`W${week} 重点补 ${top}，正在填充锁骨下方的轮廓，同时保留肩颈的放松与肩胛节奏。`;
  return`W${week} 围绕 ${top} 建立可重复刺激，让身体变化来自清楚的主线，而不是随机堆动作。`;
}
function weeklyIdentity(metrics,week){
  const top=state.goalPriorities[0]?.title||"肩背", persona=mbtiProfiles[state.mbti], growth=identityGrowth(top);
  const base=metrics.values[0]>=90?{code:"VECTOR / 90",name:"稳定推进者",line:`W${week} 把计划变成了可重复的节奏。`}:/背阔|三角|斜方|菱形|肩袖/.test(top)?{code:"ARC / V-02",name:"肩背构型者",line:`W${week} 正在把宽度、肩胛控制与背部轮廓连接起来。` }:/臀|核心/.test(top)?{code:"AXIS / Q-01",name:"轴线控制者",line:`W${week} 的重点是让骨盆与核心更稳定。`}:{code:"PULSE / R-03",name:"恢复节律者",line:`W${week} 在训练刺激与恢复之间找到平衡。`};
  const baseline=identityBaseline(metrics,persona),training=identityTraining(top,week),carry=`${growth}。`;
  if(!persona)return{...base,accent:top,growth,baseline,training,carry};
  return{code:`${state.mbti} / ${base.code.split(" / ")[0]}`,name:`${persona.name} · ${base.name}`,line:`${baseline}${training}${carry}`,accent:top,growth,baseline,training,carry};
}
function identityAvatarPath(){return state.identityGender==="female"?"./assets/identity-guardian-female-v1.svg":"./assets/identity-guardian-male-v1.svg";}
function renderShareIdentity(week,metrics){
  const card=weeklyIdentity(metrics,week), profileTitle=state.profile?findPreset(state.profile.mode,state.profile.preset).title:"长期训练";
  $("#shareCard").innerHTML=`<div class="identity-card"><div class="identity-no">W${String(week).padStart(2,"0")}</div><img class="identity-avatar" src="${identityAvatarPath()}" alt="原创卡通肌肉健康守护者玩偶形象"><div class="identity-content"><span>${card.code}</span><h2>${card.name}</h2><div class="identity-readout"><section><b>01 / 你本身</b><p>${card.baseline}</p></section><section><b>02 / 训练在做什么</b><p>${card.training}</p></section><section><b>03 / 正在带动什么</b><p>${card.carry}</p></section></div></div><div class="identity-foot"><span>${profileTitle} · 重点 ${card.accent}</span><strong>${metrics.values[0]}% 完成 · ${metrics.values[2]} 恢复</strong></div></div>`;
  return card;
}
function renderReports(){
  const select=$("#reportWeekSelect"); select.innerHTML=state.weeks.map((w,i)=>`<option value="${i+1}">W${i+1} · ${w.name}</option>`).join(""); const week=Math.min(Number(select.dataset.selected||state.week),state.weeks.length); select.value=week;
  const r=getReport(week), metrics=reportMetrics(week), display=metrics.sample?[["完成率 · 示例",`${metrics.values[0]}%`],["平均睡眠 · 示例","7.2 小时"],["肌肉酸痛 · 示例","低"],["完成状态 · 示例","稳定完成"],["肩颈 / 髋 · 示例","有点紧"]]:[["完成率",`${Math.round(r.completion*100)}%`],["平均睡眠",fmtSleep(r.sleep)],["肌肉酸痛",r.soreness],["完成状态",r.finish],["肩颈 / 髋",r.body]]; $("#reportStats").innerHTML=display.map(x=>`<div class="stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  const copy=reportCopy(r.mode); $("#recommendationCard").innerHTML=`<div class="recommendation-icon">→</div><div><span class="status-chip ${copy.cls}">${copy.label}</span><h3>${copy.title}</h3><p>${copy.text}</p></div>`;
  const previous=reportMetrics(Math.max(1,week-1));
  const weekPlan=state.weeks[week-1], activeMuscles=weekPlan.days.flatMap((day,index)=>state.logs[logKey(week,index+1)]?.completed?day.muscles:[]); const labels=activeMuscles.length?activeMuscles:weekPlan.days.filter(d=>d.type==="train").slice(0,2).flatMap(d=>d.muscles);
  $("#reportBodyMap").innerHTML=bodyMapSvg(labels,"report"); $("#bodySignalTag").textContent=metrics.sample?"示例预览 · 记录后替换":"来自本周记录";
  $("#reportRadar").innerHTML=radarSvg(metrics,previous); $("#mbtiInput").value=state.mbti; $("#genderInput").value=state.identityGender; renderShareIdentity(week,metrics); $("#shareWeekCard").dataset.week=week;
}
function priorityMuscleMatch(goalTitle,muscle=""){
  if(goalTitle==="三角肌中束")return /三角肌中束/.test(muscle);
  if(goalTitle==="三角肌后束")return /三角肌后束/.test(muscle);
  if(/背阔/.test(goalTitle))return /背阔|大圆/.test(muscle);
  if(/上胸/.test(goalTitle))return /上胸/.test(muscle);
  if(/中下斜方/.test(goalTitle))return /斜方|菱形|肩胛/.test(muscle);
  if(/前锯/.test(goalTitle))return /前锯|肩袖/.test(muscle);
  if(/腹部/.test(goalTitle))return /核心|腹部/.test(muscle);
  if(/臀腿/.test(goalTitle))return /臀|腘绳|后链/.test(muscle);
  return muscle.includes(goalTitle);
}
function autoAdjustPriorities(showNote=true){
  const completed=[];
  state.weeks.forEach((week,weekIndex)=>week.days.forEach((day,dayIndex)=>{const log=state.logs[logKey(weekIndex+1,dayIndex+1)];if(log?.completed)completed.push({week:weekIndex+1,day,log});}));
  const activeWeeks=[...new Set(completed.map(x=>x.week))].slice(-3), recent=completed.filter(x=>activeWeeks.includes(x.week));
  if(!recent.length){state.priorityNote="还没有已完成训练记录，当前前三沿用你的目标建档。";localStorage.setItem("carbonPriorityNoteV1",state.priorityNote);if(showNote)renderGoals();return;}
  const targets={"三角肌中束":12,"三角肌后束":10,"背阔肌 / 大圆肌":12,"上胸锁骨部":9,"中下斜方 / 菱形肌":8,"前锯肌 / 肩袖":6,"腹部抗旋转 / 抗伸展":8,"臀腿后链":10};
  const baseTitles=state.profile?personalizedPriorityTitles(state.profile,findPreset(state.profile.mode,state.profile.preset)):goals.map(g=>g.title);
  const ranked=state.goalPriorities.map(item=>{
    let sets=0,recoveryHits=0;
    recent.forEach(({day,log})=>{(day.exercises||[]).forEach(exercise=>{if(priorityMuscleMatch(item.title,exercise.muscle))sets+=Number(exercise.sets)||0;});if(log.soreness==="high"&&day.muscles.some(muscle=>priorityMuscleMatch(item.title,muscle)))recoveryHits+=1;});
    const weeklyTarget=targets[item.title]||8, expected=weeklyTarget*Math.max(1,activeWeeks.length), deficit=Math.max(0,expected-sets), baseIndex=Math.max(0,baseTitles.indexOf(item.title));
    return{...item,_autoScore:(40-baseIndex*3)+deficit*1.25-recoveryHits*7,_sets:sets};
  }).sort((a,b)=>b._autoScore-a._autoScore).map(({_autoScore,_sets,...item})=>item);
  state.goalPriorities=ranked; state.priorityNote=`已读取最近 ${activeWeeks.length} 周的完成记录：训练覆盖不足的部位会上移；高酸痛部位会暂时降级恢复。`;
  savePriorities();localStorage.setItem("carbonPriorityNoteV1",state.priorityNote);if(showNote)renderGoals();
}
function renderGoals(){
  const grid=$("#goalGrid"), card=(g,index)=>`<article class="goal-card priority-card" data-rank="${String(index+1).padStart(2,"0")}" data-goal-index="${index}" draggable="true"><div class="goal-card-top"><span class="drag-handle">↕ 拖动</span><span class="tag">优先 ${String(index+1).padStart(2,"0")}</span></div><h3>${g.title}</h3><p>${g.effect}</p><div class="dose">${g.dose}</div></article>`;
  grid.innerHTML=`<div class="priority-summary"><span class="pulse-dot"></span><p>${state.priorityNote}</p></div><div class="goal-grid priority-primary">${state.goalPriorities.slice(0,3).map(card).join("")}</div><details class="priority-more"><summary><span>其余 5 个支持位</span><small>需要时展开、拖动或提到前三</small></summary><div class="goal-grid priority-secondary">${state.goalPriorities.slice(3).map((g,index)=>card(g,index+3)).join("")}</div></details>`;
  $$('.priority-card').forEach(card=>{card.ondragstart=()=>{draggedGoal=Number(card.dataset.goalIndex);card.classList.add('dragging');};card.ondragend=()=>{draggedGoal=null;card.classList.remove('dragging');};card.ondragover=e=>{e.preventDefault();card.classList.add('drag-over');};card.ondragleave=()=>card.classList.remove('drag-over');card.ondrop=e=>{e.preventDefault();card.classList.remove('drag-over');const to=Number(card.dataset.goalIndex);if(draggedGoal===null||draggedGoal===to)return;const [item]=state.goalPriorities.splice(draggedGoal,1);state.goalPriorities.splice(to,0,item);savePriorities();renderGoals();};});
}

async function shareWeekCard(){
  const week=Number($("#shareWeekCard").dataset.week||state.week),metrics=reportMetrics(week),identity=weeklyIdentity(metrics,week),canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1350;const c=canvas.getContext("2d"),score=Math.round(metrics.values[0]*.45+metrics.values[2]*.3+metrics.values[3]*.25);let avatar=null;try{avatar=await loadCanvasImage(identityAvatarPath());}catch(_){}
  c.fillStyle="#060606";c.fillRect(0,0,1080,1350);const glow=c.createRadialGradient(790,330,20,790,330,420);glow.addColorStop(0,"rgba(255,74,61,.25)");glow.addColorStop(1,"rgba(255,74,61,0)");c.fillStyle=glow;c.fillRect(360,0,720,780);c.fillStyle="#ff4a3d";c.fillRect(64,58,952,10);c.strokeStyle="#2b2826";c.lineWidth=2;c.strokeRect(64,58,952,1230);
  c.fillStyle="#938c86";c.font="800 26px system-ui";c.fillText(`CARBON / WEEK ${String(week).padStart(2,"0")}`,92,120);c.fillStyle="#ff4a3d";c.font="850 29px system-ui";c.fillText(identity.code,92,170);c.fillStyle="#f5f1ed";c.font=state.mbti?"900 52px system-ui":"900 68px system-ui";wrapCanvasText(c,identity.name,92,238,810,66);
  if(avatar)c.drawImage(avatar,590,150,390,585);
  c.fillStyle="#ff8278";c.font="850 22px system-ui";c.fillText("01 / 你本身",92,350);c.fillStyle="#c8c1ba";c.font="29px system-ui";wrapCanvasText(c,identity.baseline,92,398,440,43);
  c.fillStyle="#ff8278";c.font="850 22px system-ui";c.fillText("02 / 训练在做什么",92,555);c.fillStyle="#c8c1ba";c.font="29px system-ui";wrapCanvasText(c,identity.training,92,603,460,43);
  c.fillStyle="#11100f";c.fillRect(82,790,916,390);c.strokeStyle="#302c29";c.strokeRect(82,790,916,390);
  c.strokeStyle="#272422";c.lineWidth=28;c.beginPath();c.arc(245,995,112,0,Math.PI*2);c.stroke();c.strokeStyle="#ff4a3d";c.lineCap="round";c.beginPath();c.arc(245,995,112,-Math.PI/2,-Math.PI/2+Math.PI*2*score/100);c.stroke();c.lineCap="butt";c.fillStyle="#f5f1ed";c.font="900 64px system-ui";c.textAlign="center";c.fillText(String(score),245,1015);c.fillStyle="#8e8781";c.font="800 20px system-ui";c.fillText("本周状态",245,1055);c.textAlign="left";
  c.fillStyle="#ff8278";c.font="850 22px system-ui";c.fillText("03 / 正在带动什么",430,845);c.fillStyle="#ddd6cf";c.font="29px system-ui";wrapCanvasText(c,identity.carry,430,892,500,43);
  [["完成",metrics.values[0]],["恢复",metrics.values[2]],["动作",metrics.values[3]]].forEach(([label,value],index)=>{const x=430+index*174;c.fillStyle="#1d1b19";c.fillRect(x,1052,154,86);c.fillStyle="#8e8781";c.font="800 19px system-ui";c.fillText(label,x+16,1080);c.fillStyle="#f5f1ed";c.font="900 34px system-ui";c.fillText(String(value),x+16,1122);});
  c.fillStyle="#716b65";c.font="24px system-ui";c.fillText(`重点肌群 · ${identity.accent}`,92,1230);c.fillStyle="#f2efeb";c.font="800 25px system-ui";c.fillText("CARBON TRAINING CONSOLE",92,1268);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png")); if(!blob)return; const file=new File([blob],`carbon-week-${week}.png`,{type:"image/png"});
  try{if(navigator.share&&navigator.canShare?.({files:[file]})){await navigator.share({title:`${identity.name} · W${week}`,text:identity.line,files:[file]});return;}}catch(error){if(error.name==="AbortError")return;}
  const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=file.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function loadCanvasImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight){const words=[...text];let line="",lineNo=0;words.forEach((word,index)=>{const test=line+word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y+lineNo*lineHeight);line=word;lineNo++;}else line=test;if(index===words.length-1)ctx.fillText(line,x,y+lineNo*lineHeight);});}

function getFoodVariant(category){const entry=state.food[category.id]||{count:0,variant:category.defaultVariant};return category.variants.find(v=>v.id===entry.variant)||category.variants[0];}
function renderProtein(){
  $("#proteinFoods").innerHTML=foodCategories.map(category=>{const entry=state.food[category.id]||{count:0,variant:category.defaultVariant};const variant=getFoodVariant(category);return `<div class="food-row"><div class="food-copy"><strong>${category.name}</strong>${category.variants.length>1?`<select data-food-variant="${category.id}">${category.variants.map(v=>`<option value="${v.id}" ${v.id===variant.id?"selected":""}>${v.label} · ${v.protein}g 蛋白</option>`).join("")}</select>`:`<small>${variant.label} · 约 ${variant.protein}g 蛋白</small>`}</div><div class="stepper"><button type="button" data-food="${category.id}" data-delta="-1">−</button><output>${entry.count||0} ${category.unit}</output><button type="button" data-food="${category.id}" data-delta="1">＋</button></div></div>`}).join("");
  const total=foodCategories.reduce((sum,c)=>{const entry=state.food[c.id]||{count:0};return sum+(entry.count||0)*getFoodVariant(c).protein;},0); const rounded=Math.round(total); $("#proteinTotal").textContent=`${rounded}g`; const diff=rounded-120; $("#proteinStatus").textContent=Math.abs(diff)<=5?"已接近 120g":diff<0?`还差约 ${Math.abs(diff)}g`:`高出约 ${diff}g`; $("#proteinTotal").style.color=Math.abs(diff)<=10?"var(--green)":"var(--red)";
  $$("[data-food]").forEach(btn=>btn.onclick=()=>{const id=btn.dataset.food,category=foodCategories.find(f=>f.id===id);const entry=state.food[id]||{count:0,variant:category.defaultVariant};entry.count=clamp((entry.count||0)+Number(btn.dataset.delta),0,12);state.food[id]=entry;saveFood();renderProtein();});
  $$('[data-food-variant]').forEach(select=>select.onchange=()=>{const id=select.dataset.foodVariant,category=foodCategories.find(f=>f.id===id);const entry=state.food[id]||{count:0,variant:category.defaultVariant};entry.variant=select.value;state.food[id]=entry;saveFood();renderProtein();});
}
function saveFood(){localStorage.setItem("carbonProteinBuilderV2",JSON.stringify(state.food));}
function resetProtein(){state.food=Object.fromEntries(foodCategories.map(f=>[f.id,{count:f.defaultCount,variant:f.defaultVariant}]));saveFood();renderProtein();}

function switchView(name){$$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));if(name==='profile')renderProfile();if(name==='plan')renderPlan();if(name==='report')renderReports();if(name==='targets')renderGoals();window.scrollTo({top:0,behavior:'smooth'});}

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

function renderAll(){renderProfile();renderWeekSwitcher();renderHero();renderDayGrid();renderDayDetail();loadLogForm();renderPlan();renderReports();renderGoals();renderProtein();}

function registerWebMCP(){
  const context=document.modelContext;if(!context?.registerTool)return;
  const safeWeek=input=>{const week=Number(input?.week);if(!Number.isInteger(week)||week<1||week>state.weeks.length)throw new Error(`week 必须是 1 到 ${state.weeks.length} 的整数`);return week;};
  const tools=[
    {name:'read_week_plan',title:'读取长期周训练计划',description:'读取任意已生成周的7天主题、核心肌群和训练动作。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1}},required:['week'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){const week=safeWeek(input),plan=state.weeks[week-1];return{week,focus:plan.name,load:plan.load,reason:plan.reason,days:plan.days.map((d,i)=>({day:i+1,type:d.type,theme:d.short,muscles:d.muscles,exercises:(d.exercises||[]).map(e=>({muscle:e.muscle,name:e.name,prescription:`${e.sets}组，每组${e.reps}，休息${e.rest}秒`,cue:e.cue}))}))};}},
    {name:'add_next_week',title:'生成下一周',description:'根据最近一周反馈生成可编辑的新一周，并自动变换训练日顺序。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(){addNextWeek();const week=state.weeks.length;return{created:true,week,focus:state.weeks[week-1].name,load:state.weeks[week-1].load};}},
    {name:'record_workout_feedback',title:'记录训练反馈',description:'用完成情况、睡眠、低中高酸痛、完成状态和身体感受记录训练。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1},day:{type:'integer',minimum:1,maximum:7},completed:{type:'boolean'},sleep:{type:'number',minimum:0,maximum:12},soreness:{type:'string',enum:['low','medium','high']},finish:{type:'string',enum:['easy','just','form_break']},body:{type:'string',enum:['smooth','tight_ok','limited']},notes:{type:'string',maxLength:500}},required:['week','day','completed'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){const week=safeWeek(input),day=Number(input.day);if(!Number.isInteger(day)||day<1||day>7)throw new Error('day 必须是 1 到 7 的整数');state.logs[logKey(week,day)]={...input,updatedAt:new Date().toISOString()};localStorage.setItem('carbonTrainingLogsV2',JSON.stringify(state.logs));autoAdjustPriorities(false);renderAll();return{saved:true,week,day,recommendation:reportCopy(getReport(week).mode),topPriorities:state.goalPriorities.slice(0,3).map(x=>x.title)};}},
    {name:'read_week_report',title:'读取周报',description:'读取指定周的完成率、睡眠与人话版恢复反馈。',inputSchema:{type:'object',properties:{week:{type:'integer',minimum:1}},required:['week'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){const week=safeWeek(input),r=getReport(week);return{week,completionPercent:Math.round(r.completion*100),averageSleep:r.sleep,soreness:r.soreness,finish:r.finish,body:r.body,recommendation:reportCopy(r.mode)};}},
    {name:'update_training_profile',title:'更新训练目标建档',description:'按增肌塑形或体态调整目标更新方向与备注，并从当前周重算四周计划。',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['muscle','posture']},preset:{type:'string',enum:['combat','upper','balanced','shoulder','hip','whole','headneck','asymmetry','breath']},weight:{type:'number',minimum:35,maximum:200},bodyFat:{type:'number',minimum:3,maximum:50},trainingAge:{type:'string',enum:['starter','regular','experienced']},mbti:{type:'string',enum:['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP']},gender:{type:'string',enum:['male','female']},notes:{type:'string',maxLength:500}},required:['mode','preset'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){const allowed=(profilePresets[input.mode]||[]).some(item=>item.id===input.preset);if(!allowed)throw new Error('preset 与 mode 不匹配');if(input.mbti){state.mbti=input.mbti;localStorage.setItem('carbonMbtiV1',state.mbti);}if(input.gender){state.identityGender=input.gender;localStorage.setItem('carbonIdentityGenderV1',state.identityGender);}const {mbti,gender,...profileInput}=input,profile={...(state.profile||{}),...profileInput,images:state.profile?.images||{},updatedAt:new Date().toISOString()};state.profile=profile;localStorage.setItem('carbonProfileV1',JSON.stringify(profile));applyProfileToPlan(profile);renderAll();return{saved:true,focus:findPreset(profile.mode,profile.preset).title,priorities:state.goalPriorities.slice(0,3).map(x=>x.title),weeks:[state.week,state.week+1,state.week+2,state.week+3],mbti:state.mbti||null,gender:state.identityGender};}}
  ];
  tools.forEach(tool=>{try{void Promise.resolve(context.registerTool(tool)).catch(()=>{});}catch(_){}});
}

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  $("#logForm").addEventListener('submit',saveLog); $("#reportWeekSelect").addEventListener('change',e=>{e.currentTarget.dataset.selected=e.currentTarget.value;renderReports();}); $("#resetProtein").onclick=resetProtein;
  $("#profileForm").addEventListener('submit',saveProfile);
  $$('input[name="profileMode"]').forEach(input=>input.onchange=e=>{$("#goalPresets").innerHTML=presetCards(e.target.value,profilePresets[e.target.value][0].id);});
  [["goal","#goalImageInput"],["front","#frontImageInput"],["back","#backImageInput"]].forEach(([kind,id])=>$(id).onchange=e=>handleProfileImage(kind,e.target.files?.[0]));
  $("#openProfileFromTargets").onclick=()=>switchView('profile'); $("#autoPrioritySort").onclick=()=>autoAdjustPriorities(true); $("#shareWeekCard").onclick=shareWeekCard;
  $("#mbtiInput").onchange=e=>{state.mbti=e.target.value;localStorage.setItem("carbonMbtiV1",state.mbti);renderReports();};
  $("#genderInput").onchange=e=>{state.identityGender=e.target.value;localStorage.setItem("carbonIdentityGenderV1",state.identityGender);renderReports();};
  $$('.nav-btn').forEach(btn=>btn.onclick=()=>switchView(btn.dataset.view));
  ["#addWeek","#addWeekHero","#addWeekPlan"].forEach(id=>$(id).onclick=addNextWeek); ["#editWeekHero","#editWeekPlan"].forEach(id=>$(id).onclick=openWeekDialog);
  $("#saveWeekEdit").onclick=saveWeekEdit; $("#saveDayEdit").onclick=saveDayEdit;
  $("#dayTypeInput").onchange=e=>$("#trainEditor").hidden=e.target.value!=="train";
  $("#addExercise").onclick=()=>{const list=readExerciseEditors();if(list.length>=5)return;list.push(ex(muscleOptions[0],exerciseBank[muscleOptions[0]][0],3,'8–12 次',75,'动作保持稳定，不借力。','服务于当天目标肌群。'));renderExerciseEditors(list);};
  registerWebMCP();
});
