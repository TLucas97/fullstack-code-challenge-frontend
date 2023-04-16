import BaseButton from './BaseButton'
import ProfileCard from './ProfileCard'
import ReposCard from './ReposCard'
import type { UserScreenProps } from '../interfaces'
import { useState } from 'react'

const UserScreen = ({ username }: UserScreenProps) => {
  const [isOnProfile, setIsOnProfile] = useState<boolean>(true)

  return (
    <div className='w-full h-[550px] small:h-[674px] overflow-scroll overflow-x-hidden'>
      <div className='w-full flex items-center justify-center space-x-4 mt-4'>
        <BaseButton
          onClick={() => setIsOnProfile(true)}
          focused={isOnProfile}
          testID='profile'
        >
          Profile
        </BaseButton>
        <BaseButton
          onClick={() => setIsOnProfile(false)}
          focused={!isOnProfile}
          testID='repos'
        >
          Repositories
        </BaseButton>
      </div>
      {isOnProfile ? (
        <ProfileCard username={username} />
      ) : (
        <ReposCard username={username} />
      )}
    </div>
  )
}

export default UserScreen
