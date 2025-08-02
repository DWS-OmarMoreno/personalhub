<script lang="ts">
  import { supabase } from '$lib/supabase/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let clientes = [];
  let cliente_id = '';
  let fecha = new Date().toISOString().split('T')[0];
  let valor = '';
  let concepto = '';
  let estado = 'Pendiente';

  let error = null;
  let loading = false;

  onMount(async () => {
    const { data, error: err } = await supabase
      .from('clientes')
      .select('id, nombre')
      .order('nombre', { ascending: true });

    if (err) {
      error = 'No se pudieron cargar los clientes.';
    } else {
      clientes = data;
    }
  });

  const guardarCobranza = async () => {
    loading = true;
    const { data: userData } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from('cobranzas').insert({
      cliente_id,
      fecha,
      valor: parseFloat(valor),
      concepto,
      estado,
      created_by: userData?.user?.id
    });

    if (insertError) {
      error = insertError.message;
    } else {
      goto('/cobranza');
    }

    loading = false;
  };
</script>

<section class="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-6">
  <h2 class="text-xl font-semibold text-[#5A0BBA] mb-4">Nuevo Registro de Cobranza</h2>

  <form on:submit|preventDefault={guardarCobranza} class="space-y-4">

    <!-- Cliente -->
    <div>
      <label class="block text-sm font-medium mb-1">Cliente</label>
      <select class="input-kaliv" bind:value={cliente_id} required>
        <option value="">Selecciona un cliente</option>
        {#each clientes as cliente}
          <option value={cliente.id}>{cliente.nombre}</option>
        {/each}
      </select>
    </div>

    <!-- Fecha -->
    <div>
      <label class="block text-sm font-medium mb-1">Fecha</label>
      <input class="input-kaliv" type="date" bind:value={fecha} required />
    </div>

    <!-- Valor -->
    <div>
      <label class="block text-sm font-medium mb-1">Valor</label>
      <input class="input-kaliv" type="number" bind:value={valor} step="0.01" required />
    </div>

    <!-- Concepto -->
    <div>
      <label class="block text-sm font-medium mb-1">Concepto</label>
      <input class="input-kaliv" bind:value={concepto} required />
    </div>

    <!-- Estado -->
    <div>
      <label class="block text-sm font-medium mb-1">Estado</label>
      <select class="input-kaliv" bind:value={estado}>
        <option value="Pendiente">Pendiente</option>
        <option value="Pagado">Pagado</option>
        <option value="Vencido">Vencido</option>
      </select>
    </div>

    <!-- Error -->
    {#if error}
      <p class="text-red-500 text-sm">{error}</p>
    {/if}

    <!-- Botón -->
    <div class="flex justify-end mt-4">
      <button class="bg-[#5A0BBA] hover:bg-[#4a0aa3] text-white px-6 py-2 rounded-xl" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  </form>
</section>
