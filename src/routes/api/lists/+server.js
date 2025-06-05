import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
    // Adjust the path as needed; this assumes the JSON file is in the project root
    const filePath = path.resolve(process.cwd(), 'lists.json');
    const data = await fs.readFile(filePath, 'utf-8');

    return json(data)
}