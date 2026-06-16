export type Relative = {
  id: string
  userId: string
  name: string
  relation: string
  reminderIntervalDays: number
  lastContactAt: string | null
  createdAt: string
}

export type Reminder = {
  id: string
  relativeId: string
  remindAt: string
  status: 'pending' | 'sent' | 'done' | 'skipped'
  createdAt: string
}

export type Interaction = {
  id: string
  relativeId: string
  interactionType: 'message' | 'call' | 'meeting'
  interactionAt: string
  note: string
  createdAt: string
}

type ShejireStore = {
  relatives: Relative[]
  reminders: Reminder[]
  interactions: Interaction[]
}

const STORAGE_KEY = 'shejire-2-mvp'
const USER_ID = 'local-user-rasul'

const todayISO = () => new Date().toISOString().slice(0, 10)
const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`

const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().slice(0, 10)
}

const seedData = (): ShejireStore => ({
  relatives: [
    {
      id: 'relative-apa',
      userId: USER_ID,
      name: 'Апа',
      relation: 'Бабушка',
      reminderIntervalDays: 14,
      lastContactAt: daysAgo(21),
      createdAt: daysAgo(30)
    },
    {
      id: 'relative-ata',
      userId: USER_ID,
      name: 'Ата',
      relation: 'Дедушка',
      reminderIntervalDays: 14,
      lastContactAt: daysAgo(6),
      createdAt: daysAgo(24)
    }
  ],
  reminders: [],
  interactions: []
})

const parseStore = (raw: string | null): ShejireStore | null => {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ShejireStore
    if (Array.isArray(parsed.relatives) && Array.isArray(parsed.reminders) && Array.isArray(parsed.interactions)) {
      return parsed
    }
  } catch {}
  return null
}

export const useShejireData = () => {
  const store = useState<ShejireStore>('shejire-store', seedData)
  const ready = useState('shejire-ready', () => false)
  const error = useState<string | null>('shejire-error', () => null)

  const save = () => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.value))
  }

  const load = () => {
    if (!import.meta.client || ready.value) return
    error.value = null
    const saved = parseStore(localStorage.getItem(STORAGE_KEY))
    store.value = saved ?? seedData()
    if (!saved) save()
    ready.value = true
  }

  const dueRelatives = computed(() => {
    const today = new Date(todayISO())
    return store.value.relatives
      .map((relative) => {
        const last = relative.lastContactAt ? new Date(relative.lastContactAt) : new Date(relative.createdAt)
        const next = new Date(last)
        next.setDate(next.getDate() + relative.reminderIntervalDays)
        const daysOverdue = Math.max(0, Math.floor((today.getTime() - next.getTime()) / 86400000))
        return { ...relative, nextContactAt: next.toISOString().slice(0, 10), daysOverdue }
      })
      .filter((relative) => new Date(relative.nextContactAt) <= today)
      .sort((a, b) => b.daysOverdue - a.daysOverdue)
  })

  const upcomingRelatives = computed(() => {
    const dueIds = new Set(dueRelatives.value.map((relative) => relative.id))
    return store.value.relatives.filter((relative) => !dueIds.has(relative.id))
  })

  const addRelative = (name: string, relation: string) => {
    const cleanName = name.trim()
    const cleanRelation = relation.trim()
    if (!cleanName || !cleanRelation) {
      error.value = 'Заполните имя и степень родства.'
      return null
    }

    const relative: Relative = {
      id: id('relative'),
      userId: USER_ID,
      name: cleanName,
      relation: cleanRelation,
      reminderIntervalDays: 14,
      lastContactAt: null,
      createdAt: todayISO()
    }

    store.value.relatives.unshift(relative)
    store.value.reminders.unshift({
      id: id('reminder'),
      relativeId: relative.id,
      remindAt: todayISO(),
      status: 'pending',
      createdAt: todayISO()
    })
    error.value = null
    save()
    return relative
  }

  const markContact = (relativeId: string, interactionType: Interaction['interactionType'] = 'message', note = '') => {
    const relative = store.value.relatives.find((item) => item.id === relativeId)
    if (!relative) {
      error.value = 'Родственник не найден.'
      return false
    }

    const now = new Date().toISOString()
    relative.lastContactAt = todayISO()
    store.value.interactions.unshift({
      id: id('interaction'),
      relativeId,
      interactionType,
      interactionAt: now,
      note,
      createdAt: now
    })
    store.value.reminders = store.value.reminders.map((reminder) => (
      reminder.relativeId === relativeId && reminder.status !== 'done'
        ? { ...reminder, status: 'done' }
        : reminder
    ))
    error.value = null
    save()
    return true
  }

  const draftFor = (relative: Pick<Relative, 'name' | 'relation'>) => {
    const templates = [
      `Салам, ${relative.name}! Давно не общались, хотел узнать, как у тебя дела.`,
      `${relative.name}, привет! Вспомнил о тебе и захотел написать. Как настроение?`,
      `Салам! Как ты, ${relative.name}? Хочу чаще быть на связи, расскажи, как проходят дни.`
    ]
    return templates[Math.abs(relative.name.length + relative.relation.length) % templates.length]
  }

  const importFromText = (text: string) => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const created: Relative[] = []
    for (const line of lines) {
      const parts = line.split(/[,;:—-]/).map((part) => part.trim()).filter(Boolean)
      const name = parts[0]
      const relation = parts[1] ?? 'Родственник'
      const relative = addRelative(name, relation)
      if (relative) created.push(relative)
    }
    return created
  }

  return {
    relatives: computed(() => store.value.relatives),
    reminders: computed(() => store.value.reminders),
    interactions: computed(() => store.value.interactions),
    dueRelatives,
    upcomingRelatives,
    ready,
    error,
    load,
    addRelative,
    markContact,
    draftFor,
    importFromText
  }
}
