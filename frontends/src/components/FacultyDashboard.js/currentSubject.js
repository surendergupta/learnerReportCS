import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const currentSubject = () => {
  return (
    <Box>
      <Card sx={{ height: "400px" }}>
        <CardContent>
          <Typography>currentSubject</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default currentSubject;
