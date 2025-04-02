
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'


// Load environment variables
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Not needed for React Native
  },
});

//User Sign-Up
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// User Sign-In
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Get Current Logged-in User
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// User Sign-Out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
console.log("Supabase functions loaded:", { signUp, signIn, getCurrentUser, signOut });
