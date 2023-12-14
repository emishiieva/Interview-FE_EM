import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { CharProperties } from './types';

const ChartComponent: React.FC<CharProperties> = ({xValues, yValues}) => {
  const isReadyToDraw = !!(xValues.length && yValues.length);
  const transformdYValues: number[] = yValues.map((val: any) => +val);
  const transformdXValues: string[] = xValues.map((val: any) => val.toString());
  
  return (<>
    {isReadyToDraw ? (<BarChart
      width={500}
      height={300}
      series={[
        { data: transformdYValues, label: 'Price', id: 'price' },
      ]}
      xAxis={[{ data: transformdXValues, scaleType: 'band' }]}
    />) : null}
   </>);
}
 
export default ChartComponent;
