import { Header } from './Header'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  parameters: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const HeaderWhite: Story = {
  args: {},
  render: (args) => (
    <div className=' '>
      <div className='main-wrapper'>
        <Header {...args} />
      </div>
    </div>
  ),
}
