module.exports = {
   getBids: (req, res) => {
      const {id} = req.params,
               db = req.app.get("db")
               console.log("getBid id: ", id)
         db.bid.get_user_bids(+id).then(bids => {
            console.log(bids)
            res.status(200).send(bids)
         }).catch(err => res.status(500).send(err))
   },

   getBidInfo: (req, res) => {
      const {id} = req.params,
               db = req.app.get("db")
               console.log("getBidInfo id: ", id)
         db.bid.get_bid_info(id).then(info => {
            console.log(info)
            res.status(200).send(info)
         }).catch(err => res.status(500).send(err))
   },

   createBid: (req, res) => {
      const {user_id} = req.body
                  db = req.app.get("db")
         db.bid.create_bid(user_id).then(bid => {
            res.status(201).send(bid)
         }).catch(err => res.status(500).send(err))
   },

   deleteBid: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.delete_bid(id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   },


   renameBid: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.rename_bid(bidName, jobNumber, bidLocation).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   },

   getBidMaterials: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.get_bid_materials(id).then(materials => {
            res.status(200).send(materials)
         }).catch(err => res.status(500).send(err))
   },

   addLineItem: (req, res) => {
      const {bid_id} = req.body,
            db = req.app.get("db")
         db.bid.add_line_item(bid_id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   },

   updateBidProduct: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.update_bid_product(id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   },

   deleteLineItem: (req, res) => {
      const {line} = req.params,
            db = req.app.get("db");
            console.log("hit", line)
         db.bid.delete_line_item(line).then((LineItems) => {
            res.status(200).send(LineItems)
         }).catch(err => res.status(500).send(err))
   }

 
}