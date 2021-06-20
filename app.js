// Define the UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load event listeners
loadEventListeners();

// load event listeners
function loadEventListeners() {
    // DOM LOAD EVENTS
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // add event
    taskList.addEventListener('click', removeTask);
    // clear all
    clearBtn.addEventListener('click', clearTasks);
    // filter
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // CREATE LI ELEMEMT
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create textnode and append to li
        li.appendChild(document.createTextNode(task));
        // create new link
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);

        // append to ul
        taskList.appendChild(li);

    });

}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // CREATE LI ELEMEMT
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append to ul
    taskList.appendChild(li);
    // store in LS
    storeTaskInLocalStorage(taskInput.value);


    // clear input
    taskInput.value = '';



    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));


    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains
        ('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElemen);
        }
    }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks
function clearTasks(e) {
    //  taskList.innerHTML = '';

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // https://jspef.com/innehtml-vs-removechild

    // clear from ls
    clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}