var React = require('react');
var ReactDOM = require('react-dom');
//moDule requires
var TodoItem = require('./todoitem');
var AddItem = require('./addItem');
var About = require('./about');

require('./css/index.css');
import{Router, Route} from 'react-router';

var App = React.createClass({
  render: function(){
    return(
        <Router>
          <Route path={'/'} component={TodoComponent}></Route>
          <Route path={'/about'} component={About}></Route>
        </Router>
    );
  }

});

//Create component
var TodoComponent = React.createClass({
  getInitialState: function() {
    return {
      todos: ['wash up', 'eat some cheese', 'take a nap', 'playwith dog'],
      age: 30
    }
  },
  render: function(){
    var todo2 = this.state.todos;

    todo2 = todo2.map(function(item, index){
      return (
        <TodoItem item={item} key={index} onDelete={this.onDelete} />
      );
    }.bind(this));

    return (
      <div id='todo-list'>
        <p>The busiest people have the most leisure...</p>
        <p>{this.state.age}</p>
        <ul>{todo2}
        </ul>
        <AddItem onAdd={this.onAdd} />
        </div>

    )
  },//render

//Custom functions
 onDelete: function(item){
   var updatedTodos = this.state.todos.filter(function(val, index) {
     return item !== val;
   });

   this.setState({
     todos: updatedTodos
   });
 },

 onAdd: function(item) {
   var updatedTodos = this.state.todos;

   updatedTodos.push(item);
   this.setState({
     todos: updatedTodos
   });
 },

 //lifecycle functions

 componentWillMount: function() {

   console.log('components will mount');

 },
 componentDidMount: function() {

   console.log('components did mount');
   //any grabbing of external data
 },

 componentWillUpdate: function() {

   console.log('component will update');
 }



});


//var myCheese = {name:'Swiss', smellFactor:'Extremepong', price:'3.50'};
//put component into html page
ReactDOM.render(<App msg="I like cheese." />, document.getElementById('todo-wrapper'));
