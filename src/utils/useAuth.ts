import { useRoute } from 'vue-router'
import { useMenuData } from '@/pinia/stores/menuData'
import type { OperateAuthType, MenuDataItemType } from '@/types/menu'

export const operateAuthValueToDisabled = (operateAuthValue: number | undefined) => {
  // 值为0 无权限 返回true
  // 值为空 或 1 有权限 则返回false
  if (operateAuthValue === 0) return true
  return false
}

export const useAuth = () => {
  const { name } = useRoute()
  const menuDataStore = useMenuData()
  // 操作权限
  let operateAuth: OperateAuthType = {}
  const findOperateAuth = (list: MenuDataItemType[]) => {
    for (let i = 0; i < list.length; i++) {
      const record = list[i]
      if (record.pageUrl && record.pageUrl.split('/')[1] === name) {
        if (record.operateAuth) operateAuth = record.operateAuth
        break
      } else if (record.children && record.children.length) findOperateAuth(record.children)
    }
  }
  findOperateAuth(menuDataStore.menuData)
  // TODO 其他权限...
  return {
    operateAuth
  }
}
