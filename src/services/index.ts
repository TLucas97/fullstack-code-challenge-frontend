import api from '../api'

export const fetchUsers = async (page: number) => {
  try {
    const data = await api.get(`/users?since=${page}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserDetails = async (username: string) => {
  try {
    const data = await api.get(`/users/${username}/details`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserRepos = async (username: string) => {
  try {
    const data = await api.get(`/users/${username}/repos`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchAccessToken = async (code: string) => {
  try {
    const data = await api.post(`/users/access_token?code=${code}`)
    console.log('🚀 ~ fetchAccessToken ~ data:', data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserAuthDetails = async (access_token: string) => {
  try {
    const data = await api.get(
      `/users/auth_details?access_token=${access_token}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const handleAccessToken = async () => {
  const accessTokenFromLocalStorage = localStorage.getItem('access_token')
  const code = new URLSearchParams(window.location.search).get('code')

  if (accessTokenFromLocalStorage) {
    const data = await fetchUserAuthDetails(accessTokenFromLocalStorage)
    return data
  }

  if (code) {
    const response: any = await fetchAccessToken(code)
    const access_token = response?.data.split('=')
    localStorage.setItem('access_token', access_token[1])

    if (access_token[0] === 'error' && accessTokenFromLocalStorage) {
      const data = await fetchUserAuthDetails(accessTokenFromLocalStorage)

      return data
    }

    if (access_token[0] === 'error') {
      localStorage.removeItem('access_token')
      return false
    }

    const data = await fetchUserAuthDetails(access_token[1])
    return data
  }
}

export const createNewRepository = async (data: object) => {
  const accessTokenFromLocalStorage = localStorage.getItem('access_token')

  try {
    const response = await api.post(
      `/users/create_repo?access_token=${accessTokenFromLocalStorage}`,
      data
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchBestRepositories = async () => {
  try {
    const data = await api.get(`/top30repos`)
    return data
  } catch (error) {
    console.log(error)
  }
}