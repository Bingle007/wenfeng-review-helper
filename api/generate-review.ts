// pages/api/generate-review.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { content, template } = req.body;

  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `请你以如下风格点评文章，结构为见、感、思、行四段式。风格描述如下：${template}` },
        { role: 'user', content },
      ],
    });

    const review = completion.choices[0].message.content;
    res.status(200).json({ review });
  } catch (err: any) {
    res.status(500).json({ error: 'OpenAI API 调用失败', detail: err.message });
  }
}
