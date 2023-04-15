export interface UserScreenProps {
  username: string
}

export interface BaseButtonProps {
  children: React.ReactNode
  focused?: boolean
  disabled?: boolean
  onClick: () => void
}

export interface BaseInputProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export interface UserCardProps {
  title: string
  image: string
  id: number
  onClick: () => void
}
