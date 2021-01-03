<script>
  import decode from 'jwt-decode'
  import axios from 'axios'

  import { alert } from './stores'
  import {
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    ACTIVATE_SERVER_PATH,
  } from './constants'

  export let token

  let name = decode(token).name

  function handleActivate() {
    axios({
      method: 'POST',
      url: `${
        isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
      }${ACTIVATE_SERVER_PATH}`,
      data: { token },
    })
      .then((response) => {
        if (response.data.error) {
          alert.set({
            show: true,
            status: 'alert',
            msg: response.data.error.message,
          })
        } else {
          alert.set({
            show: true,
            status: 'success',
            msg: response.data.message,
          })
        }
      })
      .catch(() => {
        alert.set({
          show: true,
          status: 'alert',
          msg: 'Activation failed please try again',
        })
      })
  }
</script>

<style>
  h1 {
    font-size: 2rem;
  }

  button.button.expanded {
    max-width: 400px;
    margin: 0 auto;
  }
</style>

<h1 class="text-center">Hey {name}, ready to activate your account?</h1>

<button on:click={handleActivate} class="button expanded">Activate</button>
