import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPeopleArrows,
  faBuilding,
  faBars,
  faSmileWink,
  faUsers,
  faHotel,
  faHourglassHalf,
  faSyncAlt,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import _Vue from 'vue'

library.add(
  faPeopleArrows,
  faBuilding,
  faBars,
  faSmileWink,
  faUsers,
  faHotel,
  faHourglassHalf,
  faSyncAlt,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus
)

export default {
  install(Vue: typeof _Vue): void {
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}
