import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

  if (error) return new Response(JSON.stringify({ error }), { status: 500 })

  for (const letter of letters) {
    // Kirim email lewat Resend (atau provider lain, ganti sesuai pilihanmu)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ruang Perempuan <surat@ruangperempuan.com>',
        to: letter.email,
        subject: `Surat untuk dirimu: ${letter.title}`,
        text: letter.body,
      }),
    })

    await supabase
      .from('future_letters')
      .update({ sent: true })
      .eq('id', letter.id)
  }

  return new Response(JSON.stringify({ sent: letters.length }), { status: 200 })
})