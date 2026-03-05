export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const raw = await redis.get(`brief:${id}`);
    if (!raw) return res.status(404).json({ error: 'Not found' });
    const brief = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return res.status(200).json(brief);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
