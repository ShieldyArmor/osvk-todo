import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'lists.json');

export async function POST({ request }) {
    try {
        const { name } = await request.json();
        if (!name) {
            return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
        }

        // Read current lists
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        // Generate a unique id (simple timestamp-based)
        const id = `list_${Date.now()}`;
        const created = Date.now();

        // Add new list
        data.lists[id] = {
            name,
            created,
            items: []
        };

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));

        return new Response(JSON.stringify({ success: true, id }), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}