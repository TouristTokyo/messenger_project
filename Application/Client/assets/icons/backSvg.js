import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const BackSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={104}
    height={105}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={96} height={96} x={4} y={0.444} fill="#fff" rx={12} />
    </G>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={3}
      d="M39.5 15.444 18 36.944m0 0 21.5 21.5M18 36.944h52.5c18 0 14.5 21.5 14.5 21.5s2 22-14.5 22H18"
    />
    <Defs></Defs>
  </Svg>
)
export default BackSvg