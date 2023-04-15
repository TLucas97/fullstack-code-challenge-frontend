import questionMarkUser from '../../public/images/question-mark-user.jpg'
import type { UserCardProps } from '../interfaces'

const UserCard = ({ title, image, id, onClick }: UserCardProps) => {
  return (
    <button
      className='w-[200px] h-[220px] border-2 font-bold hover:scale-[1.05] transition ease-in-out'
      onClick={onClick}
    >
      <div className='border-b-2 w-full h-[50px] flex items-center justify-center'>
        {title ?? 'Username'}
      </div>
      <div className='border-b-2 w-full h-[110px]'>
        <img
          src={image ?? questionMarkUser}
          alt='user-picture'
          className='w-full h-full object-fill'
        />
      </div>
      <div className='w-full h-[60px] flex items-center justify-center'>
        ID: <span className='ml-2 underline'>{id ?? '9999'}</span>
      </div>
    </button>
  )
}

export default UserCard
