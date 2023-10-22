import * as THREE from '../node_modules/three/build/three.module.js';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf1e2f1);

// 카메라
const camera = new THREE.PerspectiveCamera(
  75, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  0.1, // 카메라 시점 시작
  1000 // 카메라 시점 종료 ➡️ 카메라 시점 시작보다 작거나 시점 종료보다 큰 위치에 존재하면 카메라에 ❌
);
camera.position.z = 2; // 도형이 안나온다면 카메라 위치 조절해보기
camera.lookAt(new THREE.Vector3(0, 0, 0)); // 카메라가 (0, 0, 0) 바라보도록

// 렌더러
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 곡선 매끄럽게
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 빛

// pointLight ➡️ 전구
const pointLight = new THREE.PointLight(0xffffff, 70); // 색, 세기
pointLight.position.set(0, 10, 12); // x, y, z ➡️ 도형이 까맣게 나오면 위치(혹은 세기) 조절
// const pointLightHepler = new THREE.PointLightHelper(pointLight, 3, 0x0000ff); // pointLight의 이동경로 및 위치 확인 가능
// scene.add(pointLightHepler);
scene.add(pointLight);

// ambientLight ➡️ 모든 object 대상으로 전역에서 비춤, 그림자❌
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 모든 object 대상으로 전역에서 비춤, 그림자❌
// scene.add(ambientLight);

// directionalLight ➡️ 태양, 그림자 표현 가능
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 색, 세기
// directionalLight.position.set(1, 1, 1);
// const directionalLightHelper = new THREE.DirectionalLightHelper( // directionalLight의 이동경로 및 위치 확인 가능
//   directionalLight, // 확인할 빛
//   0.5,
//   0x0000ff
// );
// scene.add(directionalLightHelper);
// scene.add(directionalLight);

// hemisphereLight ➡️ 하늘과 지상 사이의 물체가 그라데이션으로 표현
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1); // 하늘색, 지상색, 세기
// scene.add(hemisphereLight);

// rectAreaLight ➡️ 은은한 빛
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5); // 색, 넓이, 높이, 강도
// rectAreaLight.position.set(0.5, 0.5, 1);
// scene.add(rectAreaLight);

// spotLight ➡️ 공연장 같은 빛
// const spotLight = new THREE.SpotLight(0xffffff, 0.5); // 색, 세기
// scene.add(spotLight);

// 텍스쳐
const textureLoader = new THREE.TextureLoader();
const textureBaseColor = textureLoader.load(
  '../static/img/Stone_Path_008_basecolor.jpg'
);
const textureHeightMap = textureLoader.load(
  '../static/img/Stone_Path_008_height.png'
);
const textureNormalMap = textureLoader.load(
  '../static/img/Stone_Path_008_normal.jpg'
);
const textureRoughnessrMap = textureLoader.load(
  '../static/img/Stone_Path_008_roughness.jpg'
);

// 도형
const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 정육면체, x, y, z
const meterial1 = new THREE.MeshStandardMaterial({ map: textureBaseColor }); // map으로 텍스쳐 추가
const obj1 = new THREE.Mesh(geometry1, meterial1);
obj1.position.x = -2; // 좌측으로 2만큼 이동
scene.add(obj1);

const geometry2 = new THREE.ConeGeometry(0.4, 0.7, 6); // 각뿔, 반지름, 높이, n각뿔
const meterial2 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap // 빛에 따라 더 입체감있게 표현
});
const obj2 = new THREE.Mesh(geometry2, meterial2);
obj2.position.x = -1;
scene.add(obj2);

const geometry3 = new THREE.TorusGeometry(0.3, 0.12, 16); // 도넛, 반지름, 도넛 두께, 둥근 정도
const meterial3 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap,
  displacementMap: textureHeightMap, // 밝기에 따라 높낮이 조절 ➡️ 입체적으로 표현
  displacementScale: 0.15 // 높낮이 조절 (기본은 1)
});
const obj3 = new THREE.Mesh(geometry3, meterial3);
scene.add(obj3);

const geometry4 = new THREE.IcosahedronGeometry(0.35, 0); // 정이십면체, 반지름, 각 개수(크면 원에 가까워짐)
const meterial4 = new THREE.MeshStandardMaterial({ color: 0x1f7d5 });
const obj4 = new THREE.Mesh(geometry4, meterial4);
obj4.position.x = 1;
scene.add(obj4);

const geometry5 = new THREE.SphereGeometry(0.3); // 구, 반지름
const meterial5 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap,
  displacementMap: textureHeightMap,
  displacementScale: 0.2,
  roughnessMap: textureRoughnessrMap, // 빛에 반사되는 정도
  roughness: 0.5 // 0에 가까울수록 잘 반사됨
});
const obj5 = new THREE.Mesh(geometry5, meterial5);
obj5.position.x = 2;
scene.add(obj5);

// 바닥 추가
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1); // 넓이, 높이, 수평세그먼트, 수직세그먼트
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
scene.add(plane);

const render = time => {
  time *= 0.001; // 초 단위로 바꾸기
  obj1.rotation.x = time; // 회전시키기
  obj1.rotation.y = time;
  obj2.rotation.x = time;
  obj2.rotation.y = time;
  obj3.rotation.x = time;
  obj3.rotation.y = time;
  obj4.rotation.x = time;
  obj4.rotation.y = time;
  obj5.rotation.x = time;
  obj5.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);

// 반응형 ➡️ 첫 렌더링 후 사이즈 변경 시 적용
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight; // 좌우비율 바뀌어도 유지
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize);
