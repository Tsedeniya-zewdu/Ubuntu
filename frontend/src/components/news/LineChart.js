import React from 'react'
import { Line } from "react-chartjs-2";

export const LineChart = ({chartData}) => {
  return (
      <div>
          <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}
