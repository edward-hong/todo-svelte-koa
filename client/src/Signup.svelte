<script>
  let name = ''
  let email = ''
  let password = ''

  function handleSignup() {}
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
