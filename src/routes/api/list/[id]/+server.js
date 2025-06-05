import fs from 'fs/promises';
import path from 'path';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
    const filePath = path.resolve(process.cwd(), 'lists.json');
    const { id } = params;

    try {
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        const list = data.lists[id];
        if (!list) {
            return new Response(JSON.stringify({ error: 'List not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ id, ...list }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PATCH({ params, request }) {
    const filePath = path.resolve(process.cwd(), 'lists.json');
    const { id } = params;

    try {
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        if (!data.lists[id]) {
            return new Response(JSON.stringify({ error: 'List not found' }), { status: 404 });
        }

        const updatedList = await request.json();
        data.lists[id] = updatedList;

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}