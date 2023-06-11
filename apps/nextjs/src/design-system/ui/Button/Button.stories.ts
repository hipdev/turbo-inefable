import { Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const ButtonPrimarySmall: Story = {
  args: {
    intent: 'primary',
    size: 'small',
    children: 'This is an h1',
  },
}
export const ButtonPrimaryMedium: Story = {
  args: {
    intent: 'primary',
    size: 'medium',
    children: 'This is an h1',
  },
}
export const ButtonPrimaryLarge: Story = {
  args: {
    intent: 'primary',
    size: 'large',
    children: 'This is an h1',
  },
}
