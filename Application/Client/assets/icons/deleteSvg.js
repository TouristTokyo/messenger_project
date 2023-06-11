import React from "react";
import { useWindowDimensions } from "react-native-web";
import Svg, { Circle, Path } from "react-native-svg";

const DeleteSvg = (props) => {
  const { width, height } = useWindowDimensions();
  const size = Math.min(width * 0.093, height * 0.054) ;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 1} stroke="#000" strokeWidth={2} />
      <Path
        stroke="#000"
        strokeWidth={2}
        d={`m${size * 0.266} ${size * 0.267} ${size * 0.468} ${size * 0.468}m-${size * 0.468} 0 ${size * 0.468}-${size * 0.468}`}
      />
    </Svg>
  );
};

export default DeleteSvg;
