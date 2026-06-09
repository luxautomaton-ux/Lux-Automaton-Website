import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { licenseId } = await request.json();

    if (!licenseId) {
      return NextResponse.json({ error: 'License ID is required' }, { status: 400 });
    }

    // Check if license exists
    const license = db.prepare('SELECT * FROM licenses WHERE id = ?').get(licenseId);

    if (!license) {
      return NextResponse.json({ error: 'License record not found' }, { status: 404 });
    }

    // Update status to revoked
    const revokeTransaction = db.transaction(() => {
      db.prepare("UPDATE licenses SET status = 'revoked' WHERE id = ?").run(licenseId);
      db.prepare("UPDATE subscriptions SET status = 'canceled' WHERE license_id = ?").run(licenseId);
    });

    revokeTransaction();

    return NextResponse.json({
      success: true,
      message: 'License key and associated subscription revoked successfully'
    });

  } catch (error: any) {
    console.error('Revocation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
