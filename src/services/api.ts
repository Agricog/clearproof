const API_URL = 'https://clearproof-api-production.up.railway.app/api'

async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export const api = {
  modules: {
    list: () => request('/modules'),
    get: (id: string) => request(`/modules/${id}`),
    create: (data: Record<string, unknown>) => request('/modules', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id: string, data: Record<string, unknown>) => request(`/modules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  },
  workers: {
    list: () => request('/workers'),
    get: (id: string) => request(`/workers/${id}`),
    create: (data: Record<string, unknown>) => request('/workers', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  verifications: {
    list: () => request('/verifications'),
    get: (id: string) => request(`/verifications/${id}`),
    create: (data: Record<string, unknown>) => request('/verifications', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  process: {
    transform: (moduleId: string) => request(`/process/transform/${moduleId}`, {
      method: 'POST'
    }),
    translate: (content: string, language: string) => request('/process/translate', {
      method: 'POST',
      body: JSON.stringify({ content, language })
    }),
    questions: (content: string, language: string) => request('/process/questions', {
      method: 'POST',
      body: JSON.stringify({ content, language })
    })
  }
}
