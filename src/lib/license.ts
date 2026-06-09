import crypto from 'crypto';

/**
 * Generates a license key in the format: LUX-[TYPE]-[4CHARS]-[4CHARS]-[4CHARS]
 * Example: LUX-PACK-ABCD-EF12-34GH
 */
export function generateLicenseKey(type: string = 'PACK'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => 
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  
  return `LUX-${type.toUpperCase()}-${segment()}-${segment()}-${segment()}`;
}

/**
 * Hashes a license key using SHA-256 for secure storage and comparison.
 */
export function hashLicenseKey(key: string): string {
  return crypto.createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
}
