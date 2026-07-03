<script lang="ts" setup>
import { select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  label: "Inspira UI",
  tone: select("dark", ["dark", "slate", "warm"]),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <GlareCardDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
