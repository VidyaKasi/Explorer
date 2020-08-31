/**
 * Quotation Step when the quotation status changes from 1 to 2.
 */

import React from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory, useLocation } from 'react-router';


import {
  makeStyles,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio, Grid, Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function Home(props) {
  const { quotation, onSubmit, onCancel } = props;

  const classes = useStyles();
  const history = useHistory();




  // Define the React-Hook-Form hooks
  const { register, handleSubmit, errors, setValue } = useForm({
  });



  const handleOnSubmit = (data) => {
    console.log(data);
    

    const displayAlert = () => {
      console.log("error");
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      );
    };
    async function f() {
      try {

        let response = await fetch(
          `http://api.additivasia.io/api/v1/assignment/employees/${data.EmployeeName}`
        );
        //page not found
        if (response.status == 404) {
          console.log("Error");
          throw new Error('User not found');
        } else {
        
          history.push({
            pathname: `/employee/${data.EmployeeName}`,
          });

        }
      } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
       
      }
      
    }

   f();
   
  };

  return (
    <React.Fragment>
      <form
        className={classes.root}
        onSubmit={handleSubmit(handleOnSubmit)}
        autoComplete="off"
      >
        <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h4">Employee Explorer</Typography>
      </Grid>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
     
      <Grid item xs={2} >

        <TextField
          label="Employee Name"
          name="EmployeeName"
          inputRef={register({
            required: {
              value: true,
              message: "Field required.",
            },
          })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={1}>
          <Button type="submit"   variant="contained"
          color="secondary">
            
          Search
      
        </Button>
        </Grid>
              </Grid>

              <Grid item xs={3} align="left">
      
        </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}
