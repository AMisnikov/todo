const todos = getTodos();

const filters = {
    text: '',
    hideCompleted: false
}

renderTodos(todos, filters);




//DOM elements
const popup = document.querySelector('.popup');
const addBtn = document.querySelector('.btn-add');
const closeBtn = document.querySelector('.add-task__btn--close');
const addTaskBtn = document.querySelector('.add-task__btn--add');
const todoList = document.querySelector('.todo__list');
const addTaskField = document.querySelector('.add-task__field');
const textFilter = document.querySelector('#text-filter');
const hideCompletedFilter = document.querySelector('#completed-filter');


//Popup maniplation
addBtn.addEventListener('click', () => {
    popup.classList.add('popup--active');
});

closeBtn.addEventListener('click', () => {
    closePopup();
});

//Adding new task
addTaskBtn.addEventListener('click', () => {
    const id = uuidv4();

    todos.push({
        id: id,
        content: addTaskField.value,
        completed: false
    });

    addTaskField.value = '';
    closePopup();
    saveTodos(todos);
    renderTodos(todos, filters);

    
});

//Filtering Todos
textFilter.addEventListener('input', (e) => {
    filters.text = e.target.value;
    renderTodos(todos, filters);
});

hideCompletedFilter.addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
    
});
