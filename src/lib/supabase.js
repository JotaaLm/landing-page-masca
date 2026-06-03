import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if ((!supabaseUrl || !supabaseAnonKey) && import.meta.env.DEV) {
  console.warn(
    '[Mascate] Variaveis publicas de conexao nao configuradas. O formulario ficara indisponivel.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
