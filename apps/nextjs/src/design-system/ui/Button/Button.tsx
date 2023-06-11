import { cva, VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const button = cva('rounded-2sm font-medium', {
  variants: {
    intent: {
      primary: [
        'text-white bg-gradient-to-r from-primary to-primary/70 hover:to-primary/90 transition-colors',
      ],
      secondary: [
        'text-black/70 bg-white border border-gray-200 shadow-sm hover:border-gray-300',
      ],
    },
    size: {
      small: ['text-sm px-2 py-1'],
      medium: ['text-base px-4 py-2'],
      large: ['text-xl px-7 py-3 font-bold'],
    },
    family: {
      display: ['font-display'],
      sans: ['font-sans'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    family: 'sans',
  },
})

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof button>

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  family,
  size,
  ...props
}) => {
  const classNames = twMerge(button({ intent, size, family }), className)

  return <button className={classNames} {...props} />
}
