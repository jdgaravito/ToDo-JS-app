//A console toDo List made in vanilla JS.

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
    //sets the content to nothing
    todosUl.innerHTML = "";

    toDoList.todos.forEach(function(todo, index) {
      var todoLi = document.createElement("li");
      var todoTextComplete = "";
      if (todo.completed === true) {
        todoTextComplete = "(x) " + todo.todoText + " ";
      } else {
        todoTextComplete = "( ) " + todo.todoText + " ";
      }

      todoLi.id = index;
      todoLi.textContent = todoTextComplete;
      todoLi.prepend(this.createCompleteButton());
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      // the forEach has an optional argument that is "this" when executing callback forEach(callback, this)
    }, this);
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },

  createCompleteButton: function() {
    var completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Complete";
    completeButton.className = "completeButton";
    return completeButton;
  },

  createEditButton: function() {
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "editButton";
    return editButton;
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
      if (elementClick.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClick.parentNode.id));
      }
      if (elementClick.className === "completeButton") {
        handlers.completeTodo(parseInt(elementClick.parentNode.id));
      }
      if (elementClick.className === "editButton") {
        var newText = document.getElementById("editTodoTextInput");
        var editId = elementClick.parentNode.id;
        handlers.editTodo(parseInt(elementClick.parentNode.id), newText.value);
      }
    });
  }
};

view.setUpEventListeners();
