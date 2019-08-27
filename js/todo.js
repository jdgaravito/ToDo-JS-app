//A console toDo List made in vanilla JS.
// Author: Juan David Garavito

//initial setup
var toDoList = {
  todos: [],

  // add a new todo
  addToDo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // Edit to do
  editToDo: function(index, todoText) {
    this.todos[index].todoText = todoText;
  },
  // delete todo
  deleteToDo: function(index) {
    this.todos.splice(index, 1);
  },
  // complete todo
  completeToDo: function(index) {
    var todo = this.todos[index];
    todo.completed = !todo.completed;
  },

  //toggle all todos
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // get the number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      //Case 1: if everithing is true make everithing false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
      //Case 2: otherwise make all true
      else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  displayToDos: function() {
    toDoList.displayToDos();
  },

  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    toDoList.addToDo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayToDos();
  },

  editTodo: function(index, newText) {
    var editTodoTextInput = document.getElementById("editTodoTextInput");
    toDoList.editToDo(index, editTodoTextInput.value);
    editTodoTextInput.value = "";
    view.displayToDos();
  },

  deleteTodo: function(index) {
    toDoList.deleteToDo(index);
    view.displayToDos();
  },

  completeTodo: function(index) {
    toDoList.completeToDo(index);
    view.displayToDos();
  },

  toggleAll: function() {
    toDoList.toggleAll();
    view.displayToDos();
  }
};

var view = {
  displayToDos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.className = "list-wrapper"
    //sets the content to nothing
    todosUl.innerText = "";

    toDoList.todos.forEach(function(todo, index) {
      var todoLi = document.createElement("li");
      todoLi.className = "list";
      var todolistText = document.createElement("p");
      var todoTextComplete = "";
      todoLi.id = index;
      if (todo.completed === true) {
        buttonComplete = todoLi.prepend(this.createCompleteButton());
        todoTextComplete = " " + todo.todoText + " ";
        todolistText.className = "text-completed";
      } else {
        buttonComplete = todoLi.prepend(this.createIncompleteButton());
        todoTextComplete = " " + todo.todoText + " ";
        todolistText.className = "text-pending";
      }
      todolistText.innerText = todoTextComplete;
      // todoLi.id = index;
      // todoLi.prepend(this.createCompleteButton());
      todoLi.appendChild(todolistText);
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      // the forEach has an optional argument that is "this" when executing callback forEach(callback, this)
    }, this);
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "material-icons deleteButton";
    return deleteButton;
  },

  createCompleteButton: function() {
    var completeButton = document.createElement("button");
    completeButton.textContent = "check_circle";
    completeButton.className = "material-icons completeButton";
    return completeButton;
  },

  createIncompleteButton: function() {
    var incompleteButton = document.createElement("button");
    incompleteButton.textContent = "panorama_fish_eye";
    incompleteButton.className = "material-icons completeButton";
    return incompleteButton;
  },

  createEditButton: function() {
    var editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.className = "material-icons editButton";
    return editButton;
  },

  createEditInput: function(){
    var editInput = document.createElement("input");
    editInput.textContent = "";
    editInput.className = "editInput";
  },

  setUpEventListeners: function() {
    // Enter Key listeners
    addTodoTextInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        handlers.addTodo(addTodoTextInput);
      }
    });
    // Button Key Listeners
    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event, text) {
      var elementClick = event.target;
      if (elementClick.className === "material-icons deleteButton") {
        handlers.deleteTodo(parseInt(elementClick.parentNode.id));
      }
      if (elementClick.className === "material-icons completeButton") {
        handlers.completeTodo(parseInt(elementClick.parentNode.id));
      }
      if (elementClick.className === "material-icons editButton") {
        var editId = parseInt(elementClick.parentNode.id);
        var newText = document.getElementById("editInput");
        handlers.editTodo(editId, newText.value);
      }
    });
  }
};

view.setUpEventListeners();
