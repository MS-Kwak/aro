import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { store_qr, phone_hash, phone_last4 } = body;

    if (!store_qr || !phone_hash || !phone_last4) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip');

    const supabase = await createClient();
    const { data, error } = await supabase.rpc('record_visit', {
      p_store_qr: store_qr,
      p_phone_hash: phone_hash,
      p_phone_last4: phone_last4,
      p_ip: ip,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
