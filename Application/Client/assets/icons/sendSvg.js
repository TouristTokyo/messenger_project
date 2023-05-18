import * as React from "react"
import Svg, { G, Circle, Path, Defs } from "react-native-svg"

const SendSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Circle cx={30} cy={28.125} r={28.125} fill="#fff" />
    </G>
    <Path
      stroke="#0076B9"
      strokeWidth={3}
      d="M44.25 28.125 22.125 9.375v18.75m22.125 0L22.125 50.625V28.125m22.125 0H22.125"
    />
    <Path
      stroke="#000"
      strokeOpacity={0.2}
      strokeWidth={3}
      d="M44.25 28.125 22.125 9.375v18.75m22.125 0L22.125 50.625V28.125m22.125 0H22.125"
    />
    <Defs></Defs>
  </Svg>
)

export default SendSvg
