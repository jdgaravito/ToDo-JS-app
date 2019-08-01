//A console toDo List made in vanilla JS.

var toDoList = {
    todos: ['item1', 'item2', 'item3'],
    displayToDos: function(){
      console.log('Mis tareas:', this.todos);
    },
   addToDo: function(todo){
     this.todos.push(todo);
     this.displayToDos();
   },
    
   editToDo: function(position, newValue){
     this.todos[position] = newValue;
     this.displayToDos();
   },
    
   deleteToDo: function(position){
     this.todos.splice(position,1);
     this.displayToDos();
   } 
  };
  