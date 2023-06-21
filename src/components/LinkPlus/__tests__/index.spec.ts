import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LinkPlus from '../index.vue'
import router from '@/router'

describe('LinkPlus', () => {
  it('component could be mount and unmounted without errors', () => {
    const wrapper = mount(LinkPlus, {
      global: {
        plugins: [router]
      }
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
