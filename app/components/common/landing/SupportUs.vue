<template>
  <div class="flex h-full flex-col px-1 py-8 sm:px-8 sm:py-10 lg:px-0">
    <div class="flex items-start justify-between gap-6">
      <div>
        <h3 class="text-highlighted text-2xl leading-tight font-semibold tracking-[-0.03em]">
          Keep Inspira UI growing.
        </h3>
      </div>
      <UIcon
        name="i-lucide-heart"
        class="text-toned size-5 shrink-0"
      />
    </div>

    <p class="text-muted mt-4 max-w-md text-sm leading-6 text-pretty">
      Sponsorship keeps docs, examples, bug fixes, and new Vue/Nuxt components moving.
    </p>

    <NuxtLink
      to="https://github.com/sponsors/rahul-vashishtha"
      target="_blank"
      rel="noopener noreferrer"
      class="group bg-primary text-inverted focus-visible:ring-primary mt-8 flex min-h-12 items-center justify-between px-5 text-sm font-medium transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] motion-reduce:transition-none lg:mt-auto"
    >
      Become a sponsor
      <UIcon
        name="i-lucide-arrow-up-right"
        class="size-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </NuxtLink>
  </div>
</template>
