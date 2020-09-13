import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useStore } from '../context/UserContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    paper: {
      width: 200,
      height: 230,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
    table: {
        minWidth: 650,
        maxHeight: 400
      },
  }));

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

const Columns = () => {


    

    const {data} = useStore();
    const history = useHistory();
    const classes = useStyles();
    const [colList,setColList]=useState([]);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const fetchColumns = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/upload/columns");
            const res = await response.json();
            if(res.Error===undefined) {
                setColList(res.Columns);
                console.log(colList);
                setLeft(res.Columns);
            }
            else {
                alert(res.Error);
            }
        }
        catch(err) {
            alert(err);
        }
    };

    useEffect(()=>{
        fetchColumns();
    },[]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

    return (
        <div>
            <Container style={{textAlign:"center", padding:5, backgroundColor:"#dce3e6", marginBottom:"5%", flexDirection:"row"}}>
                <Button onClick={()=>history.push("/Upload")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Back</Button>
                <Typography style={{display:"inline"}}>Edit target columns</Typography>
                <Button onClick={()=>history.push("/Models")} style={{display:"inline"}} style={{margin:25}} variant="contained" color="primary">Next</Button>
            </Container>
            {left===[]&&<Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
            </Container>}
            {data!==null&&<Container style={{textAlign:"center", padding:35, backgroundColor:"#dce3e6"}}>
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

export default Columns;