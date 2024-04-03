import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const newsUpdate = () => {
  return (
    <Box>
      <Card sx={{ height: "400px" }}>
        <CardContent>
          <Typography>NewsUpdate</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default newsUpdate;
