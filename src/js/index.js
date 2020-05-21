import { renderTodos, openPopup, closePopup } from './views';
import { createTodo } from './todos';
import { setFilters } from './filters';

import '../sass/main.scss';

//DOM elements
const addBtn = document.querySelector('.btn-add');
const popup = document.querySelector('.popup');
const addTaskForm = document.getElementById('add-task');
const textFilter = document.querySelector('#text-filter');
const hideCompletedFilter = document.querySelector('#completed-filter');

//Rendering todos
renderTodos();

//Popup maniplation
addBtn.addEventListener('click', () => {
    openPopup();
});

popup.addEventListener('click', (e) => {
    if(e.target.classList.contains('popup__overlay') || e.target.classList.contains('popup__btn-close')) {
        closePopup();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
        closePopup();
    }
});

//Adding new task
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = e.target.elements.todo.value;
    if(todoText) {
        createTodo(todoText);
        e.target.elements.todo.value = '';
        closePopup();
        renderTodos();  
    }
});

//Filtering Todos
textFilter.addEventListener('input', (e) => {
    setFilters({
        text: e.target.value
    });

    renderTodos();
});

hideCompletedFilter.addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTodos();
    
});
