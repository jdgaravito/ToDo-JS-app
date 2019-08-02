//A console toDo List made in vanilla JS.

//initial setup
var toDoList = {
    todos: [],
  
    //display todos
    displayToDos: function() {
      console.log("Mis Tareas:");
      if (this.todos.length === 0) {
        console.log("No hay tareas. agrega una tarea");
      } else {
        for (i = 0; i < this.todos.length; i++) {
          if (this.todos[i].completed === true) {
            console.log("(x) ", this.todos[i].todoText);
          } else {
            console.log("( ) ", this.todos[i].todoText);
          }
        }
      }
    },
    // add a new todo
    addToDo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
      this.displayToDos();
    },
    // Edit to do
    editToDo: function(index, todoText) {
      this.todos[index].todoText = todoText;
      this.displayToDos();
    },
    // delete todo
    deleteToDo: function(index) {
      this.todos.splice(index, 1);
      this.displayToDos();
    },
    // complete todo
    completeToDo: function(index) {
      var todo = this.todos[index];
      todo.completed = !todo.completed;
      this.displayToDos();
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
      else{
        for (var i = 0; i < totalTodos; i++) {
          this.todos[i].completed = true;
          
        }
      }
      
      this.displayToDos();
    }
  };
  
  //access to the display todos button.
var displayTodosButton = document.getElementById('displayTodosButton');
displayTodosButton.addEventListener('click', function(){
  toDoList.displayToDos();
})

// Toggle all the tasks
var toggleAllButton = document.getElementById('toggleAllButton');
toggleAllButton.addEventListener('click', function(){
  toDoList.toggleAll();
})