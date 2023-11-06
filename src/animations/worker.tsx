import { render } from '@react-three/offscreen'
import Ripple from "./ripple";

interface Dimensions {
  width: number,
  height: number,
  dpr: number,
}

const ripple: Dimensions = {
  width: 640,
  height: 640,
  dpr: 1,
}

render(<Ripple dimensions={ripple}/>)