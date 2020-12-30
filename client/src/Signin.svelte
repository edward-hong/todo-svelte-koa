<script>
  let email = ''
  let password = ''

  function handleSignin() {}
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
