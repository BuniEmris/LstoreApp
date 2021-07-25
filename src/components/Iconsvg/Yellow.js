import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.083 12.499c0-5.75 4.667-10.417 10.417-10.417 5.76 0 10.417 4.668 10.417 10.417 0 5.751-4.656 10.417-10.417 10.417-5.75 0-10.416-4.666-10.416-10.417zm9.5-3.946c0-.5.417-.917.917-.917s.907.418.907.917v4.604a.906.906 0 01-.907.906.915.915 0 01-.916-.906V8.553zm.927 8.823a.918.918 0 01-.916-.917c0-.5.406-.906.906-.906a.91.91 0 01.916.906c0 .5-.406.917-.906.917z"
        fill="#FDB16B"
      />
    </Svg>
  )
}

export default SvgComponent