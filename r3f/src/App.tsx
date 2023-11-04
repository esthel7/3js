import { Canvas } from '@react-three/fiber';
import { Element3D } from './Element3D';
import './App.css';

const App = () => {
  return (
    <Canvas
      camera={{
        // 카메라 없으면 자동 (0, 0, 0)
        fov: 75, // 화각
        // z-near, far는 해당 구역 도형 유무 조절 ➡️ 스크롤은 가능
        near: 1,
        far: 20,
        position: [7, 7, 0]
      }}
    >
      <Element3D />
    </Canvas>
  );
};

export default App;
