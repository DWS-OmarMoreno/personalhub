<script lang="ts">
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let nombre = '';
	let correo = '';
	let telefono = '';
	let direccion = '';
	let tipo = 'Persona';
	let identificacion = '';
	let loading = false;
	let error: any = null;

	const guardarCliente = async () => {
		loading = true;
		const { data: user } = await supabase.auth.getUser();
		const { error: insertError } = await supabase.from('clientes').insert({
			nombre,
			correo,
			telefono,
			direccion,
			tipo,
			identificacion,
			created_by: user?.user?.id
		});

		if (insertError) {
			error = insertError.message;
		} else {
			goto('/clientes');
		}

		loading = false;
	};
</script>

<section class="mx-auto mt-6 max-w-2xl rounded-xl bg-white p-6 shadow-md">
	<h2 class="mb-4 text-xl font-semibold text-[#5A0BBA]">Nuevo Cliente</h2>

	<form on:submit|preventDefault={guardarCliente} class="space-y-4">
		<div>
			<label class="mb-1 block text-sm font-medium">Nombre</label>
			<input class="input-kaliv" bind:value={nombre} required />
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label class="mb-1 block text-sm font-medium">Correo</label>
				<input class="input-kaliv" type="email" bind:value={correo} />
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium">Teléfono</label>
				<input class="input-kaliv" bind:value={telefono} />
			</div>
		</div>

		<div>
			<label class="mb-1 block text-sm font-medium">Dirección</label>
			<input class="input-kaliv" bind:value={direccion} />
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label class="mb-1 block text-sm font-medium">Tipo</label>
				<select class="input-kaliv" bind:value={tipo}>
					<option value="Persona">Persona</option>
					<option value="Empresa">Empresa</option>
				</select>
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium">Identificación</label>
				<input class="input-kaliv" bind:value={identificacion} />
			</div>
		</div>

		{#if error}
			<p class="text-sm text-red-500">{error}</p>
		{/if}

		<div class="mt-4 flex justify-end">
			<button
				class="rounded-xl bg-[#5A0BBA] px-6 py-2 text-white hover:bg-[#4a0aa3]"
				type="submit"
				disabled={loading}
			>
				{loading ? 'Guardando...' : 'Guardar'}
			</button>
		</div>
	</form>
</section>
