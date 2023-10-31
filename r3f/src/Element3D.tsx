import { useRef } from 'react';
import { useFrame, MeshProps } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';

const MakeBox = (props: MeshProps) => {
  // MeshProps import from fiber
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
};

const Element3D = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    // delta ➡️ 이전, 현재 시간 차이(ms 단위)
    // 매 프레임이 렌더링되기 직전 실행
    if (meshRef.current) meshRef.current.rotation.y += delta; // y축으로 회전
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 1, 3]} intensity={0.8} />
      {/* 도형 색이 흐리다면 조명 세기 높이기 */}

      <axesHelper scale={10} />
      <OrbitControls />

      {/* mesh 이용 육면체 생성 */}
      <mesh
        ref={meshRef}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]} // y축으로 45도만큼 회전
        scale={[2, 1, 1]} // x축으로 2베 키우기
      >
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" opacity={0.5} transparent />
      </mesh>

      {/* drei 이용 육면체 생성 */}
      <Box position={[2, 0, 0]}>
        <meshStandardMaterial color="#1abc9c" />
      </Box>

      <Box position={[2, 0, 0]}>
        <meshStandardMaterial emissive="#1abc9c" wireframe />
        {/* emissive ➡️ 광원 영향 없이 자체 발광 */}
      </Box>

      {/* three.js 기본 방식 */}
      <MakeBox position={[0, 2, 0]}>
        <meshStandardMaterial color="#8e44ad" />
      </MakeBox>
    </>
  );
};

export { Element3D };
