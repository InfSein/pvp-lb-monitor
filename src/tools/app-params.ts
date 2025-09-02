import { reactive, computed } from "vue"

interface AppParams {
  /**
   * 界面语言
   * @var `zh` — 简体中文
   * @var `en` — English
   * @default `zh`
   */
  lang: string
  /**
   * 模式
   * @var `tick` — 显示剩余跳数
   * @var `sec` — 显示剩余时间
   * @default `tick`
   */
  mode: string
}
const defaultParams: AppParams = {
  lang: "zh",
  mode: "tick",
}

function parseParams(): AppParams {
  const searchParams = new URLSearchParams(window.location.search)

  return {
    lang: searchParams.get("lang") ?? defaultParams.lang,
    mode: searchParams.get("mode") ?? defaultParams.mode,
  }
}

const state = reactive(parseParams())

const useAppParams = () => {
  return {
    params: computed(() => state),
  }
}

export default useAppParams
