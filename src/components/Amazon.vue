<template xmlns:v-on="http://www.w3.org/1999/xhtml">


  <div class="main-selection">

    <div class="container-fluid main-content main-inner">
      <div class="trialHeading">
        <strong>14 day Free Trial bundle for Vonage Standard Edition</strong></h1>
        <!--<ul>
          <li v-for="p in allProvinces">
            {{ p }}
            <br>

          </li>
        </ul>-->
        <div class="text-center">
          <a href="javascript:void(0)" class="helper-label" ng-click="slideHelp('trialOffer')">
            <!-- <i class="fa fa-question-circle"></i> -->
            <div class="icn-help" style="float: left;"/>
            <!--<span message group="businessInfo"  key="usersHelp"></span> -->
            <div style="float: right;text-align: center;vertical-align: middle;font-size: 15px;padding:5px;">Learn More
              About Trial Offer
            </div>
          </a>
        </div>
      </div>


      <!-- <div class="row"> -->

      <div class="contact" ng-controller="TrialE911Controller as ctrl" layout="column">
        <!-- Start ctrl.contactform -->
        <div ng-form="ctrl.contactForm" novalidate id="trialForm">

          <div class="trial-container">
            <!--<div class="col-sm-4 "> -->
            <div class="form-errors" ng-show="orderError && orderError.section === 'contact'">
              <!-- angul   <div class="form-error ng-message">{{orderError.message}}</div> -->
            </div>
            <div class="row">
              <div class="form-group col-xs-6">
                <!-- <div class="input-field"> -->
                <label ng-class="{'font14':$root.isMobile}" for="firstName">firstName</label>
                <!--   for="firstName">{{::'contact.firstName' | message}}</label> angul -->
                <!--<md-input-container md-no-float>-->
                <input type="text" id="first_name" name="firstName"
                       ng-class="{'input-field-mobile':$root.isMobile}"
                       v-model="firstName"
                       v-validate="{ rules: { required: true, min:2 ,regex: /^[a-zA-Z0-9 \'\.\,\-]*$/   } }"
                       ng-blur="ctrl.contactForm.firstName.$dirty=true;" maxlength="50"
                       minlength="2"
                       class="form-control input-field-zep">
                <p v-if="errors.has('firstName')" class="error">{{ errors.first('firstName') }}</p>

              </div>

              <div class="form-group col-xs-6">

                <!-- <div class="input-field"> -->
                <label ng-class="{'font14':$root.isMobile}" for="lastName">
                  lastName
                  <!-- angul {{::'contact.lastName' |
                  message}} -->
                </label>
                <!--<md-input-container md-no-float> -->
                <input type="text" id="last_name" name="lastName"
                       ng-class="{'input-field-mobile':$root.isMobile}"
                       v-model="lastName"
                       v-validate="{ rules: { required: true, min:2 ,regex: /^[a-zA-Z0-9 \'\.\,\-]*$/   } }"
                       ng-blur="ctrl.contactForm.lastName.$dirty=true;" maxlength="50" minlength="2"
                       class="form-control "/>

                <p v-if="errors.has('lastName')" class="error">{{ errors.first('lastName') }}</p>
                <!-- </md-input-container> -->
                <!-- </div> -->


              </div>
            </div>

            <div class="row">
              <div class="form-group col-xs-6">
                <!-- <div class="input-field"> -->
                <label ng-class="{'font14':$root.isMobile}" for="phoneNumber">
                  phone
                 </label>
                <!-- <md-input-container md-no-float> -->
                <!--   minlength="{{phoneMinlength}}" angul -->
                <input type="tel" id="phone" name="phoneNumber"
                       ng-class="{'input-field-mobile':$root.isMobile}"
                       v-model="phoneNumber"
                       v-validate="{ rules: { required: true, min:2 ,regex:/^[0-9 \ \-\.\(\)]*$/ , phonepattern:true  } }"
                       phone-format required phone-number-length ng-blur="ctrl.contactForm.phoneNumber.$dirty=true;"
                placeholder="(XXX) XXX-XXXX" maxlength="14" aria-label=" "
                class="form-control "/>
                <p v-if="errors.has('phoneNumber')" class="error">{{ errors.first('phoneNumber') }}</p>
                </div>
                <!-- </md-input-container> -->
                <!-- </div> -->

              <div class="form-group col-xs-6">
                <!--  <div class="input-field"> -->
                <label ng-class="{'font14':$root.isMobile}" for="email">
                  contact.emails
                  <!-- {{::'contact.email' |
                  message}} angul--></label>
                <input type="email" id="email" name="email" v-model="email"
                       ng-class="{'input-field-mobile':$root.isMobile}"
                       v-validate="{ rules: { required: true, min:7, max:80, email: true, regex:/^[a-zA-Z]+[a-zA-Z0-9\.\_\-\]+@[a-zA-Z]+[a-zA-Z0-9\-\]+\.[a-zA-Z.]{2,5}$/, uniqueemail:true }}"
                       minlength="7" maxlength="80" aria-label=" "
                       ng-blur="ctrl.contactForm.email.$dirty=true;" required
                       class="form-control "/>
                <p v-if="errors.has('email')" class="error">{{ errors.first('email') }}</p>

                <!-- </md-input-container> -->
                <!-- </div> -->
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12">

                <div class="e911">
                  <div ng-form="ctrl.form" novalidate>
                    <div class="form-errors" ng-show="orderError && orderError.section === 'e911'">
                      <!-- angul    <div class="form-error ng-message">{{orderError.message}}</div> -->
                    </div>
                    <div style="margin-top: 20px; color: #9b9b9b;font-weight:600; font-size: 17px;"> Your Service
                      Address
                    </div>
                    <!--<div style="margin-bottom: 20px;" message="e911[warning]"></div> -->
                    <service-address></service-address>
                    <!-- angul imp <tr-trial-address-directive cancel="cancelEdit"/> -->
                    </form>

                  </div>
                </div>

              </div>
            </div>

          </div> <!--end new trial contriner -->
          <div class="row">
            <!-- angul <button id="{{ctrl.verifyButtonId}}" ng-show="!ctrl.showMessage" class="btn btn-primary btn-xs center-block"" style="margin-top:20px" ng-click=" ctrl.verifyAddress()" data-continue="contact">Save</button><img class="small-orange-spinner" ng-show="ctrl.showSpinner" ng-src="vg-ssu/images/orange-spinner.gif"> -->
            <button id="verifyButtonId" ng-show="!ctrl.showMessage" class="btn btn-primary btn-md center-block"
             style="margin-top:20px" v-on:click='verifyAddress' data-continue="contact">Save</button><img
            class="small-orange-spinner" ng-show="ctrl.showSpinner" ng-src="vg-ssu/images/orange-spinner.gif">

          </div>
        </div> <!--end contact form -->
      </div>
      <!--</div> form group-->
      <!--</div> -->

      <!-- </div> --> <!--end trial contriner -->


    </div>
  </div>
  </div>


