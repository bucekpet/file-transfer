const express = require('express')
const cors = require('cors')
const fs = require('fs')
const ip = require('ip')

const app = express()
const port = 3000

const folderPath = './input_files'

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

app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = `${folderPath}/${filename}`

  // Set appropriate headers for downloading
  res.setHeader('Content-Disposition', `attachment filename=${filename}`)
  res.setHeader('Content-Type', 'application/octet-stream')

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(res)
})

app.listen(port, '0.0.0.0' , () => {
  console.log(`Server is running on http://localhost:${port}`)
})
