<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  factor: range(0.05, 0, 0.2, 0.01),
  speed: range(50, 10, 140),
  starColor: "#ffffff",
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <StarsBackgroundDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
