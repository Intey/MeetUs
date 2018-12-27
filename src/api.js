const HOST = 'localhost'
const PORT = '800'
const BASE = `http://${HOST}:${PORT}/api`

export const EVENTS_URL = `${BASE}/events/`
export const USERS_URL = `${BASE}/users/`
export const AUTH_URL = `${BASE}/auth/`
export const TRANSACTION_URL = `${BASE}/transactions/`
export const GROUPS_URL = `${BASE}/groups/`

async function fetchErrorMiddleware(response) {
  let res
  // check that server awailable
  try {
    res = await response
  }
  catch(error) {
    throw error
  }

  if (res && res.ok) {
    return res.json()
  } else {
    // await and throw error object/text, not promise
    let error
    if (res.status === 500)
      error = await res.text()
    else
      error = await res.json()
    throw error
  }
}

function request(URL, method='GET', payload) {
  let options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
  if (method !== 'GET' && payload )
    options.body = JSON.stringify(payload)
  
  return fetch(URL, options);
  // return fetchErrorMiddleware(fetch(URL, options))
}

export function get(URL) {
  return request(URL)
}

export function post(URL, payload) {
  return request(URL, 'POST', payload)
}

export function patch(URL, payload) {
  return request(URL, 'PATCH', payload)
}
