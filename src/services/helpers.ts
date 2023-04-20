const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export const getGithubUsercode = () => {
  window.location.assign(
    `http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
  )
}

export const formatDate = (dateString: any) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
