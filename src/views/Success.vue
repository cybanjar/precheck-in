<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>Thank you for using our online check-in. Please keep the QR code above for your check-in in the hotel.</p>
  </div>
</template>

<script>
import QRCode from 'qrcode';
//import smptjs from 'smtpjs';
//import {Email} from 'smtpjs';

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

        const blah = QRCode.toDataURL(success, {width: 250}).then(message => console.log(message))
        //const qrbarcode = QRCode.toFile('test.png', success, {width: 250})

        const emailjs = document.createElement('script');
        emailjs.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
        emailjs.async = true;
        document.head.appendChild(emailjs);

        Email.send({
            //Host : "smtp.elasticemail.com",
            //Username : "cincling@hotmail.com",
            //Password : "C1DD14CC221C6A44F08871A8C66CD8382658",
            SecureToken : '2cdb3396-9897-427c-8457-8701d39e950d',
            To : 'michael_yohannes@sindata.net',
            From : 'cincling@hotmail.com',
            Subject : 'Thank you for your Pre Check-in',
            Body : '<p align=center><img src=' + blah + '><br>Thank you for your online Pre check-in. Please keep the attachment for check-in use in the hotel.<br> Or you can click the link below:<br>http://localhost:3000/step?</p>',
            Attachments : [{
              name : this.resnr + '.png',
              //data : blah,
              data : "data:image/png;base64,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",
            }],
        }).then(
          message => console.log(message)
        );

        //QRCode.toFile('test.png', [{data: success, mode: 'byte'}], {width: 250}), function (error) {
        //if (error) console.error(error)
        //console.log('success!');
        //});
        QRCode.toCanvas(document.getElementById('canvas'), success, {width: 250}, function (error) {
        //if (error) console.error(error)
        //console.log('success!');
        });
    },
}
</script>

<style scoped lang="scss" src="../css/style.scss"/>