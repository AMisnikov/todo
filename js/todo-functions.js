//Closing popup 

function closePopup() {
    document.querySelector('.popup').classList.remove('popup--active');
}


//Getting todo list from local storage
function getTodos() {
    const todos = localStorage.getItem('todos');

    try {
       return todos ?  JSON.parse(todos) :  [];
    } catch (e) {
        return [];
    }

    
};

//Saving todo list to local storage
function saveTodos(todos) {
   localStorage.setItem('todos', JSON.stringify(todos)); 
};

//Rendering Todos
function renderTodos(todos, filters) {
    const filteredTodos = todos.filter(item => {
        const textFilter = item.content.toLowerCase().includes(filters.text.toLowerCase());
        
        return textFilter && (!filters.hideCompleted || !item.completed);
        
        
    });
    document.querySelector('.todo__list').innerHTML = '';
    filteredTodos.forEach(item => {
        document.querySelector('.todo__list').appendChild(generateDOM(item));
    });
}

//Removing Todo
function removeTodo(todos, id) {
    const index = todos.findIndex(item => {
        return item.id === id;
    });

    if (index > -1) {
        todos.splice(index, 1);
    }

    
}

//Generating DOM elements
function generateDOM(todo) {
    const todoItem = document.createElement('li');
    todoItem.setAttribute('class', 'todo__item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'todo__checkbox');
    checkbox.setAttribute('id', todo.id);
    checkbox.checked = todo.completed;
    checkbox.addEventListener('click', e => {
        todo.completed = e.target.checked;
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    const label = document.createElement('label');
    label.setAttribute('class', 'todo__status');
    label.setAttribute('for', todo.id);

    const content = document.createElement('span');
    content.setAttribute('class', 'todo__content');
    content.textContent = todo.content;

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'btn-delete');
    btnDelete.addEventListener('click', () => {
        removeTodo(todos, todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(btnDelete);

    return todoItem;

}