<script>
  let email = ''

  function handleForgot() {}
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
