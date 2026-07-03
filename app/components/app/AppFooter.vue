<script setup lang="ts">
const appConfig = useAppConfig();
const { localePath } = useDocusI18n();

const year = new Date().getFullYear();

const footerLinks = computed(() => [
  { label: "Getting Started", to: localePath("/getting-started") },
  { label: "Components", to: localePath("/components") },
  { label: "Changelog", to: localePath("/changelogs") },
  { label: "Pro", to: "https://pro.inspira-ui.com", target: "_blank" },
]);

const socialLinks = computed(() =>
  [
    ...Object.entries(appConfig.socials || {}).map(([key, url]) => ({
      icon: `i-simple-icons-${key}`,
      to: url as string,
      target: "_blank",
      "aria-label": `${key} social link`,
    })),
    appConfig.github?.url && {
      icon: "i-simple-icons-github",
      to: appConfig.github.url,
      target: "_blank",
      "aria-label": "GitHub repository",
    },
  ].filter(Boolean),
);
</script>

<template>
  <footer class="border-default/70 bg-elevated/35 relative overflow-hidden border-t py-8 lg:py-10">
    <span
      class="bg-info/10 pointer-events-none absolute -top-24 right-10 size-72 rounded-full blur-3xl"
    />
    <UContainer class="overflow-hidden">
      <div class="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:items-end">
        <div>
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center gap-3"
            aria-label="Inspira UI home"
          >
            <AppHeaderLogo class="h-6 w-auto shrink-0" />
            <span class="text-highlighted text-sm font-semibold">Inspira UI</span>
          </NuxtLink>
          <p class="text-muted mt-4 max-w-sm text-sm leading-6">
            Animated Vue and Nuxt components to build beautiful websites using Vue & Nuxt.
          </p>
        </div>

        <nav
          class="flex flex-wrap gap-2 lg:justify-center"
          aria-label="Footer navigation"
        >
          <UButton
            v-for="link in footerLinks"
            :key="link.label"
            v-bind="link"
            color="neutral"
            variant="ghost"
            size="sm"
            class="text-muted hover:text-highlighted rounded-full px-3 transition-colors duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
          />
        </nav>

        <div class="flex items-center gap-2 lg:justify-end">
          <UButton
            v-for="(link, index) in socialLinks"
            :key="index"
            v-bind="link"
            color="neutral"
            variant="ghost"
            size="sm"
            class="bg-elevated/45 ring-default/60 hover:bg-elevated/70 rounded-full ring transition-colors duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
            :ui="{ leadingIcon: 'size-4' }"
          />
          <ClientOnly>
            <UColorModeButton
              color="neutral"
              variant="ghost"
              size="sm"
              class="bg-elevated/45 ring-default/60 hover:bg-elevated/70 rounded-full ring transition-colors duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
            />
            <template #fallback>
              <div class="bg-elevated/45 ring-default/60 size-8 rounded-full ring" />
            </template>
          </ClientOnly>
        </div>
      </div>

      <div
        class="border-default/60 text-dimmed relative mt-6 flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
      >
        <span>Copyright © {{ year }}</span>
        <span>Open source, community built, Vue first.</span>
      </div>
    </UContainer>
  </footer>
</template>
