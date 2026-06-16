# Spec-Driven Pet Project · Лагерь 1

Шаблоны документов для pet-project. **Код не включён** — студент пишет приложение с нуля (как English Bot day-1).

## Как использовать (12.06)

```bash
mkdir my-project
cd my-project
mkdir docs
cp path/to/templates/*.template.md docs/
# переименуй: spec.template.md → spec.md и т.д.
```

**12.06:** только заполни `docs/`. Код с **13.06**.

## Файлы

| Шаблон | Назначение |
|--------|------------|
| `spec.template.md` | PRD: проблема, юзер, фичи, flows |
| `erd.template.md` | Таблицы и связи |
| `api.template.md` | Endpoints / команды бота |
| `validation.template.md` | CustDev (15.06) |
| `curriculum.template.md` | Очередь модулей после лагеря |

## Эталон для сравнения

`example/` — **полностью заполненный** `docs/` для учебной темы (бот записи на лекцию). Застрял на своём поле — открой и сравни уровень конкретности. Не копируй текст, копируй формат. Это аналог комментированного `index.js` из English Bot day-1.

## Уроки на платформе

- `camp-day-1` — 12.06, воркшоп: папка → spec → ERD → research → wireframe
- `camp-sdd-bridge` — English Bot vs spec-driven
- `camp-sdd-day-1-spec` — 12.06
- `camp-sdd-day-2-backend` — 13.06, Supabase
- `camp-sdd-day-3-frontend` — 14.06
- `camp-sdd-day-4-custdev` — 15.06

## Правило

Нет строки в spec / api.md — нет кода.
