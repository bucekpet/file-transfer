<template>
    <div class="d-flex justify-content-center align-items-start">
        <button @click="toggleShowQR" class="btn btn-outline-success">Show qrcode</button>
        <img class="qr-code" v-if="showQR" :src="qrCodeDataUrl" alt="QR Code">
    </div>
</template>

<script>
import QRCode from 'qrcode-generator'

export default {
    data() {
        return {
            qrCodeDataUrl: null,
            showQR: false,
        }
    },
    mounted() {
        this.generateQRcode()
    },
    methods: {
        generateQRcode() {
            const data = "http://" + LOCAL_IP_ADDRESS + ":8888"
            const cell_size = 5

            const qr = QRCode(0, 'M')
            qr.addData(data)
            qr.make()

            const dataUrl = qr.createDataURL(cell_size, 0)
            this.qrCodeDataUrl = dataUrl
        },
        toggleShowQR() {
            this.showQR = !this.showQR
        }
    }
}
</script>
