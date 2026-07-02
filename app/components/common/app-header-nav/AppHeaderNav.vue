<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui/utils/content";

const route = useRoute();

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const items = computed(() =>
  mapContentNavigation(
    navigation?.value.map((item) => ({ ...item, children: undefined })) ?? [],
  )?.map((item) => ({
    ...item,
    active: route.path.startsWith(item.to as string),
  })),
);
</script>

<template>
  <nav
    class="sticky top-[calc(var(--ui-header-height)+0.75rem)] z-40 hidden justify-center py-3 lg:flex"
    aria-label="Primary navigation"
  >
    <div
      class="bg-default/20 ring-default/65 rounded-full p-2 shadow-[0_18px_70px_-55px_rgba(0,0,0,0.8)] ring backdrop-blur-lg"
    >
      <UNavigationMenu
        :items="items"
        color="neutral"
        variant="pill"
        :highlight="false"
        :ui="{
          root: 'items-center',
          list: 'gap-1',
          item: 'py-0',
          link: 'rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-[color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] before:rounded-full before:transition-[background-color,opacity,transform] before:duration-300 before:ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]',
        }"
      />
    </div>
  </nav>
</template>
