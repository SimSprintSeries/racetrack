// Interfejs dla wydarzeń
export interface IEvents {
    key: number,
    eventName: string,
    eventDate: object,
    eventRaces: IRaces[]
}

// Interfejs dla wyścigów
export interface IRaces {
    key: number,
    raceName: string,
    track: number,
    points: number
}

//interface opcji dla Async Selecta
export interface IOptions {
    value: number,
    label: string
}