<template>
    <div>
        <img class="qr-code" v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code">
    </div>
</template>

<script>
import QRCode from 'qrcode-generator';

export default {
    data() {
        return {
            qrCodeDataUrl: null,
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
        }
    }
}
</script>
