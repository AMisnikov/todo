import { v4 as uuidv4 } from 'uuid';

let todos = [];

const loadTodos = () => {
   const todoJSON = localStorage.getItem('todos');

    try {
        todos =  todoJSON ? JSON.parse(todoJSON) : [];
    } catch (e) {
       todos = [];
    }   
};

const saveTodos = () =>  {
    localStorage.setItem('todos', JSON.stringify(todos)); 
 };

const getTodos = () => todos;

const createTodo = (text) => {
    const todo = {
        id: uuidv4(),
        content: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
};

const removeTodo = (id) => {
    const index = todos.findIndex(item => {
        return item.id === id;
    });

    if (index > -1) {
        todos.splice(index, 1);
        saveTodos();
    }
};

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
    }
};

loadTodos();

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo };


 
