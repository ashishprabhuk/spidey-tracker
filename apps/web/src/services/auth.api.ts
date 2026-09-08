import { supabase } from "../lib/supabase";

export async function ensureAnonymousUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return session.user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("Failed to create anonymous user");
  }

  return data.user;
}