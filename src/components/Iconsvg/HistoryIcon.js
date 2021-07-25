import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({props, changeColor}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        clipRule="evenodd"
        d="M21.25 12A9.25 9.25 0 0112 21.25 9.25 9.25 0 012.75 12 9.25 9.25 0 0112 2.75 9.25 9.25 0 0121.25 12z"
        stroke={
          changeColor === 'История' ? '#253466' : 'rgba(37, 52, 102, 0.4)'
        }
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.431 14.943l-3.77-2.25V7.848"
        stroke={
          changeColor === 'История' ? '#253466' : 'rgba(37, 52, 102, 0.4)'
        }
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
