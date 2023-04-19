import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronDown,
  faExclamationCircle,
  faPencil,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

library.add(faCircleCheck, faExclamationCircle, faCircleXmark, faChevronDown, faTrashCan, faPencil)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
