import fs from 'node:fs';
import path from 'node:path';

const images = [
  {
    name: 'necklace-green.jpg',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' // Emerald / gemstone necklace
  },
  {
    name: 'jhumkay.jpg',
    url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80' // Ornate ethnic earrings / jhumkay
  },
  {
    name: 'ring-gold.jpg',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80' // Gold zircon ring
  },
  {
    name: 'choker-pearl.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' // Pearl jewelry
  },
  {
    name: 'bracelet-clover.jpg',
    url: 'https://images.unsplash.com/photo-1611591475103-4fa1b48e5698?auto=format&fit=crop&w=800&q=80' // Gold bracelet / bangles
  },
  {
    name: 'earrings-drop.jpg',
    url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80' // Crystal drop earrings
  },
  {
    name: 'bangles-kundan.jpg',
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80' // Traditional gold bangles
  },
  {
    name: 'pendant-butterfly.jpg',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80' // Dainty pendant necklace
  },
  {
    name: 'hero-banner.jpg',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1600&q=80' // Elegant model lifestyle jewelry
  }
];

const targetDir = path.resolve('public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadAll() {
  console.log('Downloading images to', targetDir);
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    try {
      console.log(`Fetching ${img.name}...`);
      const res = await fetch(img.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(arrayBuffer));
      console.log(`Saved ${img.name} (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Failed ${img.name}:`, err.message);
    }
  }
}

downloadAll();
