<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  zoomFactor: range(1.5, 1, 3, 0.1),
  lensSize: range(170, 80, 320),
  isStatic: false,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <LensDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
