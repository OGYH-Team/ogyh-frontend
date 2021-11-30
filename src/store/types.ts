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
  id: string
  time_str: string
  date: string
  reservations: Array<Reservation>
}

export interface Site {
  name: string
  location: {
    full_address: string
    country: string
    postal: string
    route: string
    city: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  id: string
}

export interface AppModuleState {
  navTitle: string
  isSideNavOpen: boolean
  isAuth: boolean
}

export interface QueueModuleState {
  timeSlots: Array<TimeSlot>
  selectedSite: Site
}

export interface SitesModuleState {
  sites: Array<Site>
}

export interface RootState {
  app: AppModuleState
  queue: QueueModuleState
  sites: SitesModuleState
}
