<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="trialOffer">
    <div class="row">
      <div class="form-group col-xs-12">
        <label ng-class="{'font14':$root.isMobile}" for="address">
          address1
        </label>
        <input type="text" id="address1" name="address1" ng-class="{'input-field-mobile':$root.isMobile}" v-model="address1"
               v-validate="{ rules: { required: true, min:3, max:50 ,regex:/^[a-zA-Z0-9 \'\.\,\#\-\$]*$/ , poapopattern:true }}"
               maxlength="50" minlength="3" ng-pattern="/^[a-zA-Z0-9 \'\.\,\#\-\$]*$/" ng-blur="ctrl.form.address.$dirty=true; ctrl.form.$dirty=true; ctrl.showMessage=false;" aria-label=" " class="form-control "/>
        <p v-if="errors.has('address1')" class="error">{{ errors.first('address1') }}</p>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-xs-12">
        <label ng-class="{'font14':$root.isMobile}" for="address2">
          address2
        </label>
        <input type="text" id="address2" name="address2" ng-class="{'input-field-mobile':$root.isMobile}"
               v-model="address2"
               v-validate="{ rules: { required: true, min:3, max:50 ,regex:/^[a-zA-Z0-9 \'\.\,\#\-\$]*$/ , poapopattern:true }}"
               maxlength="50" minlength="3" ng-pattern="/^[a-zA-Z0-9 \'\.\,\#\-\$]*$/" ng-blur="ctrl.form.address2.$dirty=true; ctrl.form.$dirty=true; ctrl.showMessage=false;" aria-label=" " class="form-control " />
        <p v-if="errors.has('address2')" class="error">{{ errors.first('address2') }}</p>
      </div>
    </div>
    <!--<span ng-include="'zip-city-state.htm'" ></span> -->

    <!-- Start ZIP CITY STATE-->
    <div class="row">
      <div class="form-group col-xs-6">
        <label ng-class="{'font14':$root.isMobile}" for="zipcode">
          zipCode
        </label>
        <input type="text" id="zipcode" name="zipcode" ng-class="{'input-field-mobile':$root.isMobile}"
               v-model="zipcode" v-on:input="updatecitystates"
               v-validate="{ rules: { required: true, min:3, max:5 ,regex:/^\d{5}(\-\d{4})?$/ }}"
               maxlength="5" aria-label=" " ng-blur="ctrl.form.zipcode.$dirty=true; ctrl.form.$dirty=true; ctrl.showMessage=false;" class="form-control "/>
        <p v-if="errors.has('zipcode')" class="error">{{ errors.first('zipcode') }}</p>
      </div>

      <div class="form-group col-xs-6">
        <label ng-class="{'font14':$root.isMobile}" for="city">
          city
        </label>
        <input type="text" id="city" name="city" ng-class="{'input-field-mobile':$root.isMobile}"
               v-model="city"
               v-validate="{ rules: { required: true, min:3, max:50 ,regex:/^[\sA-Za-z]+$/}}"
               required minlength="3" maxlength="50" ng-blur="ctrl.form.city.$dirty=true; ctrl.form.$dirty=true; ctrl.showMessage=false;" aria-label=" " class="form-control "/>
        <p v-if="errors.has('city')" class="error">{{ errors.first('city') }}</p>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-xs-6">
        <label ng-class="{'font14':$root.isMobile}" for="province">
          province
        </label>
        <div>
          <select class="selectBox dropdown-toggle" id="province" name="province" ng-class="{'input-field-mobile':$root.isMobile}"
                  v-model="province" ng-change="ctrl.getProvince(ctrl.addressInfo.address.province); ctrl.form.$dirty=true; ctrl.showMessage=false;" ng-options="province.provinceName for province in ctrl.provinces track by province.provinceId" required auto-complete-state="zipcode">
            <option v-for="p in allProvinces" v-bind:value="p.provinceId">{{p.provinceName}}</option>
          </select>
        </div>
        <p v-if="errors.has('province')" class="error">{{ errors.first('province') }}</p>
      </div>
    </div>


    <!-- End ZIP CITY STATE-->
    {{ $store.state.address.city }}
    {{ city }}
    <div ng-hide="hideVerifyButton">
      <div class="private-policy b-only" ng-show="!ctrl.showMessage">

        <div class="path-178" style="float: left;padding-top:10px;">
          <input type="checkbox" v-model="terms"
                 v-validate="'required'"
                 class="vg-checkbox " ng-model="acceptTos" id="acceptTos" name="terms" ng-change="setTos()"/>
          <p class="help is-danger" v-show="errors.has('terms')">{{ errors.first('terms') }}</p>
        </div>

        <div class="i-have-read-and-acce" style="text-align: left;vertical-align: middle;font-size: 15px;padding-top:10px;padding-left:19px;"><span> I have read and accept the <a target="_blank" href="https://business.vonage.com/terms/" message="trialtermslink">terms</a>, <a href="https://business.vonage.com/e911/" target="_blank" message="trial911link">911</a> and <a href="http://business.vonage.com/privacy-policy" target="_blank" message="trialprivacylink">privacy</a>.
               </span></div>
      <!-- By clicking the button above, you consent to our Terms of Service. <a target="_blank" href="https://business.vonage.com/terms/" message="review[terms.link]"></a> -->
      </div>
      <div style="padding:12px;" ng-show="verifySubmitted && !acceptTos" class="error" message="review[terms.val]"></div>
      <!-- <button id="{{ctrl.verifyButtonId}}" ng-show="!ctrl.showMessage" class="btn btn-primary btn-xs" style="margin-top:20px" ng-click=" ctrl.verifyAddress()" data-continue="contact">Save</button><img class="small-orange-spinner" ng-show="ctrl.showSpinner" ng-src="vg-ssu/images/orange-spinner.gif"> -->

    </div>

  </div>






