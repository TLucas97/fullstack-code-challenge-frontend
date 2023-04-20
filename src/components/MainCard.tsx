import InfoCard from './InfoCard'
import BaseButton from './BaseButton'
import BaseInput from './BaseInput'
import Toast from './Toast'
import Modal from './Modal'
import { BsQuestionCircle, BsFillQuestionCircleFill } from 'react-icons/bs'
import { openInNewTab, getGithubUsercode } from '../services/helpers'
import { handleAccessToken, createNewRepository } from '../services'
import { useState, useEffect } from 'react'

const MainCard = () => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>({})
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [isToast, setIsToast] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [repoName, setRepoName] = useState<string>('')
  const [repoDescription, setRepoDescription] = useState<string>('')

  const handleRepoName = (value: string) => {
    setRepoName(value)
  }

  const handleRepoDescription = (value: string) => {
    setRepoDescription(value)
  }

  const handleLoginFromGithub = async () => {
    try {
      const data = await handleAccessToken()
      if (!data) return
      setIsLoggedIn(true)
      setToastMessage('You are logged in!')
      setIsToast(true)
      setUserData(data?.data)

      setTimeout(() => {
        setIsToast(false)
      }, 3000)
    } catch (error) {
      console.log('🚀 ~ handleLoginFromGithub ~ error', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setIsLoggedIn(false)
    setToastMessage('You are logged out!')
    setIsToast(true)
    setTimeout(() => {
      setIsToast(false)
    }, 3000)
  }

  const handleRepositoryCreation = async () => {
    try {
      if (!repoName || !repoDescription) {
        setToastMessage('Please fill in all the fields!')
        setIsToast(true)
        setTimeout(() => {
          setIsToast(false)
        }, 3000)
        return
      }

      setLoading(true)

      const data = await createNewRepository({
        name: repoName,
        description: repoDescription,
        private: !isPublic,
      })

      if (!data) {
        setToastMessage('Something went wrong!')
        setIsToast(true)
        setTimeout(() => {
          setIsToast(false)
        }, 3000)
        return
      }

      setToastMessage('Repository created!')
      setIsToast(true)
      setIsModal(false)
      setRepoName('')
      setRepoDescription('')
      setIsPublic(true)
      setLoading(false)
      setTimeout(() => {
        setIsToast(false)
      }, 3000)
    } catch (error) {
      console.log('🚀 ~ handleRepositoryCreation ~ error', error)
    }
  }

  useEffect(() => {
    handleLoginFromGithub()
  }, [])

  return (
    <>
      <Modal isOn={isModal} size='medium' disabled={loading}>
        <div className='m-3 flex justify-center items-center flex-col'>
          <span className='text-2xl font-bold'>Creating a new repository</span>
          <div className='mt-10 flex justify-center items-center flex-col space-y-6'>
            <div>
              <BaseInput
                value={repoName}
                onChange={handleRepoName}
                placeholder='Name'
              />
            </div>
            <div>
              <BaseInput
                value={repoDescription}
                onChange={handleRepoDescription}
                placeholder='Description'
              />
            </div>
          </div>
          <div className='flex mt-7 space-x-2'>
            <BaseButton focused={isPublic} onClick={() => setIsPublic(true)}>
              Public
            </BaseButton>
            <BaseButton focused={!isPublic} onClick={() => setIsPublic(false)}>
              Private
            </BaseButton>
          </div>
          <div className='flex mt-7 space-x-4'>
            <BaseButton onClick={() => setIsModal(false)}>Cancel</BaseButton>
            <BaseButton onClick={handleRepositoryCreation}>Create</BaseButton>
          </div>
        </div>
      </Modal>
      {isToast && <Toast message={toastMessage} />}
      <div className='w-full h-full small:w-[800px] small:h-[850px] small:border-2 small:border-white'>
        <div className='flex justify-between items-center w-full p-2 border-b-2'>
          <span className='font-bold text-2xl'>Github Info App</span>
          <div className='flex items-center space-x-3'>
            {!isLoggedIn && (
              <BaseButton onClick={getGithubUsercode}>Login</BaseButton>
            )}
            {isLoggedIn && (
              <>
                <span>{userData?.login}</span>
                <BaseButton onClick={handleLogout}>Logout</BaseButton>
                <BaseButton onClick={() => setIsModal(true)}>
                  New repo
                </BaseButton>
              </>
            )}
            {!isLoggedIn && (
              <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                title='Click here to open my Github profile'
                className='text-3xl'
                onClick={() => openInNewTab('https://github.com/TLucas97')}
              >
                {isHover ? <BsFillQuestionCircleFill /> : <BsQuestionCircle />}
              </button>
            )}
            {isLoggedIn && (
              <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                title='Click here to open your profile'
                className='text-3xl'
                onClick={() => openInNewTab(userData?.html_url)}
              >
                <img
                  src={
                    userData?.avatar_url ??
                    'https://ionicframework.com/docs/img/demos/avatar.svg'
                  }
                  alt='avatar'
                  className='w-[50px] rounded-full'
                />
              </button>
            )}
          </div>
        </div>
        <InfoCard />
      </div>
    </>
  )
}

export default MainCard
