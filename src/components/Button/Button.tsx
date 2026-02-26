type ButtonVariant = "primary" | "secondary" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonParams {
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
  children?: string,
  id: string,
}

export default function Button({
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  children = "Text",
  id,
}: ButtonParams) {
  return (
	<button
	  type={type}
	  disabled={disabled}
	  onClick={onClick}
	  className={`btn btn-${variant} btn-${size} ${className}`}
    id={id}
	>
	  {children}
	</button>
  )
}