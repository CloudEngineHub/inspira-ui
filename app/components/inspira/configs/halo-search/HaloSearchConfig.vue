<script lang="ts" setup>
import { select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  hint: "Hover the field, then type.",
  height: select("md", ["sm", "md", "lg"]),
  showHint: true,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <HaloSearchDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
