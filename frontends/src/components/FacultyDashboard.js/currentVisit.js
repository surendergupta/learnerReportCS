import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const currentVisit = () => {
  return (
    <Box>
      <Card sx={{ height: "400px" }}>
        <CardContent>
          <Typography>currentVisit</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default currentVisit;
