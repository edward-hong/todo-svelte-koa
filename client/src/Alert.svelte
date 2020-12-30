<script>
  import { alert } from './stores'

  export let status
  export let msg

  function handleClose() {
    alert.update((val) => ({ ...val, show: false }))
  }
</script>

<div data-closable class="callout {status}">
  {msg}
  <button
    on:click={handleClose}
    class="close-button"
    aria-label="Dismiss alert"
    type="button"
    data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
