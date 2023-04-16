import type { UserScreenProps } from '../interfaces'
import { fetchUserDetails, formatDate } from '../services'
import { FaUserFriends, FaRunning } from 'react-icons/fa'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'

const ProfileCard = ({ username }: UserScreenProps) => {
  const [user, setUser] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const renderUserDetails = async () => {
    try {
      setLoading(true)
      const user = await fetchUserDetails(username)
      console.log('🚀 ~ renderUserDetails ~ user:', user)

      if (!user) {
        return
      }

      setUser(user?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    renderUserDetails()
  }, [])

  return (
    <div
      className='w-full h-[500px] flex items-center justify-center'
      data-testid='profile-card-wrapper'
    >
      {loading ? (
        <div className='flex items-center justify-center'>Loading user...</div>
      ) : (
        <div className='w-full mt-7 flex items-center justify-center flex-col'>
          <img
            src={user?.avatar_url}
            alt='avatar'
            className='w-[150px] rounded-full'
          />
          <div className='mt-3 flex flex-col items-center justify-center'>
            <span className='text-xl'>{user?.name}</span>
            <span>{user?.login}</span>
            <span className='font-thin text-sm mt-2'>{user?.bio}</span>
          </div>
          <div className='flex items-center justify-center space-x-4 mt-2 flex-col smaller:flex-row'>
            <div className='flex items-center text-sm space-x-2'>
              <FaUserFriends />
              <span>{user?.followers}</span>
              <span className='font-thin'>Followers</span>
            </div>
            <span>-</span>
            <div className='flex items-center text-sm space-x-2'>
              <FaRunning />
              <span>{user?.following}</span>
              <span className='font-thin'>Following</span>
            </div>
            <span>-</span>
            <div className='flex items-center text-sm space-x-2'>
              <RiGitRepositoryLine />
              <span>{user?.public_repos}</span>
              <span className='font-thin'>Repos</span>
            </div>
          </div>
          <div className='flex items-center justify-center mt-5'>
            <p>
              Signed in at:{' '}
              <span className='underline font-bold'>
                {formatDate(user?.created_at)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileCard
