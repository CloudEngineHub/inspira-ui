<script lang="ts" setup>
const config = useDialKit("", {
  text: "Making UI beautiful using Inspira UI.",
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <TextScrollRevealDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
