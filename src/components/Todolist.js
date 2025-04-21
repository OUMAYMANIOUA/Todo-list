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

export default function Todolist() {
    
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
        <>
          <CardContent>
            <Typography
              variant='h1'
              gutterBottom
              sx={{ color: 'text.primary', fontSize: 16 }}
            >
              <h1>Todo List</h1>
            </Typography>
            <Divider />
            <ToggleButtonGroup
            sx={{marginTop:'20px'}}
              color='primary'
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label='Platform'
            >
              <ToggleButton value='web'>All</ToggleButton>
              <ToggleButton value='android'>Completed</ToggleButton>
              <ToggleButton value='ios'>Completed</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </>
      </Container>
    </div>
  );
}
