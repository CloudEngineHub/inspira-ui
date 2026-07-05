<template>
  <div
    class="bg-elevated/45 ring-default/70 rounded-[3rem] p-1.5 shadow-[0_28px_90px_-58px_rgba(0,0,0,0.58)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
  >
    <div
      class="bg-default/86 ring-default/70 rounded-[calc(3rem-0.375rem)] p-6 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] ring"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-primary font-mono text-xs tracking-[0.14em]">Contributors</p>
          <h3 class="text-highlighted mt-3 text-3xl leading-tight font-semibold tracking-[-0.03em]">
            Amazing people behind Inspira UI.
          </h3>
          <p class="text-muted mt-3 max-w-2xl text-sm leading-6 text-pretty">
            Thanks to everyone who helped Inspira UI grow through code, docs, examples, fixes, and
            ideas.
          </p>
        </div>
        <NuxtLink
          to="https://github.com/unovue/inspira-ui/graphs/contributors"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-elevated/70 text-highlighted ring-default/70 hover:bg-elevated inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium ring transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
        >
          View contributors
        </NuxtLink>
      </div>

      <div class="bg-muted/35 ring-default/60 mt-6 rounded-4xl p-4 ring">
        <NuxtImg
          class="mx-auto aspect-16/6 w-full max-w-4xl object-contain sm:aspect-16/5"
          src="https://contrib.rocks/image?repo=unovue/inspira-ui"
          alt="Inspira UI contributors"
          width="960"
          height="300"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
