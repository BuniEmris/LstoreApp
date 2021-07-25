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
        d="M21.524 9.753a8.311 8.311 0 00-7.963-6.975.714.714 0 00-.742.687v.064l.449 6.709c.03.452.417.795.87.769l6.727-.449a.714.714 0 00.659-.769v-.036z"
        stroke={
          changeColor === 'Прибыль' ? '#253466' : 'rgba(37, 52, 102, 0.4)'
        }
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.902 6.769a.915.915 0 011.043.522.824.824 0 01.082.302c.092 1.3.284 4.146.394 5.684a1.043 1.043 0 001.117.97v0l5.647-.348a.916.916 0 01.97.916v0A7.698 7.698 0 013.73 18.009a7.323 7.323 0 01-.915-2.8 4.725 4.725 0 01-.055-.916 7.707 7.707 0 016.132-7.524"
        stroke={
          changeColor === 'Прибыль' ? '#253466' : 'rgba(37, 52, 102, 0.4)'
        }
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
