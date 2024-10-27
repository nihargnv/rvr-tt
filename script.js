const todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');

    // Create checkbox for marking as complete
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.onclick = () => deleteTodoOnCheck(listItem, index);

    const todoText = document.createElement('span');
    todoText.textContent = todo;

    const editButton = document.createElement('button');
    editButton.textContent = '';
    editButton.classList.add("fa-solid");
    editButton.classList.add("fa-pen-to-square");
    editButton.classList.add("btn-edit");
    editButton.onclick = () => editTodo(index);

    listItem.appendChild(checkBox);
    listItem.appendChild(todoText);
    listItem.appendChild(editButton);

    todoList.appendChild(listItem);
  });
}

function addTodo() {
  const newTodo = document.getElementById('newTodo').value;
  if (newTodo) {
    todos.push(newTodo);
    saveTodos();
    displayTodos();
    document.getElementById('newTodo').value = '';
  }
}

function editTodo(index) {
  const newTodo = prompt("Edit your task:", todos[index]);
  if (newTodo) {
    todos[index] = newTodo;
    saveTodos();
    displayTodos();
  }
}

function deleteTodoOnCheck(listItem, index) {
  listItem.classList.add('completed');  // Add the fade-out animation class
  setTimeout(() => {
    todos.splice(index, 1);
    saveTodos();
    displayTodos();
  }, 400);  // Delay to allow the fade-out animation to finish
}

// Initial call to load todos on page load
displayTodos();
