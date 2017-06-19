import axios from 'axios'

export default {

  getEmail (username) {
    axios.get(`/ssu-api/api/selfSignUp/validateUser?userName=${username}`, {
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        return data
      })
    }).then(response => {
      console.log('checking if user is unique' + response.data)
      return response.data
      // return response.data
    })
  }
}

