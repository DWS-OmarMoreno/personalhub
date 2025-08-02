<script lang="ts">
	import { session } from '$lib/stores/session';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';

	export const userName = 'Usuario';
	export let workspaceName = 'Kaliv';
	let menuOpen = false;

	const logout = async () => {
		await supabase.auth.signOut();
		goto('/');
	};
</script>

<header class="sticky top-0 z-50 bg-white shadow-md">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 font-[Poppins] sm:px-6">
		<h1 class="text-xl font-bold text-[#5A0BBA]">{workspaceName}</h1>

		<!-- Desktop nav -->
		<nav class="hidden items-center space-x-6 md:flex">
			<a href="/dashboard" class="font-medium text-gray-700 transition hover:text-[#5A0BBA]"
				>Inicio</a
			>
			<a href="/cobranza" class="font-medium text-gray-700 transition hover:text-[#5A0BBA]"
				>Cobranza</a
			>
			<a href="/clientes" class="font-medium text-gray-700 transition hover:text-[#5A0BBA]"
				>Clientes</a
			>
			<a href="/configuracion" class="font-medium text-gray-700 transition hover:text-[#5A0BBA]"
				>Configuración</a
			>
			{#if $session}
				<a href="/logout" class="font-medium text-gray-700 transition hover:text-[#5A0BBA]">
					Cerrar sesión
				</a>
			{/if}
		</nav>

		<!-- Mobile toggle -->
		<button class="text-2xl text-[#5A0BBA] md:hidden" on:click={() => (menuOpen = !menuOpen)}>
			☰
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="space-y-3 px-4 pb-4 font-[Poppins] sm:px-6 md:hidden">
			<a href="/dashboard" class="block text-gray-700 hover:text-[#5A0BBA]">Inicio</a>
			<a href="/cobranza" class="block text-gray-700 hover:text-[#5A0BBA]">Cobranza</a>
			<a href="/clientes" class="block text-gray-700 hover:text-[#5A0BBA]">Clientes</a>
			<a href="/configuracion" class="block text-gray-700 hover:text-[#5A0BBA]">Configuración</a>
			<button on:click={logout} class="block w-full pt-2 text-left text-[#5A0BBA] hover:underline"
				>Cerrar sesión</button
			>
		</div>
	{/if}
</header>
