import { supabase } from '$lib/supabase/serverClient';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('sb-access-token');

	let user = null;

	if (token) {
		const { data, error } = await supabase.auth.getUser(token);
		user = data?.user || null;
	}

	event.locals.user = user;

	return resolve(event);
};
