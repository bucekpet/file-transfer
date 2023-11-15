const express = require('express')
const cors = require('cors')
const fs = require('fs')
const ip = require('ip');

const app = express()
const port = 3000

const folderPath = './input_files' // Replace with the path to your folder

app.use(cors())

app.get('/api/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err)
      res.status(500).send('Internal Server Error')
      return
    }
    res.json(files)
  })
})

app.listen(port, '0.0.0.0' , () => {
  console.log(`Server is running on http://localhost:${port}`)
})
