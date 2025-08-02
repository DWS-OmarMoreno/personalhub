<script lang="ts">
	import { supabase } from '$lib/supabase/supabaseClient';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	const login = async () => {
		const { error: err } = await supabase.auth.signInWithPassword({ email, password });
		if (err) {
			error = err.message;
		} else {
			const redirectTo = $page.url.searchParams.get('redirectTo') || '/dashboard';
			goto(redirectTo);
		}
	};
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-[Poppins]">
	<div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
		<div class="text-center">
			<h1 class="text-3xl font-semibold text-[#5A0BBA]">Bienvenido a Kaliv</h1>
			<p class="mt-1 text-gray-500">Tu hub personal de productividad</p>
		</div>
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				autocomplete="email"
				class="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-[#5A0BBA] focus:outline-none focus:ring-2 focus:ring-[#5A0BBA]"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				required
				autocomplete="current-password"
				class="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-[#5A0BBA] focus:outline-none focus:ring-2 focus:ring-[#5A0BBA]"
			/>
		</div>

		<button
			on:click={login}
			class="w-full rounded-lg bg-[#5A0BBA] py-2 font-semibold text-white transition hover:bg-purple-800"
		>
			Iniciar sesión
		</button>
	</div>
</div>
