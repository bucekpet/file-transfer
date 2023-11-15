<template>
  <div>
    <h2>List of Files</h2>
    <ul>
      <li v-for="file in files" :key="file">{{ file }}</li>
    </ul>
  </div>
</template>

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
      fetch('http://'+ LOCAL_IP_ADDRESS +':3000/api/files')
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
  },
}
</script>
