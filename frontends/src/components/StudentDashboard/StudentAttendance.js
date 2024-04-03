// import { Card, CardContent, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";

// const webSiteVisit = () => {
//   return (
//     <Box>
//       <Card sx={{ height: "400px" }}>
//         <CardContent>
//           <Typography>WebSiteVisit</Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default webSiteVisit;

import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from './chart';

// ----------------------------------------------------------------------

StudentAttendance.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function StudentAttendance({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '12%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
           
            return `${y.toFixed(0)} class attended`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={300} width={800} />
      </Box>
    </Card>
  );
}

