<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  title: "Trusted by Companies like",
  visibleLogos: range(8, 3, 8),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <IconLogoCloudDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
