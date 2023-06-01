import React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { G, Circle, Path, Defs } from "react-native-svg";

const SendSvg = (props) => {
  const { width, height } = useWindowDimensions();
  const svgSize = Math.min(width * 0.093, height * 0.054) ;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="none" {...props}>
      <G filter="url(#a)">
        <Circle cx={svgSize / 2} cy={svgSize * 0.46875} r={svgSize * 0.46875} fill="#fff" />
      </G>
      <Path
        stroke="#0076B9"
        strokeWidth={svgSize * 0.05}
        d={`M${svgSize * 0.09375} ${svgSize * 0.46875}L${svgSize * 0.65625} ${svgSize * 0.09375}V${svgSize * 0.84375}Z`}
      />
      <Path
        stroke="#0076B9"
        strokeWidth={svgSize * 0.05}
        d={`M${svgSize * 0.66} ${svgSize * 0.46875}L${svgSize * 0.1} ${svgSize * 0.46875}`}
      />
      <Defs></Defs>
    </Svg>
  );
};

export default SendSvg;
