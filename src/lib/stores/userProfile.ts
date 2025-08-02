import { writable } from 'svelte/store';
import { session } from './session';

type Profile = {
    id: string;
    full_name: string;
    role: string;
};

export const userProfile = writable<Profile | null>(null);

// Escucha la sesión y carga perfil automáticamente
session.subscribe(async ($session) => {
    if ($session) {
        const supabase = await import('$lib/supabase/supabaseClient').then((m) => m.supabase);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', $session.user.id)
            .single();

        if (!error) {
            userProfile.set(data);
        } else {
            userProfile.set(null);
        }
    } else {
        userProfile.set(null);
    }
});
