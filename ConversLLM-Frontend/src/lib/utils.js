import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// Simple JWT helper for backend auth
export async function ensureJwt(baseUrl = 'http://localhost:3001') {
  if (typeof window === 'undefined') return null;
  let jwt = localStorage.getItem('jwt');
  if (!jwt) {
    const res = await fetch(`${baseUrl}/signjwt`, { method: 'POST' });
    if (!res.ok) throw new Error(`Failed to mint JWT: ${res.status}`);
    const data = await res.json();
    jwt = data.jwtToken;
    localStorage.setItem('jwt', jwt);
  }
  return jwt;
}

export async function authorizedFetch(input, init = {}, baseUrl = 'http://localhost:3001') {
  const jwt = await ensureJwt(baseUrl);
  const headers = new Headers(init.headers || {});
  if (jwt) headers.set('Authorization', `Bearer ${jwt}`);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return fetch(input, { ...init, headers });
}