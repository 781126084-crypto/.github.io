import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js";

const instances = new WeakMap();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function material(active=false, tone=0x443531) {
  return new THREE.MeshStandardMaterial({
    color: active ? 0xd93628 : tone,
    roughness: active ? 0.38 : 0.68,
    metalness: active ? 0.08 : 0.02,
    emissive: active ? 0xff2418 : 0x080403,
    emissiveIntensity: active ? 0.72 : 0.08
  });
}

function buildViewer(stage) {
  const canvas = stage.querySelector("canvas");
  const active = new Set((stage.dataset.muscles || "").split(",").filter(Boolean));
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:"high-performance"});
  } catch (_) {
    const loading=stage.querySelector(".muscle-3d-loading");
    stage.classList.add("fallback");
    loading.innerHTML='<img src="./assets/anatomy-muscle-map.svg" alt="正面与背面人体肌肉图"><strong>当前设备暂不支持 3D，已显示平面定位图</strong>';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  stage.classList.remove("fallback");
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070505, 0.075);
  const camera = new THREE.PerspectiveCamera(31, 1, .1, 30);
  camera.position.set(0, .15, 9.4);
  camera.lookAt(0, .15, 0);

  const body = new THREE.Group();
  body.position.y = -.05;
  scene.add(body);
  const highlighted = [];

  const isActive = keys => keys.some(key => active.has(key));
  function ellipsoid(keys, position, scale, tone=0x493833, segments=28) {
    const selected=isActive(Array.isArray(keys)?keys:[keys]);
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,segments,Math.max(12,Math.round(segments*.65))),material(selected,tone));
    mesh.position.set(...position); mesh.scale.set(...scale); body.add(mesh);
    if(selected)highlighted.push({mesh,base:mesh.scale.clone(),phase:highlighted.length*.55});
    return mesh;
  }
  function capsule(keys, position, radius, length, scale=[1,1,1], rotation=[0,0,0], tone=0x493833) {
    const selected=isActive(Array.isArray(keys)?keys:[keys]);
    const mesh=new THREE.Mesh(new THREE.CapsuleGeometry(radius,length,8,18),material(selected,tone));
    mesh.position.set(...position); mesh.scale.set(...scale); mesh.rotation.set(...rotation); body.add(mesh);
    if(selected)highlighted.push({mesh,base:mesh.scale.clone(),phase:highlighted.length*.55});
    return mesh;
  }

  // Neutral silhouette behind the selectable muscle volumes.
  ellipsoid([], [0,1.62,0], [1.04,1.34,.49],0x392e2b,36);
  ellipsoid([], [0,.12,0], [.82,.63,.43],0x362b29,30);
  capsule([], [0,2.72,0],.22,.35,[1,1,.9]);
  ellipsoid([], [0,3.38,0], [.48,.62,.46],0x59433c,30);

  [-1,1].forEach(side=>{
    ellipsoid(["upperChest"],[side*.43,2.08,.43],[.52,.31,.18],0x5a3d36);
    ellipsoid(["chest"],[side*.43,1.73,.46],[.55,.38,.2],0x573a34);
  });
  [1.32,.92,.52].forEach(y=>[-1,1].forEach(side=>ellipsoid(["core"],[side*.23,y,.47],[.2,.25,.13],0x513732,20)));
  ellipsoid(["core"],[0,.16,.42],[.44,.38,.15],0x49322e,24);

  [-1,1].forEach(side=>{
    ellipsoid(["sideDelt"],[side*1.12,2.12,0],[.43,.46,.42],0x533a35,26);
    ellipsoid(["rearDelt"],[side*1.06,2.08,-.34],[.4,.39,.2],0x523832,24);
    capsule(["arms"],[side*1.28,1.23,.02],.29,.82,[.93,1,.92],[0,0,side*-.08],0x4c3732);
    ellipsoid(["arms"],[side*1.32,1.38,.29],[.25,.48,.18],0x513732,22);
    capsule(["arms"],[side*1.31,.18,.02],.23,.78,[.88,1,.85],[0,0,side*.03],0x493530);
    ellipsoid([], [side*1.31,-.48,.05],[.24,.31,.18],0x51403a,20);
  });

  ellipsoid(["midBack"],[0,1.92,-.43],[.64,.72,.17],0x503630,28);
  ellipsoid(["midBack"],[0,1.18,-.45],[.42,.58,.14],0x49312d,24);
  [-1,1].forEach(side=>ellipsoid(["lats"],[side*.58,1.25,-.41],[.5,.86,.18],0x4e3530,28));

  [-1,1].forEach(side=>{
    ellipsoid(["glutes"],[side*.4,.05,-.4],[.48,.49,.28],0x513832,26);
    capsule(["quads"],[side*.48,-1.03,.14],.38,1.03,[.94,1,.9],[0,0,side*.025],0x4a3530);
    capsule(["hamstrings"],[side*.48,-1.06,-.2],.34,.98,[.9,1,.82],[0,0,side*.025],0x46322e);
    capsule([], [side*.48,-2.45,.01],.27,.95,[.9,1,.9],[0,0,side*-.02],0x42322e);
    ellipsoid([], [side*.48,-3.18,.14],[.34,.22,.57],0x4b3a34,22);
  });

  const keyLight=new THREE.DirectionalLight(0xffd7c8,3.2); keyLight.position.set(3.6,5.2,5.6); scene.add(keyLight);
  const rim=new THREE.DirectionalLight(0xff3a2c,2.2); rim.position.set(-4,2.5,-4); scene.add(rim);
  const fill=new THREE.DirectionalLight(0x6d8dff,1.15); fill.position.set(2,-1,-4); scene.add(fill);
  scene.add(new THREE.HemisphereLight(0x78665f,0x0b0807,1.25));

  const floor=new THREE.Mesh(new THREE.CircleGeometry(3.25,64),new THREE.MeshBasicMaterial({color:0x3b100d,transparent:true,opacity:.22,depthWrite:false}));
  floor.rotation.x=-Math.PI/2; floor.position.y=-3.43; scene.add(floor);
  const ring=new THREE.Mesh(new THREE.RingGeometry(2.25,2.28,96),new THREE.MeshBasicMaterial({color:0xff4a3d,transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false}));
  ring.rotation.x=-Math.PI/2; ring.position.y=-3.41; scene.add(ring);

  body.rotation.y=-.28;
  let autoRotate=!reduceMotion, dragging=false, lastX=0, lastY=0, visible=true, disposed=false;
  const toggle=stage.querySelector('[data-muscle-action="toggle"]');
  const reset=stage.querySelector('[data-muscle-action="reset"]');
  function updateToggle(){toggle.textContent=autoRotate?"暂停旋转":"自动旋转";}
  updateToggle();
  toggle.addEventListener("click",event=>{event.stopPropagation();autoRotate=!autoRotate;updateToggle();});
  reset.addEventListener("click",event=>{event.stopPropagation();body.rotation.set(0,-.28,0);camera.position.z=9.4;});
  canvas.addEventListener("pointerdown",event=>{dragging=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener("pointermove",event=>{if(!dragging)return;const dx=event.clientX-lastX,dy=event.clientY-lastY;body.rotation.y+=dx*.009;body.rotation.x=THREE.MathUtils.clamp(body.rotation.x+dy*.005,-.35,.35);lastX=event.clientX;lastY=event.clientY;});
  canvas.addEventListener("pointerup",()=>{dragging=false;});
  canvas.addEventListener("pointercancel",()=>{dragging=false;});
  canvas.addEventListener("wheel",event=>{event.preventDefault();camera.position.z=THREE.MathUtils.clamp(camera.position.z+event.deltaY*.006,7.2,11.4);},{passive:false});

  function resize(){const width=stage.clientWidth,height=stage.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();}
  const resizeObserver=new ResizeObserver(resize); resizeObserver.observe(stage); resize();
  const intersectionObserver=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;},{threshold:.01}); intersectionObserver.observe(stage);
  const clock=new THREE.Clock();
  function animate(){
    if(disposed)return;
    if(!canvas.isConnected){disposed=true;resizeObserver.disconnect();intersectionObserver.disconnect();renderer.dispose();return;}
    requestAnimationFrame(animate);
    if(!visible)return;
    const time=clock.getElapsedTime();
    if(autoRotate&&!dragging)body.rotation.y+=.0026;
    if(!reduceMotion)highlighted.forEach(({mesh,base,phase})=>{const wave=(Math.sin(time*3+phase)+1)/2,scale=1+wave*.035;mesh.scale.copy(base).multiplyScalar(scale);mesh.material.emissiveIntensity=.55+wave*1.25;});
    renderer.render(scene,camera);
    stage.classList.add("ready");
  }
  animate();
  instances.set(stage,{renderer});
}

function initMuscle3D(){document.querySelectorAll(".muscle-3d-stage").forEach(stage=>{if(!instances.has(stage))buildViewer(stage);});}
document.addEventListener("carbon:muscle3d",initMuscle3D);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initMuscle3D);else initMuscle3D();
