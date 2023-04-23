import '@vuepic/vue-datepicker/dist/main.css'
import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronDown,
  faExclamationCircle,
  faPencil,
  faTrashCan,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueDatePicker from '@vuepic/vue-datepicker'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

library.add(faCircleCheck, faExclamationCircle, faXmark, faChevronDown, faTrashCan, faPencil)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('VueDatePicker', VueDatePicker)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
