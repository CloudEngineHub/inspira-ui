<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  text: "INSPIRA",
  fontSize: range(20, 8, 36),
  fontWeight: range(700, 100, 900, 100),
  autoPlay: true,
  muted: true,
  loop: true,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <VideoTextDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
