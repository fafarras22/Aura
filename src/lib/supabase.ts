
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aahbohhijheheqkvpiux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGJvaGhpamhlaGVxa3ZwaXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTY2NzcsImV4cCI6MjA1ODk5MjY3N30.GYyQua5WKTgEOJRFB99G13WfiQucQ5Q3ufxghTVRy2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
