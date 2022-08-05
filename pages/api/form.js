export default function handler(req, res) {
  if (req.method === 'GET') {
    // req.query
    return res.status(200).send('Ok, Get.')
  }

  if (req.method === 'POST') {
    // req.body
    return res.status(200).send('Ok, Post.')
  }

  return res.status(200).send('Method not supported.')
}
