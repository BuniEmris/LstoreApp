import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={26}
      height={25}
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        clipRule="evenodd"
        d="M7.42 21.785a.946.946 0 110 1.89.946.946 0 010-1.89zM21.343 21.785a.946.946 0 110 1.891.946.946 0 010-1.891z"
        stroke="#5264F0"
        strokeWidth={1.536}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.64 1.282l2.574.446 1.191 14.194a2.23 2.23 0 002.223 2.045h13.5a2.232 2.232 0 002.209-1.913l1.174-8.113c.145-1.001-.63-1.897-1.642-1.897H4.627"
        stroke="#253466"
        strokeWidth={1.536}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.715 10.617h3.43"
        stroke="#5264F0"
        strokeWidth={1.536}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
