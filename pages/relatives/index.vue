<template>
  <section class="stack">
    <div class="page-heading">
      <p class="eyebrow">Родственники</p>
      <h1>Ваш список</h1>
      <NuxtLink class="primary-button compact" to="/relatives/new">Добавить</NuxtLink>
    </div>

    <div v-if="!ready" class="state-panel">Загружаем список...</div>
    <div v-else-if="error" class="state-panel error">{{ error }}</div>

    <section v-else-if="relatives.length" class="relative-list">
      <article v-for="relative in relatives" :key="relative.id" class="relative-row">
        <div>
          <h2>{{ relative.name }}</h2>
          <p>{{ relative.relation }}</p>
          <small>{{ contactLabel(relative.lastContactAt) }}</small>
        </div>
        <button class="ghost-button small" type="button" @click="markContact(relative.id)">Связался</button>
      </article>
    </section>

    <section v-else class="empty-state">
      <h2>Список пуст</h2>
      <p>Добавьте первого родственника, и приложение начнет показывать напоминания.</p>
      <NuxtLink class="primary-button" to="/relatives/new">Добавить родственника</NuxtLink>
    </section>
  </section>
</template>

<script setup lang="ts">
const { relatives, ready, error, load, markContact } = useShejireData()

onMounted(load)

const contactLabel = (date: string | null) => date ? `Последний контакт: ${date}` : 'Контакта еще не было'
</script>
