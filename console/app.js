// var stdin = process.openStdin();
//
// stdin.addListener("data", function(d) {
//
//   console.dir(d);
//
//
// });

var mydata = [];
var myid = 0;
var isDirty = false;
var thisProcess = process;
var stdin = thisProcess.stdin;
var stdout = thisProcess.stdout;
var readline = require('readline');
var mongoose = require('mongoose');
require('console.table');

//Connect to the databaswe
mongoose.connect('mongodb://test:test@ds115712.mlab.com:15712/tasktest');

// Create a db schema for mongodb
var task = new mongoose.Schema({
  taskname: String,
  id: Number
});

var taskRecord = mongoose.model('mytasktest', task);

taskRecord.find({}, function(err, data){
  if (err) throw err;
  mydata = data;
  myid = mydata.length;
});


var promptUser = readline.createInterface( {
   input: thisProcess.stdin,
   output: thisProcess.stdout
});

var parseOptions = {
  edit: ":edit",
  print: ":print",
  exit: ":exit",
  add: ":add",
  save: ":save"
};

promptUser.on("line", function(d) {
  var data = d.toString().trim();

  parseCommand(data);

});

function parseCommand(data) {

  switch (data) {
      case parseOptions.print:
        mydata.forEach(function(element) {
          console.log(element.id + ':' + element.taskname);
        });
//        console.log(mydata);
        break;

      case parseOptions.edit:
        console.log("Edit mode...");
        editItem();
        break;
      case parseOptions.exit:
        if (isDirty == true) {
          promptUser.question('Save changes (y/N)?', function(response) {
            if (response == 'Y' || response == 'y') {
              saveChanges();
              thisProcess.exit(0);
            } else {
              thisProcess.exit(0);
            }
          });
        } else {
          thisProcess.exit(0);
        };
        break;
      case parseOptions.add:
        promptUser.question('Enter Item To Add: ', function(response) {
          myid ++;
          var newTask = new taskRecord({taskname: response, id: myid});
          mydata.push(newTask);
          isDirty = true;
          }
        )
        break;
      case parseOptions.save:
        saveChanges();
        break;
      }
}
function saveChanges() {
  mydata.forEach(function(item) {
    taskRecord(item).save(function(err, data){
      if (err) throw err;
      console.log(`Saved ${data}`);
      isDirty = false;
    });
  });
}

function editItem() {
    var editIndex = '';
    var editData = '';
    promptUser.question('Line to edit: ', function(response) {

      editIndex = mydata.findIndex(function(item) {
        if (item.id == response) {
          return true;
        }
      });

      if (editIndex >= 0) {
          promptUser.question(`Replace the text (${ mydata[editIndex].taskname }) `, function(newData) {
            if (newData) {
              mydata[editIndex].taskname = newData;
              isDirty = true;
              parseCommand(parseOptions.print);
            } else {
              console.warn('Nothing updated');
            }
          })
      } else {
        console.warn(`Cannot find item with id: ${response}`);
      }
    })
}
