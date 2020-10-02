<template>
  <q-dialog v-model="confirm" persistent>
    <q-card style="min-width: 350px;">
      <q-toolbar>
        <q-toolbar-title class="text-weight-medium">{{ modalTitle }}</q-toolbar-title>
      </q-toolbar>

      <q-card-section class="row items-center">
        <div>
          <q-input outlined v-model="titleText" class="q-mb-md" label="Booking Code" />
          <q-input outlined v-model="date" mask="date" :rules="['date']">
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
</template>

<script>
export default {
  data() {
    return {
      confirm: false,
      modalTitle: "Booking Code",
      titleText: "",
      date: "",
    };
  },
};
</script>