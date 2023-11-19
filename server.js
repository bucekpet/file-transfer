const express = require('express');
const path = require('path');
const os = require('os');
const dns = require('dns');
const QRCode = require('qrcode-terminal');
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3000; // You can change the port if needed


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

// Serve the built Vue.js app
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running. Scan the qr code.\nTo exit close this window.`);
});

dns.lookup(os.hostname(), { family: 4 }, function (err, add, fam) {
    if (err) {
      console.error('Error getting local IP address:', err);
      return;
    }
  
    const ip = String(add);
    const qrData = `http://${ip}:${port}`;
  
  
    QRCode.generate(qrData, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
  });
