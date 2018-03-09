// function TodoList() {
//   this.todos = [];
// }

// TodoList.prototype.addTodo = function (item) {
//   this.todos = this.todos.concat([item]);
// }

// TodoList.prototype.removeTodo = function (item) {
//   this.todos = this.todos.filter(function (todo) {
//     return item !== todo;
//   });
// }


// var todaysList = new TodoList();

// todaysList.addTodo('Sa explic ce este TypeScript');
// todaysList.addTodo('Sa explic ce este RxJS');
// todaysList.addTodo('Sa explic ce este Zone');
// todaysList.removeTodo('Sa explic ce este Zone');
// // console.log(todaysList.todos);


class TSTodoList {
  todos: string[];
  constructor() {
    this.todos = [];
  }

  // these are all prototype methods
  addTodo(item) {
    // this.todos = this.todos.concat([item]);
    this.todos = [...this.todos, item];
  }

  removeTodo(item) {
    // this.todos = this.todos.filter(function (todo) {
    //   return item !== todo;
    // });

    // this.todos = this.todos.filter((todo) => {
    //   return item !== todo;
    // });

    this.todos = this.todos.filter((todo) => item !== todo);
  }
}
let newTodo = new TSTodoList();

newTodo.addTodo('Sa explic ce este TypeScript');
newTodo.addTodo('Sa explic ce este RxJS');
newTodo.addTodo('Sa explic ce este Zone');
newTodo.removeTodo('Sa explic ce este Zone');

console.log(newTodo.todos);
