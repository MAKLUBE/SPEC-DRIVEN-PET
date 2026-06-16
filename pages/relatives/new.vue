<template>
  <section class="stack">
    <div class="page-heading simple">
      <p class="eyebrow">Быстрое добавление</p>
      <h1>Новый родственник</h1>
      <p>Добавьте вручную сейчас или выберите будущий способ импорта.</p>
    </div>

    <div class="mode-strip" aria-label="Способ добавления">
      <button class="mode-option active" type="button">
        <strong>Вручную</strong>
        <span>Имя и родство</span>
      </button>
      <button class="mode-option" type="button" disabled>
        <strong>Фото</strong>
        <span>OCR позже</span>
      </button>
      <button class="mode-option" type="button" disabled>
        <strong>Голос</strong>
        <span>Speech-to-text позже</span>
      </button>
    </div>

    <form class="form-panel" @submit.prevent="submit">
      <label>
        Имя
        <input v-model="name" autocomplete="off" placeholder="Например, Апа" />
      </label>

      <label>
        Степень родства
        <input v-model="relation" autocomplete="off" placeholder="Например, Бабушка" />
      </label>

      <div class="hint-box">
        Частота напоминаний по умолчанию: раз в 14 дней.
      </div>

      <p v-if="error" class="inline-error">{{ error }}</p>
      <p v-if="saved" class="inline-success">Родственник добавлен ✅</p>

      <button class="primary-button" type="submit">Сохранить</button>
    </form>

    <div class="placeholder-grid">
      <button class="placeholder-tile" type="button" disabled>
        <strong>Скриншот родных</strong>
        <span>Распознавание фото появится позже</span>
      </button>
      <button class="placeholder-tile" type="button" disabled>
        <strong>Голосовая заметка</strong>
        <span>Добавление голосом появится позже</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()
const { addRelative, load, error } = useShejireData()
const name = ref('')
const relation = ref('')
const saved = ref(false)

onMounted(load)

const submit = () => {
  const relative = addRelative(name.value, relation.value)
  if (!relative) return
  saved.value = true
  name.value = ''
  relation.value = ''
  setTimeout(() => router.push('/relatives'), 450)
}
</script>
