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
        d="M7.125 1a.75.75 0 00-1.5 0h1.5zm-1.28 12.53a.75.75 0 001.06 0l4.773-4.773a.75.75 0 10-1.06-1.06l-4.243 4.242-4.243-4.242a.75.75 0 00-1.06 1.06l4.773 4.773zM5.625 1v12h1.5V1h-1.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
