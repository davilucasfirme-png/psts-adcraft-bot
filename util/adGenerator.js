const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function gerarAnuncio(produto, publico, objetivo) {
  const prompt = `
Crie um anúncio persuasivo:
Produto: ${produto}
Público: ${publico}
Objetivo: ${objetivo}
Use emojis e chamada para ação.
Texto curto para redes sociais.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return response.choices[0].message.content;
}

module.exports = { gerarAnuncio };
