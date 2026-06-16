<template>
  <section class="stack">
    <div class="page-heading simple">
      <p class="eyebrow">Smart Import</p>
      <h1>Добавить из текста</h1>
      <p>В v1 работает только текст. Скриншот и голос уже показаны как будущие входы.</p>
    </div>

    <form class="form-panel" @submit.prevent="submit">
      <label>
        Текстовый список
        <textarea v-model="rawText" rows="7" placeholder="Апа, бабушка&#10;Ата, дедушка&#10;Мама, мама" />
      </label>

      <button class="primary-button" type="submit">Импортировать</button>
      <p v-if="message" class="inline-success">{{ message }}</p>
    </form>

    <div class="placeholder-grid">
      <button class="placeholder-tile" type="button" disabled>
        <strong>Скриншот</strong>
        <span>OCR позже</span>
      </button>
      <button class="placeholder-tile" type="button" disabled>
        <strong>Голос</strong>
        <span>Speech-to-text позже</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const { load, importFromText } = useShejireData()
const rawText = ref('')
const message = ref('')

onMounted(load)

const submit = () => {
  const created = importFromText(rawText.value)
  message.value = created.length ? `Добавлено: ${created.length}` : 'Добавьте хотя бы одну строку.'
  if (created.length) rawText.value = ''
}
</script>
