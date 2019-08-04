
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};

loadTodoList();

// User entered text
document.getElementById("submit").addEventListener('click', function(e){
    addItem();
})

document.getElementById('textInput').addEventListener('keydown', function(e){
    if (e.code == 'Enter') {
        addItem();
    }
})

function addItem() {
    var value = document.getElementById('textInput').value;
    if (value) {
        data.todo.push(value);
        addItemToDOM(value);
        dataObjectUpdated();
        document.getElementById('textInput').value = '';
    }
}

function loadTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
    console.log(data);
}

// Remove item from the list
function removeItem(item) {
    var completedList = document.getElementById('completed');
    var todoList = document.getElementById('todo');

    if (item.parentNode.id == 'todo') {
        data.todo.splice(data.todo.indexOf(item.innerText), 1)
    } else if (item.parentNode.id == 'completed') {
        data.completed.splice(data.completed.indexOf(item.innerText), 1)
    }
    item.remove();
    dataObjectUpdated();
}

function completeItem(item) {
    var completedList = document.getElementById('completed');
    var todoList = document.getElementById('todo');

    if (item.parentNode.id == 'todo') {
        data.todo.splice(data.todo.indexOf(item.innerText), 1)
        data.completed.push(item.innerText);
        completedList.insertBefore(item, completedList.childNodes[1])
    } else if (item.parentNode.id == 'completed') {
        data.completed.splice(data.completed.indexOf(item.innerText), 1)
        data.todo.push(item.innerText);
        todoList.insertBefore(item, todoList.childNodes[0])
    }
    dataObjectUpdated();
}

function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.className = "shadow list-group-item mb-2";
    item.innerText = text;

    var removeButton = document.createElement('button');
    removeButton.className = "btn btn-outline-danger float-right";

    var removeImage = document.createElement('span');
    removeImage.style = "color: red";
    removeImage.innerHTML = "<i class='fas fa-trash-alt'></i>";

    //Add click event for remove button
    removeButton.addEventListener('click', function() {
        removeItem(item);
    })

    var completeButton = document.createElement('button');
    completeButton.className = "btn btn-outline-success float-right mr-1";

    var completeImage = document.createElement('span');
    completeImage.style = "color: green";
    completeImage.innerHTML = "<i class='fas fa-check'></i>";

    //Add click event for complete button
    completeButton.addEventListener('click', function() {
        completeItem(item);
    })

    removeButton.appendChild(removeImage);
    completeButton.appendChild(completeImage);
    item.appendChild(removeButton);
    item.appendChild(completeButton);

    list.insertBefore(item, list.childNodes[0]);
}
