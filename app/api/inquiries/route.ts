import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        name: body.name,
        phone: body.phone,
        email: body.email,
        city: body.city,
        tenth_percentage: body.tenth_percentage,
        twelfth_percentage: body.twelfth_percentage,
        board: body.board,
        stream: body.stream,
        primary_interest: body.primary_interest,
        secondary_interest: body.secondary_interest,
        budget_range: body.budget_range,
        preferred_colleges: body.preferred_colleges,
        location_preference: body.location_preference,
        hostel_required: body.hostel_required,
        message: body.message,
        status: 'new',
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
