# three.js

```git
⚡ 2023.10 ~
```

<br/>

## 기본 구조

카메라가 3D object(🟰scene)을 비추고, 뒤의 renderer에 그려내기
➡️ 카메라, 3D object, renderer 순으로 존재

## 카메라 종류

- PerspectiveCamera ➡️ 원근법 적용
- OrthographicCamera ➡️ 원근법 무시

## 카메라 시야각

- 렌즈 50mm가 표준 🟰 시야각 47도
- 렌즈 35mm보다 작으면 광각렌즈 ➡️ 더 작게 보임 🟰 시야각 넓음 (63도~)
- 렌즈 85mm보다 크면 망원렌즈 ➡️ 더 크게 보임 🟰 시야각 좁음 (~28도)

## 그림자 표현

- renderer에 그림자 사용 설정
- 빛을 받아 그림자를 표현할 물체와 그 그림자를 받을 물체를 특정 코드로 설정
  - castShadow ➡️ 그림자를 만들 도형
  - receiveShadow ➡️ 그림자를 그릴 도형(🟰바닥)
- 빛에 그림자 설정

## 좌표계 및 회전방향

- x 좌표 ➡️ 오른쪽으로 +
- y 좌표 ➡️ 위쪽으로 +
- z 좌표 ➡️ 사람 쪽으로 +
- 회전방향 ➡️ 반시계방향 +

## r3f

- 🟰 `react three fiber`
- `react`에서 `three.js`를 효과적으로 사용할 수 있도록 해주는 라이브러리

## cra with typescript

```bash
  npm install -g create-react-app
  npx create-react-app ${name} --template typescript
```

## ts에 three 설치

`npm i three @types/three @react-three/fiber`

- 소스맵 경고창 안뜨도록 `.env`에 추가
  `GENERATE_SOURCEMAP = false`

## three 사용하기

- `App.tsx`에서 `@react-three/fiber` 불러오기

```ts
import { Canvas } from "@react-three/fiber";
import { Element3D } from "./Element3D"; // 만든 파일

const App = () => {
  return (
    <Canvas>
      {" ➡️ Canvas는 자식 필수 "}
      <Element3D />
    </Canvas>
  );
};
```

## ts에서 useRef 사용하기

```ts
import { useRef } from "react";
import { Mesh } from "three";

const refMesh = useRef<Mesh>(null);

return <mesh ref={refMesh}></mesh>;
```

[참고](https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5)

## [threejs 공식문서](https://threejs.org/)

## [texture](https://3dtextures.me/2022/01/16/stone-path-008/)

## [skyBox](https://opengameart.org/content/skiingpenguins-skybox-pack)

## [강의영상](https://www.youtube.com/watch?v=_PqQLvFa_Vw&list=PLkbzizJk4Ae9hHI_YUD3fRv8xLfS3jGEW&index=1)

## [Sketchfab](https://sketchfab.com/)

## [강의영상](https://www.youtube.com/watch?v=CojyGfCMvuU)

## [Poly Haven](https://polyhaven.com/)

## [mixamo](https://www.mixamo.com/#/)

## [강의영상](https://www.youtube.com/watch?v=Sg6OcVxe64k&list=PLe6NQuuFBu7HUeJkowKRkLWwkdOlhwrje)

## [Notion](https://sudden-mat-e7c.notion.site/three-js-ddec650cf22c406dbf1a6995c3a71a45?pvs=4)
