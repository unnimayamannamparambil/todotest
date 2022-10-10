import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  addbtn: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  error: {
    color: "red",
  },
  btn: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  deletebtn: {
    marginLeft: theme.spacing(3),
  },
  text: {
    marginBottom: theme.spacing(7),
  },
  taskitem: { margin: theme.spacing(2) },
}));

const ToDo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [toDoList, setToDoList] = useState([
    { id: 1, taskName: "task1", hours: 0, isCompleted: false },
    { id: 2, taskName: "task2", hours: 0, isCompleted: false },
    { id: 3, taskName: "task3", hours: 0, isCompleted: true },
  ]);
  const [taskName, setTaskName] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      let filteredData = toDoList.filter((todo) => todo.id !== popup.id);
      setToDoList(filteredData);
      setPopup({
        show: false,
        id: null,
      });
    }
  };
  const updateFieldChanged = (index) => (e) => {
    let newArr = [...toDoList]; 
    console.log("newArr", newArr);
    newArr[index].hours = e.target.value;
    setToDoList(newArr);
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };
  const handleClickOpen = (id) => {
    setPopup({
      show: true,
      id,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    const list = [
      ...toDoList,
      { id: Math.random().toFixed(2) * 100, taskName, hours: 0, isCompleted },
    ];
    setToDoList(list);
    setTaskName("");
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography className={classes.text} variant="h4" component="h4">
            ToDo App
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Add Task"
              variant="outlined"
              type="text"
              value={taskName}
              name="taskName"
              {...register("taskName", { required: "Enter TaskName" })}
              error={Boolean(errors?.taskName)}
              helperText={errors?.taskName?.message}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <Button
              className={classes.addbtn}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </form>

          {toDoList
            .filter(function (todo) {
              return todo.isCompleted === false;
            })
            .map(function (todo, index) {
              return (
                <div key={index}>
                  <h4>
                    {todo.taskName}

                    <TextField
                      id="outlined-basic"
                      label="Add Hour"
                      type="number"
                      variant="outlined"
                      name="name"
                      value={todo.hours}
                      onChange={updateFieldChanged(index)}
                    />

                    <button
                      className={classes.btn}
                      onClick={() => {
                        let newArr = [...toDoList];
                        if (newArr[index].hours === 0) {
                          alert("Enter Hours");
                        } else {
                          newArr[index].isCompleted =
                            !newArr[index].isCompleted;
                        }
                        setToDoList(newArr);
                      }}
                    >
                      <CheckIcon />
                    </button>

                    <button
                      className={classes.btn}
                      onClick={() => handleClickOpen(todo.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </h4>
                </div>
              );
            })}
          <h2>Completed Task</h2>
          {toDoList
            .filter(function (todo) {
              return todo.isCompleted === true;
            })
            .map(function (todo, index) {
              return (
                <div key={index}>
                  <h4>
                    {todo.taskName} {todo.hours}
                    <button
                      className={classes.deletebtn}
                      onClick={() => handleClickOpen(todo.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </h4>{" "}
                </div>
              );
            })}

          <Dialog
            maxWidth="sm"
            fullWidth
            open={popup.show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
              <Typography>Are you sure ?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteTrue}>Delete</Button>
              <Button onClick={handleDeleteFalse} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ToDo;
