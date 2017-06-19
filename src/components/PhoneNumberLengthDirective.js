import Vue from 'vue';
var replace_regex = /[\(\)\- ]/g ;
// Initialize the PhoneNumberLength directive.
export const PhoneNumberLength {
  bind(el, binding, vnode) {
    // el might not be present for server-side rendering.
    if (el) {
      let input = el.value
      var input_test = input.replace(replace_regex, "");
      var phoneMinlength = input.length - input_test.length + (10);
    }
  }
}

// You can also make it available globally.
Vue.directive('phone-number-length', PhoneNumberLength)
