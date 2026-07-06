<script lang="ts" setup>
import type { DocsEnCollectionItem } from "@nuxt/content";
import { motion, MotionConfig } from "motion-v";
import InspiraCarbonAds from "../carbon-ads/InspiraCarbonAds.vue";

interface Props {
  routePath?: string;
}

const { routePath = "/components" } = defineProps<Props>();
const { locale } = useDocusI18n();

const selectedCategory = ref("all");
const search = ref("");
const showAd = useMediaQuery("(max-width: 1023px)");
const preferredMotion = usePreferredReducedMotion();
const filterIndicatorId = useId();
const reduceMotion = computed(() => preferredMotion.value === "reduce");
const filterTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 520,
        damping: 42,
        mass: 0.58,
      },
);

const { data: collection } = await useAsyncData("component_collection", () => {
  return queryCollection(`docs_${locale.value}` as any).all() as Promise<DocsEnCollectionItem[]>;
});

const path = computed(() => `/${locale.value}${routePath}`);

const components = computed(() => {
  return (collection.value ?? []).filter((component) => {
    return component.path.startsWith(path.value) && component.path !== path.value;
  });
});

const newCount = computed(() => {
  return components.value.filter((component) => component.badge === "New").length;
});

const updatedCount = computed(() => {
  return components.value.filter((component) => component.badge === "Updated").length;
});

const categoryOptions = computed(() => {
  const counts = new Map<string, number>();

  components.value.forEach((component) => {
    counts.set(component.category, (counts.get(component.category) ?? 0) + 1);
  });

  const categories = [...counts]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([id, count]) => ({ id, label: id, count }));

  return [
    { id: "all", label: "All", count: components.value.length },
    { id: "new", label: "New", count: newCount.value },
    { id: "updated", label: "Updated", count: updatedCount.value },
    ...categories,
  ].filter((category) => category.id === "all" || category.count > 0);
});

const activeCategory = computed(() => {
  return categoryOptions.value.find((category) => category.id === selectedCategory.value);
});

function badgePriority(badge?: string) {
  if (badge === "New") return 0;
  if (badge === "Updated") return 1;
  return 2;
}

function isNew(component: DocsEnCollectionItem) {
  return component.badge === "New";
}

function isUpdated(component: DocsEnCollectionItem) {
  return component.badge === "Updated";
}

function filterButtonClass(id: string) {
  if (selectedCategory.value === id) {
    return "text-inverted";
  }

  if (id === "new") {
    return "bg-success/5 text-highlighted ring-success/15 hover:bg-success/10";
  }

  if (id === "updated") {
    return "bg-warning/5 text-highlighted ring-warning/15 hover:bg-warning/10";
  }

  return "bg-elevated/35 text-muted ring-default/55 hover:bg-elevated/60 hover:text-highlighted";
}

function filterIndicatorClass(id: string) {
  if (id === "new") {
    return "bg-success";
  }

  if (id === "updated") {
    return "bg-warning";
  }

  return "bg-inverted";
}

function filterCountClass(id: string) {
  if (selectedCategory.value === id) {
    return "bg-default/20 text-inverted";
  }

  if (id === "new") {
    return "bg-success/10 text-success";
  }

  if (id === "updated") {
    return "bg-warning/10 text-warning";
  }

  return "bg-default/60";
}

function cardShellClass(component: DocsEnCollectionItem) {
  if (isNew(component)) {
    return "bg-success/5 ring-success/20 hover:ring-success/35";
  }

  if (isUpdated(component)) {
    return "bg-warning/5 ring-warning/20 hover:ring-warning/35";
  }

  return "bg-elevated/35 ring-default/60 hover:ring-default";
}

function cardGlowClass(component: DocsEnCollectionItem) {
  if (isNew(component)) {
    return "bg-success/15";
  }

  if (isUpdated(component)) {
    return "bg-warning/15";
  }

  return "bg-primary/10";
}

