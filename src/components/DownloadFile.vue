<template>
  <h2>List of Files:</h2>
  <ul>
    <li class="mb-2" v-for="file in files" :key="file">
      <a class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        :href="downloadFile(file)" download>{{ file }}</a>
    </li>
  </ul>

  <p v-if="files.length == 0">Download folder is empty</p>

  <a :href="downloadZip()" download="files.zip">
    <button v-if="files.length > 0" class="btn btn-outline-success">Download Zip</button>
  </a>
</template>

<style scoped>
ul {
  list-style-type: circle;
}
</style>

<script>

export default {
  data() {
    return {
      files: [],
    }
  },
  mounted() {
    this.fetchFiles()
  },
  methods: {
    fetchFiles() {
      fetch(`http://${LOCAL_IP_ADDRESS}:3000/api/files`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          this.files = data
        })
        .catch(error => {
          console.error('Error fetching files:', error)
        })
    },
    downloadFile(file) {
      // Construct the download link for each file
      return `http://${LOCAL_IP_ADDRESS}:3000/api/download/${file}`;
    },
    downloadZip() {
      return `http://${LOCAL_IP_ADDRESS}:3000/api/download/zip`;
    }
  },
}
</script>
