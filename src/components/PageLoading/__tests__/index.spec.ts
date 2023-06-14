import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageLoading from '../index.vue'

describe('PageLoading', () => {
  it('component could be mount and unmounted without errors', () => {
    const wrapper = mount(PageLoading)
    expect(wrapper.findAll('.ant-spin')).toHaveLength(1)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
