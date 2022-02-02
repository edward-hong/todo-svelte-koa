<script>
  import { alert } from '../stores'
  import { isAuth, signout } from '../utils/helpers'
  import { SIGNIN_PATH, SIGNUP_PATH } from '../constants'

  export let authenticated

  function handleSignout() {
    signout(() => {
      alert.set({
        show: true,
        status: 'success',
        msg: 'Signout successful',
      })
    })
  }
</script>

<style>
  #brand {
    font-size: 1.5rem;
    display: inline-block;
    margin-left: 10px;
  }
</style>

<div class="top-bar">
  <div class="top-bar-left">
    <a id="brand" href="/">Todo</a>
  </div>
  <div class="top-bar-right">
    <ul class="menu">
      {#if authenticated}
        <li>
          <a on:click={handleSignout} href={SIGNIN_PATH}>Signout</a>
        </li>
      {:else}
        <li>
          <a href={SIGNUP_PATH}>Signup</a>
        </li>
        <li>
          <a href={SIGNIN_PATH}>Signin</a>
        </li>
      {/if}
    </ul>
  </div>
</div>
