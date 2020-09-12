import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';

const Upload = () => {

    const [files, setFiles] = useState([]);

    const changeHandler = f => {
        setFiles(f);
    };

    const clickHandler = async () => {
        const formData = new FormData();
        console.log(files[0]);
        console.log(files[0].name);
        formData.append("file",files[0]);
        console.log(formData);

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
            if(res.status===201) {
                console.log("good to go mate");
            }
            else alert("Some error occurred while uploading the file");
        }
        catch(err) {
            alert(err);
        }
    };

    return (
       <div>
           <DropzoneArea onChange={changeHandler}/>
           <Button variant="outlined" color="primary" style={{margin:15}} onClick={clickHandler}>Upload</Button>
       </div> 
    );
};

export default Upload;