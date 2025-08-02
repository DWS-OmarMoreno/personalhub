<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase/supabaseClient';

  let workspace_name = '';
  let modo_oscuro = false;
  let idioma = 'es';

  let loading = true;
  let error:any = null;
  let config_id:any = null;

  onMount(async () => {
    const { data: user } = await supabase.auth.getUser();

    const { data, error: fetchError } = await supabase
      .from('configuraciones')
      .select('*')
      .eq('created_by', user.user.id)
      .single();

    if (data) {
      config_id = data.id;
      workspace_name = data.workspace_name;
      modo_oscuro = data.modo_oscuro;
      idioma = data.idioma;
    }

    if (fetchError && fetchError.code !== 'PGRST116') {
      error = fetchError.message;
    }

    loading = false;
  });

  const guardarConfiguracion = async () => {
    const { data: user } = await supabase.auth.getUser();

    if (config_id) {
      const { error: updateError } = await supabase
        .from('configuraciones')
        .update({
          workspace_name,
          modo_oscuro,
          idioma
        })
        .eq('id', config_id);

      if (updateError) error = updateError.message;
    } else {
      const { error: insertError } = await supabase.from('configuraciones').insert({
        created_by: user.user.id,
        workspace_name,
        modo_oscuro,
        idioma
      });

      if (insertError) error = insertError.message;
    }
  };
</script>

<section class="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-6">
  <h2 class="text-xl font-semibold text-[#5A0BBA] mb-4">Configuración Personal</h2>

  {#if error}
    <p class="text-red-500 mb-4">{error}</p>
  {/if}

  {#if !loading}
    <form on:submit|preventDefault={guardarConfiguracion} class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Nombre del Workspace</label>
        <input class="input-kaliv" bind:value={workspace_name} placeholder="Ej. Mi espacio Kaliv" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Idioma</label>
        <select class="input-kaliv" bind:value={idioma}>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <input id="modo" type="checkbox" bind:checked={modo_oscuro} class="rounded text-[#5A0BBA]" />
        <label for="modo" class="text-sm">Activar modo oscuro</label>
      </div>

      <div class="flex justify-end">
        <button class="bg-[#5A0BBA] hover:bg-[#4a0aa3] text-white px-6 py-2 rounded-xl">
          Guardar configuración
        </button>
      </div>
    </form>
  {:else}
    <p class="text-gray-500">Cargando configuración...</p>
  {/if}
</section>