import useSupabase from './useSupabase'

export type AuthMethodsResponse = {
  success: boolean;
  message: string | Record<string, unknown>;
}

const useAuthMethods = () => {
  const { supabase } = useSupabase();

  const login = async (email: string, password: string): Promise<AuthMethodsResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: data }
  };

  return { login };
}

export default useAuthMethods;