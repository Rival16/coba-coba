import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Ganti ke alamat domain yang SUDAH terverifikasi di Resend.
// Selama domain belum diverifikasi, pakai 'onboarding@resend.dev' untuk testing.
const FROM_EMAIL = 'Ruang Perempuan <onboarding@resend.dev>'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Ambil surat yang waktunya sudah tiba dan belum dikirim
  const { data: letters, error } = await supabase
    .from('future_letters')
    .select('*')
    .lte('delivery_date', new Date().toISOString())
    .eq('sent', false)

  if (error) {
    console.error('Gagal ambil data future_letters:', error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  console.log(`Ditemukan ${letters.length} surat yang siap dikirim.`)

  let sentCount = 0
  let failedCount = 0

  for (const letter of letters) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: letter.email,
          subject: `Surat untuk dirimu: ${letter.title}`,
          text: letter.body,
        }),
      })

      if (!resendRes.ok) {
        // Resend menolak/gagal kirim — JANGAN tandai sent, biar dicoba lagi di run berikutnya.
        const errBody = await resendRes.text()
        console.error(`Gagal kirim email untuk letter id=${letter.id} ke ${letter.email}: [${resendRes.status}] ${errBody}`)
        failedCount++
        continue
      }

      const { error: updateError } = await supabase
        .from('future_letters')
        .update({ sent: true })
        .eq('id', letter.id)

      if (updateError) {
        console.error(`Email terkirim tapi gagal update status sent untuk letter id=${letter.id}:`, updateError)
        failedCount++
        continue
      }

      sentCount++
    } catch (err) {
      console.error(`Error tak terduga saat memproses letter id=${letter.id}:`, err)
      failedCount++
    }
  }

  console.log(`Selesai. Terkirim: ${sentCount}, Gagal: ${failedCount}`)

  return new Response(
    JSON.stringify({ total: letters.length, sent: sentCount, failed: failedCount }),
    { status: 200 }
  )
})