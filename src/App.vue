<script setup lang="ts">
import { onUnmounted, onMounted, reactive, computed } from 'vue'
import useLocale, { type AvailableLocale } from './locales'
import { PvpZones } from './data'
import { getLbMax } from './tools'
import useAppParams from './tools/app-params'
import useOverlay from './tools/overlay'
import type { ChangePrimaryPlayerData, ChangeZoneData, LoglineData } from './types/overlay'

const { t, setLocale } = useLocale()
const {
  initialize,
  addOverlayListener,
  removeOverlayListener,
  startOverlayEvents,
  getCombatants,
} = useOverlay()
const {
  params : appUrlParams
} = useAppParams()

onMounted(() => {
  initialize(window)
  addOverlayListener('ChangePrimaryPlayer', handlePrimaryPlayerChange)
  addOverlayListener('ChangeZone', handleZoneChange)
  addOverlayListener('LogLine', handleLogLine)
  startOverlayEvents()

  getPlayerJob()
  state.app.getJobIntervalId = setInterval(handleGetPlayerJob, 500)

  setLocale(appUrlParams.value.lang as AvailableLocale)
})
onUnmounted(() => {
  removeOverlayListener('ChangePrimaryPlayer', handlePrimaryPlayerChange)
  removeOverlayListener('ChangeZone', handleZoneChange)
  removeOverlayListener('LogLine', handleLogLine)
  if (state.app.tickIntervalId) {
    clearInterval(state.app.tickIntervalId)
  }
  if (state.app.getJobIntervalId) {
    clearInterval(state.app.getJobIntervalId)
  }
})

const state = reactive({
  insideCombat: false,
  zone: 0,
  job: 0,
  player: {
    id: '',
    name: ''
  },
  lb: {
    val: 0,
    maxVal: 2000,
    remain: {
      sec: 0,
      tick: 0,
    }
  },
  app: {
    tickIntervalId: 0,
    tickPassed: 0,
    getJobIntervalId: 0,
  }
})

const insidePvP = computed(() => PvpZones.includes(state.zone))

const handlePrimaryPlayerChange = (data: ChangePrimaryPlayerData) => {
  state.player.id = data.charID.toString(16).toUpperCase()
  state.player.name = data.charName
}
const handleZoneChange = (data: ChangeZoneData) => {
  state.zone = data.zoneID
  state.lb.maxVal = getLbMax(state.job, state.zone)
}
const handleLogLine = (data: LoglineData) => {
  const msgType = data.line[0]

  if (msgType === '12') {
    handlePlayerJobChange(Number(data.line[2]))
    if (import.meta.env.DEV) {
      console.log(`[PSTATUS] ${data.rawLine}`)
    }
  }

  if (!insidePvP.value) return

  if (msgType === '36') {
    const currVal = parseInt(data.line[2], 16)
    const lastVal = state.lb.val
    const maxVal = state.lb.maxVal
    const remain = maxVal - currVal
    const increase = currVal - lastVal

    if (import.meta.env.DEV) {
      console.log(`[LB] ${currVal}/${maxVal} (${increase>=0 ? '+' : ''}${increase})`)
    }

    if (currVal) {
      state.app.tickPassed = 0
      state.insideCombat = true
    }
    state.lb.val = currVal

    const increasePerTick = increase <= 0 ? 100 : increase
    const remainTick = Math.ceil(remain / increasePerTick)
    const remainSec = remainTick * 3

    state.lb.remain.tick = remainTick

    const currRemain = state.lb.remain.sec
    if (remainSec < currRemain || (remainSec - currRemain) >= 3) {
      state.lb.remain.sec = remainSec
      registerTick()
    }
  }
}

const getPlayerJob = async () => {
  const combatants = await getCombatants()
  const player = combatants.find(combatant => combatant.ID.toString(16).toUpperCase() === state.player.id)
  if (!player) {
    if (import.meta.env.DEV) {
      console.warn(
        'No player was found in given combatants.',
        '\ncombatants:', combatants,
        '\nplayer:', JSON.stringify(state.player)
      )
    }
    return
  }
  handlePlayerJobChange(player.Job)
}
const handlePlayerJobChange = (newJob: number) => {
  state.job = newJob
  state.lb.maxVal = getLbMax(state.job, state.zone)
  if (!state.lb.val) {
    state.lb.remain.tick = state.lb.maxVal / 100
    state.lb.remain.sec = state.lb.remain.tick * 3
  }
}
const handleGetPlayerJob = async () => {
  if (!state.job) {
    await getPlayerJob()
  } else {
    clearInterval(state.app.getJobIntervalId)
  }
}

const handleTick = () => {
  if (state.insideCombat && state.lb.remain.sec > 0) {
    state.lb.remain.sec--
    state.app.tickPassed++
  }
  if (state.app.tickPassed >= 3 && state.lb.val !== state.lb.maxVal) {
    state.insideCombat = false
  }
}
const registerTick = () => {
  if (state.app.tickIntervalId) {
    clearInterval(state.app.tickIntervalId)
    state.app.tickIntervalId = 0
  }
  state.app.tickIntervalId = setInterval(handleTick, 1000)
}

const mainText = computed(() => {
  if (!insidePvP.value) return ''
  if (!state.job) return t('main.job_not_found')
  if (state.lb.val >= state.lb.maxVal) return ''
  return appUrlParams.value.mode === 'tick' ? t('main.remain_text.tick', [state.lb.remain.tick]) : t('main.remain_text.sec', [state.lb.remain.sec])
})
</script>

<template>
  <p class="main">
    {{ mainText }}
  </p>
</template>

<style scoped>
p.main {
  color: #ffffff;
  text-shadow: 
    0 0 2px #3CCDFF,
    0 0 4px #3CCDFF,
    0 0 8px #3CCDFF,
    0 0 16px #3CCDFF;
  animation: glow 2s ease-in-out infinite alternate;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 22px;
  text-align: right;
}

@keyframes glow {
  from {
    text-shadow:
      0 0 2px #3CCDFF,
      0 0 4px #3CCDFF,
      0 0 8px #3CCDFF,
      0 0 16px #3CCDFF;
  }
  to {
    text-shadow:
      0 0 4px #3CCDFF,
      0 0 8px #3CCDFF,
      0 0 16px #3CCDFF,
      0 0 32px #3CCDFF;
  }
}
</style>
