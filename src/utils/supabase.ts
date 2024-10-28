import { createClient } from '@supabase/supabase-js';

const supabaseUrl:string|undefined|any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey:string|undefined|any = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);