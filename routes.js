const router = require('express').Router();
const fs = require('fs');
const { Op } = require("sequelize");
const { models } = require('./sequelize')

router.get('/', (req, res) => {
  res.json({ message: 'OK' })
});

//devuelve todas la categorias
router.get('/category', async (req,res) => {
  const prods = await models.Category.findAll();
  return res.json(prods)
})

//devuelve la categoria con todos sus productos
router.get('/category/products', async (req,res) => {
  const prods = await models.Category.findAll({
    include: [
      {
        model: models.Product,
        limit: 2
      }
    ]
  });
  return res.json(prods)
})

//Segun el id de categoria devuelve los productos 
router.get('/category/:id/products', async (req,res) => {
  const categoryId = (req.params.id || null)
  const limit = Number(req.query.limit) || 6;
  const offset = Number(req.query.offset) || 0;

  const prods = await models.Product.findAndCountAll({
    where: {
      category: categoryId
    },
    offset,
    limit
  });
  return res.json(prods)
});

//devuelve todos los productos 
router.get('/products', async (req, res) => {
  const limit = Number(req.query.limit) || 6;
  const offset = Number(req.query.offset) || 0;

  const prods = await models.Product.findAndCountAll({
    include: [
      {
        model: models.Category,
      }
    ],
    limit,
    offset
  });
  return res.json(prods)
});

//ruta que pasamos el nombre como parametro y busca en todos los productos 
router.get('/product/name/:name', async (req,res) => {
  const name = (req.params.name || '').trim().toUpperCase()
  const limit = Number(req.query.limit) || 6;
  const offset = Number(req.query.offset) || 0;
  
  const prods = await models.Product.findAll({
    include: [models.Category],
    where: {
      name: {
        [Op.like]:`%${name}%` 
      }
    },
    offset,
    limit
  });
  return res.json(prods)
})

//ruta que trae como parametro id para nombre de categoria para la pagina principal
router.get('/product/category/:id', async (req,res) => {
  const id = (req.params.id || '')
  const limit = Number(req.query.limit) || 6;
  const offset = Number(req.query.offset) || 0;
  const prods = await models.Product.findAndCountAll({
    include: [models.Category],
    where: {
      category: id
    },
    offset,
    limit
  });
  return res.json(prods)
})


module.exports = router;