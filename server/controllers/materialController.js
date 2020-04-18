module.exports = {
   getMaterialTypes: (req, res) => {
      const bd = req.app.get("db");
            bd.material.get_material_types().then(types => {
               // const { material_type } = types
               console.log({types})
               res.status(200).send(types)
            }).catch(err => res.status(500).send(err))
   },

   // getMaterialInfo: (req, res) => {
   //    const {id}
   // }

   // app.get("/api/material/:id/:type", bidCtrl.getMaterialInfo)
}  