<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase/supabaseClient';

  export let params;
  let cobranza:any = null;
  let error:any = null;
  let loading = true;

  onMount(async () => {
    const { data, error: err } = await supabase
      .from('cobranzas')
      .select('*, clientes(nombre)')
      .eq('id', params.id)
      .single();

    if (err) {
      error = err.message;
    } else {
      cobranza = data;
    }

    loading = false;
  });
</script>

{#if loading}
  <p class="text-gray-500">Cargando información...</p>
{:else if error}
  <p class="text-red-500">{error}</p>
{:else}
  <section class="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-6">
    <h2 class="text-xl font-semibold text-[#5A0BBA] mb-6">Detalle de Cobranza</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <strong>Cliente:</strong><br />
        {cobranza.clientes?.nombre}
      </div>
      <div>
        <strong>Fecha:</strong><br />
        {new Date(cobranza.fecha).toLocaleDateString()}
      </div>
      <div>
        <strong>Valor:</strong><br />
        ${cobranza.valor}
      </div>
      <div>
        <strong>Estado:</strong><br />
        {cobranza.estado}
      </div>
      <div class="md:col-span-2">
        <strong>Concepto:</strong><br />
        {cobranza.concepto}
      </div>
    </div>
  </section>
{/if}
