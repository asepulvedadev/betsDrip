import { NextRequest, NextResponse } from 'next/server';
// import { sql } from '@vercel/postgres';

// Mock database for development - replace with actual database in production
let mockLikes: { device_id: string; created_at: string }[] = [];

// Inicializar la base de datos mock si no existe
async function initializeDatabase() {
  // Mock initialization - no action needed
  console.log('Mock database initialized');
}

export async function GET() {
  try {
    await initializeDatabase();

    // Obtener el total de likes desde mock data
    const totalLikes = mockLikes.length;

    // Obtener todos los device IDs desde mock data
    const devices = mockLikes.map((row: { device_id: string }) => row.device_id);

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

    // Verificar si el device ID ya existe en mock data
    const existingIndex = mockLikes.findIndex((row: { device_id: string }) => row.device_id === deviceId);

    if (existingIndex === -1) {
      // Agregar nuevo like si no existe
      mockLikes.push({
        device_id: deviceId,
        created_at: new Date().toISOString()
      });
    }

    // Obtener el total actualizado desde mock data
    const totalLikes = mockLikes.length;

    // Obtener todos los device IDs desde mock data
    const devices = mockLikes.map((row: { device_id: string }) => row.device_id);

    return NextResponse.json({ totalLikes, devices });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}