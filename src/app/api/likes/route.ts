import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for deployment (since file system access may be limited)
let likesData = {
  totalLikes: 0,
  devices: [] as string[]
};

export async function GET() {
  try {
    return NextResponse.json(likesData);
  } catch (error) {
    console.error('Error reading likes data:', error);
    return NextResponse.json({ totalLikes: 0, devices: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();

    // Check if device already liked
    if (!likesData.devices.includes(deviceId)) {
      likesData.devices.push(deviceId);
      likesData.totalLikes += 1;
    }

    return NextResponse.json(likesData);
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}