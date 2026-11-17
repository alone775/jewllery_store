import { products } from '../data/products.js';

console.log('Testing products:');
console.log(`Loaded ${products.length} products.`);
for (const p of products) {
  if (!p.id || !p.name || !p.price || !p.original_price || !p.category || !p.image) {
    console.error(`Product missing required field:`, p);
    process.exit(1);
  }
}
console.log('All products have valid schema.');

// Simulate Cart checkout URL generation
const mockCart = [
  { product: products[0], quantity: 1 },
  { product: products[1], quantity: 1 }
];

const subtotal = mockCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

const itemsList = mockCart
  .map((item) => `${item.quantity}x ${item.product.name} - Rs. ${item.product.price * item.quantity}`)
  .join('\n');

const message = `Hello ZAVI! I would like to place an order:\n${itemsList}\nTotal: Rs. ${subtotal}\nPlease confirm my order.`;

console.log('\n--- Generated Plain Text Message ---');
console.log(message);

const waNumber = '923001234567';
const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

console.log('\n--- Generated WhatsApp URL ---');
console.log(encodedUrl);

// Verification assertions
if (!encodedUrl.startsWith('https://wa.me/923001234567?text=')) {
  console.error('URL prefix incorrect');
  process.exit(1);
}
if (!decodeURIComponent(encodedUrl).includes('Total: Rs. 998')) {
  console.error('Total calculation mismatch');
  process.exit(1);
}

console.log('\nVERDICT: PASS - Test completed successfully.');
