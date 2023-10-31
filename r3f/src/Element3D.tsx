import { useRef, useEffect } from 'react';
import { useFrame, MeshProps } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';
import { Mesh } from 'three';

const MakeBox = (props: MeshProps) => {
  // MeshProps import from fiber
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
};

const Element3D = () => {
  const refMeshBox = useRef<Mesh>(null);
  const refWireMeshBox = useRef<Mesh>(null);
  const refMeshSphere = useRef<Mesh>(null);
  const refWireMeshSphere = useRef<Mesh>(null);

  const { xSize, ySize, zSize, xSegments, ySegments, zSegments } = useControls({
    // 마우스로 값 조정할 수 있도록 UI 제공
    xSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    // 초기값은 1, 마우스로 조정 단위는 0.01
    ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    xSegments: { value: 1, min: 1, max: 10, step: 1 },
    ySegments: { value: 1, min: 1, max: 10, step: 1 },
    zSegments: { value: 1, min: 1, max: 10, step: 1 }
  });

  const {
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength
  } = useControls({
    radius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    widthSegments: { value: 32, min: 3, max: 256, step: 1 },
    // 수평분할 ➡️ 기본값 32, 최소 3(삼각형이 최소)
    heightSegments: { value: 32, min: 2, max: 256, step: 1 },
    // 수직분할
    phiStart: { value: 0, min: 0, max: 360, step: 0.1 },
    // 시작 위치 각도로 조정
    phiLength: { value: 360, min: 0, max: 360, step: 0.1 },
    // 원주 길이
    thetaStart: { value: 0, min: 0, max: 180, step: 0.1 },
    // 구의 수직 시작 위치 ➡️ 잘린 구의 시작 위치 조절
    thetaLength: { value: 180, min: 0, max: 180, step: 0.1 }
    // 구의 수직 길이 ➡️ 잘려서 표현
  });

  useFrame((state, delta) => {
    // delta ➡️ 이전, 현재 시간 차이(ms 단위)
    // 매 프레임이 렌더링되기 직전 실행
    if (refMeshBox.current) refMeshBox.current.rotation.y += delta; // y축으로 회전
    if (refWireMeshBox.current) refWireMeshBox.current.rotation.y += delta;
  });

  useEffect(() => {
    if (refMeshBox.current && refWireMeshBox.current)
      refWireMeshBox.current.geometry = refMeshBox.current.geometry;
    // refWireMesh에 refMesh 아래의 <boxGeometry {...props} />와 똑같이 생김
  }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  useEffect(() => {
    if (refMeshSphere.current && refWireMeshSphere.current)
      refWireMeshSphere.current.geometry = refMeshSphere.current.geometry;
  }, [
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength
  ]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 1, 3]} intensity={0.8} />
      {/* 도형 색이 흐리다면 조명 세기 높이기 */}

      <axesHelper scale={10} />
      <OrbitControls />

      {/* mesh 이용 육면체 생성 */}
      <mesh
        ref={refMeshBox}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]} // y축으로 45도만큼 회전
      >
        <boxGeometry
          args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]}
          // 기본값은 다 1
        />
        <meshStandardMaterial color="#e67e22" opacity={0.5} transparent />
      </mesh>

      <mesh
        ref={refWireMeshBox}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      >
        <meshStandardMaterial emissive="#e67e22" wireframe />
        {/* emissive ➡️ 광원 영향 없이 자체 발광 */}
      </mesh>

      <mesh ref={refMeshSphere} position={[0, 0, 3]}>
        <sphereGeometry
          args={[
            radius,
            widthSegments,
            heightSegments,
            (phiStart * Math.PI) / 180, // 라디안 단위로 변경 필요
            (phiLength * Math.PI) / 180,
            (thetaStart * Math.PI) / 180,
            (thetaLength * Math.PI) / 180
          ]}
        />
        <meshStandardMaterial color="#d5c105" opacity={0.5} transparent />
      </mesh>

      <mesh ref={refWireMeshSphere} position={[0, 0, 3]}>
        <meshStandardMaterial emissive="#d5c105" wireframe />
      </mesh>

      {/* drei 이용 육면체 생성 */}
      <Box position={[2, 0, 0]} scale={[1, 2, 1]}>
        {/* y축으로 2배 키우기 */}
        <meshStandardMaterial color="#1abc9c" />
      </Box>

      {/* three.js 기본 방식 */}
      <MakeBox position={[0, 2, 0]}>
        <meshStandardMaterial color="#8e44ad" />
      </MakeBox>
    </>
  );
};

export { Element3D };
