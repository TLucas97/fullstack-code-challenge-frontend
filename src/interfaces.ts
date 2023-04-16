export interface UserScreenProps {
  username: string
}

export interface BaseButtonProps {
  children: React.ReactNode
  focused?: boolean
  disabled?: boolean
  testID?: string
  onClick: () => void
}

export interface BaseInputProps {
  placeholder: string
  value: string
  testID?: string
  onChange: (value: string) => void
}

export interface UserCardProps {
  title: string
  image: string
  id: number
  onClick: () => void
}
