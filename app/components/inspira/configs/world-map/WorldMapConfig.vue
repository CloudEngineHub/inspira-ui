<script lang="ts" setup>
const config = useDialKit("", {
  lineColor: "#0EA5E9",
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <WorldMapDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
