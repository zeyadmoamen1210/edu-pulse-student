import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuesax from "vuesax";
Vue.use(Vuesax);
import "vuesax/dist/vuesax.css";
Vue.use(Element, {
    locale
})