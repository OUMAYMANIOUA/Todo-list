import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';
import TextField from '@mui/material/TextField';
//dialog import
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
   const [editTitle, setEditTitle] = useState(todo.title);
const [editDetails, setEditDetails] = useState(todo.details);
  const { todos, setTodos } = useContext(TodosContext);

  // transition for dialog
  const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

  // event handlers
  function handelCheckClick() {
    const updateTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem('todos', JSON.stringify(updateTodos));
  }

  function handletDeleteClick() {
    setShowDeleteDialog(true); // Ouvre le dialog
  }

  function handelClose (){
    setShowDeleteDialog(false); //ferme le dialog
    setShowUpdateDialog(false); //ferme le dialog
  }

  function handleDeleteConfirm(){
    const updatedTodos = todos.filter((t) => t.id !== todo.id);//kankhliw ghir tasks lima3ndho dak id hit li3ndo nfss id howa libaghin nhaydoh
  setTodos(updatedTodos);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  setShowDeleteDialog(false); // إغلاق الـ Dialog من بعد الحذف  
  }

  function handeltUpdateClick(){
    setEditTitle(todo.title);
  setEditDetails(todo.details);
  setShowUpdateDialog(true);

  }

  function handelSubmit(){
     const updatedTodos = todos.map((t) => {
    if (t.id === todo.id) {
      return {
        ...t,
        title: editTitle,
        details: editDetails
      };
    }
    return t;
  });

  setTodos(updatedTodos);
   localStorage.setItem('todos', JSON.stringify(updatedTodos));
  setShowUpdateDialog(false);}
  return (
    <div style={{ marginTop: '20px' }}>
      {/* pop up to confirm delete event */}
      <Dialog
        open={showDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Are you sure you want to delete this this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
           You can't undo this action after confirmation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose} >Close</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>Yes, Delete it</Button>
        </DialogActions>
      </Dialog>
      {/* end of pop up */}
      {/* pop up to modify task */}
      <Dialog
        open={showUpdateDialog}
       
        keepMounted
        onClose={handelClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Are you sure you want to delete this this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
           <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Task title"
            type="text"
            fullWidth
            variant="standard"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
           <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="Details "
            type="text"
            fullWidth
            variant="standard"
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
          />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>Cancel</Button>
          <Button onClick ={handelSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* end of pop up */}

      <Card
        className='card'
        sx={{
          height: '100px',
          minWidth: 275,
          background: '#E8AEB7',
          color: 'white',
          variant: 'outlined',
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                textAlign={'left'}
                gutterBottom
                sx={{
                  fontFamily: 'serif',
                  color: 'text.primary',
                  fontSize: 28,
                  textDecoration:todo.isCompleted ? 'line-through' : 'none',
                }}
              >
                {todo.title} {/* hada howa lprops likhdinah mn todoslist   */}
              </Typography>
              <Typography
                textAlign={'left'}
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'playfair',
                  fontWeight: 'bold',
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={4}>
              <IconButton
                className='iconbutton'
                aria-label='delete'
                style={{
                  color: '#b23c17',
                }}
                onClick ={handletDeleteClick}
              >
                
                <DeleteIcon />
              </IconButton>
              <IconButton
                className='iconbutton'
                aria-label='check'
                style={{
                  color: todo.isCompleted ? '#388e3c' : '#cfd8dc',
                }}
                onClick={handelCheckClick}
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                className='iconbutton'
                aria-label='edit'
                style={{
                  color: '#01579b',
                }}
                 onClick ={handeltUpdateClick}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
