import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('assessments')
      .insert([{
        answers: body.answers,
        recommended_stream: body.recommended_stream,
        recommended_courses: body.recommended_courses,
        suggested_colleges: body.suggested_colleges,
        salary_insights: body.salary_insights,
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
