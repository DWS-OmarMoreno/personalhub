import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('sb-access-token', { path: '/' });
	throw redirect(302, '/');
};
