const express = require('express');
const Articles = require('../models/articles');


let router = express.Router();

//render page to write new post
router.get('/new', (req, res) => {
    res.render('articles/new')
})

//add new post  to collection document
router.post('/add', async (req, res) => {
    console.log(req.body)
    let article = new Articles({
        title: req.body.title,
        body: req.body.body,
        author_name: req.body.author,
    });
    await article.save()
    res.redirect('/')
})



//render edit page
router.get('/edit/:id', async (req, res) => {
    let article = await Articles.findById(req.params.id)
    res.render('articles/edit', { article })
})

// update with edited data
router.post('/edited', async (req, res) => {
    console.log('hel', req.body)
     await Articles.updateOne({ _id: req.body.id }, {
        title: req.body.title,
        body: req.body.body,
        author_name: req.body.author,
        date: Date.now()
    });
    res.redirect('/')
})



//get id and show details of that document
router.get('/:id', async (req, res) => {
    console.log('id', req.params.id)
    let article = await Articles.findById(req.params.id)
    res.render('articles/details', { article })
})


// delete a data with id
router.get('/delete/:id', async (req, res) => {
    await Articles.deleteOne({ _id: req.params.id })
    res.redirect('/')
})





module.exports = router;