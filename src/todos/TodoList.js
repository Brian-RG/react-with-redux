import React, {useEffect} from 'react';
import TodoListItem from './TodoListItem';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import {loadTodos, removeTodoRequest, updateTodoRequest} from './thunks';
import {getTodosLoading, getCompletedTodos, getIncompleteTodos} from './selectors';
import styled from 'styled-components';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`

const TodoList = ({completedTodos, incompleteTodos , onRemovePressed, onMarkPressed, isLoading, startLoadingTodos}) => {
    
    useEffect(() => {
        startLoadingTodos();
    },[]);

    const loadingMessage = <div>Loading Todos ...</div>
    const content = (<ListWrapper>
                        <NewTodoForm/>                        
                        <h3>Incomplete</h3>
                        {incompleteTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkPressed= {onMarkPressed}/>)}
                        <h3>Completed</h3>
                        {completedTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkPressed= {onMarkPressed}/>)}
                    </ListWrapper>);

    return isLoading? loadingMessage: content;
}
const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
})

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onMarkPressed: id => dispatch(updateTodoRequest(id)),
    onDisplayAlertClicked: () => dispatch(displayAlert()),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);