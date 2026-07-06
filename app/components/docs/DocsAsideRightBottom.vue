<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { t } = useDocusI18n();
const { isEnabled, open } = useAssistant();

const showAd = useMediaQuery("(min-width: 1024px)");

const pageUrl = computed(() => route.path);
const showExplainWithAi = computed(() => {
  return isEnabled.value && appConfig.assistant?.explainWithAi !== false;
});

const explainIcon = computed(() => appConfig.assistant?.icons?.explain || "i-lucide-brain");
const communityLabels: Record<string, string> = {
  "Star on Github": "GitHub",
  "Create Issue": "Issues",
  "Join Discord": "Discord",
};

const communityLinks = computed(() => {
  return (appConfig.toc?.bottom?.links ?? [])
    .filter((link) =>
      ["Star on Github", "Join Discord", "Create Issue", "Forum"].includes(link.label),
    )
    .map((link) => ({
      ...link,
      label: communityLabels[link.label] ?? link.label,
    }));
});
</script>

<template>
  <div class="hidden lg:flex lg:flex-col lg:gap-3">
    <div
      v-if="showExplainWithAi"
      class="bg-elevated/35 ring-default/55 rounded-[1.5rem] p-1 ring"
    >
      <UButton
        :icon="explainIcon"
        :label="t('assistant.explainWithAi')"
        block
        color="neutral"
        variant="ghost"
        size="sm"
        class="h-10 justify-start rounded-[1.25rem] px-3 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
        :ui="{ leadingIcon: 'size-4 text-muted', label: 'font-medium' }"
        @click="open(`Explain the page ${pageUrl}`, true)"
      />
    </div>

    <div
      v-if="communityLinks.length"
      class="bg-elevated/35 ring-default/60 rounded-[1.75rem] p-1 ring"
    >
      <div class="rounded-[calc(1.75rem-0.25rem)] p-3">
        <div class="flex items-center justify-between gap-3 px-1 pb-2.5">
          <div
            class="text-toned font-mono text-[0.62rem] font-semibold tracking-[0.18em] uppercase"
          >
            Community
          </div>
        </div>

        <div class="grid gap-1.5">
          <UButton
            v-for="link in communityLinks"
            :key="link.label"
            v-bind="link"
            color="neutral"
            variant="soft"
            size="sm"
            class="group h-8 justify-start rounded-xl px-2.5 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-px active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
            :ui="{
              leadingIcon: 'size-4 text-muted group-hover:text-toned',
              label: 'truncate text-left text-xs font-medium',
            }"
          />
        </div>
      </div>
    </div>

    <InspiraProUpsell />

    <HireTheCreator />

    <ClientOnly v-if="showAd">
      <InspiraCarbonAds
        class="bg-elevated/35 text-default ring-default/60 w-full rounded-[1.75rem] border-0 ring dark:bg-white/[0.035]"
      />
    </ClientOnly>
  </div>
</template>
