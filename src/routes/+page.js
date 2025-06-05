/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`/api/lists`);
	const lists = JSON.parse(await res.json());


	return { lists };
}
