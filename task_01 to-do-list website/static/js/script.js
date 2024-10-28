// Fetch and display tasks
function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.innerHTML = `
                    ${task.content}
                    <button onclick="completeTask(${index})">Complete</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        });
}

// Add a new task
function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskContent = newTaskInput.value.trim();
    if (taskContent === '') return;

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: taskContent }),
    })
    .then(() => {
        newTaskInput.value = '';
        fetchTasks();
    });
}

// Mark a task as complete
function completeTask(taskId) {
    fetch(`/complete/${taskId}`, {
        method: 'POST'
    }).then(() => fetchTasks());
}

// Delete a task
function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, {
        method: 'DELETE'
    }).then(() => fetchTasks());
}

// Initial fetch
fetchTasks();
