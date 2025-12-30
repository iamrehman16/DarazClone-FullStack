import { theme } from "./theme"

export default function ThemeProvider({ children }) {
  return (
    <div
      style={{
        "--color-primary": theme.colors.primary,
        "--color-primary-hover": theme.colors.primaryHover,
        "--color-primary-light": theme.colors.primaryLight,

        "--color-text-dark": theme.colors.textDark,
        "--color-text-gray": theme.colors.textGray,

        "--color-border": theme.colors.border,
        "--color-bg-gray": theme.colors.bgGray,
        "--color-white": theme.colors.white,

        "--color-warning": theme.colors.warning,

        "--font-primary": theme.font.primary,

        "--radius-sm": theme.radius.sm,
        "--radius-md": theme.radius.md,
        "--radius-lg": theme.radius.lg,
      }}
    >
      {children}
    </div>
  )
}
