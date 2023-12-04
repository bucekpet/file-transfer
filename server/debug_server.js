const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const ip = require('ip')

const app = express()
const port = 3000

const downloadFolderPath = './Download_folder'
const uploadFolderPath = './Upload_folder'

// Check if down/upload folders exists or create them
if(!fs.existsSync(downloadFolderPath)){
    fs.mkdirSync(downloadFolderPath);
}
if(!fs.existsSync(uploadFolderPath)){
    fs.mkdirSync(uploadFolderPath);
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadFolderPath)
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const upload = multer({ storage })

// Upload files
app.post('/api/upload', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully' });
});

// List files in input directory
app.get('/api/files', (req, res) => {
  fs.readdir(downloadFolderPath, (err, files) => {
    if (err) {
      console.error(err)
      res.status(500).send('Internal Server Error')
      return
    }
    res.json(files)
  })
})

// Download file
app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = `${downloadFolderPath}/${filename}`

  // Set appropriate headers for downloading
  res.setHeader('Content-Disposition', `attachment filename=${filename}`)
  res.setHeader('Content-Type', 'application/octet-stream')

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(res)
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running\nhttp://localhost:${port}\nhttp://${ip.address()}:${port}`)
})
