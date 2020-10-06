<template>
  <a-modal
    title="Select Standart Color"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <!-- <p>{{ ModalText }}</p> -->
    <a-row>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#1488cc')" class="card-color blue">Blue</div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#e85058')" class="card-color red">Red</div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#fbdb81')" class="card-color yellow">
          Yellow
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#265C60')" class="card-color green">
          Green
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#ffffff')" class="card-color white">
          White
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#d42a83')" class="card-color magenta">
          Magenta
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#1b262c')" class="card-color black">
          Black
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#fa7d09')" class="card-color orange">
          Orange
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#901f90')" class="card-color purple">
          Purple
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#1488cc')" class="card-color bluesky">
          Blue Sky
        </div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#e4e3e3')" class="card-color grey">Grey</div>
      </a-col>
      <a-col :span="8" :lg="8">
        <div @click="mouseClicks('#ffbf00')" class="card-color gold">Gold</div>
      </a-col>
    </a-row>
  </a-modal>
</template>
