const API_URL = 'https://api.clearproof.co.uk/api'

let getToken: (() => Promise<string | null>) | null = null

export const setAuthGetter = (getter: () => Promise<string | null>) => {
  getToken = getter
}

async function request(endpoint: string, options: RequestInit = {}, requiresAuth = true) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>
  }

  if (requiresAuth && getToken) {
    const token = await getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export const api = {
  modules: {
    list: () => request('/modules'),
    get: (id: string) => request(`/modules/${id}`, {}, false),
    create: (data: Record<string, unknown>) => request('/modules', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id: string, data: Record<string, unknown>) => request(`/modules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    delete: (id: string) => request(`/modules/${id}`, {
      method: 'DELETE'
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
    }, false)
  },
  process: {
    transform: (moduleId: string) => request(`/process/transform/${moduleId}`, {
      method: 'POST'
    }),
    translate: (content: string, language: string) => request('/process/translate', {
      method: 'POST',
      body: JSON.stringify({ content, language })
    }, false),
    questions: (content: string, language: string) => request('/process/questions', {
      method: 'POST',
      body: JSON.stringify({ content, language })
    }, false)
  },
  billing: {
    getSubscription: () => request('/billing/subscription'),
    createCheckout: (plan: string, email: string) => request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan, email })
    }),
    createPortal: () => request('/billing/portal', {
      method: 'POST'
    })
  }
}
