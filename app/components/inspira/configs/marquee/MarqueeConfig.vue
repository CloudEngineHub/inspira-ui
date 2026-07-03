<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  pauseOnHover: true,
  reverseSecondRow: true,
  repeat: range(4, 1, 8),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <MarqueeDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
