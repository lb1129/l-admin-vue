import { generate } from '@ant-design/colors'
import { themeLocalforage } from '@/storage/localforage'

export function toggleThemeColor(themeColor: string) {
  const style = document.getElementById('vite-plugin-dynamic-theme')
  if (style) {
    // 由一个基本色算出一个梯度色板
    const currentColors = generate(style.getAttribute('data-color') as string)
    const toColors = generate(themeColor)
    style.innerHTML = style.innerHTML.replace(new RegExp(`(${currentColors[5]})`, 'g'), toColors[5])
    style.innerHTML = style.innerHTML.replace(new RegExp(`(${currentColors[4]})`, 'g'), toColors[4])
    style.innerHTML = style.innerHTML.replace(new RegExp(`(${currentColors[0]})`, 'g'), toColors[0])
    style.setAttribute('data-color', toColors[5])
    themeLocalforage.set(themeColor)
  }
}

export async function initThemeColor() {
  const themeColor = await themeLocalforage.get()
  if (themeColor) toggleThemeColor(themeColor)
}
