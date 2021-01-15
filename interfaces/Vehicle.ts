export enum VehicleTypes {
  Car = 'CAR',
  Scooter = 'SCOOTER',
  SmallScooter = 'SMALL_SCOOTER',
}

export interface Vehicle {
  id: string
  imageId: string
  name: string
  registrationNumber: string
  type: VehicleTypes
  engineType: string
  locationDescription: string
  providerId: string
  coordinates: { latitude: number; longitude: number }
  range: { range: number; fuelLevel: number; fuelLevelDesc: string }
}
