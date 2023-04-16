import BaseButton from './BaseButton'
import Toast from './Toast'
import type { UserScreenProps } from '../interfaces'
import { fetchUserRepos, openInNewTab } from '../services'
import { AiOutlineStar } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { useEffect, useState } from 'react'

const ReposCard = ({ username }: UserScreenProps) => {
  const [repo, setRepo] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<boolean>(false)

  const renderUserRepos = async () => {
    try {
      setLoading(true)
      const repo = await fetchUserRepos(username)

      if (!repo) {
        return
      }

      setRepo(repo?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast(true)

      setTimeout(() => {
        setToast(false)
      }, 3000)
    } catch (err) {
      console.error('Error copying text: ', err)
    }
  }

  useEffect(() => {
    renderUserRepos()
  }, [])

  return (
    <>
      <div className='w-full flex items-center justify-center flex-col space-y-4 mt-4' data-testid='repos-card-wrapper'>
        {loading ? (
          <div className='w-full h-[500px] flex items-center justify-center'>
            Loading repos...
          </div>
        ) : (
          <>
            {repo?.map((repo: any) => (
              <div
                className='w-[97%] h-[180px] small:h-[120px] border-2 flex items-center justify-between small:px-3 py-3 small:flex-row flex-col'
                key={repo?.id}
              >
                <div className='flex justify-center small:justify-start items-center small:items-start flex-col'>
                  <span className='font-bold text-xl'>{repo?.name}</span>
                  <div className='flex items-center space-x-3'>
                    <span className='text-sm font-thin'>{repo?.language}</span>
                    <span>-</span>
                    <span className='text-sm font-thin'>
                      {repo?.visibility}
                    </span>
                    <span>-</span>
                    <div className='flex space-x-1 items-center'>
                      <AiOutlineStar />
                      <span className='text-sm font-thin'>
                        {repo?.stargazers_count}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex space-x-3'>
                  <BaseButton onClick={() => copyToClipboard(repo?.ssh_url)}>
                    <div className='flex space-x-2 items-center'>
                      <BiCopy />
                      <span>SSH URL</span>
                    </div>
                  </BaseButton>
                  <BaseButton onClick={() => copyToClipboard(repo?.git_url)}>
                    <div className='flex space-x-2 items-center'>
                      <BiCopy />
                      <span>GIT URL</span>
                    </div>
                  </BaseButton>
                  <BaseButton onClick={() => openInNewTab(repo?.html_url)}>
                    Details
                  </BaseButton>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {toast && <Toast message='URL Copied to clipboard!' />}
    </>
  )
}

export default ReposCard
