import React, { useEffect, useState } from "react";
// import { getUsers } from "../../api/queries";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { GridToolbar } from '@mui/x-data-grid';

const columns = [
  {
    field: "username",
    headerClassName: "users-header",
    flex: 1,
    headerName: "Name",
    sortable: true,
    minWidth: 200,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={params.value.image} sx={{ mr: "8px" }} />
          {params.value.name}
        </>
      );
    },
  },
  {
    field: "fullname",
    headerName: "FullName",
    sortable: false,
    minWidth: 250,
    headerClassName: "users-header",
    flex: 1,
  },
  {
    field: "phoneNo",
    headerName: "PhoneNo",
    sortable: false,
    minWidth: 250,
    headerClassName: "users-header",
    flex: 1,
  },
  {
    field: "workingStatus",
    headerName: "WorkingStatus",
    sortable: false,
    minWidth: 130,
    headerClassName: "users-header",
    flex: 1,
  },
  {
    field: "courseName",
    headerName: "CourseName",
    sortable: false,
    headerClassName: "users-header",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            display: "inline",
            backgroundColor:
              params.value === "Active"
                ? "rgba(84, 214, 44, 0.16)"
                : "rgba(255, 72, 66, 0.16)",
            color:
              params.value === "Active"
                ? "rgb(34, 154, 22)"
                : "rgb(183, 33, 54)",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "700",
            height: "24px",
            minWidth: "22px",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            padding: "4px 8px",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
];

const Faculty = (props) => {
  let id = faker.datatype.uuid()
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {

    async function fetchUsers() {
      let res = await axios.get("http://localhost:3000/faculty/getfaculty")
      setListOfUsers(res.data.result);
    }
    fetchUsers()
  }, []);
  console.log(listOfUsers);

  return (
    <Box sx={{ padding: "10px" }}>
      <Box
        sx={{
          marginTop: 4,
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >

      </Box>

      <Box
        sx={{
          height: 450,
          width: "100%",
          "& .users-header": {
            backgroundColor: "#F1F1F1",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
      
        </Box>

        <DataGrid

          columns={columns}
          rows={listOfUsers}

          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}

        // filterModel={{
        //   items: [
        //     {
        //       columnField: {
        //         onChange: (event) => setinput(event.target.value)
        //       },

        //     },

        //   ],
        // }}
        />
      </Box>
    </Box>
  );
};

export default Faculty;
