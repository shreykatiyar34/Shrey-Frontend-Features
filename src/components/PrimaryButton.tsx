type PrimaryButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export function PrimaryButton({ label, onClick, disabled, type = 'button' }: PrimaryButtonProps) {
  return (
    <button className="primary-button" type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}

