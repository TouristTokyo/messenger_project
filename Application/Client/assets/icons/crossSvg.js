import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CrossSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={1.9}
      d="m1 1 31 31M1 1v31M1 1h31m0 31H1m31 0V1M1 32 32 1"
    />
  </Svg>
)
export default CrossSvg
