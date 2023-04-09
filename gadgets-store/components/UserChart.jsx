import React, { useRef, useEffect } from 'react';
import Chart from "chart.js/auto";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const UserChart = () => {
//     const chartRef = useRef(null);

//     useEffect(() => {
//     const myChartRef = chartRef.current.getContext('2d');
//     new Chart(myChartRef, {
//       type: 'doughnut',
//       data: {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [
//           {
//             data: [10, 20, 30],
//             backgroundColor: ['red', 'blue', 'yellow']
//           }
//         ]
//       }
//     });
//   }, []);
    const chartContainer = useRef(null);
    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const chartData = {
            labels: ["Revoked", "Active", "Frequent"],
            // labels: ["Red", "Yellow", "Blue"],
            datasets: [
                {
                    data: [10, 20, 30],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }
            ]
        };

        const myChart = new Chart(chartContainer.current, {
            type: "doughnut",
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
  }, []);


  return (
    // <Box sx={{m:'auto', mt: 1, }} >
    //     <canvas ref={chartContainer} /> 
    // </Box>
   
    //    <canvas ref={chartRef} /> 
    <div>
       <canvas ref={chartContainer} /> 
       </div>
  )
}

export default UserChart