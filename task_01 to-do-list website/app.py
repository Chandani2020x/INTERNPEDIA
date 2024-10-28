from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# In-memory list to store tasks
tasks = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/add', methods=['POST'])
def add_task():
    data = request.get_json()
    task_content = data.get('content')
    if task_content:
        tasks.append({'content': task_content, 'completed': False})
    return jsonify({'status': 'Task added successfully'})

@app.route('/complete/<int:task_id>', methods=['POST'])
def complete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['completed'] = True
    return jsonify({'status': 'Task marked as complete'})

@app.route('/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return jsonify({'status': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)
