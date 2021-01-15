import axios from 'axios'
import cron from 'node-cron'
import { promisify } from 'util'
import fs from 'fs'
import { ApiResponse } from './interfaces/ApiResponse'
import { Vehicle, VehicleTypes } from './interfaces/Vehicle'
import { EVERY_10_SECONDS, EVERY_HOUR } from './consts'

const URL = 'https://takeanddrive.eu/api/v2/vehicles?city=trojmiasto&locale=pl'
const FILE = 'result.txt'

const appendFile = promisify(fs.appendFile)

const fetchCars = async () => {
  const { data } = await axios.get<ApiResponse[]>(URL)
  const allVehicles = data.map((d) => d.vehicles).flat()
  const cars = allVehicles.filter((c) => c.type === VehicleTypes.Car)
  return cars
}

const saveCarsToFile = async (cars: Vehicle[]) => {
  const stringData = cars
    .map((car) => ({
      id: car.id,
      name: car.name,
      registrationNumber: car.registrationNumber,
      latitude: car.coordinates.latitude,
      longitude: car.coordinates.longitude,
    }))
    .map((car) => Object.values(car).join(','))
    .join('\n')

  try {
    await appendFile(FILE, stringData)
  } catch (e) {
    console.log(e)
  }
}

const saveCars = async () => {
  const cars = await fetchCars()
  await saveCarsToFile(cars)
}

cron.schedule(EVERY_10_SECONDS, () => {
  console.log(`${new Date()} - Fetching started`)
  saveCars()
  console.log(`${new Date()} - Fetching ended`)
})
