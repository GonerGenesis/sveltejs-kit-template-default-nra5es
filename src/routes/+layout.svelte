<script lang="ts">
  import { remult } from 'remult'
  import { isError } from 'firstly'
  import { AuthController } from 'firstly/auth'

  import { invalidateAll } from '$app/navigation'

  import { route } from '$lib/ROUTES'

  import type { LayoutData } from './$types'

  const login = async (identif: string) => {
    try {
      await AuthController.signInDemo(identif)
      invalidateAll()
    } catch (error) {
      if (isError(error)) {
        alert(error.message)
      }
    }
  }

  const logout = async () => {
    try {
      await AuthController.signOut()
      invalidateAll()
    } catch (error) {
      if (isError(error)) {
        alert(error.message)
      }
    }
  }

  export let data: LayoutData
  $: remult.user = data.user
</script>

<svelte:head>
  <title>firstly-demo</title>
  <link
    rel="icon"
    href="https://raw.githubusercontent.com/jycouet/firstly/main/assets/firstly.png"
  />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

<h1>firstly-demo</h1>

{#if remult.authenticated()}
  <button style="float:right;" on:click={logout}>Logout</button>
  <span>{remult.user?.name} ({remult.user?.roles})<br /><br /></span>
{:else}
  <button on:click={() => login('Ermin')}>Login as Ermin</button>
  <button on:click={() => login('JYC')}>Login as JYC</button>
  <button on:click={() => login('Noam')}>Login as Noam</button>
{/if}

<hr />

<slot />

<hr />

<a href={route('github', { owner: 'jycouet', repo: 'firstly' })} target="_blank">
  ⭐️ firstly
</a>
|
<a href={route('github', { owner: 'remult', repo: 'remult' })} target="_blank">⭐️ remult</a>
