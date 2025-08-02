<script lang="ts">
	import { userProfile } from '$lib/stores/userProfile';
  const apps = [
    {
      name: 'Cobranza',
      description: 'Gestiona tus cobros y pagos pendientes',
      href: '/cobranza',
      icon: '💰'
    },
    {
      name: 'Clientes',
      description: 'Administra tu base de datos de clientes',
      href: '/clientes',
      icon: '👥'
    },
  ];
  export let data;
</script>

{#if $userProfile}
  <p class="text-sm text-gray-600">Hola, {$userProfile.full_name}</p>
{/if}
<h2 class="text-2xl sm:text-3xl font-bold text-[#5A0BBA] mb-2">Aplicaciones</h2>
<p class="text-gray-500 mb-6 text-sm sm:text-base">Accede a los módulos disponibles de tu panel Kaliv.</p>

<div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {#each apps as app}
    <a
      href={app.href}
      class="kaliv_app bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100 hover:border-[#5A0BBA]/40 group flex flex-col"
    >
      <div class="text-3xl sm:text-4xl mb-3">{app.icon}</div>
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#5A0BBA]">{app.name}</h3>
      <p class="text-gray-500 text-sm mt-1">{app.description}</p>
    </a>
  {/each}
</div>
