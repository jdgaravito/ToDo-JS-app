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
            console.log("(x) ",this.todos[i].todoText);
          } else {
            console.log("( ) ",this.todos[i].todoText);
          }
        }
      }
    },
  
    addToDo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
      this.displayToDos();
    },
  
    editToDo: function(index, todoText) {
      this.todos[index].todoText = todoText;
      this.displayToDos();
    },
  
    deleteToDo: function(index) {
      this.todos.splice(index, 1);
      this.displayToDos();
    },
  
    completeToDo: function(index) {
      var todo = this.todos[index];
      todo.completed = !todo.completed;
      this.displayToDos();
    }
  };
  