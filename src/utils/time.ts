export function getHour(timeString: string): number {
  return parseInt(timeString.slice(11, 13), 10)
}

export function isDay(timeString: string): boolean {
  const hour = getHour(timeString)
  return hour >= 6 && hour < 20
}

export function formatDayLabel(dateString: string): string {
  return new Date(dateString + 'T12:00:00').toLocaleDateString('en', { weekday: 'short' })
}

export function formatFullLabel(dateString: string): string {
  return new Date(dateString + 'T12:00:00').toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
  })
}

export function currentHourPrefix(): string {
  return new Date().toISOString().slice(0, 13)
}
