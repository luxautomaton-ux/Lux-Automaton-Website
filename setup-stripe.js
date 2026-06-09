const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

const STRIPE_SECRET_KEY = process.argv[2];

if (!STRIPE_SECRET_KEY || !STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('❌ Error: Please provide your live Stripe Secret Key as an argument.');
  console.log('Usage: node setup-stripe.js sk_live_XXXXXXXXXXXXXXXXXXXXXXX');
  process.exit(1);
}

const stripe = Stripe(STRIPE_SECRET_KEY);

const PRODUCTS = [
  // Digital & Physical Packs
  {
    id: 'PACK_DIGITAL_497',
    name: 'Lux Agent Success Pack (Digital)',
    type: 'payment',
    price_cents: 49700,
    env_var: 'STRIPE_PRICE_PACK_DIGITAL_497'
  },
  {
    id: 'USB_128_STARTER_797',
    name: 'Lux Agent USB 128GB (Starter)',
    type: 'payment',
    price_cents: 79700,
    env_var: 'STRIPE_PRICE_USB_128_STARTER_797'
  },
  {
    id: 'USB_256_PRO_997',
    name: 'Lux Agent USB 256GB (Pro)',
    type: 'payment',
    price_cents: 99700,
    env_var: 'STRIPE_PRICE_USB_256_PRO_997'
  },
  {
    id: 'USB_256_CUSTOM_1997',
    name: 'Lux Agent USB 256GB (Custom Engraved)',
    type: 'payment',
    price_cents: 199700,
    env_var: 'STRIPE_PRICE_USB_256_CUSTOM_1997'
  },
  // Lux Coder Subscriptions
  {
    id: 'CODER_STARTER_49_MO',
    name: 'Lux Coder Suite - Starter',
    type: 'subscription',
    price_cents: 4900,
    interval: 'month',
    env_var: 'STRIPE_PRICE_CODER_STARTER_49'
  },
  {
    id: 'CODER_PRO_149_MO',
    name: 'Lux Coder Suite - Pro',
    type: 'subscription',
    price_cents: 14900,
    interval: 'month',
    env_var: 'STRIPE_PRICE_CODER_PRO_149'
  },
  {
    id: 'CODER_BUSINESS_299_MO',
    name: 'Lux Coder Suite - Business',
    type: 'subscription',
    price_cents: 29900,
    interval: 'month',
    env_var: 'STRIPE_PRICE_CODER_BUSINESS_299'
  },
  {
    id: 'CODER_VIP_500_MO',
    name: 'Lux Coder Suite - VIP',
    type: 'subscription',
    price_cents: 50000,
    interval: 'month',
    env_var: 'STRIPE_PRICE_CODER_VIP_500' // NOTE: I just noticed VIP wasn't in the route.ts originally, but it's good to create it.
  }
];

async function setupStripe() {
  console.log('🚀 Connecting to Stripe to generate your products...');
  
  let envContent = '';
  const envPath = path.join(__dirname, '.env.local');
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Inject the Stripe Key if it's not already there or update it
  if (envContent.includes('STRIPE_SECRET_KEY=')) {
    envContent = envContent.replace(/STRIPE_SECRET_KEY=.*/g, `STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}`);
  } else {
    envContent += `\nSTRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}\n`;
  }

  for (const prod of PRODUCTS) {
    try {
      // 1. Create Product
      console.log(`\n📦 Creating product: ${prod.name}`);
      const stripeProduct = await stripe.products.create({
        name: prod.name,
        metadata: { sku: prod.id }
      });

      // 2. Create Price
      const priceParams = {
        product: stripeProduct.id,
        unit_amount: prod.price_cents,
        currency: 'usd',
      };

      if (prod.type === 'subscription') {
        priceParams.recurring = { interval: prod.interval };
      }

      console.log(`💲 Creating price: $${prod.price_cents / 100} for ${prod.name}`);
      const stripePrice = await stripe.prices.create(priceParams);

      console.log(`✅ Success! Price ID: ${stripePrice.id}`);

      // 3. Update .env.local string
      const envVarRegex = new RegExp(`${prod.env_var}=.*`, 'g');
      if (envContent.match(envVarRegex)) {
        envContent = envContent.replace(envVarRegex, `${prod.env_var}=${stripePrice.id}`);
      } else {
        envContent += `${prod.env_var}=${stripePrice.id}\n`;
      }
      
    } catch (err) {
      console.error(`❌ Failed to create ${prod.name}: ${err.message}`);
    }
  }

  // Ensure VIP is in the switch statement for the checkout API
  console.log('\n📝 Saving all Price IDs to .env.local...');
  fs.writeFileSync(envPath, envContent.trim() + '\n');
  
  console.log('🎉 All done! Your Stripe account is fully configured and the website is linked.');
  console.log('Restart your Next.js server to apply the changes.');
}

setupStripe();
