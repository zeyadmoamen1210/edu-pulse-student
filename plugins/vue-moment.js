import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
require('moment/locale/ar.js');
Vue.use(VueMoment, {
    moment,
})