function badgeClass(badge?: string) {
  if (badge === "New") {
    return "bg-success/10 text-success ring-success/25";
  }

  if (badge === "Updated") {
    return "bg-warning/10 text-warning ring-warning/25";
  }

  return "bg-elevated/70 text-toned ring-default/70";
}

function categoryPillClass(component: DocsEnCollectionItem) {
  if (isNew(component)) {
    return "bg-success/10 text-success ring-success/15";
  }

  if (isUpdated(component)) {
    return "bg-warning/10 text-warning ring-warning/15";
  }

  return "bg-elevated/45 text-toned ring-default/60";
}

const filteredComponents = computed(() => {
  const query = search.value.trim().toLowerCase();

  return components.value
    .filter((component) => {
      if (selectedCategory.value === "new") return component.badge === "New";
      if (selectedCategory.value === "updated") return component.badge === "Updated";
      if (selectedCategory.value !== "all") return component.category === selectedCategory.value;
      return true;
    })
    .filter((component) => {
      if (!query) return true;

      return [
        component.title,
        component.description,
        component.category,
        component.badge,
        ...(component.tags ?? []),
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));
    })
    .toSorted(
      (a, b) => badgePriority(a.badge) - badgePriority(b.badge) || a.title.localeCompare(b.title),
    );
});

const componentSections = computed(() => {
  if (selectedCategory.value !== "all") {
    return [
      {
        id: selectedCategory.value,
        label: activeCategory.value?.label ?? selectedCategory.value,
        count: filteredComponents.value.length,
        grouped: false,
        newCount: filteredComponents.value.filter(isNew).length,
        updatedCount: filteredComponents.value.filter(isUpdated).length,
        items: filteredComponents.value,
      },
    ];
  }

  const groups = new Map<string, DocsEnCollectionItem[]>();

  filteredComponents.value.forEach((component) => {
    groups.set(component.category, [...(groups.get(component.category) ?? []), component]);
  });

  return [...groups]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([id, items]) => ({
      id,
      label: id,
      count: items.length,
      grouped: true,
      newCount: items.filter(isNew).length,
      updatedCount: items.filter(isUpdated).length,
      items,
    }));
});
</script>

