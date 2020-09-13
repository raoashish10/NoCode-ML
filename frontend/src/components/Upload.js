import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStore } from '../context/UserContext';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxHeight: 400
    },
  });

const Upload = () => {

    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [data, setTable] = useState(null);
    const [uploaded,setUploaded]=useState(false);

    const {setData}=useStore();

    const changeHandler = f => {
        setFiles(f);
    };


    const clickHandler = async () => {
        if(files.length===0) {
            alert("You need to give me something to upload man");
        }
        else {
            const formData = new FormData();
            formData.append("file",files[0]);

            try {
                const response = await fetch("http://localhost:8000/api/upload/file",{
                    method: "POST",
                    headers: {
                        "Content-Disposition":"attachment",
                        "filename":files[0].name
                    },
                    body: formData 
                });
                const res = await response.json();
                console.log(res);
                if(res.Error===undefined) {
                    alert("File was uploaded successfully");
                    setTable(res);
                    setData(res);
                    setUploaded(true);
                }
                else {
                    alert(res.Error);
                }
            }
            catch(err) {
                alert(err);
            }
        }
    };

    return (
       <div>
           <DropzoneArea onChange={changeHandler}/>
           <Button variant="outlined" color="primary" style={{margin:15}} onClick={clickHandler}>Upload</Button>
           {uploaded&&<Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="csv">
                        <TableHead>
                            <TableRow>
                                {data['Columns'].map(elem=>{
                                    return <TableCell>{elem}</TableCell>
                                })}
                            </TableRow>    
                        </TableHead>
                        <TableBody>
                               {data['Rows'].map(elem=>{
                                   return (
                                       <TableRow>
                                           {Object.keys(elem).map(el=>{
                                               return <TableCell>{elem[el]}</TableCell>
                                           })}
                                       </TableRow>
                                   );
                               })} 
                        </TableBody>    
                    </Table>    
                </TableContainer>   
            </Container>}
       </div> 
    );
};

export default Upload;