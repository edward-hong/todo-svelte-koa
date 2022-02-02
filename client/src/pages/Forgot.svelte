<script>
  import axios from 'axios'
  import router from 'page'

  import { alert } from '../stores'
  import { isAuth } from '../utils/helpers'
  import {
    HOME_PATH,
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    FORGOT_SERVER_PATH,
  } from '../constants'

  export let token

  let email = ''

  if (isAuth()) {
    router.redirect(HOME_PATH)
  }

  async function handleForgot() {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${FORGOT_SERVER_PATH}`,
        data: { email },
      })
      alert.set({
        show: true,
        status: 'success',
        msg: response.data.message,
      })
    } catch (err) {
      alert.set({
        show: true,
        status: 'alert',
        msg: 'Forgot password failed please try again',
      })
    }
  }
</script>

<h1 class="text-center">Forgot Password</h1>

<form on:submit|preventDefault={handleForgot}>
  <div class="grid-x grid-padding-x">
    <div class="cell large-8 large-offset-2">
      <label>
        Email
        <input type="email" placeholder="j.doe@email.com" bind:value={email} />
      </label>
    </div>
    <div class="cell large-8 large-offset-2">
      <button type="submit" class="button expanded">Reset Password</button>
    </div>
  </div>
</form>
