import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID manquant dans les variables d’environnement.')
    return NextResponse.json(
      { ok: false, error: 'Configuration serveur incomplète.' },
      { status: 500 },
    )
  }

  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      message,
      time,
      user_ip,
    }: {
      name?: string
      email?: string
      phone?: string
      message?: string
      time?: string
      user_ip?: string
    } = body || {}

    const safe = (v?: string) => v || '—'

    const text =
      `📩 *Nouveau message depuis le site*\n\n` +
      `*Nom* : ${safe(name)}\n` +
      `*Email* : ${safe(email)}\n` +
      `*Téléphone* : ${safe(phone)}\n` +
      `*Message* :\n${safe(message)}\n\n` +
      `✔ *Heure* : ${safe(time)}\n` +
      `✔ *IP utilisateur* : ${safe(user_ip)}`

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      },
    )

    if (!telegramRes.ok) {
      const errorText = await telegramRes.text()
      console.error('Erreur Telegram:', telegramRes.status, errorText)
      return NextResponse.json(
        { ok: false, error: 'Échec de l’envoi vers Telegram.', res : telegramRes },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Erreur dans /api/contact :', error)
    return NextResponse.json(
      { ok: false, error: 'Erreur interne du serveur.' },
      { status: 500 },
    )
  }
}

export function GET() {
  return NextResponse.json({ ok: true, message: 'Contact route Telegram prête.' })
}

