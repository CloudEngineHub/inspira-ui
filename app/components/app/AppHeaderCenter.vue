<template>
  <div class="hidden w-full max-w-lg lg:block">
    <UContentSearchButton
      :collapsed="false"
      variant="subtle"
      size="sm"
      class="group bg-elevated/40 ring-default/55 hover:bg-elevated/65 h-9 w-full justify-start rounded-[1.125rem] px-3.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring transition-colors duration-150 active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100"
      :ui="{
        leadingIcon: 'size-4 text-muted transition-colors group-hover:text-default',
        label: 'text-muted font-normal',
        trailing: 'ms-auto hidden items-center gap-1 lg:flex',
      }"
    >
      <template #trailing>
        <span
          class="bg-default/60 text-dimmed ring-default/60 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[0.62rem] font-medium ring"
        >
          ⌘
        </span>
        <span
          class="bg-default/60 text-dimmed ring-default/60 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[0.62rem] font-medium ring"
        >
          K
        </span>
      </template>
    </UContentSearchButton>
  </div>
</template>
