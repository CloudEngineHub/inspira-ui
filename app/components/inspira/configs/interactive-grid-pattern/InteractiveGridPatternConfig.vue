<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  text: "Interactive Grid Pattern",
  width: range(40, 16, 80),
  height: range(40, 16, 80),
  columns: range(24, 8, 48),
  rows: range(24, 8, 48),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <InteractiveGridPatternDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
