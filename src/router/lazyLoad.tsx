import { defineComponent, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export const loading = defineComponent({
  render() {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        <a-spin size="large" />
      </div>
    )
  }
})

const error = defineComponent({
  setup(props, ctx) {
    const { t } = useI18n()
    const message = (ctx.attrs.error as Error).message
    const match = message.match(/(dynamic import: )(.*)/)
    const description = match ? match[2] : ''
    return () => (
      <div style={{ paddingTop: '100px', width: '35%', margin: '0 auto' }}>
        <a-alert
          message={t('pageFileLoadingFailed')}
          description={description}
          type="error"
          show-icon
        ></a-alert>
      </div>
    )
  }
})

export const lazyLoad = (directory: string, fileName: string) =>
  defineAsyncComponent({
    // vite 动态加载规则限制
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // TAG views 下所有视图 保持模块目录/视图文件 的结构
    loader: () => import(`@/views/${directory}/${fileName}.vue`),
    delay: 0,
    loadingComponent: loading,
    errorComponent: error
  })
