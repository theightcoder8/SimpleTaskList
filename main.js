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
    // Remove task event
    //taskList.addEventListener('click', removeTask);
    // Clear all task events
    clearTasks.addEventListener('click', clearAllTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

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


// Remove tasks
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
