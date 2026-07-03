<script lang="ts" setup>
import { range, select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  visibleCards: range(4, 1, 6),
  shape: select("soft", ["soft", "sharp", "round"]),
  showDescriptions: true,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <DirectionAwareHoverDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
