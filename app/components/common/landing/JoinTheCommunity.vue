<script lang="ts" setup>
const links = [
  {
    icon: "i-simple-icons-discord",
    title: "Discord",
    description: "Ask questions and share work.",
    to: `https://discord.gg/Xbh5DwJRc9`,
    target: "_blank",
  },
  {
    icon: "i-simple-icons-x",
    title: "X",
    description: "Latest release updates.",
    to: `https://x.com/rahulv_dev`,
    target: "_blank",
  },
  {
    icon: "i-simple-icons-bluesky",
    title: "Bluesky",
    description: "Project notes and updates.",
    to: `http://bsky.app/profile/inspira-ui.com`,
    target: "_blank",
  },
  {
    icon: "i-simple-icons-github",
    title: "GitHub",
    description: "Source, issues, and PRs.",
    to: `https://github.com/unovue/inspira-ui`,
    target: "_blank",
  },
];
</script>

<template>
  <div
    class="bg-elevated/45 ring-default/70 rounded-[3rem] p-1.5 shadow-[0_26px_90px_-62px_rgba(0,0,0,0.58)] ring transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:shadow-none"
  >
    <div
      class="bg-default/86 ring-default/70 rounded-[calc(3rem-0.375rem)] p-6 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--ui-text-highlighted)_8%,transparent)] ring"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-primary font-mono text-xs tracking-[0.14em]">Community</p>
          <h3 class="text-highlighted mt-3 text-2xl leading-tight font-semibold tracking-[-0.03em]">
            Stay close to the project.
          </h3>
          <p class="text-muted mt-3 text-sm leading-6 text-pretty">
            Follow the latest updates, ask questions, report issues, and share what you build.
          </p>
        </div>
        <UIcon
          name="i-lucide-users-round"
          class="text-primary size-5"
        />
      </div>

      <div
        class="border-default/70 bg-border/60 mt-5 grid gap-px overflow-hidden rounded-[2rem] border sm:grid-cols-2"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :target="link.target"
          rel="noopener noreferrer"
          class="group bg-muted/35 hover:bg-elevated/75 active:bg-elevated flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        >
          <div class="flex items-center gap-3">
            <span
              class="bg-elevated/70 text-highlighted ring-default/60 grid size-8 shrink-0 place-items-center rounded-full ring"
            >
              <UIcon
                :name="link.icon"
                class="size-4"
              />
            </span>
            <div>
              <p class="text-highlighted text-sm font-medium">
                {{ link.title }}
              </p>
              <p class="text-muted mt-0.5 text-xs leading-5">
                {{ link.description }}
              </p>
            </div>
          </div>
          <span
            class="bg-elevated/70 text-highlighted ring-default/60 grid size-8 shrink-0 place-items-center rounded-full ring transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px motion-reduce:transition-none"
          >
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-3.5"
            />
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
