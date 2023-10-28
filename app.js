import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

// 카메라
const camera = new THREE.PerspectiveCamera(30, 1); // 시야각, 종횡비
camera.position.set(0, 0, 5);

// 조명
// directionalLight ➡️ 태양, 그림자 표현 가능
const light = new THREE.DirectionalLight(0xffff00, 10);
scene.add(light);

// 렌더러
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'), // 해당 위치에 three.js 결과물 표출
  antialias: true // 곡선 매끄럽게
});
renderer.outputEncoding = THREE.sRGBEncoding; // 색 보정

// glTF
const loader = new GLTFLoader();
loader.load('./shiba/scene.gltf', gltf => {
  // 로드된 후 익명함수 실행됨
  scene.add(gltf.scene);
  renderer.render(scene, camera);

  const animate = () => {
    requestAnimationFrame(animate);
    gltf.scene.rotation.y += 0.001; // 좌우로 돌아감
    renderer.render(scene, camera);
  };
  animate();
});
