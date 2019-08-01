//A console toDo List made in vanilla JS.

var toDoList = {
    todos: [],
    displayToDos: function(){
       console.log('Mis tareas:', this.todos);
     },
    addToDo: function(todoText){
      this.todos.push({
        todoText: todoText,
        completed: false
        
      });
      this.displayToDos();
    },
     
    editToDo: function(index, todoText){
      this.todos[index].todoText = todoText;
      this.displayToDos();
    },
     
    deleteToDo: function(index){
      this.todos.splice(index,1);
      this.displayToDos();
    },
     
    completeToDo: function(index){
      var todo = this.todos[index];
      todo.completed = !todo.completed;
      this.displayToDos();
    }  
   };
   