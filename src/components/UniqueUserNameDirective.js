import Vue from 'vue'
import { ErrorBag } from 'vee-validate'
import axios from 'axios'
// Initialize the PhoneNumberLength directive.
/* export const UniqueUserName {
  bind(el, binding, vnode) {
    if (el) {
      axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${value}`).then(response => {
        console.log('checking if user is unique' + response.data)
        if(!response.data === true){
          const bag = new ErrorBag()
          bag.add('email', 'Email already exists', 'unique')
          bag.first('email:unique')
        }
      })
    }
  }
} */

Vue.directive('unique-user-name', {
  bind: function (el) {
    if (el.value) {
      axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${el.value}`).then(response => {
        console.log('checking if user is unique' + response.data)
        if (!response.data === true) {
          const bag = new ErrorBag()
          bag.add('email', 'Email already exists', 'unique')
          bag.first('email:unique')
        }
      })
    }
  }
})
/*
export const UniqueUserName {
  bind(el, binding, vnode) {
    if (el) {
      axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${value}`).then(response => {
        console.log('checking if user is unique' + response.data)
      if(!response.data === true){
        const bag = new ErrorBag()
        bag.add('email', 'Email already exists', 'unique')
        bag.first('email:unique')
      }
    })
    }
  }
}
*/
// You can also make it available globally.
// Vue.directive('unique-user-name', UniqueUserName)
