from flask import Flask, jsonify, send_from_directory, request, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import ipaddress
import shutil
from io import BytesIO
import zipfile

app = Flask(__name__)
CORS(app)

port = 3000

download_folder_path = '../input_files'
upload_folder_path = '../output_files'

app.config['UPLOAD_FOLDER'] = upload_folder_path
app.config['DOWNLOAD_FOLDER'] = download_folder_path

# Ensure upload and download folders exist
os.makedirs(upload_folder_path, exist_ok=True)
os.makedirs(download_folder_path, exist_ok=True)

# Upload file


def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


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

# Download zip


@app.route('/api/download/zip')
def download_zip():
    # Create an in-memory zip file
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED, False) as zip_file:
        for root, _, files in os.walk(app.config['DOWNLOAD_FOLDER']):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(
                    file_path, app.config['DOWNLOAD_FOLDER'])
                zip_file.write(file_path, arcname)

    # Set up the response
    response = make_response(zip_buffer.getvalue())
    response.headers['Content-Disposition'] = 'attachment; filename=files.zip'
    response.headers['Content-Type'] = 'application/zip'

    return response


if __name__ == '__main__':
    host = '0.0.0.0'
    print(
        f"Server is running\nhttp://localhost:{port}\nhttp://{ipaddress.IPv4Address(host)}:{port}")
    app.run(host=host, port=port)
