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

   getBidProducts: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.get_bid_products(id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   },

   addBidProduct: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.add_bid_product(materialId, id).then(() => {
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

   deleteBidProduct: (req, res) => {
      const {id} = req.params,
            db = req.app.get("db")
         db.bid.delete_bid_product(id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
   }

 
}