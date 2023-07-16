import * as React from 'react';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Container, IconButton, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';

import  { StudentsInterface } from '../models/IStudent';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function StudentTable() {
    const [student, setStudent] = useState<StudentsInterface[]>([]);
    const BaseURL = "http://127.0.0.1:8080";
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openAlertSucess, setOpenAlertSucess] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);

    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
        setOpenAlertSucess(false);
        setOpenAlertError(false);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStudent = async () => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      
    fetch(`${BaseURL}/students`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
              console.log(res.data)
                setStudent(res.data);
            } else {
                console.log("else");
            }
        })
        .catch(error => console.log('error', error));
};

const [query, setQuery] = React.useState("");

const [openModal, setOpenModal] = React.useState(false);
const handleModalClose = () => setOpenModal(false);
//const handleModalOpen = () => setOpenModal(true);

useEffect(() => {
    getStudent();
}, []);

const deleteStudent = async (id: number) => {
  const request = {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json",
      },
  };

  fetch(`${BaseURL}/students/${id}`, request)
      .then(response => response.text())
      .then((result) => {
          console.log(result)
          getStudent();
          setOpenAlertSucess(true);
      })
      .catch((error) => {
          console.log('error', error);
          getStudent();
          setOpenAlertError(true);
      });
}
  return (
    <Container maxWidth="md" sx={{p: 5,}}>
      <Stack>
      <Snackbar open={openAlertSucess} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={5000} onClose={handleCloseAlert}>
                <div>
                <Alert onClose={handleCloseAlert} severity="success">
                    ลบข้อมูลสำเร็จ
                </Alert>
                </div>
            </Snackbar>
            <Snackbar open={openAlertError} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={5000} onClose={handleCloseAlert}>
                <div>
                <Alert onClose={handleCloseAlert} severity="error">
                    ลบข้อมูลไม่สำเร็จ
                </Alert>
                </div>
            </Snackbar>
      </Stack>

      <div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {student[Number(localStorage.getItem('modalID'))-1]?.Name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Address: "+student[Number(localStorage.getItem('modalID'))-1]?.Address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Mark: "+student[Number(localStorage.getItem('modalID'))-1]?.Mark}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Tel. "+student[Number(localStorage.getItem('modalID'))-1]?.Tel}
          </Typography>
        </Box>
      </Modal>
    </div>

    <Box display="flex">
        <Box sx= {{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
        Student Details
        </Typography> </Box>
        <Box><Button variant="contained" component={RouterLink} to="/create">Add New Student</Button>
        </Box>
    </Box>
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableRow>
                <TableCell align="left" style={{ maxWidth: "5%" }}>#</TableCell>
                <TableCell align="left" style={{ maxWidth: "20%" }}>Name</TableCell>
                <TableCell align="left" style={{ maxWidth: "20%" }}>Address</TableCell>
                <TableCell align="left" style={{ maxWidth: "20%" }}>Mark</TableCell>
                <TableCell align="center" style={{ maxWidth: "35%" }}>Action</TableCell>
            </TableRow>
          <TableBody>
            {student.filter((item) => {return item.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.ID}>
                        <TableCell align="left">{item.ID}</TableCell>
                        <TableCell align="left">{item.Name}</TableCell>
                        <TableCell align="left">{item.Address}</TableCell>
                        <TableCell align="left">{item.Mark}</TableCell>
                        <TableCell align="center">
                          <IconButton aria-label="delete" sx={{ p: 2 }}>
                                <VisibilityIcon onClick={() => {
                                  localStorage.setItem('modalID', item.ID.toString())
                                  setOpenModal(true)
                                }}/>
                          </IconButton>
                          <IconButton aria-label="delete" sx={{ p: 2 }}>
                                <EditIcon onClick={() => {
                                  localStorage.setItem('editID', item.ID.toString())
                                  window.location.href = '/Edit'
                                }}/>
                          </IconButton>
                          <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => deleteStudent(item.ID)} />
                          </IconButton>
                        </TableCell>
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={student.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box sx = {{p: 2}}>
       <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e: any) => {
          e.preventDefault()
          setQuery(e.target.value)
        }}
        value={query}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
    </Box>
    </Paper>
    </Container>
  );
}