export interface Reservation {
  citizen_id: number
  citizen_data: {
    address: string
    birth_date: string
    citizen_id: number
    name: string
    occupation: string
    surname: string
    vaccine_taken: Array<string>
  }
  site_name: string
  timestamp: number
  queue: string
}

export interface TimeSlot {
  _id: string
  time_str: string
  date: string
  reservations: Array<Reservation>
}

export interface QueueModuleState {
  timeSlots: Array<TimeSlot>
}

export interface AppModuleState {
  navTitle: string
  isSideNavOpen: boolean
}

export interface RootState {
  app: AppModuleState
  queue: QueueModuleState
}
