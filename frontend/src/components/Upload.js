import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const Upload = () => {

    const [files, setFiles] = useState([]);
    const [data, setData] = useState(null);

    const changeHandler = f => {
        setFiles(f);
    };

    const fetchDetails = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/upload/");
            const res = await response.json();
            setData(res);
        }
        catch(err) {
            alert(err);
        }
    };

    const clickHandler = async () => {
        const formData = new FormData();
        formData.append("file",files[0]);

        try {
            const response = await fetch("http://localhost:8000/api/upload/",{
                method: "POST",
                headers: {
                    "Content-Disposition":"attachment",
                    "filename":files[0].name
                },
                body: formData 
            });
            const res = await response.json();
            fetchDetails();
            console.log(res);
            alert("I guess the file was uploaded"); 
        }
        catch(err) {
            alert(err);
        }
    };

    return (
       <div>
           <DropzoneArea onChange={changeHandler}/>
           <Button variant="outlined" color="primary" style={{margin:15}} onClick={clickHandler}>Upload</Button>
           <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
                <h4>Additional details here</h4>     
            </Container>
       </div> 
    );
};

export default Upload;