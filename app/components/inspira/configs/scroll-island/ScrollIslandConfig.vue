<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  title: "Scroll Island",
  height: range(44, 36, 64),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <ScrollIslandDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
