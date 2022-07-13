const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListeners
LoadEventListeners();

// Load All Event Listeners
function LoadEventListeners() {
    // Add Task Event
    form.addEventListener('submit', addTask);
}

// Get Tasks from LS
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