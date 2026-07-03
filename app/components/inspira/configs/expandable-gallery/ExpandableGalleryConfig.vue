<script lang="ts" setup>
import { range } from "../../../common/dial-kit/dialkit-controls";

const config = useDialKit("", {
  visibleImages: range(4, 2, 4),
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <ExpandableGalleryDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
