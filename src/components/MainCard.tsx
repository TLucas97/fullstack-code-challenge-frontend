import InfoCard from './InfoCard'
import { BsQuestionCircle, BsFillQuestionCircleFill } from 'react-icons/bs'
import { useState } from 'react'

const MainCard = () => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className='w-full h-full small:w-[800px] small:h-[850px] border-2 border-white'>
      <div className='flex justify-between items-center w-full p-2 border-b-2'>
        <span className='font-bold text-2xl'>Github Info App</span>
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          title="Project's Github Repo"
          className='text-3xl'
        >
          {isHover ? <BsFillQuestionCircleFill /> : <BsQuestionCircle />}
        </button>
      </div>
      <InfoCard />
    </div>
  )
}

export default MainCard
