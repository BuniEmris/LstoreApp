import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({props, changeColor}) {
  return (
    <Svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7 21.5V16a1 1 0 011-1h4a1 1 0 011 1v5.5"
        stroke={changeColor === 'Склады' ? '#253466' : 'rgba(37, 52, 102, 0.4)'}
        strokeWidth={1.5}
      />
      <Path
        d="M1.89 6.406l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0119 8.07V18a3 3 0 01-3 3H4a3 3 0 01-3-3V8.07a2 2 0 01.89-1.664z"
        stroke={changeColor === 'Склады' ? '#253466' : 'rgba(37, 52, 102, 0.4)'}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default SvgComponent;
