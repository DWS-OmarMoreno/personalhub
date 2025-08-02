<script lang="ts">
  import { onMount } from 'svelte';
  import { session } from '$lib/stores/session';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  onMount(() => {
    const unsubscribe = session.subscribe((value) => {
      if (!value) {
        goto(`/?redirectTo=${$page.url.pathname}`);
      }
    });

    return unsubscribe;
  });
</script>

<slot />
