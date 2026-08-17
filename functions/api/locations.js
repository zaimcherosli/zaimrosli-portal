import { LOCATIONS_CONFIG } from '../../locations-config.js';

const SUPABASE_URL = 'https://csrzhidtzqxfbapsenhu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnpoaWR0enF4ZmJhcHNlbmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0OTM3OTYsImV4cCI6MjEwMTA2OTc5Nn0.NnHFURbQTvsdgGbm1d_PC-hkOgQFQIHKTMQaS2n44SU';
const AUTHORIZED_ADMIN_EMAILS = ['huzaimrosli@gmail.com'];

// Helper to verify Supabase JWT token server-side against Supabase Auth API
async function verifyAdminAuth(request) {
  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { authorized: false, status: 401, error: 'Unauthorized: Missing or invalid Authorization Bearer header' };
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return { authorized: false, status: 401, error: 'Unauthorized: Empty token' };
  }

  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY
      }
    });

    if (!userRes.ok) {
      return { authorized: false, status: 401, error: 'Unauthorized: Invalid or expired session token' };
    }

    const userData = await userRes.json();
    const userEmail = (userData.email || '').toLowerCase().trim();

    if (!AUTHORIZED_ADMIN_EMAILS.includes(userEmail)) {
      return { authorized: false, status: 403, error: 'Forbidden: User is not authorized to manage location configurations' };
    }

    return { authorized: true, user: userData };
  } catch (err) {
    return { authorized: false, status: 401, error: 'Unauthorized: Authentication service unavailable' };
  }
}

// Validate location configuration schema integrity before persistence
function validateLocationsPayload(payload) {
  if (!Array.isArray(payload) && typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload format: Expected an array or object of locations' };
  }

  const list = Array.isArray(payload) ? payload : Object.values(payload);

  for (const loc of list) {
    if (!loc || typeof loc !== 'object') {
      return { valid: false, error: 'Invalid location entry format' };
    }
    if (!loc.name || typeof loc.name !== 'string' || !loc.name.trim()) {
      return { valid: false, error: 'Location name is required for all entries' };
    }
    if (!loc.slug || typeof loc.slug !== 'string' || !/^[a-z0-9-]+$/.test(loc.slug)) {
      return { valid: false, error: `Invalid slug '${loc.slug}': Slug must contain only lowercase letters, numbers, and hyphens` };
    }
    if (loc.active !== undefined && typeof loc.active !== 'boolean') {
      return { valid: false, error: `Invalid active field for '${loc.slug}': Must be boolean` };
    }
    if (loc.filterKeywords !== undefined && !Array.isArray(loc.filterKeywords) && typeof loc.filterKeywords !== 'string') {
      return { valid: false, error: `Invalid filterKeywords for '${loc.slug}': Must be array or string` };
    }
  }

  return { valid: true, sanitized: list };
}

// GET /api/locations (Public read for SSR & Client Hydration)
export async function onRequestGet(context) {
  try {
    const workerRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties?t=' + Date.now(), {
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (workerRes.ok) {
      const allData = await workerRes.json();
      if (Array.isArray(allData)) {
        const sysItem = allData.find(item => item && item.id === '__SYS_LOCATIONS_DATA__');
        if (sysItem && Array.isArray(sysItem.locations) && sysItem.locations.length > 0) {
          return new Response(JSON.stringify(sysItem.locations), {
            status: 200,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }
      }
    }
  } catch (err) {}

  // Fallback to static seed
  const fallbackList = Object.values(LOCATIONS_CONFIG);
  return new Response(JSON.stringify(fallbackList), {
    status: 200,
    headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

// POST /api/locations (Secure Server-side Authenticated Write)
export async function onRequestPost(context) {
  const authCheck = await verifyAdminAuth(context.request);
  if (!authCheck.authorized) {
    return new Response(JSON.stringify({ error: authCheck.error }), {
      status: authCheck.status,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  let body;
  try {
    body = await context.request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const validation = validateLocationsPayload(body);
  if (!validation.valid) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    // 1. Fetch current live inventory from Worker KV
    const workerRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties?t=' + Date.now(), {
      headers: { 'Cache-Control': 'no-cache' }
    });

    let propertiesList = [];
    if (workerRes.ok) {
      propertiesList = await workerRes.json();
    }

    if (!Array.isArray(propertiesList)) {
      propertiesList = [];
    }

    // 2. Upsert __SYS_LOCATIONS_DATA__ record
    const sysIndex = propertiesList.findIndex(item => item && item.id === '__SYS_LOCATIONS_DATA__');
    const sysRecord = {
      id: '__SYS_LOCATIONS_DATA__',
      hidden: true,
      title: 'SYSTEM LOCATION CONFIG REGISTRY',
      updatedAt: Date.now(),
      locations: validation.sanitized
    };

    if (sysIndex >= 0) {
      propertiesList[sysIndex] = sysRecord;
    } else {
      propertiesList.push(sysRecord);
    }

    // 3. Persist atomically to Cloudflare KV / R2
    const saveRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertiesList)
    });

    if (!saveRes.ok) {
      throw new Error(`Worker persistence returned HTTP status ${saveRes.status}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Location configurations persisted successfully to Cloudflare KV',
      count: validation.sanitized.length
    }), {
      status: 200,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Failed to write location configurations to Cloudflare KV: ' + err.message
    }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

// OPTIONS handler for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
