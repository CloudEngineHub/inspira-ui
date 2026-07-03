<script lang="ts" setup>
import { select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  eyebrow: "Scroll driven",
  headline: "Unleash the power of",
  highlight: "Scroll Animations",
  imagePosition: select("top", ["top", "center", "bottom"]),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <ContainerScrollDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
