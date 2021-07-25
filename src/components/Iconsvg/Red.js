import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.083 10.499C.083 4.749 4.75.082 10.5.082c5.76 0 10.417 4.668 10.417 10.417 0 5.751-4.656 10.417-10.417 10.417C4.75 20.916.083 16.25.083 10.499zm9.5-3.946c0-.5.417-.917.917-.917s.907.418.907.917v4.604a.906.906 0 01-.907.906.915.915 0 01-.916-.906V6.553zm.927 8.823a.918.918 0 01-.916-.917c0-.5.406-.906.906-.906a.91.91 0 01.916.906c0 .5-.406.917-.906.917z"
        fill="#FD4040"
      />
    </Svg>
  )
}

export default SvgComponent
