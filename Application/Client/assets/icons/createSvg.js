import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const CreateSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={72}
    height={72}
    fill="none"
    {...props}
  >
    <Circle cx={36} cy={36} r={36} fill="#0076B9" />
    <Circle cx={36} cy={36} r={36} fill="#000" fillOpacity={0.2} />
    <Path
      fill="#fff"
      d="M15 55.444v-8.5l24.5-23 8.5 8-24.5 23.5H15ZM52 27.944l-8.5-8s2.5-2.5 4.5-3.5 4 0 4 0 4 1.5 4 3.5.5 3 0 4-4 4-4 4Z"
    />
    <Path
      stroke="#fff"
      strokeWidth={1.9}
      d="M15 55.444v-8.5l24.5-23 8.5 8-24.5 23.5H15ZM52 27.944l-8.5-8s2.5-2.5 4.5-3.5 4 0 4 0 4 1.5 4 3.5.5 3 0 4-4 4-4 4Z"
    />
  </Svg>
)
export default CreateSvg
