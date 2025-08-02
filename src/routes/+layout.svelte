<!-- /src/routes/+layout.svelte -->
<script lang="ts">
  import Header from './Header.svelte';
  import '../app.css';
  import { page } from '$app/stores';

  export let data: { session: any; workspaceName?: string };
</script>

<div class="kaliv-layout">
  {#if $page.url.pathname !== '/'}
    <Header workspaceName={data.workspaceName} />
  {/if}

  <main class="kaliv-main">
    <slot />
  </main>

  <footer class="kaliv-footer">
    <p>© 2025 <span class="text-[#5A0BBA] font-semibold">Kaliv</span>. Todos los derechos reservados.</p>
  </footer>
</div>

<style>
  .kaliv-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg-1);
  }

  .kaliv-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    width: 100%;
  }

  .kaliv-footer {
    background-color: var(--color-bg-0);
    text-align: center;
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
    border-top: 1px solid #e5e7eb;
  }

  @media (min-width: 1024px) {
    .kaliv-main {
      padding: 2rem 3rem;
    }
  }
</style>
