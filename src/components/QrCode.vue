<template>
    <div class="row">
        <div class="col">
            <button @click="toggleShowQR" class="btn btn-outline-success">Show qrcode</button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <img class="qr-code" v-if="showQR" :src="qrCodeDataUrl" alt="QR Code">
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode-generator';

export default {
    data() {
        return {
            qrCodeDataUrl: null,
            showQR: false
        };
    },
    mounted() {
        this.generateQRcode()
    },
    methods: {
        generateQRcode() {
            const text = "http://192.168.0.161:8888"
            const cell_size = 5

            const qr = QRCode(0, 'M')
            qr.addData(text)
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
