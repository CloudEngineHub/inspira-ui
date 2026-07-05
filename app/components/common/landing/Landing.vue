<script lang="ts" setup>
import { Motion } from "motion-v";

const preferredMotion = usePreferredReducedMotion();
const reduceMotion = computed(() => preferredMotion.value === "reduce");
const proofInitial = computed(() => (reduceMotion.value ? false : { opacity: 0, y: 40 }));
const proofInView = { opacity: 1, y: 0 };
const proofTransition = computed(() =>
  reduceMotion.value
    ? { duration: 0 }
    : {
        duration: 0.76,
        ease: [0.16, 1, 0.3, 1],
      },
);
</script>

<template>
  <div class="text-highlighted relative isolate overflow-hidden pt-8 pb-24 sm:pt-12">
    <div
      aria-hidden="true"
      class="bg-primary/6 pointer-events-none absolute top-[30rem] left-1/2 size-[30rem] -translate-x-1/2 rounded-full blur-3xl"
    />

    <Hero />
    <QuickLinks />

    <Motion
      as="section"
      class="relative mt-28 sm:mt-40"
      :initial="proofInitial"
      :while-in-view="proofInView"
      :transition="proofTransition"
      :viewport="{ once: true, amount: 0.18 }"
    >
      <div
        aria-hidden="true"
        class="from-default via-border/70 to-default absolute -top-10 left-1/2 h-px w-screen -translate-x-1/2 bg-linear-to-r"
      />

      <div class="max-w-3xl">
        <h2
          class="text-highlighted max-w-2xl text-4xl leading-[0.96] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
        >
          Built in public, supported by the community.
        </h2>
        <p class="text-muted mt-5 max-w-2xl text-base leading-7 text-pretty">
          See project activity, sponsorship, community links, and the people helping Inspira UI
          grow.
        </p>
      </div>

      <div class="mt-10 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <RepoStats />
        <div class="grid gap-4">
          <SupportUs />
          <JoinTheCommunity />
        </div>
      </div>

      <div class="mt-4">
        <ThanksSupporters />
      </div>
    </Motion>
  </div>
</template>
