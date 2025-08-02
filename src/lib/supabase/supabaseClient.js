import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { session } from '$lib/stores/session';

export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// Recuperar sesión al cargar
supabase.auth.getSession().then(({ data }) => {
  session.set(data.session);
});

// Escuchar cambios de sesión (login/logout)
supabase.auth.onAuthStateChange((event, newSession) => {
  session.set(newSession);
});
