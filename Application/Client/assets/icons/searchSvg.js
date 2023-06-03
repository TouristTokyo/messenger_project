import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SearchSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#7C858E"
      d="M25.253 23.026 32 29.77 29.771 32l-6.745-6.747a14.114 14.114 0 0 1-8.849 3.102C6.351 28.355 0 22.003 0 14.177 0 6.351 6.351 0 14.177 0s14.178 6.351 14.178 14.177a14.114 14.114 0 0 1-3.102 8.849Zm-3.16-1.17a10.99 10.99 0 0 0 3.111-7.679c0-6.093-4.935-11.026-11.027-11.026-6.093 0-11.026 4.933-11.026 11.026 0 6.092 4.933 11.027 11.026 11.027a10.99 10.99 0 0 0 7.68-3.11l.236-.237Z"
    />
  </Svg>
)
export default SearchSvg 
