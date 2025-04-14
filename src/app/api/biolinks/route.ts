import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('User authentication error:', userError);
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title')?.toString();
    const username = formData.get('username')?.toString();
    const description = formData.get('description')?.toString();
    const niche = formData.get('niche')?.toString();
    const template = 'minimal'; // Default template for now
    const userId = user.id;
    
    if (!title || !username || !description || !niche || !template) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }    
    const { data, error } = await supabase
      .from('biolinks')
      .insert([{ user_id: userId, title, username, description, niche, template }])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create bio link' }, { status: 500 });
    }    
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}