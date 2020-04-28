module.exports = {
   
   addLineItem: (req, res) => {
      const {bid_id} = req.body,
      db = req.app.get("db")
      db.bid.add_line_item(bid_id).then(() => {
         res.sendStatus(201)
      }).catch(err => res.status(500).send(err))
   },
   
   createBid: async (req, res) => {
      const {user_id} = req.body
      db = req.app.get("db")
      let newBid = await db.bid.create_bid(user_id)
      // console.log(newBid[0].bid_id)
       await db.bid.add_line_item(newBid[0].bid_id).then(() => {
         res.status(201).send(newBid[0])
      }).catch(err => res.status(500).send(err))
   },
   
   deleteLineItem: (req, res) => {
      const {line} = req.params,
      db = req.app.get("db");
      console.log("hit", line)
      db.bid.delete_line_item(line).then((LineItems) => {
         res.status(200).send(LineItems)
         }).catch(err => res.status(500).send(err))
      },
      
      deleteBid: (req, res) => {
         const {id} = req.params,
         db = req.app.get("db")
         console.log(id)
         db.bid.delete_bid(id).then(() => {
            res.sendStatus(201)
         }).catch(err => res.status(500).send(err))
      },
      
      getBidMaterials: (req, res) => {
         const {id} = req.params,
         db = req.app.get("db")
         db.bid.get_bid_materials(id).then(materials => {
            // console.log("materials: ", materials)
            res.status(200).send(materials)
         }).catch(err => res.status(500).send(err))
      },
      
      getBids: (req, res) => {
         const {id} = req.params,
                  db = req.app.get("db")
            db.bid.get_user_bids(+id).then(bids => {
               res.status(200).send(bids)
            }).catch(err => res.status(500).send(err))
      },
   
      getBidSummary: (req, res) => {
         const {id} = req.params,
                    db = req.app.get("db")
         db.bid.get_bid_summary(id).then(bidInfo => {
            // console.log(bidInfo)
            res.status(200).send(bidInfo)
         }).catch (err => res.status(500).send(err))
      },

      getBidInfo: (req, res) => {
         const {id} = req.params,
                  db = req.app.get("db")
                  // console.log("getBidInfo id: ", id)
            db.bid.get_bid_info(id).then(info => {
               // console.log(info)
               res.status(200).send(info)
            }).catch(err => res.status(500).send(err))
      },

      renameBid: (req, res) => {
         const {id} = req.params,
                   {bidName, jobNumber, bidLocation} = req.body,
               db = req.app.get("db")
            db.bid.rename_bid(bidName, jobNumber, bidLocation, id).then(() => {
               res.sendStatus(201)
            }).catch(err => res.status(500).send(err))
      },

      updateMaterial: (req, res) => {
         console.log("req: ", req.query)
         const { column, value, id} = req.query,
               db = req.app.get("db")
             db.bid.update_material(column, value, id).then(() => {
               res.sendStatus(200)
            }).catch(err => res.status(400).send(err))
         },

      }