<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  width: range(400, 160, 640, 20),
  height: range(200, 100, 360, 10),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <LinkPreviewDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
