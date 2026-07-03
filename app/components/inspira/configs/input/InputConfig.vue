<script lang="ts" setup>
const config = useDialKit("", {
  label: "Hover over below input",
  placeholder: "Hover over me",
  wide: false,
});
</script>

<template>
  <ComponentPlayground>
    <template #config>
      <DialKitConfigPanel />
    </template>

    <template #component>
      <InputDemo v-bind="config" />
    </template>
  </ComponentPlayground>
</template>
