/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import lang from "quasar/lang/en-us";

import iconSet from "quasar/icon-set/material-icons";

import Vue from "vue";

import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QForm,
  QInput,
  QDate,
  QPopupProxy,
  QSelect,
  QCard,
  QCardSection,
  QCardActions,
  QMenu,
  ClosePopup,
  QSpace,
} from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QForm,
    QInput,
    QDate,
    QPopupProxy,
    QSelect,
    QCard,
    QCardSection,
    QCardActions,
    QMenu,
    QSpace,
  },
  directives: {
    ClosePopup,
  },
  lang: lang,
  iconSet: iconSet,
});
