import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('callbacks')
      .insert([{
        name: body.name,
        phone: body.phone,
        best_time: body.best_time,
        status: 'pending',
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
