module.exports = {
   getMaterialTypes: (req, res) => {
      const bd = req.app.get("db");
            bd.material.get_material_types().then(types => {
               console.log( "type: ", types )
               res.status(200).send( types )

            }).catch(err => res.status(500).send(err))
   },

   getMaterialNames: (req, res) => {
      const {type} = req.params,
                 bd = req.app.get("db");
                 console.log(type)
            bd.material.get_material_names(type).then(names => {
               console.log( "names: ", names )
               res.status(200).send( names )
            }).catch(err => res.status(500).send(err))
   },
   getMaterialInfo: (req, res) => {
      const {id} = req.params,
                 bd = req.app.get("db");
                 console.log(id)
            bd.material.get_material_info(+id).then(info => {
               console.log( "info ", info)
               res.status(200).send( info )
            }).catch(err => res.status(500).send(err))
   }
}  