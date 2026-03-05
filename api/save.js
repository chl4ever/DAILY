export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = req.headers['authorization'];
  if (auth !== `Bearer ${process.env.EDITOR_PASSWORD || 'frontline2026'}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const data = req.body;
    if (!data || !data.date) return res.status(400).json({ error: 'Missing data' });

    const id = data.date.replace(/-/g, '');
    const brief = { ...data, id, createdAt: new Date().toISOString() };
    await redis.set(`brief:${id}`, JSON.stringify(brief));

    const rawIndex = await redis.get('brief:index');
    let index = [];
    try { index = rawIndex ? (typeof rawIndex === 'string' ? JSON.parse(rawIndex) : rawIndex) : []; } catch(e) { index = []; }

    const existing = index.findIndex(i => i.id === id);
    const entry = { id, date: data.date, headline: data.headline, vol: data.vol || '' };
    if (existing >= 0) index[existing] = entry;
    else index.unshift(entry);

    await redis.set('brief:index', JSON.stringify(index.slice(0, 100)));
    return res.status(200).json({ ok: true, id, url: `/brief/${id}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
