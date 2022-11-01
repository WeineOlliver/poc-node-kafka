import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Weine Oliveira' },
    course: 'POC using Kafka and NodeJs',
    grade: 10,
  };

  await req.producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) },
      { value: JSON.stringify({ ...message, user: { ...message.user, name: 'KafkaBoy' } }) },
    ],
  })

  return res.json({ ok: true });
});

export default routes;