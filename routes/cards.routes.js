const express = require('express')
const router = express.Router()
const Card = require('../models/Card.model')
const uploader = require('../middleware/cloudinary.config.js')
const multer = require('multer')

router.get('/', async(req, res, next) => {
  try { 
   const allCards = await Card.find() 
   console.log(allCards)
   res.render('cards/all', {cards: allCards} )
  }
  catch (error) {
   console.log(error)
  }
 })

/* CRUD - C*/
router.get('/new', (req, res) => {
  res.render('cards/new', { isUpdating: false })
})

router.post('/new', uploader.single("imgUrl"), async (req, res, next) => {
  try {
    const {cardname, category, price, quality, tradingOption, description} = req.body 
    const image = req.file.path 
    const card = await Card.create({cardname, category, price, quality, tradingOption, description, image})
    res.redirect('/cards')
  } catch (error) {
    console.log(error)
  }
})

/*CRUD - R*/
router.get('/:cardId', async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId)
    console.log(card)
    if (!card) {
      res.redirect('/cards')
    } else {
      res.render('cards/each', card)
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/:cardId/update', async(req, res) => {
  const card = await Card.findById(req.params.cardId,{
    ...req.body})
    res.render('cards/new', { card, isUpdating: true })
  })
  
router.post('/:cardId/update', async(req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {
      ...req.body})
      res.redirect('/cards')
  } catch (error) {
    console.log(error)
  }
})


/*CRUD -D */
router.post('/:cardId/delete', async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.cardId)
    res.redirect('/cards')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router