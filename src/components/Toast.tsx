interface ToastProps {
  message: string
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className='absolute top-0 left-0 mt-3 ml-3 border-2 p-1 z-50 bg-dark'>
      <span>{message}</span>
    </div>
  )
}

export default Toast
