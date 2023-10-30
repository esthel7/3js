import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';

const Element3D = () => {
  const refMesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    // delta ➡️ 이전, 현재 시간 차이(ms 단위)
    // 매 프레임이 렌더링되기 직전 실행
    if (refMesh.current) refMesh.current.rotation.y += delta; // y축으로 회전
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />

      <axesHelper scale={10} />
      <OrbitControls />

      <mesh
        ref={refMesh}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]} // y축으로 45도만큼 회전
        scale={[2, 1, 1]} // x축으로 2베 키우기
      >
        <boxGeometry />
        {/* 육면체 생성 */}
        <meshStandardMaterial color="#e67e22" opacity={0.5} transparent />
      </mesh>
    </>
  );
};

export { Element3D };
