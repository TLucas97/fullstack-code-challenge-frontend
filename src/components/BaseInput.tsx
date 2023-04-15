import { MdOutlineContentPasteSearch } from 'react-icons/md'

interface BaseInputProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const BaseInput = ({ placeholder, value, onChange }: BaseInputProps) => {
  return (
    <div className=' w-full flex justify-between py-1 space-x-2 border-b-2'>
      <span className='text-2xl'>
        <MdOutlineContentPasteSearch />
      </span>
      <input
        type='text'
        className='bg-transparent focus:outline-none w-full '
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default BaseInput
