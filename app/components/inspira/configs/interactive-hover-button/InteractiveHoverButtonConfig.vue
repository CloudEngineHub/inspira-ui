<script lang="ts" setup>
const config = useDialKit("", {
  text: "Button",
  wide: false,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <InteractiveHoverButtonDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
