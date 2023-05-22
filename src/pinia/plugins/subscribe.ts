import { type Store } from 'pinia'

export default ({ store }: { store: Store }) => {
  store.$subscribe((mutation, state) => {
    // 响应 store 变化
  })
}
