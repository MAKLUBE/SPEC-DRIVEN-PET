<template>
  <div class="app-shell">
    <header class="topbar">
      <NuxtLink class="brand" to="/" aria-label="Shejire home">
        <span class="brand-mark">S</span>
        <span>
          <strong>Shejire 2.0</strong>
          <small>Связь с родными</small>
        </span>
      </NuxtLink>
      <NuxtLink class="icon-action" to="/relatives/new" aria-label="Добавить родственника">+</NuxtLink>
    </header>

    <main class="screen">
      <slot />
    </main>

    <nav class="bottom-nav" aria-label="Основная навигация">
      <NuxtLink to="/" class="nav-item">
        <span>⌂</span>
        Главная
      </NuxtLink>
      <NuxtLink to="/relatives" class="nav-item">
        <span>☷</span>
        Родные
      </NuxtLink>
      <NuxtLink to="/import" class="nav-item">
        <span>↧</span>
        Импорт
      </NuxtLink>
    </nav>
  </div>
</template>
