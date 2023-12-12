let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');

let arrtasks = [];

if (localStorage.getItem('tasks')) {
  arrtasks = JSON.parse(localStorage.getItem('tasks'));
}

getData();

submit.onclick = function () {
  if (input.value !== '') {
    addTask(input.value);
    input.value = '';
  }
};

taskDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    supTask(e.target.parentElement.getAttribute('data-id'));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains('task')) {
    updatTask(e.target.getAttribute('data-id'));
    e.target.classList.toggle('done');
  }
});

function addTask(text) {
  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  arrtasks.push(task);
  showtasks(arrtasks);
  storage(arrtasks);
}
function showtasks(elements) {
  taskDiv.innerHTML = '';
  elements.forEach((task) => {
    let div = document.createElement('div');
    div.className = 'task';
    if (task.completed) {
      div.className = 'task done';
    }
    div.setAttribute('data-id', task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('Delete'));
    div.appendChild(span);
    taskDiv.appendChild(div);
  });
}
function storage(addTask) {
  window.localStorage.setItem('tasks', JSON.stringify(arrtasks));
}
function getData() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    showtasks(tasks);
  }
}

function supTask(taskId) {
  arrtasks = arrtasks.filter((task) => task.id != taskId);
  storage(arrtasks);
}
function updatTask(taskId) {
  for (let i = 0; i < arrtasks.length; i++) {
    if (arrtasks[i].id == taskId) {
      arrtasks[i].completed == false
        ? (arrtasks[i].completed = true)
        : (arrtasks[i].completed = false);
    }
  }
  storage(arrtasks);
}
