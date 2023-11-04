import { useRef, useEffect } from 'react';
import { useFrame, MeshProps, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Box,
  useGLTF,
  useAnimations
} from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';
import { Mesh } from 'three';
import { ModelProps } from './utils/utils';

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
  const refMeshCylinder = useRef<Mesh>(null);
  const refWireMeshCylinder = useRef<Mesh>(null);
  const refMesh = useRef<Mesh>(null);
  const refMeshClone = useRef<Mesh>(null);

  const Model: React.FC<ModelProps> = ({ url }) => {
    const model = useGLTF(url); // require 직접 쓰기❌ ➡️ react단에서 /static/..으로 파일위치 조정

    const animations = useAnimations(model.animations, model.scene);
    const { actionName } = useControls({
      actionName: {
        value: animations.names[1],
        options: animations.names
      }
    });

    useEffect(() => {
      const action = animations.actions[actionName] as THREE.AnimationAction;
      action.reset().fadeIn(0.5).play(); // reset 안하면 action이 겹침
      // fadeIn으로 새로운 action이 0.5초에 걸쳐 추가됨

      return () => {
        action.fadeOut(0.5); // fadeOut으로 이전 action이 서서히 사라지도록 ➡️ 애니메이션 겹치지 않게
      };
    }, [animations.actions, actionName]);

    return <primitive object={model.scene} scale={3} position={[3, -2, 3]} />;
  };

  const { camera } = useThree();
  useControls({
    positionZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: v => (camera.position.z = v) // 카메라 z위치 조절
    }
  });

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

  const {
    topRadius,
    bottomRadius,
    length,
    radialSegments,
    lengthSegments,
    bOpen,
    thetaStartCylinder,
    phiLengthCylinder
  } = useControls({
    topRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    // 기둥 윗부분 반지름
    bottomRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    length: { value: 1, min: 0.1, max: 5, step: 0.01 },
    radialSegments: { value: 32, min: 3, max: 256, step: 1 },
    // 수평분할 ➡️ 최소 3(삼각형이 최소)
    lengthSegments: { value: 1, min: 1, max: 256, step: 1 },
    // 수직분할
    bOpen: { value: false },
    // 윗면 아랫면 개방 여부
    thetaStartCylinder: { value: 0, min: 0, max: 360, step: 0.01 },
    // 원의 수직 시작 위치 ➡️ 잘린 원의 시작 위치 조절
    phiLengthCylinder: { value: 360, min: 0, max: 360, step: 0.01 }
    // 원주 길이
  });

  const { roughness, metalness, transmission, thickness, ior } = useControls({
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2.333, step: 0.01 }
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

  useEffect(() => {
    if (refMeshCylinder.current && refWireMeshCylinder.current)
      refWireMeshCylinder.current.geometry = refMeshCylinder.current.geometry;
  }, [
    topRadius,
    bottomRadius,
    length,
    radialSegments,
    lengthSegments,
    bOpen,
    thetaStartCylinder,
    phiLengthCylinder
  ]);

  useEffect(() => {
    if (refMesh.current && refMeshClone.current)
      refMeshClone.current.material = refMesh.current.material;
  }, [roughness, metalness, transmission, thickness, ior]);

  return (
    <>
      {/* <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={1} />
      <directionalLight position={[2, 5, 3]} intensity={1} /> */}
      {/* 도형 색이 흐리다면 조명 세기 높이기 */}

      {/* Environment는 drie에서 제공하는 광원 ➡️ HDRIs파일 🟰 그림이 빛 역할 */}
      <Environment background files={require('./assets/partly_cloudy.hdr')} />

      <axesHelper scale={10} />
      <OrbitControls />

      {/* glTF */}
      <Model url={require('./assets/model.glb')} />

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

      <mesh ref={refMeshCylinder} position={[4, 0, 0]}>
        <cylinderGeometry
          args={[
            topRadius,
            bottomRadius,
            length,
            radialSegments,
            lengthSegments,
            bOpen,
            (thetaStartCylinder * Math.PI) / 180,
            (phiLengthCylinder * Math.PI) / 180
          ]}
        />
        <meshStandardMaterial color="#75d1d5" opacity={0.5} transparent />
      </mesh>
      <mesh ref={refWireMeshCylinder} position={[4, 0, 0]}>
        <meshStandardMaterial emissive="#75d1d5" wireframe />
      </mesh>

      <mesh ref={refMesh} position={[0, 4, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
        {/* 반지름, 튜브 두께 */}
        <meshPhysicalMaterial // meshStandardMaterial을 발전시킴
          visible
          transparent // 투명효과
          opacity={1} // 불투명도 ➡️ transparent가 true일때만 동작
          depthTest // z-buffer ➡️ 앞쪽에 있을수록 값이 작음
          depthWrite // z-buffer 기록 유무
          side={THREE.DoubleSide} // 렌더링할 면 지정 ex.앞면(frontside), 뒷면(backside), 모두(doubleside)...
          color="#ffffff"
          roughness={roughness} // 거칠기 ➡️ 큰 값일수록 거침
          metalness={metalness} // 금속성 ➡️ 큰 값일수록 금속
          flatShading={false}
          wireframe={false}
          // 아래 속성들은 meshPhysicalMaterial에만 존재 ➡️ 유리처럼 만들기
          transmission={transmission} // 투명도
          thickness={thickness} // 유리 두께
          ior={ior} // 굴절률(1~2.333) ➡️ 값이 커질수록 더 굴절
        />
      </mesh>

      {/* drei 이용 육면체 생성 */}
      <Box ref={refMeshClone} position={[2, 0, 0]} scale={[1, 2, 1]}>
        {/* y축으로 2배 키우기 */}
      </Box>

      {/* three.js 기본 방식 */}
      <MakeBox position={[0, 2, 0]}>
        <meshStandardMaterial color="#8e44ad" />
      </MakeBox>
    </>
  );
};

export { Element3D };
