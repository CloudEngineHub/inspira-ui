<script lang="ts" setup>
import { shaderToyControls } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit(shaderToyControls());
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <StractiumBackgroundDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
