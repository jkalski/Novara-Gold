export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, err:'Method not allowed' });
  if (req.query.secret !== process.env.REVALIDATE_SECRET) return res.status(401).json({ ok:false, err:'Invalid secret' });

  const path = typeof req.query.path === 'string' ? req.query.path : '/';
  try {
    await res.revalidate(path);
    return res.status(200).json({ ok:true, path });
  } catch (e) {
    return res.status(500).json({ ok:false, err: String(e) });
  }
}
