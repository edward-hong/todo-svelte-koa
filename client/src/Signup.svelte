<script>
  import axios from 'axios'
  import router from 'page'

  import { alert } from './stores'
  import { isAuth } from './utils/helpers'
  import {
    HOME_PATH,
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    SIGNUP_SERVER_PATH,
  } from './constants'

  let name = ''
  let email = ''
  let password = ''

  if (isAuth()) {
    router.redirect(HOME_PATH)
  }

  async function handleSignup() {
    try {
      const response = await axios({
        method: 'POST',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${SIGNUP_SERVER_PATH}`,
        data: { name, email, password },
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
        msg: 'Signup failed please try again',
      })
    }
  }
</script>

<h1 class="text-center">Signup</h1>

<form on:submit|preventDefault={handleSignup}>
  <div class="grid-x grid-padding-x">
    <div class="cell large-8 large-offset-2">
      <label>
        Name
        <input type="text" placeholder="John Doe" bind:value={name} />
      </label>
    </div>
    <div class="cell large-8 large-offset-2">
      <label>
        Email
        <input type="email" placeholder="j.doe@email.com" bind:value={email} />
      </label>
    </div>
    <div class="cell large-8 large-offset-2">
      <label>
        Password
        <input type="password" placeholder="123456" bind:value={password} />
      </label>
    </div>
    <div class="cell large-8 large-offset-2">
      <button type="submit" class="button expanded">Signup</button>
    </div>
  </div>
</form>
