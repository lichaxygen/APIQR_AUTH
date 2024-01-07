import express from 'express';

export let view =express.Router()

view.get('/login', async(req, res)=>{
  res.render('login');
})


view.get('/', async(req, res)=>{
  res.render('index');
}) 