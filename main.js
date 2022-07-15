const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListeners
LoadEventListeners();

// Load All Event Listeners
function LoadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all task events
    clearTasks.addEventListener('click', clearAllTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks form Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        //=> LS can only store strings' so we are gonna use JSON
        tasks = JSON.parse(localStorage.getItem('task'));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item'; // Adding clas
        li.appendChild(document.createTextNode(task)); // Create text node and append to li

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'; // Adding class
        link.innerHTML = '<i class="fa fa-remove"></i>'; // Add icon to html
        li.appendChild(link); // append the link to li
        taskList.appendChild(li); // append li to ul
    })
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } 

    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; // adding class
    link.innerHTML = '<i class="fa fa-remove"></i>'; // adding icon
    li.appendChild(link); // append the link to li
    taskList.appendChild(li); // append li to ul

    // Clear Input
    taskInput.value = '';
    e.preventDefault();
}


// Clear tasks
function clearAllTasks() {
    taskList.innerHTML = '';
    /* Faster clearing
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    */
}


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
} 


// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
}