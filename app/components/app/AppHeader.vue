<script setup lang="ts">
const appConfig = useAppConfig();
const site = useSiteConfig();

const { localePath, isEnabled, locales } = useDocusI18n();

const links = computed(() =>
  appConfig.github && appConfig.github.url
    ? [
        {
          icon: "i-simple-icons-github",
          to: appConfig.github.url,
          target: "_blank",
          "aria-label": "GitHub",
        },
      ]
    : [],
);
</script>

<template>
  <UHeader
    :ui="{
      root: 'border-b border-default/60 bg-default/70 backdrop-blur-xl',
      container: 'gap-3',
      left: 'lg:flex-1 flex items-center gap-2',
      center: 'hidden flex-1 justify-center lg:flex',
      right: 'flex items-center justify-end lg:flex-1 gap-1.5',
      title:
        'rounded-full transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
      toggle: 'lg:hidden',
      body: 'bg-default/95 p-4 sm:p-6',
    }"
    :to="localePath('/')"
    :title="appConfig.header?.title || site.name"
    mode="drawer"
    class="shadow-[0_1px_0_rgba(255,255,255,0.03)]"
  >
    <AppHeaderCenter />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />

      <template v-if="isEnabled && locales.length > 1">
        <ClientOnly>
          <LanguageSelect />

          <template #fallback>
            <div class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </template>
        </ClientOnly>

        <USeparator
          orientation="vertical"
          class="h-8"
        />
      </template>

      <UContentSearchButton
        class="bg-elevated/45 ring-default/60 hover:bg-elevated/70 rounded-full ring transition-colors duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 lg:hidden"
        :ui="{ leadingIcon: 'size-4' }"
      />

      <ClientOnly>
        <UColorModeButton
          color="neutral"
          variant="ghost"
          class="bg-elevated/45 ring-default/60 hover:bg-elevated/70 rounded-full ring transition-colors duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
        />

        <template #fallback>
          <div class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          class="bg-elevated/45 ring-default/60 hover:bg-elevated/70 rounded-full ring transition-colors duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
          :ui="{ leadingIcon: 'size-4' }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>
  </UHeader>
</template>
