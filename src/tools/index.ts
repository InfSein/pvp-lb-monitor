import { GameZones, JobLbFrontlineCorrectionMap, JobLbMap } from "@/data"

export const getLbMax = (job: number, zone: number) => {
  let lbmax = JobLbMap[job] || 60
  if (Object.values(GameZones.frontline).includes(zone)) {
    lbmax += (JobLbFrontlineCorrectionMap[job] || 0)
  }
  return lbmax / 3 * 100
}