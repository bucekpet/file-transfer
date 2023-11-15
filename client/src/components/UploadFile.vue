<template>
    <div class="d-grid gap-2">
        <input class="form-control" data-bs-theme="dark" type="file" ref="fileInput" multiple @change="handleFileChange">
        <button class="btn btn-outline-success" @click="uploadFile">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
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
                    })
                    .catch(error => {
                        console.error('Error uploading files:', error);
                    });
            } else {
                console.error('No files selected');
            }
        }
    }
}
</script>

<style scoped></style>