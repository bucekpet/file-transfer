from flask import Flask, jsonify, send_from_directory, request, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import ipaddress

app = Flask(__name__, static_folder='./dist',
            template_folder='./dist', static_url_path='/')
CORS(app)

port = 3000

download_folder_path = './Download_folder'
upload_folder_path = './Upload_folder'

app.config['UPLOAD_FOLDER'] = upload_folder_path
app.config['DOWNLOAD_FOLDER'] = download_folder_path

# Ensure upload and download folders exist
os.makedirs(upload_folder_path, exist_ok=True)
os.makedirs(download_folder_path, exist_ok=True)

# Upload file


def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400

    files = request.files.getlist('files')

    success_messages = []
    for file in files:
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file and allowed_files(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success_messages.append(f"File '{filename}' uploaded successfully")

    return jsonify({"message": success_messages}), 200

# List files in input directory


@app.route('/api/files')
def list_files():
    files = os.listdir(app.config['DOWNLOAD_FOLDER'])
    return jsonify(files)

# Download file


@app.route('/api/download/<filename>')
def download_file(filename):
    return send_from_directory(app.config['DOWNLOAD_FOLDER'], filename, as_attachment=True)


if __name__ == '__main__':
    host = '0.0.0.0'
    print(
        f"Server is running\nhttp://localhost:{port}\nhttp://{ipaddress.IPv4Address(host)}:{port}")
    app.run(host=host, port=port)
