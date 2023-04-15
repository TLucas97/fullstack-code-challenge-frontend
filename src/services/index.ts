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

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
