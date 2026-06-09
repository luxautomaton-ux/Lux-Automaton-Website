import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'lux-website.db');

declare global {
  var _sqliteDb: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._sqliteDb) {
    globalThis._sqliteDb = new Database(dbPath);
  }
  db = globalThis._sqliteDb;
} else {
  db = new Database(dbPath);
}

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    stripe_customer_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'one_time' or 'subscription'
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    stripe_session_id TEXT UNIQUE,
    status TEXT NOT NULL, -- 'pending', 'completed', 'failed'
    total_cents INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    amount_cents INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS licenses (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    order_id TEXT,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    raw_key_plain TEXT, -- For testing, raw key stored plain-text
    type TEXT NOT NULL, -- 'digital_pack', 'usb_starter', 'usb_pro', 'usb_custom', 'coder_subscription'
    status TEXT NOT NULL, -- 'active', 'pending', 'revoked', 'refunded', 'expired'
    pack_slug TEXT,
    activated_at DATETIME,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS license_activations (
    id TEXT PRIMARY KEY,
    license_id TEXT NOT NULL,
    device_id TEXT NOT NULL,
    ip_address TEXT,
    activated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    offline_token TEXT,
    FOREIGN KEY (license_id) REFERENCES licenses(id)
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    license_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    plan_sku TEXT NOT NULL,
    status TEXT NOT NULL,
    current_period_start DATETIME,
    current_period_end DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (license_id) REFERENCES licenses(id)
  );

  CREATE TABLE IF NOT EXISTS emails_sent (
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    license_id TEXT,
    type TEXT NOT NULL, -- 'receipt', 'license_delivery', 'activation_welcome'
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL
  );
`);

// Seed default products if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

if (count.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (id, sku, name, description, price_cents, type, active)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `);

  const productsToSeed = [
    // Core Hardware/Packs Tiers
    ['prod_usb_starter', 'USB_128_STARTER_797', 'Lux Agent USB Starter (128GB)', 'Certified high-speed 128GB USB drive preloaded with Lux Agent and one Success Pack.', 79700, 'one_time'],
    ['prod_usb_pro', 'USB_256_PRO_997', 'Lux Agent USB Pro (256GB)', 'Premium high-speed 256GB USB drive preloaded with Lux Agent and three Success Packs.', 99700, 'one_time'],
    ['prod_usb_custom', 'USB_256_CUSTOM_1997', 'Custom Setup Success Pack', '256GB USB Pro pre-loaded with custom settings and dedicated setup consultation.', 199700, 'one_time'],
    ['prod_digital_only', 'PACK_DIGITAL_497', 'Digital Success Pack Edition', 'Instant download of a Success Pack to install on your own USB drive.', 49700, 'one_time'],

    // Subscriptions
    ['sub_coder_starter', 'CODER_STARTER_49_MO', 'Lux Coder Starter', 'Monthly VS Code extension connection to LANA for code generation.', 4900, 'subscription'],
    ['sub_coder_pro', 'CODER_PRO_149_MO', 'Lux Coder Pro', 'Advanced VS Code extension connection with multi-agent coding swarms.', 14900, 'subscription'],
    ['sub_coder_business', 'CODER_BUSINESS_299_MO', 'Lux Coder Business', 'Full organization-wide coding swarms and unlimited local model coordination.', 29900, 'subscription'],

    // Success Packs
    ['pack_doctor', 'PACK_DOCTOR_499', 'Doctor Success Pack', 'Spend more time with patients, less on paperwork.', 49900, 'one_time'],
    ['pack_music', 'PACK_MUSIC_499', 'Music Label Success Pack', 'Run your label like a major — without the staff.', 49900, 'one_time'],
    ['pack_electric', 'PACK_ELECTRIC_499', 'Electrical Contractor Success Pack', 'More leads, more estimates, more jobs.', 49900, 'one_time'],
    ['pack_creator', 'PACK_CREATOR_299', 'Creator Success Pack', 'Turn attention into a repeatable business.', 29900, 'one_time'],
    ['pack_restaurant', 'PACK_RESTAURANT_399', 'Restaurant Success Pack', 'Fill tables. Build regulars.', 39900, 'one_time'],
    ['pack_realestate', 'PACK_REALESTATE_399', 'Real Estate Success Pack', 'More listings. More leads. More closings.', 39900, 'one_time'],
    ['pack_aiconsultant', 'PACK_AICONSULTANT_599', 'AI Consultant Success Pack', 'Sell AI systems — with the systems to deliver.', 59900, 'one_time'],
    ['pack_localservice', 'PACK_LOCALSERVICE_349', 'Local Service Business Pack', 'Answer every lead. Chase every estimate.', 34900, 'one_time'],
    ['pack_aimarketing', 'PACK_AIMARKETING_199', 'AI Marketing Mastery Pack', 'Hooks, ads and funnels that convert — installed.', 19900, 'one_time'],
  ];

  const transaction = db.transaction(() => {
    for (const p of productsToSeed) {
      insertProduct.run(p[0], p[1], p[2], p[3], p[4], p[5]);
    }
  });

  transaction();
  console.log('Seeded database with default Lux products.');
}

export default db;
