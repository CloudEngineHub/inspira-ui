<script lang="ts" setup>
import { select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  title: "Inspira UI",
  rotate: select("y", ["x", "y"]),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <FlipCardDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
