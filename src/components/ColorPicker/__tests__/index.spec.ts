import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorPicker from '../index.vue'

describe('ColorPicker', () => {
  it('component could be mount and unmounted without errors', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: ''
      }
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
