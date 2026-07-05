<script lang="ts" setup>
import { Motion } from "motion-v";

const { locale } = useDocusI18n();

const componentPath = computed(() => `/${locale.value}/components`);
const installationPath = computed(() => `/${locale.value}/getting-started/installation`);
const preferredMotion = usePreferredReducedMotion();
const reduceMotion = computed(() => preferredMotion.value === "reduce");
const heroInitial = computed(() => (reduceMotion.value ? false : { opacity: 0, y: 28 }));
const heroAnimate = { opacity: 1, y: 0 };
const heroTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      },
);
</script>

<template>
  <Motion
    as="section"
    class="relative overflow-hidden py-16 sm:py-24 lg:py-28"
    :initial="heroInitial"
    :animate="heroAnimate"
    :transition="heroTransition"
  >
    <div class="grid gap-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
      <div class="max-w-3xl">
        <p class="text-primary font-mono text-xs tracking-[0.2em] uppercase">
          Inspira UI for Vue and Nuxt
        </p>

        <h1
          class="text-highlighted mt-8 max-w-4xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl"
        >
          Animated components for Vue and Nuxt.
        </h1>

        <p class="text-muted mt-7 max-w-xl text-lg leading-8 text-pretty">
          Preview motion, tune props, read API details, and copy source from focused component
          pages.
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            :to="componentPath"
            class="group bg-primary text-inverted inline-flex h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-medium transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
          >
            Browse components
            <span
              class="grid size-7 place-items-center rounded-full bg-white/12 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px motion-reduce:transition-none dark:bg-black/10"
            >
              <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5"
              />
            </span>
          </NuxtLink>

          <NuxtLink
            :to="installationPath"
            class="group bg-elevated/45 text-highlighted ring-default/70 inline-flex h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-medium ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
          >
            Installation guide
            <span
              class="bg-default/60 grid size-7 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px motion-reduce:transition-none"
            >
              <UIcon
                name="i-lucide-book-open"
                class="size-3.5"
              />
            </span>
          </NuxtLink>
        </div>

        <p class="text-muted mt-8 font-mono text-xs tracking-[0.14em]">
          130+ components / live previews / source included
        </p>
      </div>

      <div class="relative">
        <p
          aria-hidden="true"
          class="text-toned/5 pointer-events-none absolute -top-16 right-0 hidden text-[10rem] leading-none font-semibold tracking-normal lg:block"
        >
          UI
        </p>

        <div
          class="from-primary/16 via-muted/10 to-primary/5 ring-default/70 relative rounded-[3rem] bg-linear-to-br p-1.5 shadow-[0_30px_110px_-72px_rgba(0,0,0,0.75)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
        >
          <div
            class="bg-default/90 text-highlighted ring-default/70 relative overflow-hidden rounded-[calc(3rem-0.375rem)] p-6 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] ring sm:p-8"
          >
            <div
              aria-hidden="true"
              class="from-primary/0 via-primary/28 to-primary/0 absolute inset-x-8 top-10 h-px bg-linear-to-r"
            />
            <div
              aria-hidden="true"
              class="bg-primary/8 absolute right-8 bottom-8 size-60 rounded-full blur-3xl"
            />

            <div class="relative z-10 flex min-h-[28rem] flex-col justify-between">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-primary font-mono text-[11px] tracking-[0.16em]">Inspira UI</p>
                  <p class="text-muted mt-2 text-sm">
                    Components with motion, props, API notes, and source.
                  </p>
                </div>
                <p class="text-muted font-mono text-[11px]">Vue / Nuxt</p>
              </div>

              <div class="max-w-xl py-16">
                <p class="text-muted font-mono text-xs tracking-[0.16em]">Component preview</p>
                <h2
                  class="mt-4 text-4xl leading-[0.92] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
                >
                  Make Vue interfaces feel crafted.
                </h2>
              </div>

              <div
                class="border-default/70 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="text-muted max-w-sm text-sm leading-6 text-pretty">
                  Add animated backgrounds, cards, text effects, cursors, and interactions without
                  hiding the code.
                </p>
                <NuxtLink
                  :to="componentPath"
                  class="bg-elevated/70 text-highlighted ring-default/70 inline-flex h-10 min-w-fit items-center justify-center rounded-full px-4 text-sm font-medium whitespace-nowrap ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
                >
                  Browse components
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Motion>
</template>
