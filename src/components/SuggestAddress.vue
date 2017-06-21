<template xmlns:v-on="http://www.w3.org/1999/xhtml" id="modal-template">
  <!-- <script type="text/x-template" id="modal-template"> -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <span>Please confirm that the address below is correct:</span>
          </div>
          <div  v-for="suggestion in suggestions">
            <input type="radio" id="one" value="suggestion" v-model="pickedSuggestion">
            <label>{{suggestion.oneLineAddress}}</label>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" v-on:click="$emit('close')">Cancel</button>
            <button class="btn btn-danger" v-on:click="confirmation">
              Confirm
            </button>

          </div>
        </div>
      </div>
    </div>
  </transition>
<!-- </script> -->

</template>
<script>
  import Vue from 'vue'
  // import * as types from '../store/mutation-types'
  // import Confirmation from './Confirmation'
  var SuggestAddress = Vue.component('suggest-address', {
    template: '#modal-template',
    data: function () {
      return {
        pickedSuggestion: ''
      }
    },
    props: ['showModal'],
    computed: {
      suggestions: {
        get () { return this.$store.state.address.suggestions },
        set (value) {
          console.log('In set of showModal' + value)
          // this.$store.dispatch(types.UPDATE_SUGGEST, value)
        }
      }
    },
    methods: {
      confirmation: function () {
        this.$store.dispatch('updateShowModal', false)
        this.$router.push({ path: '/confirmation' })
        // this.$route.router.go('/confirmation')
        // this.showModal = false
      }
    }
  })
  export default SuggestAddress
</script>

<style>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    padding-left: 410px;

  }

  .modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    height: 110px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
