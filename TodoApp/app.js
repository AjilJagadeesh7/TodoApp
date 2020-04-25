//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
// filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event){

    event.preventDefault();//prevent form from submitting
    
    //create todoDIv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');//adding class to the div todoDiv
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;//text inside the html tag
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);//newTodo exists within TodoDiv
    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //Completed(check) button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'//adds the html inside the quotes to the button tag
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'//adds the html inside the quotes to the button tag
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton)

    //append to list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    //e is the event and target retrives the clicked item
    const item = e.target; //retreving what we are clicking on from todoList which has 3 items in it a textbar,2 buttons
    //Delete
    if(item.classList[0]==='trash-btn'){
        //selects the parent element of item(item is the target which ahs been clicked out 3)
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');//creates a class
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
    }
    //Check Mark
    if(item.classList[0]==='completed-btn'){
        //selects the parent element of item(item is the target which ahs been clicked out 3)
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}
// function filterTodo(e) {
//     const todos = todoList.childNodes;
//     todos.forEach(function(todo) {
//         switch(e.target.value) {
//             case "all":
//                 todo.style.display = "flex";
//                 break;
//             case "completed":
//                 if(todo.classList.contains("completed")) {
//                     todo.style.display = "flex";
//                 }
//                 else {
//                     todo.style.display = "none";
//                 }
//                 break;
//             case "uncompleted":
//                 if(!todo.classList.contains("completed")) {
//                     todo.style.display = "flex";
//                 }
//                 else {
//                     todo.style.display = "none";
//                 }
//                 break;
//         }
//     })

// }
function saveLocalTodos(todo){
    //check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));//saving to local storage
}

function getTodos(){
    //check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');//adding class to the div todoDiv
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;//text inside the html tag
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);//newTodo exists within TodoDiv

        //Completed(check) button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'//adds the html inside the quotes to the button tag
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'//adds the html inside the quotes to the button tag
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton)

    //append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}