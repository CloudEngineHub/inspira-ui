<script lang="ts" setup>
import { range, select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  magnification: range(60, 40, 120),
  distance: range(140, 60, 260),
  direction: select("middle", ["top", "middle", "bottom"]),
  orientation: select("horizontal", ["horizontal", "vertical"]),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <DockDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
