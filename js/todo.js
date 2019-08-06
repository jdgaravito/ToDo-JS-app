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

    //get compelted to dos number
    for (i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    // Case 1: if everithing is true make everithing false
    if (completedTodos === totalTodos) {
      //make all false
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    }
    //Case 2: otherwise make all true
    else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }

    this.displayToDos();
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

  editTodo: function() {
    var editTodoPositionInput = document.getElementById(
      "editTodoPositionInput"
    );
    var editTodoTextInput = document.getElementById("editTodoTextInput");

    toDoList.editToDo(
      editTodoPositionInput.valueAsNumber,
      editTodoTextInput.value
    );

    editTodoPositionInput.value = "";
    editTodoTextInput.value = "";
    view.displayToDos();
  },
  deleteTodo: function(index) {
    
    toDoList.deleteToDo(index);
    view.displayToDos();
  },

  completeTodo: function() {
    var completeTodoPositionInput = document.getElementById(
      "completeTodoPositionInput"
    );
    toDoList.completeToDo(completeTodoPositionInput.valueAsNumber);
    completeTodoPositionInput.value = "";
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
    // go through all array tasks
    for (i = 0; i < toDoList.todos.length; i++) {
      var todoLi = document.createElement("li");
      var todo = toDoList.todos[i];
      var todoTextComplete = "";

      if (todo.completed === true) {
        todoTextComplete = "(x) " + todo.todoText + " ";
      } else {
        todoTextComplete = "( ) " + todo.todoText + " ";
      }
      todoLi.id = i;
      todoLi.textContent = todoTextComplete;
      // todoLi.textContent = toDoList.todos[i].todoText;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },

  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      var elementClick = event.target;
      if (elementClick.className === "deleteButton") {
          handlers.deleteTodo(parseInt(elementClick.parentNode.id));
      }
    });

  }
};

view.setUpEventListeners();

