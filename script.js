(function () {//IIFE so that we cant overide any variables inside the code

    /*--------------------------- Tasks Section ------------------------------------*/
    
    /*Creating all the necessary variables by document.get method*/
    let tasks = [];
    const tasksList = document.getElementById('list');
    const completeAll =document.getElementById('complete-all');
    const clearCompleted = document.getElementById('clear-completed');
    let tasksCounter = document.getElementById('tasks-counter');
    const inputBox = document.getElementById("add");
    const addIcon = document.getElementById("add-icon");
    const showAllButton =document.getElementById('show-all');
    const showUncompleteButton = document.getElementById('show-uncomplete');
    const showCompleteButton = document.getElementById('show-complete');
    
    /*Function to add task DOm*/
    function addTaskToDOM(task){
    
        const li = document.createElement('li');
    
        li.innerHTML = `        
              <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} 
              class="custom-checkbox">
              <label for="${task.id}">${task.title}</label>
             <i class="fa-regular fa-circle-xmark delete" data-id="${task.id}"></i>
            `;
    
            tasksList.append(li);
    
    }
    
    /*Function to render the List*/
    function renderList() {
        tasksList.innerHTML = '';
        let incompleteTaskCount = 0; // Initialize a count for incomplete tasks
    
         let hasTasks = false;
    
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
            if (!tasks[i].completed) {
                // Increment the count for each incomplete task
                incompleteTaskCount++; 
                
            }
    
            hasTasks = true;
        }
    
    // Update tasksCounter with the count of incomplete tasks
        tasksCounter.innerHTML = incompleteTaskCount; 
    
        if (!hasTasks) {
            tasksList.innerHTML = 'No Tasks to Show!!';
        }
        
    }
    
    /*Function to mark task as completed*/
    function markCompleted(taskId) {
        // Find the task by its ID
        const task = tasks.find(function (task) {
            return task.id === Number(taskId);
        });
    
        if (task) {
            // Toggle the completion status
            task.completed = !task.completed;
    
            renderList();
            showNotification(task.completed ? 'Task Completed' : 'Task Marked as Incomplete');
        } else {
            showNotification('Could not complete the task');
        }
    }
    
    
    
    /*Function to complete all the tasks*/
    function completeAllTasks() {
        const allTasksCompleted = tasks.every(task => task.completed);
        
        for (const task of tasks) {
            task.completed = !allTasksCompleted;
        }
        
        renderList();
        
        const completeAllElement = document.getElementById('complete-all');
        completeAllElement.textContent = allTasksCompleted ?  'Complete all tasks' : 'Uncomplete all tasks';
        
        if (allTasksCompleted) {
            showNotification('All tasks marked as incomplete');
        } else {
            showNotification('All tasks marked as completed');
        }
    }
    
    
    /*Function to clear completed task*/
    function clearCompletedTasks() {
        const completedTasks = tasks.filter(task => task.completed);
        
        if (completedTasks.length === 0) {
            alert('Please complete a task first');
            return;
        }
        
        tasks = tasks.filter(task => !task.completed);
        renderList();
        showNotification('Cleared completed tasks');
    }
    
    
    /*Function to delete the task*/
    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        });
    
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully')
    };
    
    /*Function to add the task*/
    function addTask(task) {
    
        if(task){
    
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
    
        showNotification('Task cannot be added');
    };
    
    /*Alert Function to show Notifications*/
    function showNotification(text) {
        alert(text);
    };
    
    /*Function to add the task using Icon*/
    function addTaskFromInputBox() {
        const text = inputBox.value.trim();
        if (!text) {
            showNotification('Task cannot be empty');
            return;
        }
    
        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        };
    
        inputBox.value = '';
        addTask(task);
    }
    
    /*Function to handle Clicks of delete and check box*/
     function handleClickListener(e) {
        const target = e.target;
    
        if (target.classList.contains('delete')) {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            markCompleted(taskId);
            return;
        }
    }
    
    
    
    /*Function to render Completed and Uncompleted tasks*/
    function renderCompleted(showCompleted = true) {
        tasksList.innerHTML = '';
    
        let hasTasks = false;
    
        for (let i = 0; i < tasks.length; i++) {
            if (showCompleted === tasks[i].completed || showCompleted === undefined) {
                addTaskToDOM(tasks[i]);
                hasTasks = true;
            }
        }
    
        if (!hasTasks) {
            tasksList.innerHTML = 'No Tasks to Show!!';
        }
    }
    
    /*---------------------------- Event Listeners ----------------------------------*/
    
    inputBox.addEventListener("input", () => {
        if (inputBox.value.trim() !== "") {
            addIcon.style.display = "block";
        } else {
            addIcon.style.display = "none";
        }
    });
    
    inputBox.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            addTaskFromInputBox();
        }
    });
    
    
    addIcon.addEventListener("click", () => {
        addTaskFromInputBox();
    });
    
    completeAll.addEventListener("click", function (event) {
        event.preventDefault();
        completeAllTasks();
    });
    
    clearCompleted.addEventListener("click", function (event) {
        event.preventDefault();
        clearCompletedTasks();
    });
    
    
    showUncompleteButton.addEventListener('click', function () {
        renderCompleted(false);
    });
    
    showCompleteButton.addEventListener('click', function () {
        renderCompleted(true);
    });
    
    showAllButton.addEventListener('click', function () {
        renderList(); 
    });
    
    /*--------------------------- Toggle Section ------------------------------------*/
    
    // Get the circle element
    const circle = document.querySelector('.circle');
    
    // Get the container div and body elements
    const containerDiv = document.querySelector('.container-div');
    const body = document.querySelector('body');
    
    // Set initial state
    let isCircleMoved = false;
    
    // Add click event listener to the circle
    circle.addEventListener('click', () => {
      // Toggle the circle's position
      if (isCircleMoved) {
        circle.style.transform = 'translateX(0px)';
        
        containerDiv.style.backgroundColor = '';
        body.style.backgroundColor = '';
      } else {
        circle.style.transform = 'translateX(30px)';
        containerDiv.style.backgroundColor = 'rgb(32, 33, 36)';
        containerDiv.style.boxShadow = '0 4px 8px 0 #9d7f7f'
        body.style.backgroundColor  = "#2e2e2e";
    
      }
    
      // Toggle the state
      isCircleMoved = !isCircleMoved;
    });
    
    
    /*Function when app is intialize*/
    function intializeApp(){
        document.addEventListener('click', handleClickListener);
    }
    
    intializeApp();
    
    })();
    