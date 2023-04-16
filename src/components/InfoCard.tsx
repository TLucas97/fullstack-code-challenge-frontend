import BaseInput from './BaseInput'
import BaseButton from './BaseButton'
import UserCard from './UserCard'
import UserScreen from './UserScreen'
import { BsArrowUpCircle } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { RiRefreshLine } from 'react-icons/ri'
import { fetchUsers, fetchUserDetails } from '../services'
import { useState, useRef, useEffect } from 'react'

const InfoCard = () => {
  const [goBackBtnDisabled, setGoBackBtnDisabled] = useState<boolean>(true)
  const [closeBtnDisabled, setCloseBtnDisabled] = useState<boolean>(true)
  const [userData, setUserData] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentUserName, setCurrentUserName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [hasFailed, setHasFailed] = useState<boolean>(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const [hasFailedMessage, setHasFailedMessage] = useState<string>('')
  const [scroll, setScroll] = useState<number>(0)
  const scrollRef = useRef<any>(null)

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const handleSearchResult = async () => {
    try {
      setUserData([])
      setLoading(true)
      setHasFailed(false)
      const user = await fetchUserDetails(searchValue)

      if (!user) {
        setHasFailed(true)
        setHasFailedMessage('User not found')
        return
      }

      setUserData([user?.data])
    } catch (error) {
      console.log(error)
      setHasFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const handleUserDetails = async (username: string) => {
    setCurrentUserName(username)
    setIsDetailsOpen(true)
    setCloseBtnDisabled(false)
  }

  const closeUserDetails = () => {
    setIsDetailsOpen(false)
    setCloseBtnDisabled(true)
    setGoBackBtnDisabled(true)
    setCurrentUserName('')
  }

  const renderUsers = async (page: number) => {
    try {
      setLoading(true)
      const users = await fetchUsers(page)

      if (!users) {
        setHasFailed(true)
        return
      }

      const lastPage = users?.data[users?.data.length - 1]?.last_user_id
      users?.data.pop()
      setUserData(users?.data)
      setCurrentPage(lastPage)
    } catch (error) {
      console.log(error)
      setHasFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const renderMoreUsers = async (page: number) => {
    try {
      setLoadingMore(true)
      const users = await fetchUsers(page)

      if (!users) {
        setHasFailed(true)
        return
      }

      const lastPage = users?.data[users?.data.length - 1]?.last_user_id
      users?.data.pop()
      setUserData([...userData, ...users?.data])
      setCurrentPage(lastPage)
    } catch (error) {
      console.log(error)
      setHasFailed(true)
    } finally {
      setLoadingMore(false)
    }
  }

  const refreshData = () => {
    setUserData([])
    setCurrentPage(1)
    renderUsers(1)
    setHasFailed(false)
    setHasFailedMessage('')
    setSearchValue('')
  }

  const scrollToTopSmoothly = () => {
    const element: any = scrollRef.current
    element?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const detectEndOfScroll = () => {
      const element: any = scrollRef.current
      const scrollTop: any = element?.scrollTop
      const scrollHeight: any = element?.scrollHeight
      const height: any = element?.clientHeight

      if (scroll > 1500) {
        setGoBackBtnDisabled(false)
      } else {
        setGoBackBtnDisabled(true)
      }

      if (scroll < 300) {
        return
      }

      if (scrollTop + height >= scrollHeight) {
        renderMoreUsers(currentPage)
      }
    }

    detectEndOfScroll()
  }, [scroll])

  useEffect(() => {
    renderUsers(currentPage)
  }, [])

  return (
    <div className='w-full small:h-[750px] border-b-2'>
      <div className='w-full h-[130px] small:h-[60px] flex justify-between items-center small:flex-row flex-col py-4 small:px-2 border-b-2'>
        <div
          className={`flex items-center space-x-4 ${
            isDetailsOpen ? 'opacity-30 pointer-events-none' : ''
          }`}
        >
          <BaseInput
            placeholder='Search for a user'
            onChange={handleSearchValue}
            value={searchValue}
            testID='user'
          />
          <BaseButton
            onClick={handleSearchResult}
            disabled={searchValue.length === 0}
            testID='filter'
          >
            Filter
          </BaseButton>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            className={`text-3xl ${
              isDetailsOpen ? 'opacity-30 pointer-events-none' : ''
            }`}
            title='Refresh user data'
            data-testid='refresh-btn'
            onClick={refreshData}
          >
            <RiRefreshLine />
          </button>
          <button
            className={`text-3xl ${
              goBackBtnDisabled || isDetailsOpen
                ? 'opacity-30 pointer-events-none'
                : ''
            }`}
            title='Go back to top of the list'
            data-testid='go-back-btn'
            onClick={scrollToTopSmoothly}
          >
            <BsArrowUpCircle />
          </button>
          <button
            className={`text-3xl ${
              closeBtnDisabled ? 'opacity-30 pointer-events-none' : ''
            }`}
            title='Close current user detail'
            data-testid='close-btn'
            onClick={closeUserDetails}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
      </div>
      {!isDetailsOpen ? (
        <div
          className='w-full h-[450px] small:h-[690px] overflow-scroll overflow-x-hidden flex items-center justify-evenly flex-wrap px-5 py-7'
          ref={scrollRef}
          data-testid='user-list-box'
          onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
        >
          {loading ? (
            <div className='w-full h-full flex items-center justify-center'>
              Loading...
            </div>
          ) : (
            <>
              {hasFailed ? (
                <div className='w-full h-full flex items-center justify-center'>
                  {hasFailedMessage ??
                    'Something went wrong. Please try again later.'}
                </div>
              ) : (
                <>
                  {userData?.map((user: any) => (
                    <div
                      className='mt-5'
                      key={user?.id}
                      data-testid='user-card-wrapper'
                    >
                      <UserCard
                        title={user?.login}
                        image={user?.avatar_url}
                        id={user?.id}
                        onClick={() => handleUserDetails(user.login)}
                      />
                    </div>
                  ))}
                  {loadingMore && (
                    <div className='flex items-center justify-center w-full mt-5'>
                      Loading more data...
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {!loadingMore || !loading && (
            <div className='flex items-center justify-center w-full mt-5'>
              <BaseButton onClick={() => renderMoreUsers(currentPage)}>
                Load more data
              </BaseButton>
            </div>
          )}
        </div>
      ) : (
        <UserScreen username={currentUserName} />
      )}
    </div>
  )
}

export default InfoCard
