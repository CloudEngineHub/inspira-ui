<script lang="ts" setup>
import { range, select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  color1: "#0496ff",
  color2: "#ff0a54",
  animationType: select("half", ["none", "half", "full"]),
  duration: range(6, 1, 16),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <NeonBorderDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
