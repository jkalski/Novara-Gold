export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    uptime: process.uptime(),
    ts: new Date().toISOString()
  });
}
