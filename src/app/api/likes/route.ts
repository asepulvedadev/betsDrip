import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Inicializar la tabla si no existe
async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        device_id VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export async function GET() {
  try {
    await initializeDatabase();

    // Obtener el total de likes
    const result = await sql`SELECT COUNT(*) as total FROM likes`;
    const totalLikes = parseInt(result.rows[0].total);

    // Obtener todos los device IDs
    const devicesResult = await sql`SELECT device_id FROM likes`;
    const devices = devicesResult.rows.map(row => row.device_id);

    return NextResponse.json({ totalLikes, devices });
  } catch (error) {
    console.error('Error reading likes data:', error);
    return NextResponse.json({ totalLikes: 0, devices: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();

    const { deviceId } = await request.json();

    // Intentar insertar el device ID (si ya existe, será ignorado por UNIQUE constraint)
    await sql`
      INSERT INTO likes (device_id)
      VALUES (${deviceId})
      ON CONFLICT (device_id) DO NOTHING
    `;

    // Obtener el total actualizado
    const result = await sql`SELECT COUNT(*) as total FROM likes`;
    const totalLikes = parseInt(result.rows[0].total);

    // Obtener todos los device IDs
    const devicesResult = await sql`SELECT device_id FROM likes`;
    const devices = devicesResult.rows.map(row => row.device_id);

    return NextResponse.json({ totalLikes, devices });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}