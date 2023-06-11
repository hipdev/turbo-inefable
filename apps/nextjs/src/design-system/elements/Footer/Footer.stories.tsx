import { Footer } from './Footer'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ['autodocs'],
  parameters: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const FooterBasic: Story = {
  args: {},
  render: (args) => (
    <div className=' '>
      <div className='main-wrapper'>
        <Footer {...args} />
      </div>
    </div>
  ),
}
