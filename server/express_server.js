const express = require('express')
const fs = require('fs')
const cors = require('cors')
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

app.get('/api/ip', (req, res) => {
  const serverIP = ip.address();
  res.json({ ip: serverIP });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
