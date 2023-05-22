import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const SettingsSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={56}
    fill="none"
    {...props}
  >
    <Circle cx={7} cy={7} r={7} fill="#373535" />
    <Circle cx={7} cy={49} r={7} fill="#373535" />
    <Circle cx={7} cy={28} r={7} fill="#373535" />
  </Svg>
)
export default SettingsSvg
