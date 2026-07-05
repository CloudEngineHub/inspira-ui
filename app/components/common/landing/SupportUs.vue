<template>
  <div
    class="from-primary/12 via-elevated/50 to-elevated/30 ring-default/70 rounded-[3rem] bg-linear-to-br p-1.5 shadow-[0_26px_90px_-62px_rgba(0,0,0,0.62)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
  >
    <div
      class="bg-default/88 ring-default/70 relative overflow-hidden rounded-[calc(3rem-0.375rem)] p-6 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] ring"
    >
      <div
        aria-hidden="true"
        class="bg-primary/12 absolute -right-16 -bottom-16 size-48 rounded-full blur-3xl"
      />

      <div class="relative flex items-start justify-between gap-4">
        <div>
          <p class="text-primary font-mono text-xs tracking-[0.14em]">Sponsor</p>
          <h3 class="text-highlighted mt-3 text-2xl leading-tight font-semibold tracking-[-0.03em]">
            Keep Inspira UI growing.
          </h3>
        </div>
        <span
          class="bg-elevated/60 text-primary ring-default/60 grid size-10 place-items-center rounded-full ring"
        >
          <UIcon
            name="i-lucide-heart"
            class="size-4.5"
          />
        </span>
      </div>

      <p class="text-muted relative mt-4 text-sm leading-6 text-pretty">
        Sponsorship keeps docs, examples, bug fixes, and new Vue/Nuxt components moving.
      </p>

      <NuxtLink
        to="https://github.com/sponsors/rahul-vashishtha"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-primary text-inverted group relative mt-6 inline-flex h-11 items-center justify-center gap-3 rounded-full px-4 text-sm font-medium transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
      >
        Become a sponsor
        <span
          class="grid size-7 place-items-center rounded-full bg-white/12 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px motion-reduce:transition-none"
        >
          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-3.5"
          />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
