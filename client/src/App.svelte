<script>
  import router from 'page'

  import Navbar from './Navbar.svelte'
  import Home from './Home.svelte'
  import Signin from './Signin.svelte'
  import Signup from './Signup.svelte'
  import Forgot from './Forgot.svelte'
  import Reset from './Reset.svelte'
  import Activate from './Activate.svelte'
  import Alert from './Alert.svelte'
  import { alert } from './stores'
  import {
    HOME_PATH,
    SIGNIN_PATH,
    SIGNUP_PATH,
    FORGOT_PATH,
    RESET_PATH,
    ACTIVATE_PATH,
  } from './constants'

  let page, token

  router(HOME_PATH, () => (page = Home))
  router(SIGNIN_PATH, () => (page = Signin))
  router(SIGNUP_PATH, () => (page = Signup))
  router(FORGOT_PATH, () => (page = Forgot))
  router(
    RESET_PATH,
    (ctx, next) => {
      token = ctx.params.token
      next()
    },
    () => (page = Reset),
  )
  router(
    ACTIVATE_PATH,
    (ctx, next) => {
      token = ctx.params.token
      next()
    },
    () => (page = Activate),
  )

  router.start()
</script>

<Navbar />

{#if $alert.show}
  <Alert status={$alert.status} msg={$alert.msg} />
{/if}

<svelte:component this={page} {token} />
