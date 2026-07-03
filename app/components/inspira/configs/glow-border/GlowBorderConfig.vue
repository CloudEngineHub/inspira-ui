<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  borderRadius: range(10, 0, 40),
  borderWidth: range(2, 1, 8),
  duration: range(10, 2, 24),
  color1: "#A07CFE",
  color2: "#FE8FB5",
  color3: "#FFBE7B",
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <GlowBorderDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
