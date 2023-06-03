import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ForwardSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={21}
    fill="none"
    {...props}
  >
    <Path stroke="#000" d="M14 1H1v18l6.24-5.4L14 19V1Z" />
  </Svg>
)
export default ForwardSvg
