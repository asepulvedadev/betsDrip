import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const likesFilePath = path.join(process.cwd(), 'src/data/likes.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(likesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading likes file:', error);
    return NextResponse.json({ totalLikes: 0, devices: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();

    // Read current data
    let data;
    try {
      const fileContents = fs.readFileSync(likesFilePath, 'utf8');
      data = JSON.parse(fileContents);
    } catch (error) {
      data = { totalLikes: 0, devices: [] };
    }

    // Check if device already liked
    if (!data.devices.includes(deviceId)) {
      data.devices.push(deviceId);
      data.totalLikes += 1;

      // Write updated data
      fs.writeFileSync(likesFilePath, JSON.stringify(data, null, 2));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}