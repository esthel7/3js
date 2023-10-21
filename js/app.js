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

// 캔버스
const canvas = document.querySelector('#ex-03');

// 렌더러
const renderer = new THREE.WebGLRenderer({ canvas }); // 빈 인자로 전달 시 canvas 만들어줌 ➡️ appendChild 필요
renderer.setSize(window.innerWidth, window.innerHeight);

const render = time => {
  time *= 0.001; // 초 단위로 바꾸기
  // cube.rotation.x = time;
  // cube.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);
