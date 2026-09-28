import { createClient, type User as SupabaseUser } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qnxyrltqdegybgtyryaq.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export type User = SupabaseUser & {
  displayName?: string | null;
  photoURL?: string | null;
};

function mapUser(user: SupabaseUser | null): User | null {
  if (!user) return null;
  return Object.assign(user, {
    displayName: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Gado Inicial',
    photoURL: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  }) as User;
}

export const auth = supabase.auth;
export const db = supabase;
export const googleProvider = { provider: 'google' };

export function onAuthStateChanged(_auth: typeof auth, callback: (user: User | null) => void) {
  let active = true;
  supabase.auth.getSession().then(({ data }) => {
    if (active) callback(mapUser(data.session?.user ?? null));
  });
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (active) callback(mapUser(session?.user ?? null));
  });
  return () => {
    active = false;
    data.subscription.unsubscribe();
  };
}

export async function signInWithRedirect(_auth: typeof auth, provider: typeof googleProvider) {
  const productionUrl = 'https://sites84.github.io/Guru-t-xico-/';
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider.provider,
    options: { redirectTo: productionUrl },
  });
  if (error) throw error;
}

function authError(error: any): Error {
  const e = new Error(error?.message || 'Falha na autenticação.') as Error & { code?: string };
  const message = String(error?.message || '').toLowerCase();
  if (message.includes('invalid login credentials')) e.code = 'auth/invalid-credential';
  else if (message.includes('not found') || message.includes('user')) e.code = 'auth/user-not-found';
  else if (message.includes('email not confirmed')) e.code = 'auth/email-not-confirmed';
  else if (message.includes('already registered')) e.code = 'auth/email-already-in-use';
  else e.code = error?.code || 'auth/unknown';
  return e;
}

export async function signInWithEmailAndPassword(_auth: typeof auth, email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw authError(error);
}

export async function createUserWithEmailAndPassword(_auth: typeof auth, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: email.split('@')[0] } },
  });
  if (error) throw authError(error);
  if (!data.session) {
    const e = new Error('Conta criada. Confirme o e-mail recebido antes de entrar.') as Error & { code?: string };
    e.code = 'auth/email-not-confirmed';
    throw e;
  }
}

export async function signOut(_auth: typeof auth) {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export type DocumentReference = { collection: string; id: string };
export type DocumentSnapshot = { exists: () => boolean; data: () => any };

export function doc(_db: typeof db, collection: string, id: string): DocumentReference {
  return { collection, id };
}

export async function getDoc(ref: DocumentReference): Promise<DocumentSnapshot> {
  const { data, error } = await supabase.from(ref.collection).select('*').eq('id', ref.id).maybeSingle();
  if (error) throw error;
  return { exists: () => !!data, data: () => data };
}

export async function setDoc(ref: DocumentReference, value: any) {
  const { error } = await supabase.from(ref.collection).upsert(value);
  if (error) throw error;
}

export async function updateDoc(ref: DocumentReference, value: any) {
  const { error } = await supabase.from(ref.collection).update(value).eq('id', ref.id);
  if (error) throw error;
}

export function serverTimestamp() {
  return new Date().toISOString();
}

export function onSnapshot(
  ref: DocumentReference,
  onNext: (snapshot: DocumentSnapshot) => void,
  onError?: (error: unknown) => void
) {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      onNext(await getDoc(ref));
    } catch (error) {
      onError?.(error);
    }
    if (!stopped) window.setTimeout(poll, 1500);
  };
  void poll();
  return () => { stopped = true; };
}

export enum OperationType {
  GET = 'get',
  WRITE = 'write',
  UPDATE = 'update',
  DELETE = 'delete',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Supabase Error:', { error: message, operationType, path });
  throw new Error(message);
}

export async function testFirestoreConnection() {
  return;
}
