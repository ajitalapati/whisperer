import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Comprehensive crypto polyfill
if (typeof global.crypto === 'undefined') {
  const crypto = require('crypto');
  global.crypto = {
    getRandomValues: (buffer: ArrayBufferView | null) => {
      if (!buffer) return buffer;
      const randomBytes = crypto.randomBytes(buffer.byteLength);
      const typedArray = new Uint8Array(buffer.buffer);
      typedArray.set(randomBytes);
      return buffer;
    },
    subtle: {
      digest: async (algorithm: string, data: BufferSource) => {
        const hash = crypto.createHash(algorithm.toLowerCase().replace('-', ''));
        if (data instanceof ArrayBuffer) {
          hash.update(Buffer.from(data));
        } else {
          hash.update(Buffer.from(data.buffer));
        }
        return hash.digest();
      }
    }
  } as Crypto;
} 