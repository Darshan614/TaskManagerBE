const Task = require("../models/task");

exports.gettasks = (req, res, task) => {
  Task.find()
  .then(tasks=>{
    res.status(200).send({taskarray:tasks});
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.addtask = (req, res, task) => {
  const giventask = req.body.taskdetail;
  const newtask = new Task({
    tasktitle: giventask
  });
  newtask.save((err, task) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Task added successfully!" });
  });
};

exports.deletetask = (req, res, task) => {
  const taskid = req.body.taskid;
  Task.findByIdAndRemove(taskid, function(err){
    if(err){
        res.status(500).send({message:"Some problem occured"})
    } else {
        res.status(200).send({message:"Deletion Successfull"})
    }
 });
};

exports.edittask = (req, res, task) => {
    const taskid = req.body.taskid;
    const updatedtask = req.body.taskdetail;
    Task.findById(taskid)
    .then(task=>{
      task.tasktitle = updatedtask;
      task.save(function(err){
        if(err)
        {
          res.status(500).send({message:"Some problem occured"})
        }
        else
        {
          res.status(200).send({message:"Edit Successfully Done"})
        }
      })
    })

  };
