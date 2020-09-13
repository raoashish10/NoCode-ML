import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';

const Columns = () => {
    const history = useHistory();
    return (
        <div>
            <Container style={{textAlign:"center", padding:5, backgroundColor:"#dce3e6", marginBottom:"5%", flexDirection:"row"}}>
                <Button onClick={()=>history.push("/Models")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Back</Button>
                <Typography style={{display:"inline"}}>Edit target columns</Typography>
                <Button onClick={()=>history.push("/Preprocess")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Next</Button>
            </Container>
            <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
                <h4>display relevant details here</h4>     
            </Container>
        </div> 
    );
};

export default Columns;