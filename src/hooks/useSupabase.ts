import { createClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

const useSupabase = () => {

  const supabase = useMemo(() => {
    const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

    return client
  }, [])

  return { supabase }
}

export default useSupabase;