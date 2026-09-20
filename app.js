const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'inutry2024';
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/zgqo6kphj7u4iksqdt4c3n16nvvbk1sy';

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/', async (req, res) => {
  res.sendStatus(200);
  
  try {
    await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
  } catch (err) {
    console.error('Erro ao encaminhar para Make:', err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook rodando na porta ${PORT}`));
