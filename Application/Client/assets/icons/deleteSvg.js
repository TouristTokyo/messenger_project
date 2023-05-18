import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const DeleteSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={63}
    fill="none"
    {...props}
  >
    <Circle cx={31} cy={31.445} r={30} stroke="#000" strokeWidth={2} />
    <Path
      stroke="#000"
      strokeWidth={2}
      d="m16.5 16.944 28.5 28.5m-28.5 0 28.5-28.5"
    />
  </Svg>
)
export default DeleteSvg
