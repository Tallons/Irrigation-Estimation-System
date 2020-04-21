module.exports = {
   getTasks: (req, res) => {
      const {id} = req.params,
                 db = req.app.get("db")
      db.tasks.get_task_types(id).then(tasks => {
               console.log( "tasks: ", tasks )
               res.status(200).send( tasks )
            }).catch(err => res.status(500).send(err))
   }
}

            