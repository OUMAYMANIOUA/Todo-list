import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import './TodoStyle.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { TodosContext } from '../TodosContext';
//others
import { v4 as uuidv4 } from 'uuid';

//objet l kola todo bch nmapiwhom

export default function Todolist() {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayTodosType, setTodosType] = useState('all');
  const [title, setTitle] = useState('');

  // Charger depuis localStorage une seule fois
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  function handleAddTodo() {
    if (title.trim() === '') return;
    const newTodo = {
      id: uuidv4(),
      title: title,
      details: '',
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle('');
  }

  function changeDisplayType(e) {
    setTodosType(e.target.value);
  }

  const completedTask = todos.filter((t) => t.isCompleted === true);
  const nonCompletedTask = todos.filter((t) => t.isCompleted === false);

  let renderedTodos = todos.map((t) => <Todo key={t.id} todo={t} />);
  if (displayTodosType === 'completed') {
    renderedTodos = completedTask.map((t) => <Todo key={t.id} todo={t} />);
  } else if (displayTodosType === 'non-completed') {
    renderedTodos = nonCompletedTask.map((t) => <Todo key={t.id} todo={t} />);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Container maxWidth='sm'>
        <Card
          sx={{ minwidth: 357 }}
          style={{
            maxHeight: '88vh',
            overflow: 'scroll',
            bachkgroundColor: 'rgba(218, 34, 126, 0.2)',
            border: '1px solid rgb(157, 8, 35)',
            borderRdius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: '0.3s',
          }}
        >
          <CardContent>
            <Typography style={{ fontWeight: 100 }} gutterBottom variant='h1'>
              Todo List
            </Typography>
            <Divider />
            <ToggleButtonGroup
              sx={{ marginTop: '20px' }}
              color='primary'
              value={displayTodosType}
              exclusive
              onChange={changeDisplayType}
              aria-label='Platform'
            >
              <ToggleButton
                 sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(218, 34, 126, 0.2)',
                    color: 'grey',

                  },
                }}
                value='all'
              >
                All
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(218, 34, 126, 0.2)',
                    color: 'grey',

                  },
                }}
                value='completed'
              >
                Completed
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(218, 34, 126, 0.2)',
                    color: 'grey',

                  },
                }}
                value='non-completed'
              >
                Non-Completed
              </ToggleButton>
            </ToggleButtonGroup>

            {renderedTodos}

            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid
                size={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant='contained'
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: title ? 'rgba(255, 105, 180, 0.2)' : 'rgba(156, 134, 145, 0.3)',
                    color: title ? 'rgba(255, 0, 128, 0.66)' : 'rgba(15, 11, 13, 0.3)', // hot pink النص
                    border: title ? '1px solid #FF69B4' : '1px solid rgba(156,134,145,0.3)',
                    '&:hover': {
                         backgroundColor: title ? 'rgba(255, 105, 180, 0.3)' : '#f0c9da',
                    },
                  }}
                  onClick={() => {
                    handleAddTodo();
                  }}
                  disabled={!title}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={8}>
                <TextField 
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    color:'rgba(255, 0, 128, 0.66)',
              
                  }}

                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
