import _ from "lodash";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import './chart.css'


const BarChart = ({dateArray,durationArray}) => {

  const state = {
    series: [
      {
        name: "sleep-duration",
        data:durationArray,
      }
    ],
    options: {
      colors: ["#EF6B64" 
        ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: dateArray,
      },
      yaxis: {
        // min: 0,
        // max: 100,
        tickAmount: 8,
        forceNiceScale: true,
      },
      fill: {
        opacity: 1,
      },
    },
  };


  return (
    <div className="chart-container">
        <div className="chart-header">Sleep Duration Chart</div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          width="50%"
          height={400}
        />
    </div>
  );
};

export default BarChart;
