import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ForwardFocusSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={21}
    fill="none"
    {...props}
  >
    <Path fill="#0076B9" d="M14 1H1v18l6.24-5.4L14 19V1Z" />
    <Path fill="#000" fillOpacity={0.2} d="M14 1H1v18l6.24-5.4L14 19V1Z" />
    <Path stroke="#0076B9" d="M14 1H1v18l6.24-5.4L14 19V1Z" />
    <Path stroke="#000" strokeOpacity={0.2} d="M14 1H1v18l6.24-5.4L14 19V1Z" />
  </Svg>
)
export default ForwardFocusSvg
