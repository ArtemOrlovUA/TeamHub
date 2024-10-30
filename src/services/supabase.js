import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qpwpyyjgjxspyivcnljp.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwd3B5eWpnanhzcHlpdmNubGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTI2OTUsImV4cCI6MjA0NTg2ODY5NX0.gNUqsLPW84u7-rJMDKW_iNdt4eaFmH4KHin3ZCxTOVs`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
