export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { workflow } = req.body;
  const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      'OpenAI-Beta': 'chatkit_beta=v1',
    },
    body: JSON.stringify({
      workflow: { id: workflow.id },
      user: 'visitor-' + Date.now(),
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    return res.status(response.status).json({ error: data.error?.message ?? 'Failed to create session' });
  }
  return res.status(200).json({ client_secret: data.client_secret });
}
