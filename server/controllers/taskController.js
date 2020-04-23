module.exports = {
   getTasks: (req, res) => {
      const {id} = req.params,
                 db = req.app.get("db")
      db.tasks.get_task_types(id).then(tasks => {
               console.log( "tasks: ", tasks )
               res.status(200).send( tasks )
            }).catch(err => res.status(500).send(err))
   },

   getTaskProduction: (req, res) => {
      const {type} = req.params,
                 db = req.app.get("db")
      db.tasks.get_task_production(type).then(production => {
               console.log( "production: ", production )
               res.status(200).send( production )
            }).catch(err => res.status(500).send(err))
   }
}