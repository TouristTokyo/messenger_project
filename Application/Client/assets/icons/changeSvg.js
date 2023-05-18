import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ChangeSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={42}
    fill="none"
    {...props}
  >
    <Path
      fill="#373535"
      d="M1 40.444v-8.5l24.5-23 8.5 8-24.5 23.5H1ZM38 12.944l-8.5-8s2.5-2.5 4.5-3.5 4 0 4 0 4 1.5 4 3.5.5 3 0 4-4 4-4 4Z"
    />
    <Path
      stroke="#373535"
      strokeWidth={1.9}
      d="M1 40.444v-8.5l24.5-23 8.5 8-24.5 23.5H1ZM38 12.944l-8.5-8s2.5-2.5 4.5-3.5 4 0 4 0 4 1.5 4 3.5.5 3 0 4-4 4-4 4Z"
    />
  </Svg>
)
export default ChangeSvg
