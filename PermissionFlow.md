## 登录流程

```mermaid
graph TD;
    A[开始]-->B[登录成功]-->C[菜单权限控制流程]-->D[结束];
    style C fill:#f9f,stroke:#333,color:#fff
```

## 页面刷新|跳转流程

```mermaid
graph TD;
    A[开始]-->B[页面刷新或跳转]
    B-->C{路由是否需要身份验证}
    C-- 需要 --> D{校验token是否有效}
    C-- 不需要 --> E{校验token是否有效}
    D-- 有效 --> F[菜单权限控制流程] --> G[结束]
    D-- 无效 --> H[跳转登录页]  --> G
    E-- 有效 --> I[跳转菜单页] --> F --> G
    D-- 无效 --> G
    style F fill:#f9f,stroke:#333,color:#fff
```

## 菜单权限控制流程

```mermaid
graph TD;
    A[开始]-->B[获取用户菜单]
    B-->C[更新 pinia 内菜单数据]
    C-->D[触发左侧菜单生成]-->F[结束]
    C-->E[触发动态路由生成]-->F
```

## 操作权限控制流程

```mermaid
graph TD;
    A[开始]-->B[获取 pinia 内菜单数据]
    B-->C[通过路由从菜单数据中获取操作权限项]
    C-->D[将操作权限项应用到需控制的节点]-->E[结束]
```

```vue
<template>
  <div>
    <button disabled={operateAuthValueToDisabled(operateAuth.add)}>add</button>
    <button disabled={operateAuthValueToDisabled(operateAuth.edit)}>edit</button>
    <button disabled={operateAuthValueToDisabled(operateAuth.delete)}>delete</button>
    <button disabled={operateAuthValueToDisabled(operateAuth.detail)}>detail</button>
  </div>
</temaplate>

<script setup lang="ts">
  import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
  const { operateAuth } = useAuth()
</script>
```
