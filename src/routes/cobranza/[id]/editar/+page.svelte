<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabase/supabaseClient';
  import { goto } from '$app/navigation';

  export let params;
  let id = params.id;

  let clientes:any = [];
  let cobranza = null;
  let error:any = null;
  let loading = true;

  // Campos editables
  let cliente_id = '';
  let fecha = '';
  let valor = '';
  let concepto = '';
  let estado = '';

  onMount(async () => {
    const { data: clientesData } = await supabase.from('clientes').select('id, nombre');
    clientes = clientesData || [];

    const { data, error: err } = await supabase
      .from('cobranzas')
      .select('*')
      .eq('id', id)
      .single();

    if (err) {
      error = err.message;
    } else {
      cobranza = data;
      cliente_id = data.cliente_id;
      fecha = data.fecha;
      valor = data.valor;
      concepto = data.concepto;
      estado = data.estado;
    }

    loading = false;
  });

  const guardarCambios = async () => {
    const { error: updateError } = await supabase.from('cobranzas').update({
      cliente_id,
      fecha,
      valor: parseFloat(valor),
      concepto,
      estado
    }).eq('id', id);

    if (updateError) {
      error = updateError.message;
    } else {
      goto('/cobranza');
    }
  };
</script>

{#if loading}
  <p class="text-gray-500">Cargando información...</p>
{:else}
  <section class="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-6">
    <h2 class="text-xl font-semibold text-[#5A0BBA] mb-4">Editar Registro</h2>

    <form on:submit|preventDefault={guardarCambios} class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Cliente</label>
        <select class="input-kaliv" bind:value={cliente_id} required>
          <option value="">Selecciona un cliente</option>
          {#each clientes as cliente}
            <option value={cliente.id}>{cliente.nombre}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Fecha</label>
        <input type="date" class="input-kaliv" bind:value={fecha} />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Valor</label>
        <input type="number" class="input-kaliv" bind:value={valor} />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Concepto</label>
        <input class="input-kaliv" bind:value={concepto} />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Estado</label>
        <select class="input-kaliv" bind:value={estado}>
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          <option value="Vencido">Vencido</option>
        </select>
      </div>

      {#if error}
        <p class="text-red-500 text-sm">{error}</p>
      {/if}

      <div class="flex justify-end">
        <button class="bg-[#5A0BBA] hover:bg-[#4a0aa3] text-white px-6 py-2 rounded-xl">
          Guardar cambios
        </button>
      </div>
    </form>
  </section>
{/if}
