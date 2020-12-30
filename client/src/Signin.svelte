<script>
  import axios from 'axios'

  import { alert } from './stores'
  import {
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    SIGNIN_SERVER_PATH,
  } from './constants'

  let email = ''
  let password = ''

  function handleSignin() {
    axios({
      method: 'POST',
      url: `${
        isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
      }${SIGNIN_SERVER_PATH}`,
      data: { email, password },
    })
      .then((response) => {
        console.log(response)
      })
      .catch(() => {
        alert.set({
          show: true,
          status: 'alert',
          msg: 'Signin failed please try again',
        })
      })
  }
</script>

<h1 class="text-center">Signin</h1>

<form on:submit|preventDefault={handleSignin}>
  <div class="grid-x grid-padding-x">
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
      <button type="submit" class="button expanded">Signin</button>
    </div>
    <div class="cell large-8 large-offset-2">
      <p>
        Forgot password? Click
        <a href="/forgot">here</a>
      </p>
    </div>
  </div>
</form>
