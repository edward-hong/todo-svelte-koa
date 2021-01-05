<script>
  import axios from 'axios'
  import router from 'page'

  import { alert } from './stores'
  import { isAuth } from './utils/helpers'
  import {
    HOME_PATH,
    SIGNIN_PATH,
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    RESET_SERVER_PATH,
  } from './constants'

  export let token

  let newPassword = ''

  if (isAuth()) {
    router.redirect(HOME_PATH)
  }

  async function handleReset() {
    try {
      await axios({
        method: 'PUT',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${RESET_SERVER_PATH}`,
        data: { resetPasswordLink: token, newPassword },
      })
      router.redirect(SIGNIN_PATH)
      alert.set({
        show: true,
        status: 'success',
        msg: 'Reset password successful. Please Signin',
      })
    } catch (err) {
      alert.set({
        show: true,
        status: 'alert',
        msg: 'Reset password failed please try again',
      })
    }
  }
</script>

<h1 class="text-center">Reset Password</h1>

<form on:submit|preventDefault={handleReset}>
  <div class="grid-x grid-padding-x">
    <div class="cell large-8 large-offset-2">
      <label>
        New Password
        <input type="password" placeholder="123456" bind:value={newPassword} />
      </label>
    </div>
    <div class="cell large-8 large-offset-2">
      <button type="submit" class="button expanded">Reset</button>
    </div>
  </div>
</form>
