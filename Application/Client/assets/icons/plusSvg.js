import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PlusSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={37}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M35.303 14.924v6.032H.704v-6.032h34.599ZM21.228.19v36.748h-6.414V.19h6.413Z"
    />
  </Svg>
);

export default PlusSvg;
