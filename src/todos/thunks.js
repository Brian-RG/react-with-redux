import {loadTodosInProgress, loadTodosFailure, loadTodosSuccess, createTodo, removeTodo, markAsCompleted} from './actions';


export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:5000/todos');
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    } catch (error) {
        dispatch(loadTodosFailure());
        alert(error);
    }
};

export const addTodoRequest = (text) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({text});
        const response = await fetch('http://localhost:5000/todos',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
            }
        );

        const todo = await(response.json());
        dispatch(createTodo(todo));
    } catch (error) {
        dispatch(displayAlert(error));
    }
};

export const removeTodoRequest = (id) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/todos/'+id, {
            method: 'delete',
            }
        );

        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (error) {
        dispatch(displayAlert(error))
    }
};

export const updateTodoRequest = (id) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/todos/'+id+'/completed',
        {
            method: 'post',
        });

        const updatedTodo = await response.json();
        dispatch(markAsCompleted(updatedTodo))
    } catch (error) {
        dispatch(displayAlert(error));
    }
};
 
export const displayAlert = text => () => {
    alert(text);
};