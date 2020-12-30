<script>
  import router from 'page'

  import Navbar from './Navbar.svelte'
  import Signin from './Signin.svelte'
  import Signup from './Signup.svelte'
  import Forgot from './Forgot.svelte'
  import Alert from './Alert.svelte'
  import { alert } from './stores'
  import { SIGNIN_PATH, SIGNUP_PATH, FORGOT_PATH } from './constants'

  let page

  router(SIGNIN_PATH, () => (page = Signin))
  router(SIGNUP_PATH, () => (page = Signup))
  router(FORGOT_PATH, () => (page = Forgot))

  router.start()
</script>

<Navbar />

{#if $alert.show}
  <Alert status={$alert.status} msg={$alert.msg} />
{/if}

<svelte:component this={page} />
