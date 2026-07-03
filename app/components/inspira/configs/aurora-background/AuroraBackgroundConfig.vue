<script lang="ts" setup>
import { useDialKit } from "dialkit/vue";

const config = useDialKit("", {
  radialGradient: true,
  title: "Background lights are cool you know.",
  subtitle: "And this, is chemical burn.",
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <AuroraBackgroundDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
