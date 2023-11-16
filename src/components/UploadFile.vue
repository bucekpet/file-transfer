<template>
    <input class="form-control" data-bs-theme="dark" type="file" ref="fileInput" multiple @change="handleFileChange">
    <button class="btn btn-outline-success" @click="uploadFile">Send</button>


    <!-- Success Toast -->
    <div id="successToast" class="toast bg-success">
        <div class="toast-header bg-success">
            <strong class="me-auto">Success</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Files uploaded!
        </div>
    </div>



    <!-- Error Toast -->
    <div id="errorToast" class="toast bg-danger">
        <div class="toast-header bg-danger">
            <strong class="me-auto">Error</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            An error occurred!
        </div>
    </div>
</template>

<style scoped>
.toast {
    color: black;
}
</style>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
export default {
    methods: {
        handleFileChange() {
            // Handel file change if needed
        },
        uploadFile() {
            const fileInput = this.$refs.fileInput;
            const files = fileInput.files;

            if (files.length > 0) {
                const formData = new FormData();

                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }

                fetch(`http://${LOCAL_IP_ADDRESS}:3000/api/upload`, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Files uploaded successfully:', data);
                        this.showToast('successToast')
                    })
                    .catch(error => {
                        console.error('Error uploading files:', error);
                        this.showToast('errorToast')
                    });
            } else {
                console.error('No files selected');
                this.showToast('errorToast')
            }
        },
        showToast(toastId) {
            const toast = new bootstrap.Toast(document.getElementById(toastId));
            toast.show();
            setTimeout(() => {
                toast.hide();
            }, 2000);
        },
    }
}
</script>