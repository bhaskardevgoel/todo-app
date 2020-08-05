import React, { useState } from 'react';
import './Todo.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItem, ListItemText,ListItemAvatar, Button, Modal, Input} from '@material-ui/core';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = () => {
        // Update todo with new text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });

        setOpen(false);
    };

    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={updateTodo}>update</Button>
            </div>
        </Modal>
        <List>
            <ListItemAvatar>
            </ListItemAvatar>
            <ListItem className="todo">
                <ListItemText primary={props.todo.todo} secondary="Todo"/>
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit</Button>
            <DeleteIcon className="icon" color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()} ></DeleteIcon>
        </List>
        </>
    )
}

export default Todo
