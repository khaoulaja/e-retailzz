const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes:['product_name', 'price', 'stock','category_id'],
        through:ProductTag
      }
    ]
  }).then(dbData=>res.json(dbData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through:ProductTag
      }
    ]
  }).then(dbData=>{
    if(!dbData){
      res.status(404).json({message : 'No Tag was found with this Id!'});
      return
    }
    res.json(dbData)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then(dbData=>res.json(dbData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    individualHooks: true,
    where:{
      id: req.params.id
    }
  }).then(dbData=>{
    if(!dbData){
      res.status(404).json({message : 'No Tag was found with this Id!'});
      return;
    }
    res.json(dbData);
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData=>{
    if(!dbData){
      res.status(404).json({message: 'No tag was found with this Id!'});
      return;
    }
    res.json(dbData)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);                                                                                                                               
  });
});

module.exports = router;