</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'
  import { EventBus } from './event-bus'
  export default {
    directives: {
    },
    name: 'service-address',
    props: {
      name: {
        type: String
      }
    },
    data () {
      return {
        /* address1: this.$store.state.address.address1,
        address2: this.$store.state.address.address2,
        city: this.$store.state.address.city,
        province: this.$store.state.address.province,
        zipcode: this.$store.state.address.zipcode,
        countryCode: this.$store.state.address.countryCode,
        terms: this.$store.state.address.terms */
      }
    },
    /* mapGetters([
      'allProvinces'
    ]), */
    computed: {
      ...mapGetters([
        'allProvinces'
      ]),
      /* allProvinces: {
        get () {
          return this.$store.getters.allProvinces
        }
      }, */
      address1: {
        get () {
          return this.$store.state.address.address1
        },
        set (value) {
          console.log('In set of address1' + value)
          this.$store.dispatch('updateAddress1', value)
        }
      },
      address2: {
        get () {
          return this.$store.state.address.address2
        },
        set (value) {
          console.log('In set of address2' + value)
          this.$store.dispatch('updateAddress2', value)
        }
      },
      city: {
        get () {
          return this.$store.state.address.city
        },
        set (value) {
          console.log('In set of city' + value)
          this.$store.dispatch('updateCity', value)
        }
      },
      province: {
        get () {
          return this.$store.state.address.province
        },
        set (value) {
          console.log('In set of province' + value)
          this.$store.dispatch('updateState', value)
        }
      },
      zipcode: {
        get () {
          return this.$store.state.address.zipcode
        },
        set (value) {
          console.log('In set of zipcode' + value)
          this.$store.dispatch('updateZip', value)
        }
      },
      terms: {
        get () {
          return this.$store.state.address.terms
        },
        set (value) {
          console.log('In set of terms' + value)
          this.$store.dispatch('updateTerms', value)
        }
      }
    },
    methods: {
      reverseMessage: function () {
        this.msg = this.msg.split('').reverse().join('')
      },
      validate: function () {
        this.$validator.validateAll('scope')

        if (!this.errors.any('scope')) {
          console.log('No errors')
        }
      },
      updatecitystates: function (event) {
        this.$store.dispatch(types.SET_CITY_STATE, event.target.value)
      }
    },
    created: function () {
      var vm = this
      EventBus.$on('validate_all', function () {
        vm.$validator.validateAll()
      })
    },
    watch: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }


</style>
