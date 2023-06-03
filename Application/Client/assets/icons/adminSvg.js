import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const AdminSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={67}
    height={67}
    fill="none"
    {...props}
  >
    <Circle cx={33.5} cy={33.5} r={23} stroke="#000" />
  </Svg>
)
export default AdminSvg 
