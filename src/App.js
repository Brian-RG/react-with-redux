import React from 'react';
import {hot} from 'react-hot-loader';
import TodoList from './todos/TodoList';
import './App.css';
import styled from 'styled-components'

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
`;

const App = () => (
    <div className="App"> 
        <TodoList/>
    </div>
);

export default hot(module)(App);