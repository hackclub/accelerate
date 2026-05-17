import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export function requirePrivateEnv(name: keyof typeof privateEnv): string {
	const value = privateEnv[name];

	if (!value) {
		throw new Error(`Missing required private env var: ${name}`);
	}

	return value;
}

export function requirePublicEnv(name: keyof typeof publicEnv): string {
	const value = publicEnv[name];

	if (!value) {
		throw new Error(`Missing required public env var: ${name}`);
	}

	return value;
}
