---
# Tokens are copied from the current styles.css, not an external design reference.
color-primary: "#7c3aed"
color-accent: "#5b21b6"
color-background: "#f8fafc"
color-panel: "#ffffff"
color-text: "#1e293b"
color-muted: "#64748b"
color-success: "#166534"
color-danger: "#b91c1c"
font-body: "system-ui, sans-serif"
font-heading: "system-ui, sans-serif"
font-size-min: "12px"
space-unit: "4px nominal"
radius-control: "8px"
radius-task: "12px"
radius-panel: "16px"
---

# STYLE.md

This records the current application styles. Contrast values were calculated using the WCAG relative-luminance formula; all listed text pairs meet the 4.5:1 AA threshold for normal text.

## Rationale

- **color-primary** is the button fill; white button text has a 5.70:1 ratio.
- **color-accent** is used for eyebrow text and hover fills; it has an 8.59:1 ratio on the page background and 8.98:1 on panels. White text on the hover fill is 8.98:1.
- **color-background** is the page canvas and **color-panel** is the content surface.
- **color-text** is primary copy and has ratios of 13.98:1 on the page and 14.63:1 on panels.
- **color-muted** is used for secondary details; its lowest measured ratio is 4.55:1 on the page.
- **color-success** and **color-danger** are feedback text colors and both exceed 6:1 on the page and panel surfaces.
- **font-body / font-heading** use the existing system UI stack; headings inherit the body family.
- **font-size-min** is 12px because the current uppercase eyebrow is 0.78rem (about 12.5px at a 16px root); task details are 0.9rem (14.4px).
- **space-unit** is a nominal 4px; the existing CSS also uses nonmultiples such as 0.35rem and 0.7rem.
- **radius-control**, **radius-task**, and **radius-panel** record the existing 8px controls, 12px task items, and 16px panels.

## Contrast pairs

| Text | Background | Ratio |
|---|---|---:|
| `#1e293b` primary text | `#f8fafc` page | 13.98:1 |
| `#1e293b` primary text | `#ffffff` panel | 14.63:1 |
| `#64748b` muted text | `#f8fafc` page | 4.55:1 |
| `#64748b` muted text | `#ffffff` panel | 4.76:1 |
| `#5b21b6` eyebrow text | `#f8fafc` page | 8.59:1 |
| `#5b21b6` eyebrow text | `#ffffff` panel | 8.98:1 |
| `#ffffff` button text | `#7c3aed` button | 5.70:1 |
| `#ffffff` button text | `#5b21b6` button hover | 8.98:1 |
| `#166534` success text | `#f8fafc` page | 6.81:1 |
| `#166534` success text | `#ffffff` panel | 7.13:1 |
| `#b91c1c` danger text | `#f8fafc` page | 6.18:1 |
| `#b91c1c` danger text | `#ffffff` panel | 6.47:1 |
| `#ffffff` delete-button hover text | `#b91c1c` danger fill | 6.47:1 |

## Refusals

1. No body-size text pair below 4.5:1 contrast; current measured pairs satisfy WCAG AA.
2. No decorative dependence on color alone for form labels; inputs retain visible text labels.

## Sources

- Current interface: `styles.css` and `index.html` in this repository.
- No external admired or resented interface was supplied or used as a source.
- Browser-native placeholder and input-control colors are not explicit CSS tokens and were not measured; verify those in the target browsers.
