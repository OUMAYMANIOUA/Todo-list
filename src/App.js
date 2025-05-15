import './App.css';
import Todolist from './components/Todolist';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './TodosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  typography: {
    fontFamily: ['playfair'],
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: 'complete react course',
    details: 'tthh',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'bootstrap',
    details: 'll',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'java',
    details: 'hhh',
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
         <TodosContext.Provider value={{ todos, setTodos}}> 
          <Todolist />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
