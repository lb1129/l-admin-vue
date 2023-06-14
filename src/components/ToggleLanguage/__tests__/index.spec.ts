import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleLanguage from '../index.vue'
import i18n from '@/i18n'

describe('ToggleLanguage', () => {
  it('component could be mount and unmounted without errors', async () => {
    const wrapper = mount(ToggleLanguage, {
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('.ant-dropdown-trigger>.anticon').exists()).toBe(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
