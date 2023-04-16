import InfoCard from './InfoCard'
import { BsQuestionCircle, BsFillQuestionCircleFill } from 'react-icons/bs'
import { openInNewTab } from '../services'
import { useState } from 'react'

const MainCard = () => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className='w-full h-full small:w-[800px] small:h-[850px] small:border-2 small:border-white'>
      <div className='flex justify-between items-center w-full p-2 border-b-2'>
        <span className='font-bold text-2xl'>Github Info App</span>
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          title="Click here to open my Github profile"
          className='text-3xl'
          onClick={() => openInNewTab('https://github.com/TLucas97')}
        >
          {isHover ? <BsFillQuestionCircleFill /> : <BsQuestionCircle />}
        </button>
      </div>
      <InfoCard />
    </div>
  )
}

export default MainCard
