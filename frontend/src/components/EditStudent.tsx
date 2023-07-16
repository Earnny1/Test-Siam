import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Alert, Button, FormControl, Grid, Snackbar, Typography } from '@mui/material';
import { StudentsInterface } from '../models/IStudent';

export default function EditStudent() {
    const [student, setStudent] = React.useState<Partial<StudentsInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);


    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
        ) => {
        const id = event.target.id as keyof typeof EditStudent;
        const { value } = event.target;
        setStudent({ ...student, [id]: value });
    };
    
    const getStudent = async () => {
        const BaseURL = "http://127.0.0.1:8080";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          
        fetch(`${BaseURL}/student/${localStorage.getItem('editID')}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStudent(res.data);
                } else {
                    console.log("else");
                }
            })
            .catch(error => console.log('error', error));
    };



 function submit() {
   let data = {
    ID: student.ID,
    Name: student.Name ?? "",
    Address: student.Address ?? "",
    Mark: typeof student.Mark === "string" ? parseInt(student.Mark) : student.Mark,
    Tel: student.Tel ?? "",
   };

   console.log(data)

   const BaseURL = "http://127.0.0.1:8080";
   const requestOptions = {
     method: "PATCH",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   };

   fetch(`${BaseURL}/students`, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       if (res.data) {
         setSuccess(true);
       } else {
         setError(true);
       }
     });
 }

 React.useEffect(() => {
    getStudent();
}, []);

  return (
    
      <Container maxWidth="sm"sx={{ bgcolor: '#e3f2fd', height: '80vh' ,p: 2}}>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>
     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ
       </Alert>
     </Snackbar>
        <Box display="flex">
        <Box sx= {{ flexGrow: 2 }}>
        <Typography variant="h6" gutterBottom>
         Create Student Details
        </Typography> </Box>  
        </Box>
        <Grid item xs={6}>
           <p>Name</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Name"
               variant="outlined"
               type="string"
               size="medium"
               value={student.Name || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
        <Grid item xs={6}>
           <p>Address</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Address"
               variant="outlined"
               type="string"
               size="medium"
               value={student.Address || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
        <Grid item xs={6}>
           <p>Mark</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Mark"
               variant="outlined"
               type="string"
               size="medium"
               value={student.Mark || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid >
         <Grid item xs={6}>
           <p>Tel.</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Tel"
               variant="outlined"
               type="string"
               size="medium"
               value={student.Tel || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid >
         <Box sx= {{p:2}}>
        <Button
             style={{ float: "right" }}
             onClick={submit}
             component={RouterLink} to="/"
             variant="contained"
             color="primary"
           >
             Submit

           </Button>
           </Box>
      </Container>
    
  );
}