import * as THREE from '../node_modules/three/build/three.module.js';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf1e2f1);

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2; // 도형이 안나온다면 카메라 위치 조절해보기

// 렌더러
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 곡선 매끄럽게
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 빛
const pointLight = new THREE.PointLight(0xffffff, 1); // 색, 세기
pointLight.position.set(0, 2, 12); // x, y, z
scene.add(pointLight);

// 도형
const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 정육면체, x, y, z
const meterial1 = new THREE.MeshStandardMaterial({ color: 0x049ef4 });
const obj1 = new THREE.Mesh(geometry1, meterial1);
obj1.position.x = -1; // 좌측으로 1만큼 이동
scene.add(obj1);

const geometry2 = new THREE.ConeGeometry(0.4, 0.7, 6); // 각뿔, 반지름, 높이, n각뿔
const meterial2 = new THREE.MeshStandardMaterial({ color: 0x152441 });
const obj2 = new THREE.Mesh(geometry2, meterial2);
scene.add(obj2);

const geometry3 = new THREE.TorusGeometry(0.3, 0.12, 16); // 도넛, 반지름, 도넛 두께, 둥근 정도
const meterial3 = new THREE.MeshStandardMaterial({ color: 0xf4f2f5 });
const obj3 = new THREE.Mesh(geometry3, meterial3);
obj3.position.x = 1;
scene.add(obj3);

const render = time => {
  time *= 0.001; // 초 단위로 바꾸기
  obj1.rotation.x = time; // 회전시키기
  obj1.rotation.y = time;
  obj2.rotation.x = time;
  obj2.rotation.y = time;
  obj3.rotation.x = time;
  obj3.rotation.y = time;
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
