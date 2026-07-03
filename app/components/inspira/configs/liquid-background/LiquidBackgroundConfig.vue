<script lang="ts" setup>
import { select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  label: "Liquid background",
  height: select("md", ["sm", "md", "lg"]),
  rounded: select("lg", ["none", "lg", "xl"]),
  showLabel: true,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <LiquidBackgroundDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
