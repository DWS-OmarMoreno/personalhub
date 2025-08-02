import { supabase } from '$lib/supabase/supabaseClient';

export const load = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  return {
    session,
    user: session?.user ?? null
  };
};