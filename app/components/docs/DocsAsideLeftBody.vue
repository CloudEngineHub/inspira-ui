<script setup lang="ts">
import type { ContentNavigationItem, DocsEnCollectionItem } from "@nuxt/content";
import { motion, MotionConfig } from "motion-v";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const { nav } = useNavigation(navigation);

const route = useRoute();
const { locale, isEnabled } = useDocusI18n();
const navContainer = ref<HTMLElement | null>(null);
const hoveredKey = ref<string | null>(null);
const preferredMotion = usePreferredReducedMotion();
const trailingSlashRe = /\/$/;
const indicatorId = useId();
const reduceMotion = computed(() => preferredMotion.value === "reduce");
const navMotionTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 560,
        damping: 42,
        mass: 0.62,
      },
);
const navHoverTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 560,
        damping: 38,
        mass: 0.62,
      },
);
const navHoverInitial = computed(() =>
  reduceMotion.value ? { opacity: 0 } : { opacity: 0, scale: 0.985 },
);
const navHoverAnimate = computed(() =>
  reduceMotion.value ? { opacity: 1 } : { opacity: 1, scale: 1 },
);

const collectionName = computed(() => (isEnabled.value ? `docs_${locale.value}` : "docs"));

const { data: badgePages } = await useAsyncData(`docs_sidebar_badges_${locale.value}`, () => {
  return queryCollection(collectionName.value as any).all() as Promise<DocsEnCollectionItem[]>;
});

type StatusBadge = "New" | "Updated";

type NavItem = ContentNavigationItem & {
  "data-nav-path"?: string;
  children?: NavItem[];
  badge?: string | number | Record<string, unknown>;
  statusBadge?: StatusBadge;
  trailingIcon?: string;
};

interface NavGroup {
  key: string;
  title: string;
  items: NavItem[];
}

function normalizePath(path?: string | null) {
  if (!path) return "";
  return path.length > 1 ? path.replace(trailingSlashRe, "") : path;
}

function normalizeStatusBadge(badge?: unknown): StatusBadge | null {
  const value =
    typeof badge === "object" && badge !== null && "label" in badge
      ? (badge as { label?: unknown }).label
      : badge;

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized === "new") {
    return "New";
  }

  if (normalized === "updated") {
    return "Updated";
  }

  return null;
}

function statusBadgeClass(badge: StatusBadge) {
  return badge === "New"
    ? "bg-success/10 text-success ring-success/20"
    : "bg-warning/10 text-warning ring-warning/20";
}

const badgeByPath = computed(() => {
  const map = new Map<string, StatusBadge>();

  for (const page of badgePages.value || []) {
    const badge = normalizeStatusBadge(page.badge);

    if (page.path && badge) {
      map.set(normalizePath(page.path), badge);
    }
  }

  return map;
});

function addDataNavPath(items: ContentNavigationItem[] = []): NavItem[] {
  return items.map((item) => {
    const statusBadge =
      normalizeStatusBadge((item as NavItem).badge) ||
      badgeByPath.value.get(normalizePath(item.path));

    return {
      ...item,
      "data-nav-path": item.path,
      statusBadge,
      children: item.children ? addDataNavPath(item.children) : item.children,
    };
  });
}

function itemKey(item?: NavItem | null) {
  return normalizePath(item?.path) || item?.title || "item";
}

function isCurrent(item: NavItem) {
  return normalizePath(item.path) === normalizePath(route.path);
}

function _countLeaves(items: NavItem[] = []): number {
  return items.reduce((total, item) => {
    if (item.children?.length) {
      return total + _countLeaves(item.children);
    }

    return total + 1;
  }, 0);
}

function toGroups(items: NavItem[]): NavGroup[] {
  const looseItems: NavItem[] = [];
  const groups: NavGroup[] = [];

  for (const item of items) {
    if (item.children?.length) {
      groups.push({
        key: itemKey(item),
        title: item.title,
        items: item.children,
      });
      continue;
    }

    looseItems.push(item);
  }

  if (looseItems.length) {
    groups.unshift({
      key: "root",
      title: "",
      items: looseItems,
    });
  }

  return groups;
}

const navWithData = computed(() => addDataNavPath(nav.value));
const navGroups = computed(() => toGroups(navWithData.value));

