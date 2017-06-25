

module.exports = function(app){

  app.get('/', function(req, res) {
        //res.render('todo', {todos: data});
        res.render('index')
  });

  // app.post('/todo', urlencodedParser, function(req, res){
  //   //get data from the view and add it to mongodb
  //     var newTodo = Todo(req.body).save(function(err, data){
  //       if (err) throw err;
  //       res.json(data);
  //     });
  // });
  //
  // app.delete('/todo/:item', function(req, res){
  //   // delete the requested item from mongodo
  //   Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
  //     if (err) throw err;
  //     res.json(data);
  //   });
  // });
};
