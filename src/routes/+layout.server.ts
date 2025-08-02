// /src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/serverClient';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('sb-access-token');

	if (!token) {
		if (url.pathname !== '/') {
			throw redirect(302, `/?redirectTo=${url.pathname}`);
		}
		return { session: null };
	}

	const { data, error } = await supabase.auth.getUser(token);

	if (error || !data?.user) {
		cookies.delete('sb-access-token', { path: '/' });
		throw redirect(302, `/?redirectTo=${url.pathname}`);
	}

	return {
		session: data,
		workspaceName: 'Kaliv Hub'
	};
};