async function scrollActiveLinkIntoView() {
  await nextTick();

  const escapedPath =
    typeof CSS !== "undefined" && CSS.escape ? CSS.escape(route.path) : route.path;
  const activeItem = navContainer.value?.querySelector<HTMLElement>(
    `[data-nav-path="${escapedPath}"], [data-nav-path="${escapedPath}/"]`,
  );

  if (!activeItem) {
    return;
  }

  const scrollParent = getScrollParent(activeItem);
  if (!scrollParent) {
    activeItem.scrollIntoView({ block: "center", inline: "nearest" });
    return;
  }

  const parentRect = scrollParent.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  const itemOffsetTop = itemRect.top - parentRect.top;
  const itemCenterOffset = itemOffsetTop + itemRect.height / 2;
  const desiredCenter = Math.max(scrollParent.clientHeight * 0.42, 160);
  const targetScrollTop = scrollParent.scrollTop + (itemCenterOffset - desiredCenter);
  const maxScrollTop = scrollParent.scrollHeight - scrollParent.clientHeight;
  const clampedScrollTop = Math.min(Math.max(0, targetScrollTop), Math.max(0, maxScrollTop));

  scrollParent.scrollTo({ top: clampedScrollTop, behavior: "auto" });
}

function getScrollParent(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element.parentElement;
  while (current) {
    const style = getComputedStyle(current);
    const overflowY = style.overflowY;
    const canScrollY =
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      current.scrollHeight > current.clientHeight;
    if (canScrollY) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

onMounted(scrollActiveLinkIntoView);

watch(() => route.path, scrollActiveLinkIntoView);
watch(navWithData, scrollActiveLinkIntoView, { deep: true });
</script>

<template>
  <MotionConfig :transition="navMotionTransition">
    <nav
      ref="navContainer"
      class="-mx-2 pb-8"
      aria-label="Documentation"
      @mouseleave="hoveredKey = null"
    >
      <div class="space-y-7">
        <section
          v-for="group in navGroups"
          :key="group.key"
          class="min-w-0"
        >
          <div
            v-if="group.title"
            class="mb-2 flex items-center justify-between gap-3 px-3"
          >
            <p
              class="text-toned truncate font-mono text-[0.65rem] font-semibold tracking-[0.22em] uppercase"
            >
              {{ group.title }}
            </p>
          </div>

          <div class="space-y-1">
            <template
              v-for="link in group.items"
              :key="link.path || link.title"
            >
              <ULink
                v-if="!link.children?.length"
                :to="link.path"
                :target="link.target as string"
                class="group/link focus-visible:text-highlighted relative isolate flex min-h-9 items-center gap-3 overflow-hidden rounded-full px-3 py-1.5 text-[0.8125rem] leading-5 tracking-[-0.01em] transition-[color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100"
                :class="isCurrent(link) ? 'text-highlighted' : 'text-muted hover:text-highlighted'"
                :aria-current="isCurrent(link) ? 'page' : undefined"
                :data-current="isCurrent(link) ? true : undefined"
                :data-nav-path="link['data-nav-path']"
                @mouseenter="hoveredKey = itemKey(link)"
                @blur="hoveredKey = null"
              >
                <motion.span
                  v-if="isCurrent(link)"
                  :layout-id="`${indicatorId}-active`"
                  class="bg-elevated/90 ring-default/70 pointer-events-none absolute inset-0 rounded-full shadow-[0_18px_44px_-34px_rgba(0,0,0,0.75)] ring"
                  :transition="navMotionTransition"
                />

                <motion.span
                  v-else-if="hoveredKey === itemKey(link)"
                  :layout-id="`${indicatorId}-hover`"
                  class="bg-elevated/45 ring-default/40 pointer-events-none absolute inset-0 rounded-full ring"
                  :initial="navHoverInitial"
                  :animate="navHoverAnimate"
                  :transition="navHoverTransition"
                />

                <span
                  class="relative size-1.5 shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none"
                  :class="
                    isCurrent(link)
                      ? 'bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--ui-primary)_18%,transparent),0_0_18px_color-mix(in_oklab,var(--ui-primary)_72%,transparent)]'
                      : 'bg-muted/70 group-hover/link:bg-primary/40'
                  "
                />

                <span
                  class="relative min-w-0 truncate font-medium"
                  :class="isCurrent(link) ? 'font-semibold tracking-[-0.015em]' : undefined"
                >
                  {{ link.title }}
                  <UIcon
                    v-if="link.target === '_blank'"
                    name="i-lucide-external-link"
                    class="text-dimmed ml-1 inline-block size-3 align-top"
                  />
                </span>

                <span
                  v-if="link.statusBadge || link.trailingIcon"
                  class="relative ms-auto inline-flex items-center gap-1.5"
                >
                  <span
                    v-if="link.statusBadge"
                    class="rounded-full px-1.5 py-0.5 font-mono text-[0.54rem] font-semibold tracking-[0.12em] uppercase ring"
                    :class="statusBadgeClass(link.statusBadge)"
                  >
                    {{ link.statusBadge }}
                  </span>
                  <UIcon
                    v-if="link.trailingIcon"
                    :name="link.trailingIcon"
                    class="text-muted group-hover/link:text-toned size-4 shrink-0"
                  />
                </span>
              </ULink>

              <div
                v-else
                class="mt-5"
              >
                <p
                  class="text-toned mb-2 px-3 font-mono text-[0.65rem] font-semibold tracking-[0.22em] uppercase"
                >
                  {{ link.title }}
                </p>
                <div class="space-y-1">
                  <ULink
                    v-for="child in link.children"
                    :key="child.path || child.title"
                    :to="child.path"
                    :target="child.target as string"
                    class="group/link focus-visible:text-highlighted relative isolate flex min-h-9 items-center gap-3 overflow-hidden rounded-full px-3 py-1.5 text-[0.8125rem] leading-5 tracking-[-0.01em] transition-[color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100"
                    :class="
                      isCurrent(child) ? 'text-highlighted' : 'text-muted hover:text-highlighted'
                    "
                    :aria-current="isCurrent(child) ? 'page' : undefined"
                    :data-current="isCurrent(child) ? true : undefined"
                    :data-nav-path="child['data-nav-path']"
                    @mouseenter="hoveredKey = itemKey(child)"
                    @blur="hoveredKey = null"
                  >
                    <motion.span
                      v-if="isCurrent(child)"
                      :layout-id="`${indicatorId}-active`"
                      class="bg-elevated/90 ring-default/70 pointer-events-none absolute inset-0 rounded-full shadow-[0_18px_44px_-34px_rgba(0,0,0,0.75)] ring"
                      :transition="navMotionTransition"
                    />

                    <motion.span
                      v-else-if="hoveredKey === itemKey(child)"
                      :layout-id="`${indicatorId}-hover`"
                      class="bg-elevated/45 ring-default/40 pointer-events-none absolute inset-0 rounded-full ring"
                      :initial="navHoverInitial"
                      :animate="navHoverAnimate"
                      :transition="navHoverTransition"
                    />

                    <span
                      class="relative size-1.5 shrink-0 rounded-full transition-colors duration-150 motion-reduce:transition-none"
                      :class="
                        isCurrent(child)
                          ? 'bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--ui-primary)_18%,transparent),0_0_18px_color-mix(in_oklab,var(--ui-primary)_72%,transparent)]'
                          : 'bg-muted/70 group-hover/link:bg-primary/40'
                      "
                    />
                    <span
                      class="relative min-w-0 truncate font-medium"
                      :class="isCurrent(child) ? 'font-semibold tracking-[-0.015em]' : undefined"
                    >
                      {{ child.title }}
                    </span>

                    <span
                      v-if="child.statusBadge || child.trailingIcon"
                      class="relative ms-auto inline-flex items-center gap-1.5"
                    >
                      <span
                        v-if="child.statusBadge"
                        class="rounded-full px-1.5 py-0.5 font-mono text-[0.54rem] font-semibold tracking-[0.12em] uppercase ring"
                        :class="statusBadgeClass(child.statusBadge)"
                      >
                        {{ child.statusBadge }}
                      </span>
                      <UIcon
                        v-if="child.trailingIcon"
                        :name="child.trailingIcon"
                        class="text-muted group-hover/link:text-toned size-4 shrink-0"
                      />
                    </span>
                  </ULink>
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>
    </nav>
  </MotionConfig>
</template>
