import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Upload from './Upload';

const Homepage = () => {
    return (
        <div>
            <Container style={{marginBottom:"20%"}}>
                <h1 style={{textAlign:"center"}}>No Code ML</h1>
            </Container>
            <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
                <Upload/>
                <Button style={{margin:15}} variant="contained" color="primary">Back</Button>
                <Button style={{margin:15}} variant="contained" color="primary">Next</Button>
            </Container>
        </div>
    );
};

export default Homepage;