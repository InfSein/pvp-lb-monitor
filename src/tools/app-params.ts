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
  /**
   * 缩放比例
   * @var `0.3 - 3` — 网站整体缩放比例
   * @default `1`
   */
  scale: number
}
const defaultParams: AppParams = {
  lang: "zh",
  mode: "tick",
  scale: 1,
}

function parseParams(): AppParams {
  const searchParams = new URLSearchParams(window.location.search)

  // 解析并验证 scale 参数
  let scale = defaultParams.scale
  const scaleParam = searchParams.get("scale")
  if (scaleParam) {
    const parsedScale = parseFloat(scaleParam)
    if (!isNaN(parsedScale)) {
      // 限制在 0.3 到 3 之间
      scale = Math.max(0.3, Math.min(3, parsedScale))
    }
  }

  return {
    lang: searchParams.get("lang") ?? defaultParams.lang,
    mode: searchParams.get("mode") ?? defaultParams.mode,
    scale,
  }
}

const state = reactive(parseParams())

const useAppParams = () => {
  return {
    params: computed(() => state),
  }
}

export default useAppParams
