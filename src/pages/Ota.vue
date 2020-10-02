<template>
  <div>
    <div class="fullscreen bg-blue text-white text-center content-center">
      <h4 class="q-mb-none">Cari Reservasi Anda</h4>
      <p class="q-mt-md q-mb-xl">Cari dengan memilih salah satu opsi dibawah</p>

      <div class="row flex flex-center">
        <div class="col-md-2 col-xs-4 offset-md-1">
          <img class="img-ota" src="../assets/booking-code.svg" @click="shoModalBC = true" />
        </div>
        <div class="col-md-2 col-xs-4">
          <img class="img-ota" src="../assets/Nama.svg" @click="shoModalName = true" />
        </div>
        <div class="col-md-2 col-xs-4">
          <img class="img-ota" src="../assets/EmailAddress.svg" @click="shoModalEmail = true" />
        </div>
        <div class="col-md-2 col-xs-4">
          <img class="img-ota" src="../assets/membership.svg" @click="shoModalMembership = true" />
        </div>
      </div>

      <!-- Modal Booking Code -->
      <q-dialog v-model="shoModalBC" persistent>
        <q-card style="min-width: 350px;">
          <q-toolbar>
            <q-toolbar-title class="text-weight-medium">{{ modalTitle }}</q-toolbar-title>
          </q-toolbar>
          <q-card-section class="row items-center">
            <div>
              <q-input outlined v-model="titleText" class="q-mb-md" label="Booking Code" />
              <q-input
                outlined
                v-model="date"
                mask="date"
                :rules="['date']"
                placeholder="Input your date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn unelevated label="Searching" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal Name -->
      <q-dialog v-model="shoModalName" persistent>
        <q-card style="min-width: 350px;">
          <q-toolbar>
            <q-toolbar-title class="text-weight-medium">Last Name</q-toolbar-title>
          </q-toolbar>
          <q-card-section class="row items-center">
            <div>
              <q-input outlined class="q-mb-md" label="Last Name" />
              <q-input
                outlined
                v-model="date"
                mask="date"
                :rules="['date']"
                placeholder="Checkout Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn unelevated label="Searching" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal Email -->
      <q-dialog v-model="shoModalEmail" persistent>
        <q-card style="min-width: 350px;">
          <q-toolbar>
            <q-toolbar-title class="text-weight-medium">Email</q-toolbar-title>
          </q-toolbar>
          <q-card-section class="row items-center">
            <div>
              <q-input outlined class="q-mb-md" label="Email" />
              <q-input
                outlined
                v-model="date"
                mask="date"
                :rules="['date']"
                placeholder="Checkout Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn unelevated label="Searching" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal Membership -->
      <q-dialog v-model="shoModalMembership" persistent>
        <q-card style="min-width: 350px;">
          <q-toolbar>
            <q-toolbar-title class="text-weight-medium">Membership</q-toolbar-title>
          </q-toolbar>
          <q-card-section class="row items-center">
            <div>
              <q-input outlined class="q-mb-md" label="Membership ID" />
              <q-input
                outlined
                v-model="date"
                mask="date"
                :rules="['date']"
                placeholder="Checkout Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn unelevated label="Searching" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoModalBC: false,
      shoModalName: false,
      shoModalEmail: false,
      shoModalMembership: false,
      modalTitle: "Booking Code",
      titleText: "",
      date: "",
    };
  },
  // components: {
  //   modalBookingCode: () => import("./components/ModalBookingCode.vue"),
  // },
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
</style>