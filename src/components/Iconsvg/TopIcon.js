import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={12}
      height={14}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.625 13a.75.75 0 001.5 0h-1.5zM6.905.47a.75.75 0 00-1.06 0L1.072 5.243a.75.75 0 101.06 1.06l4.243-4.242 4.243 4.242a.75.75 0 001.06-1.06L6.905.47zM7.125 13V1h-1.5v12h1.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
