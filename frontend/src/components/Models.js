import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Models = () => {
    const classes = useStyles();
    const history = useHistory();
    const [regressionValue, setRegressionValue] = useState("simple");
    const [classificationValue, setClassificationValue] = useState("logistical");
    const [clusteringValue, setClusteringValue] = useState("kmeans");
    const [selected, setSelected] = useState("regression")

    const handleRegression = async e => {
        setRegressionValue(e.target.value);
    };
    const handleClassification = async e => {
        setClassificationValue(e.target.value);
    };
    const handleClustering = async e => {
        setClusteringValue(e.target.value);
    };

    return (
        <div>
            <Container style={{textAlign:"center", padding:5, backgroundColor:"#dce3e6", marginBottom:"5%", flexDirection:"row"}}>
                <Button onClick={()=>history.push("/Columns")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Back</Button>
                <Typography style={{display:"inline"}}>Choose the Model</Typography>
                <Button onClick={()=>history.push("/Preprocess")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Next</Button>
            </Container>
            <Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6", marginBottom:"5%"}}>
                <div className={classes.root}>
                <ButtonGroup style={{margin:20}} size="large" color="primary" aria-label="large outlined primary button group">
                    <Button variant={selected==="regression"?"contained":"outlined"} onClick={()=>setSelected("regression")}>Regression</Button>
                    <Button variant={selected==="classification"?"contained":"outlined"} onClick={()=>setSelected("classification")}>Classification</Button>
                    <Button variant={selected==="clustering"?"contained":"outlined"} onClick={()=>setSelected("clustering")}>Clustering</Button>
                </ButtonGroup>
                {selected==="regression"&&<RadioGroup aria-label="regression" name="regression" value={regressionValue} onChange={handleRegression}>
                    <FormControlLabel value="simple" control={<Radio />} label="Simple Linear Regression" />
                    <FormControlLabel value="multiple" control={<Radio />} label="Multiple Linear Regression" />
                    <FormControlLabel value="polynomial" control={<Radio />} label="Polynomial Regression" />
                </RadioGroup>}
                {selected==="classification"&&<RadioGroup aria-label="classification" name="classification" value={classificationValue} onChange={handleClassification}>
                    <FormControlLabel value="logistical" control={<Radio />} label="Logistical Regression" />
                    <FormControlLabel value="knn" control={<Radio />} label="K-Nearest Neighbours" />
                    <FormControlLabel value="svm" control={<Radio />} label="Support Vector Machine" />
                </RadioGroup>}
                {selected==="clustering"&&<RadioGroup aria-label="clustering" name="clustering" value={clusteringValue} onChange={handleClustering}>
                    <FormControlLabel value="kmeans" control={<Radio />} label="K-Means Clustering" />
                    <FormControlLabel value="hierarchical" control={<Radio />} label="Hierarchical Clustering" />
                </RadioGroup>}
                </div>
                
                <Button variant="outlined" color="primary" style={{margin:15}}>Confirm</Button>
            </Container>
        </div> 
    );
};

export default Models;