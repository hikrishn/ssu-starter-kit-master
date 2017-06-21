import Vue from './Vue'
import App from './App'
import store from './store'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import axios from 'axios'
require('./assets/main.css')
require('./assets/index.css')
require('./assets/overRide.css')
// Component split lazy loading
const About = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['./components/Aboutme.vue'], () => {
    resolve(require('./components/Aboutme.vue'))
  })
}

// Component split lazy loading
const Amazon = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['./components/Amazon.vue'], () => {
    resolve(require('./components/Amazon.vue'))
  })
}

const Profile = resolve => require(['./components/Profile.vue'], resolve)
const Contact = resolve => require(['./components/Contact.vue'], resolve)
const Products = resolve => require(['./components/ProductList.vue'], resolve)
const Confirmation = resolve => require(['./components/Confirmation.vue'], resolve)
const NotFound = resolve => require(['./NotFound.vue'], resolve)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes: [
    {path: '/contact', component: Contact},
    {path: '/about', component: About},
    {path: '/amazon', component: Amazon},
    {path: '/profile/:username', component: Profile},
    {path: '/products', component: Products},
    {path: '/confirmation', component: Confirmation},
    {path: '/', redirect: '/about'},
    {path: '*', component: NotFound}
  ]
})
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueLodash, lodash)
Vue.use(Vuelidate)
Vue.use(VeeValidate)
const bus = new Vue()
export default bus
VeeValidate.Validator.extend('phonepattern', {
  getMessage: field => 'PhoneNumber needs to be a minimum length of 10!',
// Returns a boolean value
  validate: value => {
    var inputTest = value.replace(/[()\- ]/g, '')
    // var phoneMinlength = value.length - inputTest.length + (10);
    return !!inputTest.match(/\d{10}/)
  }
})

VeeValidate.Validator.extend('poapopattern', {
  getMessage: field => 'Invalid Address1 Field!',
// Returns a boolean value
  validate: value => {
    return new Promise(function (resolve, reject) {
      var poBoxPattern = new RegExp('((\\w*\\s)*P\\s?\\.?\\s?O\\s?\\.?)?\\s*BOX($|\\W)', 'i')
      var apoPattern = new RegExp('(^|\\W+)(A|F)\\s?\\.?\\s?P\\s?\\.?\\s?O(\\W+|$)', 'i')
      if (!value || (poBoxPattern.exec(value) === null && apoPattern.exec(value) === null)) {
        resolve({
          valid: true
        })
      } else {
        resolve({
          valid: false
        })
      }
    })
  }
})

VeeValidate.Validator.extend('uniqueemail', {
  getMessage: field => 'Email already exists!',
  // Returns a boolean value
  validate: value => {
    return new Promise(function (resolve, reject) {
      console.log('in emailvalidator1')
      /* emailService.getEmail(value).then(emailExists => {
       console.log('in emailvalidator2' + emailExists)
       return emailExists === true
       }) */
      axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${value}`).then(response => {
        console.log('checking if user is unique' + response.data)
        if (response.data === true) {
          resolve({
            valid: true
          })
        } else {
          resolve({
            valid: false
          })
        }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {

  },
  store,
  render: h => h(App),
  router
})
