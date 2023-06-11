import { cva, VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const title = cva('', {
  variants: {
    intent: {
      primary: ['text-black'],
      secondary: ['text-white'],
    },
    size: {
      small: ['text-sm'],
      medium: ['text-base'],
      large: ['text-lg font-bold'],
      xlarge: ['text-lg md:text-xl font-bold'],
      xxlarge: ['text-xl md:text-2xl font-light'],
      xxxlarge: ['text-2xl md:text-3xl font-light'],
      xxxxlarge: ['text-3xl md:text-4xl font-medium'],
      huge: [
        'lg:text-6xl sm:text-5xl text-3xl font-extrabold leading-10 md:leading-normal',
      ],
      subtitle: ['text-sm font-bold tracking-threePx uppercase'],
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

interface TitleProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof title> {
  as?: HeadingLevel
}

export const Title: React.FC<TitleProps> = ({
  as: Component = 'h2',
  className,
  intent,
  family,
  size,
  ...props
}) => {
  const classNames = twMerge(title({ intent, size, family }), className)

  return <Component className={classNames} {...props} />
}
