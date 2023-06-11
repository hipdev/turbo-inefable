import React from 'react'

import '../styles/globals.css'

import type { Preview } from '@storybook/react'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={clsx(inter.variable, 'font-sans')}>{Story()}</main>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
