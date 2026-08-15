const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`)
  }
  return res.json()
}

export function fetchAnnouncements() {
  return request('/api/announcements')
}

export function fetchNews() {
  return request('/api/news')
}

export function fetchNewsItem(slug) {
  return request(`/api/news/${slug}`)
}

export function fetchMembers() {
  return request('/api/members')
}

export function fetchImportantLinks() {
  return request('/api/important-links')
}
