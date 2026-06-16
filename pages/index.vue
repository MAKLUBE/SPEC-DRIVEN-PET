<template>
  <section class="stack page-home">
    <div class="hero-band">
      <p class="eyebrow">Сегодня</p>
      <h1>С кем давно не общались?</h1>
      <p>Shejire помогает не терять теплую связь с родными, без сложной регистрации и лишних настроек.</p>
    </div>

    <div v-if="!ready" class="state-panel">Загружаем родных...</div>
    <div v-else-if="error" class="state-panel error">{{ error }}</div>

    <template v-else>
      <div class="metric-strip">
        <div>
          <strong>{{ dueRelatives.length }}</strong>
          <span>нужно написать</span>
        </div>
        <div>
          <strong>{{ interactions.length }}</strong>
          <span>контактов</span>
        </div>
      </div>

      <section v-if="dueRelatives.length" class="stack tight">
        <article v-for="relative in dueRelatives" :key="relative.id" class="reminder-card">
          <div class="card-topline">
            <div>
              <p class="eyebrow">Напоминание</p>
              <h2>{{ relative.name }}</h2>
              <p>{{ relative.relation }} · {{ contactLabel(relative.lastContactAt) }}</p>
            </div>
            <span class="pill overdue">{{ relative.daysOverdue }} дн.</span>
          </div>

          <div class="draft-box">
            <p>{{ draftFor(relative) }}</p>
            <button class="ghost-button" type="button" @click="copyDraft(relative)">Скопировать текст</button>
          </div>

          <button class="primary-button" type="button" @click="markContact(relative.id)">Я связался ✅</button>
        </article>
      </section>

      <section v-else class="empty-state">
        <h2>Все спокойно</h2>
        <p>На сегодня срочных напоминаний нет. Можно добавить родственника или проверить список.</p>
        <NuxtLink class="primary-button" to="/relatives/new">Добавить родственника</NuxtLink>
      </section>

      <section v-if="upcomingRelatives.length" class="list-section">
        <div class="section-title">
          <h2>Скоро</h2>
          <NuxtLink to="/relatives">Все</NuxtLink>
        </div>
        <div class="compact-list">
          <div v-for="relative in upcomingRelatives.slice(0, 3)" :key="relative.id" class="compact-row">
            <span>{{ relative.name }}</span>
            <small>{{ relative.relation }}</small>
          </div>
        </div>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
const { dueRelatives, upcomingRelatives, interactions, ready, error, load, markContact, draftFor } = useShejireData()

onMounted(load)

const contactLabel = (date: string | null) => date ? `последний контакт ${date}` : 'контакта еще не было'

const copyDraft = async (relative: { name: string, relation: string }) => {
  await navigator.clipboard?.writeText(draftFor(relative))
}
</script>
