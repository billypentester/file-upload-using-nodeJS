const express = require('express')
const multer = require('multer')
const path = require('path')
var cors = require('cors')

const app = express()
const port = 5000

app.use(cors())

app.use('/public',express.static(path.join(__dirname, 'uploads')))

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } 
  else {
    return cb('Only jpeg and png files are allowed', false);
  }

}

const upload = multer(
  { 
    storage: storage, 
    fileFilter : fileFilter
  }).single('image')


app.post('/upload', async(req, res)=> {

  upload(req, res, (err) => {

    try{
      if(req.file)
      {
        return res.status(200).json({  path : 'http://localhost:5000/public/' + req.file.filename })
      }
      else if (err instanceof multer.MulterError) {
        console.log(err)
        return res.json({ error : err.message })
      } 
      else if (err) {
        console.log(err)
        return res.json({ error : err })
      }
      else
      {
        return res.json({error : "no file selected"})
      }
    }
    catch(errors)
    {
      return res.json({ error : err })
    }
  
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})