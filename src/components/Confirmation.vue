<template xmlns:v-on="http://www.w3.org/1999/xhtml">
<div style="padding-top:100px;">
  <div></div>
  <div class="main-selection">
    <div class="container-fluid main-content main-inner shadow-selection" style="margin-top:40px;">
      <div class="trial-container">

        Your Account is all setup, you will receive a confirmation email with further instructions.
        <br>
        Please close this window  to complete this process.

      </div>
    </div>
  </div>

</div>






</template>

<script>
  export default {
    inject: {
      $validator: '$validator'
    },
    directives: {
    },
    name: 'confirmation',
    props: {
    },
    data () {
      return {
      }
    },
    methods: {

    },
    created: {

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
