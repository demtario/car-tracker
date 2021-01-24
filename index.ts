import axios from 'axios'
import cron from 'node-cron'
import fs from 'fs'
import { promisify } from 'util'
import { format } from 'date-fns'

import { ApiResponse } from './interfaces/ApiResponse'
import { Vehicle, VehicleTypes } from './interfaces/Vehicle'
import { DATE_FORMAT, EVERY_10_SECONDS, EVERY_15_MINUTES } from './consts'

const URL = 'https://takeanddrive.eu/api/v2/vehicles?city=trojmiasto&locale=pl'
const FILE = 'result.txt'

const appendFile = promisify(fs.appendFile)

const fetchVehicles = async () => {
  const { data } = await axios.get<ApiResponse[]>(URL)
  const allVehicles = data.map((d) => d.vehicles).flat()
  // const cars = allVehicles.filter((c) => c.type === VehicleTypes.Car)
  return allVehicles
}

const saveVehiclesToFile = async (vehicles: Vehicle[]) => {
  const stringData = vehicles
    .map((vehicle) => ({
      date: format(Date.now(), DATE_FORMAT),
      id: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
      type: vehicle.type,
      name: vehicle.name,
      latitude: vehicle.coordinates.latitude,
      longitude: vehicle.coordinates.longitude,
    }))
    .map((car) => Object.values(car).join(','))
    .join('\n')

  try {
    await appendFile(FILE, stringData)
  } catch (e) {
    console.log(e)
  }
}

const performVehiclesUpdate = async () => {
  const cars = await fetchVehicles()
  await saveVehiclesToFile(cars)
}

cron.schedule(EVERY_15_MINUTES, () => {
  console.log(`[${format(Date.now(), DATE_FORMAT)}] Stats update started`)
  performVehiclesUpdate()
  console.log(`[${format(Date.now(), DATE_FORMAT)}] Stats update ended`)
})
