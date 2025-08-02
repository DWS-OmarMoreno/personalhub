<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="app">
	{#if page.url.pathname !== '/'}
		<Header />
	{/if}

	<main>
		{@render children()}
	</main>

	<footer>
		<p>© 2025 Kaliv. Todos los derechos reservados.</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
