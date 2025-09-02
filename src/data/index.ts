export const GameZones = {
  frontline: {
    /** 周边遗迹群（阵地战） */
    secure: 1273,
    /** 尘封秘岩（争夺战） */
    seize: 431,
    /** 荣誉野（碎冰战） */
    shatter: 554,
    /** 昂萨哈凯尔（竞争战） */
    naadam: 888,
  },
  rivalWings: {
    /** 隐塞（机动战） */
    hiddengorge: 791,
  },
  crystalConflict: {
    /** 角力学校 */
    palaistra: [1032, 1058],
    /** 九霄云上 */
    cloudnine: [1034, 1060],
    /** 火山之心 */
    volcanic: [1033, 1059],
    /** 机关大殿 */
    castletown: [1116, 1117],
    /** 赤土红沙 */
    redsands: [1138, 1139],
  }
}
export const PvpZones = [
  250, // 狼狱停船场
  ...Object.values(GameZones.frontline),
  ...Object.values(GameZones.rivalWings),
  ...Object.values(GameZones.crystalConflict).flat(),
]

/**
 * 各职业的极限技充能时间。
 * 版本更新进行调整时需要手动维护。
 */
export const JobLbMap : Record<number, number> = {
  // * 各职能内部排序与角色面板的职业顺序一致。

  // Tanks
  19: 120,
  21: 90,
  32: 105,
  37: 60,
  // Healers
  24: 60,
  28: 90,
  33: 105,
  40: 120,
  // Melee DPS
  20: 75,
  22: 90,
  30: 90,
  34: 120,
  39: 60,
  41: 90,
  // Ranged Physical DPS
  23: 120,
  31: 90,
  38: 90,
  // Ranged Magical DPS
  25: 60,
  27: 90,
  35: 90,
  42: 105,
}
/**
 * 各职业在纷争前线的极限技充能时间补正。
 * 版本更新进行调整时需要手动维护。
 */
export const JobLbFrontlineCorrectionMap : Record<number, number> = {
  // Tanks
  32: 45,
  37: 15,
  // Healers
  24: 15,
  33: 15,
  // Melee DPS
  22: 15,
  30: 15,
  34: 15,
  39: 15,
  // Ranged Physical DPS
  23: -15,
  // Ranged Magical DPS
  27: 15,
}