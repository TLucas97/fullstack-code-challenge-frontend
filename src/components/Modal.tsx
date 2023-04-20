import React from 'react'

interface ModalProps {
  children: React.ReactNode
  size?: 'small' | 'medium'
  isOn: boolean
  loading?: boolean
  disabled?: boolean
}

const Modal = ({ children, size = 'small', isOn, disabled }: ModalProps) => {
  return (
    <>
      {isOn && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
          <div
            className={`bg-dark text-white rounded-[16px] w-[30%] card:w-[660px] border-2 z-50 ${
              size === 'small' ? 'card:h-[146px]' : 'h-[334px]'
            } border border-sand animate-zoomIn ${
              disabled && 'opacity-50 pointer-events-none'
            }'}`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
