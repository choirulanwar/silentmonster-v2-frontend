import {
  formatDistance,
  intervalToDuration,
  formatDuration,
  format
} from 'date-fns'

export const taskTypeColor = {
  DEPLOY: {
    variant: 'gradient',
    from: 'indigo',
    to: 'cyan'
  },
  UPDATE_POST: {
    variant: 'gradient',
    from: 'teal',
    to: 'lime'
  },
  DEPLOY_SCHEDULE: {
    variant: 'gradient',
    from: 'indigo',
    to: 'cyan'
  },
  POST_SCHEDULE: {
    variant: 'gradient',
    from: 'teal',
    to: 'lime'
  }
}

export const typeSiteColor = {
  VIDEO: {
    variant: 'gradient',
    from: 'indigo',
    to: 'cyan'
  },
  IMAGE: {
    variant: 'gradient',
    from: 'orange',
    to: 'red'
  },
  RECIPE: {
    variant: 'gradient',
    from: 'teal',
    to: 'lime'
  }
}

export const providerServiceColor = {
  GOOGLE: {
    variant: 'gradient',
    from: 'indigo',
    to: 'cyan'
  },
  BING: {
    variant: 'gradient',
    from: 'teal',
    to: 'lime'
  },
  CLOUDFLARE: {
    variant: 'gradient',
    from: 'orange',
    to: 'red'
  },
  SURGE: {
    variant: 'gradient',
    from: 'grape',
    to: 'pink'
  },
  NETLIFY: {
    variant: 'gradient',
    from: 'teal',
    to: 'blue'
  }
}

export const conclusionColor = {
  QUEUE: 'orange',
  IN_PROGRESS: 'indigo',
  SUCCESS: 'teal',
  FAILURE: 'red'
}

export const normalizeDate = date => {
  const today = new Date()
  const distanceDay = formatDistance(new Date(date), today, {
    addSuffix: true
  })

  return distanceDay
}

export const normalizeDuration = date => {
  const duration = intervalToDuration({ start: 0, end: date })
  const formatted = formatDuration(duration)

  return formatted === '' ? ' 0 seconds' : ` ${formatted}`
}

export const formatDate = date => {
  return format(new Date(date), 'PPpp')
}

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
