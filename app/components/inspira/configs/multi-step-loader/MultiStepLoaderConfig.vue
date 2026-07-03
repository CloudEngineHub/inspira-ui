<script lang="ts" setup>
import { range, select } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  mode: select("simple", ["simple", "async"]),
  defaultDuration: range(1500, 500, 4000, 100),
  preventClose: true,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <MultiStepLoaderDemo v-bind="config as any" />
    </template>
  </ComponentPlayground>
</template>
