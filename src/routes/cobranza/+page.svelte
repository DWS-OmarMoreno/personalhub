<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';

	let cobranzas: any = [];
	let loading = true;
	let error: any = null;
	let currentPage = 1;
	const pageSize = 10;
	let totalPages = 1;
	let search = '';

	const fetchCobranzas = async (page = 1, filtro = '') => {
		loading = true;

		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;

		let query = supabase
			.from('cobranzas')
			.select('*, clientes(nombre)', { count: 'exact' })
			.order('fecha', { ascending: false });

		if (filtro) {
			query = query.or(`concepto.ilike.%${filtro}%,estado.ilike.%${filtro}%`);
		}

		const { data, count, error: fetchError } = await query.range(from, to);

		if (fetchError) {
			error = fetchError.message;
			cobranzas = [];
		} else {
			cobranzas = data;
			totalPages = Math.ceil(count / pageSize);
		}

		loading = false;
	};

	onMount(() => {
		fetchCobranzas();
	});

	const goToPage = (page: number) => {
		currentPage = page;
		fetchCobranzas(page, search);
	};

	const buscar = () => {
		currentPage = 1;
		fetchCobranzas(1, search);
	};

	const eliminarRegistro = async (id: string) => {
		const confirmado = confirm(
			'¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.'
		);
		if (!confirmado) return;

		const { error: deleteError } = await supabase.from('cobranzas').delete().eq('id', id);

		if (deleteError) {
			alert('Ocurrió un error al eliminar: ' + deleteError.message);
		} else {
			cobranzas = cobranzas.filter((c:any) => c.id !== id); // actualiza la tabla localmente
		}
	};
</script>

<section class="w-full rounded-xl bg-white p-4 shadow-md">
	<div class="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
		<h2 class="text-xl font-semibold text-[#5A0BBA]">Cobranzas</h2>

		<div class="flex w-full gap-2 md:w-auto">
			<input
				class="input-kaliv w-full md:w-64"
				placeholder="Buscar concepto o estado..."
				bind:value={search}
				on:keydown={(e) => e.key === 'Enter' && buscar()}
			/>
			<button on:click={buscar}>Buscar</button>
			<a
				href="/cobranza/nuevo"
				class="rounded-lg bg-[#5A0BBA] px-4 py-2 text-white hover:bg-[#4a0aa3]">Nuevo Registro</a
			>
		</div>
	</div>

	{#if loading}
		<p class="text-gray-500">Cargando cobranzas...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else if cobranzas.length === 0}
		<div class="py-12 text-center text-gray-500">
			<p class="text-lg">No hay registros aún.</p>
			<p class="text-sm">Puedes agregar uno con “Nuevo Registro”.</p>
		</div>
	{:else}
		<div class="overflow-auto rounded-xl border border-gray-200">
			<table class="min-w-full divide-y divide-gray-200 text-sm">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">#</th>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Fecha</th>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Cliente</th>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Valor</th>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Concepto</th
						>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Estado</th>
						<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">acciones</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each cobranzas as c, i}
						<tr>
							<td class="px-4 py-2">{(currentPage - 1) * pageSize + i + 1}</td>
							<td class="px-4 py-2">{new Date(c.fecha).toLocaleDateString()}</td>
							<td class="px-4 py-2">{c.clientes?.nombre}</td>
							<td class="px-4 py-2">${c.valor}</td>
							<td class="px-4 py-2">{c.concepto}</td>
							<td class="px-4 py-2">
								<span
									class="rounded-full px-2 py-1 text-xs font-semibold
                {c.estado === 'Pendiente'
										? 'bg-yellow-100 text-yellow-800'
										: c.estado === 'Pagado'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'}"
								>
									{c.estado}
								</span>
							</td>
							<!-- Acciones -->
							<td class="px-4 py-2">
								<div class="group relative">
									<button class="text-sm text-gray-600 hover:text-[#5A0BBA]">⋮</button>
									<div
										class="absolute z-10 mt-1 hidden w-32 rounded border bg-white text-sm shadow-md group-hover:block"
									>
										<a href={`/cobranza/${c.id}/ver`} class="block px-4 py-2 hover:bg-gray-100"
											>Ver</a
										>
										<a href={`/cobranza/${c.id}/editar`} class="block px-4 py-2 hover:bg-gray-100"
											>Editar</a
										>
										<button
											class="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
											on:click={() => eliminarRegistro(c.id)}
										>
											Eliminar
										</button>
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if totalPages > 1}
			<div class="mt-4 flex justify-center space-x-2">
				{#each Array(totalPages) as _, i}
					<button
						class="rounded-full border px-3 py-1 text-sm font-medium
                   {currentPage === i + 1
							? 'bg-[#5A0BBA] text-white'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
						on:click={() => goToPage(i + 1)}
					>
						{i + 1}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</section>
