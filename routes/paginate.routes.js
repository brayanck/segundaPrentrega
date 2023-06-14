const router = require("express").Router();
const Product = require('../daos/models/products.model');

router.get("/",async(req,res)=>{
    res.render("paginate", {});
})

router.get('/pag', async (req, res) => {
  try {
    let limit = parseInt(req.query.limit, 10) || 10
    let page = parseInt(req.query.page, 10) || 1

    let products = await Product.paginate({}, {limit,page,sort:{price:-1}});
    res.render("paginate", {});
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;