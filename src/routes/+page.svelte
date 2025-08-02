<script lang="ts">
  let email: string = '';
  let password: string = '';

  const handleLogin = (): void => {
	// Aquí puedes agregar la lógica para manejar el inicio de sesión
	// Por ejemplo, enviar los datos a un servidor o validar las credenciales
	console.log('Email:', email);
	console.log('Password:', password);
	
	// Resetear los campos después del inicio de sesión
	email = '';
	password = '';
  };
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 font-[Poppins] px-4">
  <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-semibold text-[#5A0BBA]">Bienvenido a Kaliv</h1>
      <p class="text-gray-500 mt-1">Tu hub personal de productividad</p>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleLogin}>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5A0BBA] focus:border-[#5A0BBA]"
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
          class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5A0BBA] focus:border-[#5A0BBA]"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-[#5A0BBA] text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</div>
