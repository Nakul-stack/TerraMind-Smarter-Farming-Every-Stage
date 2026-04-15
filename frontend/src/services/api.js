/**
 * TerraMind — Frontend API service
 */
import { API_BASE_URL } from '../config/runtimeConfig';
import stateDistrictMapping from '../data/state_district_mapping.json';

const API_BASE = API_BASE_URL;

export async function fetchStates() {
  try {
    const res = await fetch(`${API_BASE}/api/states`);
    const data = await res.json();
    const states = data.states || [];
    if (states.length > 0) return states;
  } catch {
    // Fall back to bundled map when backend state map is unavailable.
  }
  return Object.keys(stateDistrictMapping).sort();
}

export async function fetchDistricts(state) {
  try {
    const res = await fetch(`${API_BASE}/api/districts/${encodeURIComponent(state)}`);
    const data = await res.json();
    const districts = data.districts || [];
    if (districts.length > 0) return districts;
  } catch {
    // Fall back to bundled map when backend district map is unavailable.
  }
  return stateDistrictMapping[state] || [];
}

export async function predict(payload) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getSyncStatus() {
  const res = await fetch(`${API_BASE}/sync/status`);
  return res.json();
}

export async function getMetadata() {
  const res = await fetch(`${API_BASE}/metadata`);
  return res.json();
}

export async function getBenchmarkResults() {
  const res = await fetch(`${API_BASE}/benchmark/results`);
  return res.json();
}

export async function triggerTrainAll() {
  const res = await fetch(`${API_BASE}/train/all`, { method: 'POST' });
  return res.json();
}

export async function triggerBuildEdge() {
  const res = await fetch(`${API_BASE}/benchmark/edge-assets`, { method: 'POST' });
  return res.json();
}

export async function triggerBenchmark() {
  const res = await fetch(`${API_BASE}/benchmark/all`, { method: 'POST' });
  return res.json();
}
