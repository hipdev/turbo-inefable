import { Feature } from './Feature'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Feature> = {
  component: Feature,
  tags: ['autodocs'],
  parameters: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Features: Story = {
  args: {},
  render: (args) => (
    <div className='main-wrapper'>
      <div className='flex flex-col gap-12 py-10 md:flex-row md:gap-10'>
        <Feature {...args} />
        <Feature {...args} />
        <Feature {...args} />
      </div>
    </div>
  ),
}
