<template>
  <div
    class="bg-elevated/45 ring-default/70 rounded-[3rem] p-1.5 shadow-[0_28px_90px_-58px_rgba(0,0,0,0.58)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
  >
    <div
      class="bg-default/86 ring-default/70 relative h-full overflow-hidden rounded-[calc(3rem-0.375rem)] shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] ring"
    >
      <div
        aria-hidden="true"
        class="bg-primary/10 absolute top-0 right-10 size-44 rounded-full blur-3xl"
      />

      <div class="relative flex items-start justify-between gap-4 px-6 py-6">
        <div>
          <p class="text-primary font-mono text-xs tracking-[0.14em]">Repository</p>
          <h3 class="text-highlighted mt-3 text-3xl leading-tight font-semibold tracking-[-0.03em]">
            Project activity.
          </h3>
          <p class="text-muted mt-3 max-w-xl text-sm leading-6 text-pretty">
            Check recent contributions, issues, and pull requests without leaving the docs.
          </p>
        </div>
        <UIcon
          name="i-lucide-activity"
          class="text-primary size-5"
        />
      </div>

      <div class="border-default/70 relative border-t p-3">
        <NuxtImg
          class="bg-muted/40 ring-default/60 mx-auto aspect-[16/7] w-full rounded-[2rem] object-contain p-3 ring"
          src="https://repobeats.axiom.co/api/embed/da99e5e9c8ddaaff68b7f57b56ae21d5e0ea2ed2.svg"
          alt="Inspira UI repository activity chart"
          width="960"
          height="420"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
