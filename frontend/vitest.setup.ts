import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Polyfill for crypto.getRandomValues
if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: (buffer: ArrayBufferView | null) => {
      if (!buffer) return buffer;
      const typedArray = new Uint8Array(buffer.buffer);
      for (let i = 0; i < typedArray.length; i++) {
        typedArray[i] = Math.floor(Math.random() * 256);
      }
      return buffer;
    },
  } as Crypto;
} 