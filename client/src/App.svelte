<script>
  import router from 'page'

  import Navbar from './Navbar.svelte'
  import Signin from './Signin.svelte'
  import Signup from './Signup.svelte'
  import Forgot from './Forgot.svelte'

  let page

  router('/signin', () => (page = Signin))
  router('/signup', () => (page = Signup))
  router('/forgot', () => (page = Forgot))

  router.start()
</script>

<Navbar />

<svelte:component this={page} />
