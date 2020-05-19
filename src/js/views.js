import { getTodos, toggleTodo, removeTodo } from './todos';
import { getFilters } from './filters';

const renderTodos = () => {
    const filters = getFilters();
    const filteredTodos = getTodos().filter(item => {
        const textFilter = item.content.toLowerCase().includes(filters.text.toLowerCase());
        
        return textFilter && (!filters.hideCompleted || !item.completed);
        
        
    });

    const todosContainer = document.querySelector('.todo__list');
    todosContainer.innerHTML = '';

    if(filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            todosContainer.appendChild(generateToDoItem(todo));
        });
    } else {
        const message = document.createElement('p');
        message.classList.add('empty-message');
        message.textContent = 'There are no tasks to show';
        todosContainer.appendChild(message);

    }
};

const generateToDoItem = (todo) => {
    const todoItem = document.createElement('li');
    todoItem.setAttribute('class', 'todo__item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'todo__checkbox');
    checkbox.setAttribute('id', todo.id);
    checkbox.checked = todo.completed;
    checkbox.addEventListener('click', e => {
        toggleTodo(todo.id);
        renderTodos();
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
        removeTodo(todo.id);
        renderTodos();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(btnDelete);

    return todoItem;
};


const closePopup = () => {
    document.querySelector('.popup').classList.remove('popup--active');
};

const openPopup = () => {
    document.querySelector('.popup').classList.add('popup--active');
};

export { renderTodos, generateToDoItem, closePopup, openPopup };


