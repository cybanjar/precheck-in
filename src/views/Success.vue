<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>Thank you for using our online check-in. Please save QR code above for your check-in in the hotel.</p>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    data() {
        return {
            resnr: 32453,
            htlCode: 'grand-visual',
            coDate: '21/07/20',
        }
    },
    mounted() {
        const success = btoa('{' + this.resnr + ';' + this.htlCode + ';' + this.coDate + '}');

        QRCode.toCanvas(document.getElementById('canvas'), success, {width: 250}, function (error) {
        if (error) console.error(error)
        console.log('success!');
        });
    },
}
</script>

<style scoped lang="scss" src="../css/style.scss"/>