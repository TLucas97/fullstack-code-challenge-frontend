interface BaseButtonProps {
  children: React.ReactNode
  focused?: boolean
  disabled?: boolean
  onClick: () => void
}

const BaseButton = ({
  children,
  onClick,
  focused,
  disabled,
}: BaseButtonProps) => {
  return (
    <button
      className={`p-1 border-2 hover:bg-white hover:text-black font-bold ${
        focused ? 'bg-white text-black' : ''
      } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BaseButton
