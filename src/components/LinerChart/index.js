import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, View, Alert} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useDispatch, useSelector} from 'react-redux';
import {getGraphLabel, getLength} from '../../helpers/utils';
import {getSalesData, getSalesGraph} from '../../store/reducers/profitReducer';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';
import {numberWithSpaces} from '../../helpers/Container';

const LinerChart = ({tooltipPos, setTooltipPos, updating}) => {
  // let [tooltipPos, setTooltipPos] = useState({
  //   x: 0,
  //   y: 0,
  //   visible: false,
  //   value: 0,
  // });
  const {salesgraph, type} = useSelector(state => state.statistic);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getSalesGraph());
  // }, []);
  const scrollRef = useRef(null);
  useEffect(() => {
    dispatch(getSalesGraph());
    setTimeout(() => {
      handleClick();
    }, 300);
  }, [type]);
  const handleClick = number => {
    console.log('====================================');
    console.log(scrollRef.current.scrollTo);
    console.log('====================================');
    if (scrollRef && scrollRef.current && scrollRef.current.scrollTo) {
      scrollRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };
  return (
    <View style={{width: '100%', height: 200, paddingHorizontal: 20}}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width:
              (70 * getLength(type, salesgraph) > 470
                ? 70 * getLength(type, salesgraph)
                : 470) - 40,
          }}>
          {salesgraph.length > 0 && (
            <LineChart
              withDots={true}
              height={200}
              width={
                70 * getLength(type, salesgraph) > 470
                  ? 70 * getLength(type, salesgraph)
                  : 470
              }
              data={{
                labels: getGraphLabel(type, salesgraph).labels,
                datasets: [
                  {
                    data: getGraphLabel(type, salesgraph).values,
                  },
                ],
              }}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: '#F8F9FC',
                backgroundGradientTo: '#F8F9FC',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(62, 71, 112, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                borderRadius: 1,
                paddingRight: 30,
              }}
              decorator={() => {
                return tooltipPos.visible ? (
                  <View>
                    <Svg>
                      <Rect
                        x={tooltipPos.x - 65}
                        y={tooltipPos.y + 14}
                        width="180"
                        rx="10"
                        height="50"
                        fill="white"
                      />

                      <TextSVG
                        x={tooltipPos.x + 20}
                        y={tooltipPos.y + 30}
                        fill="blue"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle">
                        доход
                      </TextSVG>
                      <TextSVG
                        x={tooltipPos.x + 27}
                        y={tooltipPos.y + 50}
                        fill="black"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle">
                        {numberWithSpaces(Math.floor(tooltipPos.value))}
                      </TextSVG>
                    </Svg>
                  </View>
                ) : null;
              }}
              onDataPointClick={data => {
                let isSamePoint =
                  tooltipPos.x === data.x && tooltipPos.y === data.y;

                isSamePoint
                  ? setTooltipPos(previousState => {
                      return {
                        ...previousState,
                        value: data.value,
                        visible: !previousState.visible,
                      };
                    })
                  : setTooltipPos({
                      x: data.x > 60 ? data.x - 40 : data.x,
                      value: data.value,
                      y: data.y > 60 ? data.y - 70 : data.y,
                      visible: true,
                    });
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default LinerChart;
