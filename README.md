## r3f

- `react`에서 `three.js`를 효과적으로 사용할 수 있도록 해주는 라이브러리

## cra with typescript

```bash
  npm install -g create-react-app
  npx create-react-app ${name} --template typescript
```

## ts에 three 설치

`npm i three @types/three @react-three/fiber`

## three 사용하기

- `App.tsx`에서 `@react-three/fiber` 불러오기

```js
import { Canvas } from "@react-three/fiber";
import { Element3D } from "./Element3D"; // 만든 파일

const App = () => {
  return (
    <Canvas>
      {" "}
      ➡️ Canvas는 자식 필수
      <Element3D />
    </Canvas>
  );
};
```

## ts에서 useRef 사용하기

```jsx
import { useRef } from "react";
import { Mesh } from "three";

// prettier-ignore
const refMesh = useRef<Mesh>(null);

return <mesh ref={refMesh}></mesh>;
```

[참고](https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5)

## [강의영상](https://www.youtube.com/watch?v=Sg6OcVxe64k&list=PLe6NQuuFBu7HUeJkowKRkLWwkdOlhwrje)

## [r3f Notion](https://sudden-mat-e7c.notion.site/r3f-0fbcc35657784780b2d3f3e25fa67d13?pvs=4)

## [cra with typescript Notion](https://sudden-mat-e7c.notion.site/cra-with-typescript-aa10c38a35434f91b6eed6c7ec5ff6ab?pvs=4)
