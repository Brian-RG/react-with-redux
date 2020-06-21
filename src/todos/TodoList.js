import React, {useEffect} from 'react';
import TodoListItem from './TodoListItem';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import {loadTodos, removeTodoRequest, updateTodoRequest} from './thunks';
import {getTodos, getTodosLoading} from './selectors';


const TodoList = ({todos = [] , onRemovePressed, onMarkPressed, isLoading, startLoadingTodos}) => {
    
    useEffect(() => {
        startLoadingTodos();
    },[]);

    const loadingMessage = <div>Loading Todos ...</div>
    const content = (<div className="list-wrapper">
                        <NewTodoForm/>
                        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkPressed= {onMarkPressed}/>)}
                    </div>);

    return isLoading? loadingMessage: content;
}
const mapStateToProps = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state),
})

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onMarkPressed: id => dispatch(updateTodoRequest(id)),
    onDisplayAlertClicked: () => dispatch(displayAlert()),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);