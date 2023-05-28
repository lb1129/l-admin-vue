import { ref } from 'vue'

export default function () {
  const count = ref(0)
  return (
    <a-button
      type="primary"
      onclick={() => {
        count.value++
      }}
    >
      {count.value}
    </a-button>
  )
}
