//A console toDo List made in vanilla JS.
// Author: Juan David Garavito

//initial setup
var toDoList = {
  todos: [],

  // add a new todo
  addToDo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
      editModeStatus: false
    });
  },
  // Edit to do
  editToDo: function(index, todoText) {
    var todo = this.todos[index];
    this.todos[index].todoText = todoText;
    todo.editModeStatus = false;
  },

  editModeStatusChanger: function(index) {
    var todo = this.todos[index];
    todo.editModeStatus = !todo.editModeStatus;
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

  editMode: function(index) {
    toDoList.editModeStatusChanger(index);
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
    todosUl.className = "list-wrapper";
    //sets the content to nothing
    todosUl.innerText = "";

    toDoList.todos.forEach(function(todo, index) {
      var todoLi = document.createElement("li");
      todoLi.className = "list";
      var todolistText = document.createElement("p");
      var todoTextComplete = "";
      todoLi.id = index;
      todosUl.appendChild(todoLi);
      // edit button switcher based on completion of task
      if (todo.completed === true) {
        buttonComplete = todoLi.prepend(this.createCompleteButton());
        todoTextComplete = " " + todo.todoText + " ";
        todolistText.className = "text-completed";
      } else {
        buttonComplete = todoLi.prepend(this.createIncompleteButton());
        todoTextComplete = " " + todo.todoText + " ";
        todolistText.className = "text-pending";
      }

      //edit status mode display logic.
      if (todo.editModeStatus === true) {
        var editButton = this.createEditButton();
        var content = this.createEditInput();
        content.value = todo.todoText;
      } else {
        var content = todolistText;
        var editButton = this.createEditModeButton();
      }

      todoLi.appendChild(content);
      todoLi.appendChild(editButton);
      todolistText.innerText = todoTextComplete;
      todoLi.appendChild(this.createDeleteButton());

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
    editButton.textContent = "done";
    editButton.className = "material-icons editButton";

    return editButton;
  },

  createEditModeButton: function() {
    var editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.className = "material-icons editModeButton";

    return editButton;
  },

  createEditInput: function() {
    var editInput = document.createElement("textarea");
    editInput.setAttribute("type", "textarea");
    editInput.setAttribute("id", "editTodoTextInput");
    return editInput;
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
      if (elementClick.className === "material-icons editModeButton") {
        handlers.editMode(parseInt(elementClick.parentNode.id));
      }
      if (elementClick.className === "material-icons editButton") {
        var editId = parseInt(elementClick.parentNode.id);
        var newText = document.getElementById("editTodoTextInput");
        handlers.editTodo(editId, newText.value);
      }
    });
  }
};

view.setUpEventListeners();
