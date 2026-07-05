<script lang="ts" setup>
import { Motion } from "motion-v";

const { locale } = useDocusI18n();
const preferredMotion = usePreferredReducedMotion();
const reduceMotion = computed(() => preferredMotion.value === "reduce");
const sectionInitial = computed(() => (reduceMotion.value ? false : { opacity: 0, y: 36 }));
const sectionInView = { opacity: 1, y: 0 };
const sectionTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      },
);

const links = [
  {
    label: "Learn",
    title: "Understand the setup.",
    description: "Review requirements, project shape, and theming before adding components.",
    to: `/${locale.value}/getting-started`,
    icon: "i-lucide-book-open",
  },
  {
    label: "Install",
    title: "Install the essentials.",
    description: "Add dependencies and wire the variables used by the component source.",
    to: `/${locale.value}/getting-started/installation`,
    icon: "i-lucide-terminal",
  },
  {
    label: "Browse",
    title: "Choose a component.",
    description: "Preview behavior, tune props, read API details, and copy the code.",
    to: `/${locale.value}/components`,
    icon: "i-lucide-layout-grid",
  },
];
</script>

<template>
  <Motion
    id="quickLinks"
    as="section"
    class="relative mt-6 py-14 sm:py-20"
    :initial="sectionInitial"
    :while-in-view="sectionInView"
    :transition="sectionTransition"
    :viewport="{ once: true, amount: 0.32 }"
  >
    <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
      <div>
        <h2
          class="text-highlighted max-w-xl text-4xl leading-[0.96] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
        >
          Start with the right path.
        </h2>
        <p class="text-muted mt-5 max-w-lg text-base leading-7 text-pretty">
          Move from setup to your first copied component without scanning the whole documentation.
        </p>
      </div>

      <div
        class="bg-elevated/45 ring-default/70 rounded-[3rem] p-1.5 shadow-[0_28px_90px_-56px_rgba(0,0,0,0.55)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
      >
        <div
          class="border-default/70 bg-border/60 grid gap-px overflow-hidden rounded-[calc(3rem-0.375rem)] border shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] md:grid-cols-[1.15fr_0.85fr]"
        >
          <NuxtLink
            v-for="(link, index) in links"
            :key="link.to"
            :to="link.to"
            class="group bg-default/86 hover:bg-elevated/60 active:bg-elevated/75 relative p-5 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
            :class="index === 0 ? 'min-h-64 md:row-span-2' : 'min-h-44'"
          >
            <div
              class="bg-elevated/60 text-highlighted ring-default/60 grid size-10 place-items-center rounded-full ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <UIcon
                :name="link.icon"
                class="size-4"
              />
            </div>
            <div :class="index === 0 ? 'mt-20' : 'mt-8'">
              <p class="text-muted font-mono text-xs tracking-[0.16em]">
                {{ link.label }}
              </p>
              <h3
                class="text-highlighted mt-3 font-semibold tracking-[-0.02em]"
                :class="index === 0 ? 'text-3xl leading-tight' : 'text-xl'"
              >
                {{ link.title }}
              </h3>
              <p class="text-muted mt-3 text-sm leading-6 text-pretty">
                {{ link.description }}
              </p>
            </div>
            <span
              class="bg-elevated/70 text-highlighted ring-default/60 absolute right-5 bottom-5 grid size-9 place-items-center rounded-full ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px motion-reduce:transition-none"
            >
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Motion>
</template>
