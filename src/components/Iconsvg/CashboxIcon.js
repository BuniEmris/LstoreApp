import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function SvgComponent({props, changeColor}) {
  return (
    <Svg
      width={22}
      height={21}
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1 15V9a5 5 0 015-5h10a5 5 0 015 5v6a5 5 0 01-5 5H6a5 5 0 01-5-5zM16 4V3a2 2 0 00-2-2H8a2 2 0 00-2 2v1"
        stroke={changeColor === 'Касса' ? '#253466' : 'rgba(37, 52, 102, 0.4)'}
        strokeWidth={1.5}
      />
      <Circle cx={12} cy={9} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Circle cx={12} cy={12} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Circle cx={12} cy={15} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Circle cx={16} cy={9} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Circle cx={16} cy={12} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Circle cx={16} cy={15} r={1} fill="rgba(37, 52, 102, 0.4)" />
      <Path
        d="M4 10v4a2 2 0 104 0v-4a2 2 0 10-4 0z"
        stroke={changeColor === 'Касса' ? '#253466' : 'rgba(37, 52, 102, 0.4)'}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default SvgComponent;
