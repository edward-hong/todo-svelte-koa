<script>
  import { afterUpdate } from 'svelte'
  import router from 'page'

  import Navbar from './components/Navbar.svelte'
  import Home from './pages/Home.svelte'
  import Signin from './pages/Signin.svelte'
  import Signup from './pages/Signup.svelte'
  import Forgot from './pages/Forgot.svelte'
  import Reset from './pages/Reset.svelte'
  import Activate from './pages/Activate.svelte'
  import Alert from './components/Alert.svelte'
  import { alert } from './stores'
  import { isAuth } from './utils/helpers'
  import {
    HOME_PATH,
    SIGNIN_PATH,
    SIGNUP_PATH,
    FORGOT_PATH,
    RESET_PATH,
    ACTIVATE_PATH,
  } from './constants'

  let page, token, authenticated = isAuth()

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

  afterUpdate(() => {
    authenticated = isAuth()
  })
</script>

<Navbar {authenticated} />

{#if $alert.show}
  <Alert status={$alert.status} msg={$alert.msg} />
{/if}

<svelte:component this={page} {token} />