<template>
  <MotionConfig :transition="filterTransition">
    <section class="relative w-full py-5 sm:py-8">
      <div class="relative space-y-10">
        <div
          class="bg-elevated/35 ring-default/60 rounded-4xl p-1.5 shadow-[0_28px_90px_-72px_rgba(0,0,0,0.75)] ring dark:shadow-none"
        >
          <div
            class="bg-default/70 ring-default/70 relative overflow-hidden rounded-[calc(2rem-0.375rem)] p-5 ring sm:p-7"
          >
            <div
              class="bg-primary/10 pointer-events-none absolute -top-28 right-12 size-72 rounded-full blur-3xl"
            />
            <div class="relative grid gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
              <div class="min-w-0 space-y-5">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span
                    class="text-toned font-mono text-xs tracking-[0.18em] uppercase tabular-nums"
                  >
                    {{ filteredComponents.length }} / {{ components.length }}
                  </span>
                  <span class="bg-default/30 h-px w-8" />
                  <span class="text-muted text-sm font-medium">
                    {{ activeCategory?.label ?? "All" }}
                  </span>
                </div>

                <div class="max-w-3xl space-y-2">
                  <h2
                    class="text-highlighted text-4xl leading-none font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
                  >
                    Browse components
                  </h2>
                  <p class="text-muted max-w-2xl text-sm leading-6 text-pretty">
                    Find the right component, open its preview, then copy the source with API notes.
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <label
                  for="component-search"
                  class="sr-only"
                >
                  Search components
                </label>
                <div
                  class="bg-elevated/45 ring-default/70 focus-within:ring-primary/35 focus-within:bg-elevated/70 flex h-12 w-full items-center gap-2 rounded-full px-3.5 ring transition-[background-color,ring-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <UIcon
                    name="tabler:search"
                    class="text-toned size-4 shrink-0"
                  />
                  <UInput
                    id="component-search"
                    v-model="search"
                    type="search"
                    autocomplete="off"
                    aria-label="Search components"
                    placeholder="Search components"
                    variant="none"
                    class="min-w-0 flex-1"
                    :ui="{
                      base: 'h-full px-0 py-0 text-sm text-highlighted placeholder:text-muted',
                    }"
                  />
                  <button
                    v-if="search"
                    type="button"
                    aria-label="Clear search"
                    class="bg-default/70 text-highlighted ring-default/60 grid size-7 place-items-center rounded-full ring transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.94]"
                    @click="search = ''"
                  >
                    <UIcon
                      name="tabler:x"
                      class="size-4"
                    />
                  </button>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <div class="bg-elevated/30 ring-default/60 rounded-2xl px-3 py-2 ring">
                    <p class="text-highlighted font-mono text-sm tabular-nums">
                      {{ components.length }}
                    </p>
                    <p class="text-muted mt-0.5 text-[0.68rem]">Total</p>
                  </div>
                  <div class="bg-success/5 ring-success/15 rounded-2xl px-3 py-2 ring">
                    <p class="text-success font-mono text-sm tabular-nums">
                      {{ newCount }}
                    </p>
                    <p class="text-muted mt-0.5 text-[0.68rem]">New</p>
                  </div>
                  <div class="bg-primary/5 ring-primary/15 rounded-2xl px-3 py-2 ring">
                    <p class="text-primary font-mono text-sm tabular-nums">
                      {{ updatedCount }}
                    </p>
                    <p class="text-muted mt-0.5 text-[0.68rem]">Updated</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative mt-7 flex flex-wrap gap-2">
              <button
                v-for="category in categoryOptions"
                :key="category.id"
                type="button"
                class="relative isolate inline-flex h-9 items-center gap-2 overflow-hidden rounded-full px-3 text-sm font-medium ring transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
                :class="filterButtonClass(category.id)"
                :aria-pressed="selectedCategory === category.id"
                @click="selectedCategory = category.id"
              >
                <motion.span
                  v-if="selectedCategory === category.id"
                  :layout-id="`${filterIndicatorId}-filter`"
                  class="pointer-events-none absolute inset-0 rounded-full"
                  :class="filterIndicatorClass(category.id)"
                  :transition="filterTransition"
                />
                <span class="relative">{{ category.label }}</span>
                <span
                  class="relative rounded-full px-2 py-0.5 font-mono text-[0.65rem] tabular-nums"
                  :class="filterCountClass(category.id)"
                >
                  {{ category.count }}
                </span>
              </button>
            </div>

            <aside
              v-if="showAd"
              aria-label="Sponsored"
              class="bg-elevated/40 ring-default/70 relative mt-5 flex min-h-24 items-center justify-center rounded-[1.5rem] p-3 ring"
            >
              <span
                class="bg-default/80 text-toned ring-default/70 absolute top-3 left-3 rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase ring"
              >
                Sponsor
              </span>
              <InspiraCarbonAds class="max-w-full overflow-hidden pt-5" />
            </aside>
          </div>
        </div>

        <div
          v-if="!filteredComponents.length"
          class="bg-elevated/35 ring-default/60 rounded-4xl p-1.5 ring"
        >
          <div
            class="bg-default/70 ring-default/70 grid place-items-center rounded-[calc(2rem-0.375rem)] px-6 py-16 text-center ring"
          >
            <p class="text-highlighted text-2xl font-semibold tracking-[-0.04em]">
              No components found.
            </p>
            <p class="text-muted mt-3 max-w-md text-sm leading-6">
              Try another category or search term.
            </p>
          </div>
        </div>

        <div
          v-else
          class="space-y-16"
        >
          <section
            v-for="section in componentSections"
            :key="section.id"
            class="space-y-5"
          >
            <div
              v-if="section.grouped"
              class="flex flex-col gap-3 px-1 md:flex-row md:items-center"
            >
              <div class="flex min-w-0 items-center gap-3">
                <span class="from-primary/80 to-primary/10 h-px w-10 rounded-full bg-linear-to-r" />
                <h2
                  class="text-highlighted truncate font-mono text-[0.76rem] font-semibold tracking-[0.24em] uppercase"
                >
                  {{ section.label }}
                </h2>
              </div>

              <div class="flex flex-wrap gap-2 md:order-last md:ms-auto">
                <span
                  v-if="section.newCount"
                  class="bg-success/10 text-success ring-success/15 rounded-full px-2.5 py-1 text-xs font-medium ring"
                >
                  {{ section.newCount }} new
                </span>
                <span
                  v-if="section.updatedCount"
                  class="bg-primary/10 text-primary ring-primary/15 rounded-full px-2.5 py-1 text-xs font-medium ring"
                >
                  {{ section.updatedCount }} updated
                </span>
              </div>

              <span class="bg-default/30 hidden h-px min-w-8 flex-1 md:block" />
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <NuxtLink
                v-for="component in section.items"
                :key="component.path"
                :to="component.path"
                class="group/card focus-visible:ring-primary/40 relative isolate rounded-[1.65rem] p-1.5 ring transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_26px_90px_-64px_color-mix(in_oklab,var(--ui-primary)_48%,transparent)] focus-visible:ring-2 focus-visible:outline-none active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
                :class="cardShellClass(component)"
              >
                <article
                  class="bg-default/60 ring-default/70 group-hover/card:bg-default/70 relative flex h-full min-h-52 overflow-hidden rounded-[calc(1.65rem-0.375rem)] p-5 ring transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <div
                    class="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:opacity-100 motion-reduce:transition-none"
                    :class="cardGlowClass(component)"
                  />
                  <div
                    class="from-inverted/5 pointer-events-none absolute inset-px rounded-[calc(1.65rem-0.45rem)] bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:opacity-100 motion-reduce:transition-none"
                  />

                  <div class="relative flex w-full flex-col">
                    <div class="flex items-start justify-between gap-3">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase ring"
                        :class="categoryPillClass(component)"
                      >
                        {{ component.category }}
                      </span>
                      <span
                        v-if="component.badge"
                        class="rounded-full px-2.5 py-1 text-xs font-medium ring"
                        :class="badgeClass(component.badge)"
                      >
                        {{ component.badge }}
                      </span>
                    </div>

                    <h3
                      class="text-highlighted mt-5 text-lg leading-6 font-semibold tracking-[-0.03em] text-pretty"
                    >
                      {{ component.title }}
                    </h3>
                    <p class="text-muted mt-2 line-clamp-3 text-sm leading-6 text-pretty">
                      {{ component.description }}
                    </p>

                    <div class="mt-5 flex flex-wrap gap-2">
                      <span
                        v-for="tag in component.tags?.slice(0, 3)"
                        :key="component.path + tag"
                        class="bg-elevated/40 text-muted ring-default/60 rounded-full px-2 py-0.5 text-xs ring"
                      >
                        {{ tag }}
                      </span>
                      <span
                        v-if="component.tags && component.tags.length > 3"
                        class="bg-elevated/40 text-muted ring-default/60 rounded-full px-2 py-0.5 text-xs ring"
                      >
                        +{{ component.tags.length - 3 }}
                      </span>
                    </div>

                    <div class="mt-auto flex items-center justify-end pt-7">
                      <span
                        class="bg-elevated/70 text-highlighted ring-default/70 grid size-8 place-items-center rounded-full ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:translate-x-1 group-hover/card:-translate-y-0.5"
                      >
                        <UIcon
                          name="tabler:arrow-up-right"
                          class="size-4"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </MotionConfig>
</template>
