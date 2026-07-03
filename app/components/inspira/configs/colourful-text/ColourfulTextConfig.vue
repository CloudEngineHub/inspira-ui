<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  text: "The best",
  highlight: "components",
  duration: range(0.5, 0.1, 2, 0.1),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <ColourfulTextDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
