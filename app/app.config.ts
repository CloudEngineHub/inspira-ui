export default defineAppConfig({
  ui: {
    colors: {
      neutral: "zinc",
    },
    header: {
      slots: {
        root: "bg-default/70 border-b border-default/60 backdrop-blur-xl",
      },
    },
    contentSearchButton: {
      slots: {
        base: "transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
      },
    },
    contentSearch: {
      slots: {
        modal:
          "h-[min(36rem,calc(100dvh-2rem))] overflow-hidden rounded-[2rem] bg-default/50 p-1.5 ring ring-default/70 shadow-[0_30px_120px_-70px_rgba(0,0,0,0.9)] backdrop-blur-lg sm:max-w-2xl",
        input: "",
      },
    },
    commandPalette: {
      slots: {
        root: "h-full min-h-0 divide-y-0 overflow-hidden rounded-[1.625rem] ring ring-default/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-1.5",
        input:
          "m-1 rounded-[1.25rem] border-b-0 bg-elevated/25 px-2 ring ring-default/45 [&_input]:h-13 [&_input]:text-sm [&_input]:placeholder:text-muted",
        close:
          "rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95",
        content: "min-h-0",
        viewport: "space-y-1 px-2 pb-2 pt-1",
        group: "space-y-1 p-1",
        label: "px-3 pt-3 pb-2 text-[0.65rem] font-semibold tracking-[0.18em] text-toned uppercase",
        item: "rounded-2xl px-3 py-2.5 transition-colors duration-100 before:rounded-2xl before:transition-colors before:duration-100 data-highlighted:not-data-disabled:before:bg-elevated/60",
        itemLeadingIcon: "size-4",
        itemLabel: "text-sm",
        itemLabelBase:
          "text-highlighted [&>mark]:rounded-sm [&>mark]:bg-primary [&>mark]:text-inverted",
        itemDescription: "text-xs text-muted",
      },
    },
    formField: {
      slots: {
        wrapper: "w-full",
        container: "max-w-32 w-full flex items-center justify-end",
      },
    },
    switch: {
      slots: {
        root: "justify-end",
      },
    },
  },

  header: {
    title: "Inspira UI",
    logo: {
      light: "https://cdn.inspira-ui.com/logo.svg",
      dark: "https://cdn.inspira-ui.com/logo-dark.svg",
    },
  },

  socials: {
    discord: "https://discord.gg/Xbh5DwJRc9",
    x: "https://x.com/rahulv_dev",
    bluesky: "http://bsky.app/profile/inspira-ui.com",
  },

  toc: {
    title: "On This Page",
    bottom: {
      title: "Community",
      links: [
        {
          label: "Star on Github",
          icon: "lucide:star",
          to: "https://github.com/unovue/inspira-ui",
          target: "_blank",
        },
        {
          label: "Create Issue",
          icon: "lucide:circle-dot",
          to: "https://github.com/unovue/inspira-ui/issues",
          target: "_blank",
        },
        {
          label: "Join Discord",
          icon: "ri:discord-line",
          to: "https://discord.gg/Xbh5DwJRc9",
          target: "_blank",
        },
        {
          label: "Forum",
          icon: "lucide:newspaper",
          to: "https://github.com/unovue/inspira-ui/discussions",
          target: "_blank",
        },
        {
          label: "Follow on X",
          icon: "prime:twitter",
          to: "https://x.com/rahulv_dev",
          target: "_blank",
        },
        {
          label: "Follow On Bluesky",
          icon: "ri:bluesky-line",
          to: "http://bsky.app/profile/inspira-ui.com",
          target: "_blank",
        },
      ],
    },
  },
});
