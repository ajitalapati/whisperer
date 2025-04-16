import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../src/components/navbar/NavBar'
import { ThemeContext } from '../src/App'

describe('NavBar Component', () => {
  it('renders navigation links and theme toggle', () => {
    const mockThemeContext = {
      isDarkMode: false,
      toggleDarkMode: () => {}
    }

    render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContext}>
          <NavBar />
        </ThemeContext.Provider>
      </BrowserRouter>
    )

    // Check if main navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Options')).toBeInTheDocument()
    
    // Check if logo text is present
    expect(screen.getByText('Whisperer')).toBeInTheDocument()
    
    // Check if theme toggle button is present
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })
}) 