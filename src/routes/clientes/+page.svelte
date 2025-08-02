<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase/supabaseClient';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let clientes:any = [];
  let loading = true;
  let error:null | boolean | string = null;
  let search = '';
  let currentPage = 1;
  const pageSize = 10;
  let totalPages = 1;

  const fetchClientes = async (page = 1, buscar = '') => {
    loading = true;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('clientes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (buscar) {
      query = query.or(`nombre.ilike.%${buscar}%,correo.ilike.%${buscar}%`);
    }

    const { data, count, error: fetchError } = await query.range(from, to);

    if (fetchError) {
      error = fetchError.message;
      clientes = [];
    } else {
      clientes = data;
      totalPages = Math.ceil(count / pageSize);
    }

    loading = false;
  };

  const handleSearch = () => {
    currentPage = 1;
    fetchClientes(1, search);
  };

  onMount(() => {
    fetchClientes();
  });

  const goToPage = (page: number) => {
    currentPage = page;
    fetchClientes(page, search);
  };

  const redirectNuevo = () => goto('/clientes/nuevo');
</script>

<section class="bg-white p-4 rounded-xl shadow-md w-full">
  <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
    <h2 class="text-xl font-semibold text-[#5A0BBA]">Clientes</h2>

    <div class="flex gap-2 w-full md:w-auto">
      <input
        class="input-kaliv w-full md:w-64"
        placeholder="Buscar cliente..."
        bind:value={search}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button on:click={handleSearch}>Buscar</button>
      <button class="bg-[#5A0BBA] hover:bg-[#4a0aa3] text-white px-4 py-2 rounded-lg" on:click={redirectNuevo}>
        Nuevo Cliente
      </button>
    </div>
  </div>

  {#if loading}
    <p class="text-gray-500">Cargando clientes...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if clientes.length === 0}
    <div class="py-12 text-center text-gray-500">
      <p class="text-lg">No hay clientes registrados aún.</p>
      <p class="text-sm">Agrega uno usando el botón “Nuevo Cliente”.</p>
    </div>
  {:else}
    <div class="overflow-auto rounded-xl border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each clientes as cliente, i}
            <tr>
              <td class="px-4 py-2 text-gray-700">{(currentPage - 1) * pageSize + i + 1}</td>
              <td class="px-4 py-2 font-medium text-gray-900">{cliente.nombre}</td>
              <td class="px-4 py-2 text-gray-700">{cliente.correo}</td>
              <td class="px-4 py-2 text-gray-700">{cliente.telefono}</td>
              <td class="px-4 py-2 text-gray-700">{cliente.tipo}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    {#if totalPages > 1}
      <div class="mt-4 flex justify-center space-x-2">
        {#each Array(totalPages) as _, i}
          <button
            class="px-3 py-1 rounded-full border text-sm font-medium
                   {currentPage === i + 1 ? 'bg-[#5A0BBA] text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}"
            on:click={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</section>
