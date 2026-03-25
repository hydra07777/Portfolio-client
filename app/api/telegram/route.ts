import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, details } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment variables');
      return NextResponse.json(
        { message: 'Configuration Telegram incomplète sur le serveur.' },
        { status: 500 }
      );
    }

    const message = `
🚀 *Nouvelle demande de projetArcaneCore* 🚀

👤 *Client :* ${name}
✉️ *Email :* ${email}
📱 *Téléphone :* ${phone || 'Non renseigné'}
🏢 *Entreprise :* ${company || 'Non renseignée'}

⚙️ *Service souhaité :* ${service || 'Non spécifié'}
📝 *Détails supplémentaires :*
${details || 'Aucun'}
    `;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Erreur lors de l\'envoi à Telegram');
    }

    return NextResponse.json({ message: 'Demande envoyée avec succès !' }, { status: 200 });
  } catch (error) {
    console.error('Erreur Telegram API Route:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'envoi.' },
      { status: 500 }
    );
  }
}
