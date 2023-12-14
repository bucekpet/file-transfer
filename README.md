# File transfer ![Alt text](public/favicon.ico)
Vue application with python backend that allows you to transfer files between your pc and phone.

> ⚠️Disclaimer: This is demo project. Exercise caution and run the server only on trusted and protected networks.

---

### Install dependencies 📦
```sh
npm install
pip install -r requirements.txt
```

### Build and run 🛠️
```sh
npm run build
python server.py
```

### Run in dev 💻
```sh
npm run dev
python server/debug_server.py
```

### Scan the qrcode with your device 📲

> Upon running the server will create Download and Upload folders in the project folder.<br>
> - Copy the files you want to transfer to device to download folder.
> - Files uploaded from device are stored in upload folder.

