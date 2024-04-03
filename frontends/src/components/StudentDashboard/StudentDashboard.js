import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { getStudentDashboardData } from "../../api/queries";

import ConversionRate from "./conversionRate";
import StudentCard from "./StudentCard";

import StudentAttendance from "./StudentAttendance";
import SkillTagChart from "./SkillTagChart";

const StudentDashboard = () => {
  const [dashBoardData, setDashboardData] = useState([]);

  useEffect(() => {
    getStudentDashboardData().then((data) => {
      setDashboardData(data);
    });
  }, []);



  return (
    <Box>

      <Box>
        <Grid container spacing={1} direction="row"
          justifyContent="center"
          alignItems="center" >
          <Grid item xs={10}>
            <StudentCard />
          </Grid>
          <Grid item xs={10}>
            <StudentAttendance
              title="Student Attendance Report"
              subheader="month wise"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
              ]}
              chartData={[
                {
                  name: 'Snehal',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27]
                },

              ]}
            />
          </Grid>
          <Grid item xs={10} >
            <SkillTagChart
              title="Class Based Skill Taging"
              chartData={[
                { label: 'DSA', value:2 },
                { label: 'Javascript', value: 5 },
                { label: 'DOM', value: 5},
                { label: 'React', value: 6},
                { label: 'NodeJs', value: 6},
                { label: 'ExpressJs', value:5 },
              ]}
              chartColors={[
                "red",
                "lightgreen",
                "lightgray",
                "lightblue"
              ]}
            />
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default StudentDashboard;

//create route for user page - clickable button User in admin page.
