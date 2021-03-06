import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';

const Preprocess = () => {
    const history = useHistory();
    return (
        <div>
            <Container style={{textAlign:"center", padding:5, backgroundColor:"#dce3e6", marginBottom:"5%", flexDirection:"row"}}>
                <Button onClick={()=>history.push("/Columns")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Back</Button>
                <Typography style={{display:"inline"}}>Choose preprocessing options</Typography>
                <Button onClick={()=>history.push("/Results")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Next</Button>
            </Container>
            <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
                <h4>display relevant details here</h4>     
            </Container>
        </div> 
    );
};

export default Preprocess;