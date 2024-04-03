import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const tasks = () => {
  return (
    <Box>
      <Card sx={{ height: "400px" }}>
        <CardContent>
          <Typography>tasks</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default tasks;
