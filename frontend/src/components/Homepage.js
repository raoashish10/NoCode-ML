import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Upload from './Upload';
import { withRouter, useHistory } from 'react-router-dom';
import { useStore } from '../context/UserContext';
import { Typography } from '@material-ui/core';

const Homepage = () => {
    const history = useHistory();
    return (
        <div>
            <Container style={{textAlign:"center", padding:5, backgroundColor:"#dce3e6", marginBottom:"5%", flexDirection:"row"}}>
                <Button style={{display:"inline"}} disabled={true} style={{margin:25}} variant="contained" color="primary">Back</Button>
                <Typography style={{display:"inline"}}>Upload Dataset</Typography>
                <Button style={{display:"inline"}} onClick={()=>history.push("/Columns")} style={{margin:25}} variant="contained" color="primary">Next</Button>
            </Container>
            <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6", marginBottom:"5%"}}>
                <Upload/>
            </Container>

        </div>
    );
};

export default Homepage;