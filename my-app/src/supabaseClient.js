import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zqqzpfxqiwfbsfvfuqcu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxcXpwZnhxaXdmYnNmdmZ1cWN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODQ0OTkyMCwiZXhwIjoyMDQ0MDI1OTIwfQ.jX29D3E4QuLo52R1UvARwH0fLP2xRD7464YrQYZI-vA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
