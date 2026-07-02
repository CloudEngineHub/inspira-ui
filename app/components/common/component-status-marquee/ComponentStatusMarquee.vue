<script lang="ts" setup>
import type { DocsEnCollectionItem } from "@nuxt/content";

const props = defineProps<{
  class?: string;
  inline?: boolean;
}>();

const { locale, isEnabled } = useDocusI18n();

const collectionName = computed(() => (isEnabled.value ? `docs_${locale.value}` : "docs"));

const { data: components } = await useAsyncData("new_component_collection", () => {
  return queryCollection(collectionName.value as any).all() as Promise<DocsEnCollectionItem[]>;
});

const path = `/${locale.value}/components`;

components.value = components.value
  ?.filter((c) => c.path.startsWith(path) && c.path !== path)
  .filter((component) => component.badge?.toLowerCase() === "new");

const releaseLabel = computed(() =>
  components.value && components.value.length > 1
    ? "New Components Released:"
    : "New Component Released:",
);
</script>

<template>
  <div
    v-if="components && components?.length"
    class="z-20"
    :class="[props.inline ? 'relative' : 'absolute inset-x-0 top-0 mt-16', props.class]"
  >
    <UMarquee
      class="border-default/60 bg-elevated/45 text-muted h-11 border-y shadow-[0_18px_80px_-72px_rgba(0,0,0,0.9)] backdrop-blur-xl [--duration:28s] [--gap:--spacing(10)]"
      :overlay="true"
      pause-on-hover
    >
      <div class="mx-8 flex items-center gap-3 text-sm whitespace-nowrap">
        <span
          class="text-primary text-base leading-none"
          aria-hidden="true"
        >
          ✦
        </span>
        <span class="text-highlighted font-semibold">
          {{ releaseLabel }}
        </span>
        <span
          v-for="(component, index) in components"
          :key="component.title"
          class="flex items-center gap-3"
        >
          <NuxtLink
            :to="component.path"
            class="text-muted hover:text-highlighted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {{ component.title }}
          </NuxtLink>
          <span
            v-if="index !== components.length - 1"
            class="bg-primary/75 size-1 rounded-full"
          />
        </span>
        <span
          class="text-primary text-base leading-none"
          aria-hidden="true"
        >
          ✦
        </span>
      </div>
    </UMarquee>
  </div>
</template>