</template>

<script>
  import { ErrorBag } from 'vee-validate'
  import ServiceAddress from './ServiceAddress'
  import { EventBus } from './event-bus'
  // import { UniqueUserNameDirective } from './UniqueUserNameDirective'
  // import VeeValidate from 'vee-validate'
  import axios from 'axios'
  // import emailService from '../store/api/emailService'
  /* VeeValidate.Validator.extend('uniqueemail', {
    getMessage: field => 'Email already exists!',
    // Returns a boolean value
    validate: value => {
      console.log('in emailvalidator1')
      axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${value}`).then(response => {
        console.log('checking if user is unique' + response.data)
        return response.data === true
        // return response.data
      })
    }
  }) */

  export default {
    directives: {
      uniqueusername: {
        update: function (el) {
          console.log('in uniqueusername')
          if (el.value) {
            axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${el.value}`).then(response => {
              console.log('checking if user is unique' + response.data)
              if (response.data === false) {
                console.log('user is not unique')
                const bag = new ErrorBag()
                bag.add('email', 'Email already exists', 'unique')
                bag.first('email:unique')
                this.validate
              }
            })
          }
        }
      }
    },
    name: 'Amazon',
    components: {
      ServiceAddress
    },
    props: {
      name: {
        type: String
      }
    },
    data () {
      return {
        firstName: this.$store.state.personalinfo.firstName,
        lastName: this.$store.state.personalinfo.lastName,
        email: this.$store.state.personalinfo.email,
        phoneNumber: this.$store.state.personalinfo.phone
      }
    },
    computed: {

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
      verifyAddress: function (event) {
        this.$validator.validateAll().then(success => {
          if (!success) {
          // handle error
            console.log('Error!')
            return
          }
        })
        EventBus.$emit('validate_all')
        console.log(this.$store.state.personalinfo.terms)
      }
    },
    created: function () {
      this.$store.dispatch('getAllProvinces')
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
