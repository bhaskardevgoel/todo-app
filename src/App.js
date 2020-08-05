import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    //this loads when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => { //get the todos from the database and order them
      setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo:doc.data().todo}))) //take a snapshot of the data as soon as a new task is added
    })
  }, []);

  const addTodo = (event) => { //this will get activated when button is clicked
    event.preventDefault(); //prevent the form from refreshing the page
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);  //add data to the input field
    setInput('') //clear the input field
  }
  return (

    <div className="App">
      <h1>Add Todos Here</h1>
      <form>
      <FormControl>
        <InputLabel>Add Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
      </FormControl>
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add task</Button>
      </form>

      <ul className="list">
        {todos.map(todo => (
          <Todo todo={todo}/> //interacting with the componet todo.
        ))}
      </ul>

    </div>
  );
}

export default App;
