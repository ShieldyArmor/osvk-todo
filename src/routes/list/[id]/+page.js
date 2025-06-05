/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const res = await fetch(`/api/list/${params.id}`);
    if (!res.ok) {
        return {
            status: res.status,
            error: new Error('List not found')
        };
    }
    const list = await res.json();
    return {
            list,
            id: params.id
    };
}