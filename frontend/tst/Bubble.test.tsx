import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Bubble from '../src/components/conv/Bubble'

describe('Bubble Component', () => {
  it('renders name and dialogue correctly', () => {
    const testProps = {
      name: 'Test Name',
      imgURL: 'test-image.jpg',
      dialogue: 'Test dialogue content'
    }

    const { container } = render(<Bubble {...testProps} />)

    // Check if name is rendered
    expect(screen.getByText(testProps.name)).toBeInTheDocument()
    
    // Check if dialogue is rendered
    expect(screen.getByText(testProps.dialogue)).toBeInTheDocument()
    
    // Check if avatar container is present with correct classes
    const avatarContainer = container.querySelector('.relative.flex.shrink-0.overflow-hidden.rounded-full')
    expect(avatarContainer).toBeInTheDocument()
  })
}) 