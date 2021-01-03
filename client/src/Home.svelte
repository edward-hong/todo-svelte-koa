<script>
  import router from 'page'

  import { isAuth } from './utils/helpers'
  import { SIGNIN_PATH } from './constants'

  if (!isAuth()) {
    router.redirect(SIGNIN_PATH)
  }
</script>

Home
