import React,{useEffect,useState,useContext} from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import DataContext from '../../context/DataContext';
import { getStudentDashboardData } from "../../api/queries";
export default function StudentCard() {
    // const [dashBoardData, setDashboardData] = useState([]);
    const ctx = useContext(DataContext)
    const d = ctx.manage.userdetails;
    console.log(d);
    // useEffect(() => {
    //   getStudentDashboardData().then((data) => {
    //     setDashboardData(data);
    //   });
    // }, []);
    return (
        <>
            <Container
                maxWidth='sm'
                style={{ marginTop: "50px", alignItems: "left" }}
            >
                <Typography variant='h4' gutterBottom>
                    Hi Student ,Track your progress:
                </Typography>
            </Container>

            <Grid container sx={{ marginBottom: "20px" }}>
                
                    
                        <Grid key={d._id}>
                            <Card
                                sx={{
                                    minWidth: 600,
                                    margin: "5px",
                                    padding: "5px",
                                    backgroundColor: d.color,
                                }}
                            >
                                <CardContent sx={{ alignItems: "center" }}>
                                    <span style={{ display: "flex", }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <div style={{ marginLeft: "10px", fontWeight: "bold", display: "flex", alignItems: "center" }}>{d.username}</div>
                                    </span>

                                    <Typography variant="h6">
                                        Batch :{d.batchName}
                                    </Typography>

                                    <Typography variant="h6">
                                        Enrolled Date:{d.accountCreated}
                                    </Typography>
                                    <Typography variant="h6">
                                        Program Name:{d.courseName}
                                    </Typography>


                                </CardContent>
                            </Card>
                        </Grid>
                 
               
            </Grid>
        </>
    )
}
