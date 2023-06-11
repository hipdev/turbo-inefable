import { Title } from './Title'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const TitleH1: Story = {
  args: {
    as: 'h1',
    intent: 'primary',
    size: 'xxlarge',
    children: 'This is an h1',
  },
}

export const TitleH2: Story = {
  args: {
    as: 'h2',
    intent: 'primary',
    size: 'xlarge',
    children: 'This is an h2',
  },
}

export const TitleH3: Story = {
  args: {
    as: 'h3',
    intent: 'primary',
    size: 'large',
    children: 'This is an h3',
  },
}

export const TitleH4: Story = {
  args: {
    as: 'h4',
    intent: 'primary',
    size: 'medium',
    children: 'This is an h4',
  },
}

export const TitleHuge: Story = {
  args: {
    as: 'h1',
    intent: 'primary',
    size: 'huge',
    family: 'display',
    children: 'World-class psychiatry.',
  },
}

// create the same for the rest of the heading levels
