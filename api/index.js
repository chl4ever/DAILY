export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const raw = await redis.get('brief:index');
    let index = [];
    try { index = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : []; } catch(e) { index = []; }
    return res.status(200).json(index);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
