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
          "h-[min(38rem,calc(100dvh-2rem))] overflow-hidden rounded-none border border-default/70 bg-default/85 shadow-[0_32px_120px_-72px_rgba(0,0,0,0.82)] backdrop-blur-2xl sm:max-w-3xl",
        input: "",
      },
    },
    commandPalette: {
      slots: {
        root: "h-full min-h-0 divide-y-0 overflow-hidden bg-transparent",
        input:
          "border-default/70 border-b bg-elevated/20 px-4 [&_input]:h-14 [&_input]:text-sm [&_input]:placeholder:text-muted",
        close:
          "rounded-none transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-elevated/60 active:scale-95",
        content: "min-h-0 bg-transparent",
        viewport: "divide-default/60 divide-y px-4 pb-4",
        group: "py-2",
        label: "px-3 py-3 text-[0.68rem] font-semibold tracking-[0.16em] text-toned uppercase",
        item: "rounded-none px-3 py-3 transition-colors duration-200 before:rounded-none before:transition-colors before:duration-200 data-highlighted:not-data-disabled:before:bg-elevated/55",
        itemLeadingIcon: "size-4",
        itemLabel: "text-sm",
        itemLabelBase: "text-highlighted [&>mark]:bg-primary [&>mark]:text-inverted",
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
