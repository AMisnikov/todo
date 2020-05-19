import { renderTodos, openPopup, closePopup } from './views';
import { createTodo } from './todos';
import { setFilters } from './filters';

import '../sass/main.scss';

//DOM elements
const addBtn = document.querySelector('.btn-add');
const closeBtn = document.querySelector('.add-task__btn--close');
const addTaskBtn = document.querySelector('.add-task__btn--add');
const addTaskField = document.querySelector('.add-task__field');
const textFilter = document.querySelector('#text-filter');
const hideCompletedFilter = document.querySelector('#completed-filter');

//Rendering todos
renderTodos();

//Popup maniplation
addBtn.addEventListener('click', () => {
    openPopup();
    addTaskField.focus();
});

closeBtn.addEventListener('click', () => {
    closePopup();
});

//Adding new task
addTaskBtn.addEventListener('click', () => {
    
    createTodo(addTaskField.value);
    addTaskField.value = '';
    closePopup();
    renderTodos();

    
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
