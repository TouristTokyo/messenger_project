import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AddSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={1.9}
      d="M2 24h43.84M2 24l21.92 21.92M2 24 23.92 2.08M45.84 24 23.92 45.92M45.84 24 23.92 2.08m0 43.84V2.08"
    />
  </Svg>
)
export default AddSvg
