# React Application Style Guide

This document serves as a comprehensive style guide for maintaining consistency across the application's UI components and pages.

## Table of Contents
1. [Design System](#design-system)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Layout](#layout)
7. [Forms](#forms)
8. [Buttons](#buttons)
9. [Navigation](#navigation)
10. [Responsive Design](#responsive-design)
11. [Accessibility](#accessibility)

## Design System

The application uses a combination of:
- **Tailwind CSS** for utility-first styling
- Custom CSS for component-specific styles
- Responsive design principles

## Colors

### Primary Colors
- **Indigo**: `#4F46E5` (Used for primary actions, links, and important UI elements)
- **Blue**: `#3B82F6` (Secondary actions and highlights)
- **Gray Scale**:
  - `#F9FAFB` (Light background)
  - `#E5E7EB` (Borders and dividers)
  - `#6B7280` (Secondary text)
  - `#1F2937` (Primary text)

### Semantic Colors
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

## Typography

### Font Family
- **Primary Font**: System UI, sans-serif
- **Monospace**: 'Courier New', Courier, monospace (for code blocks)

### Font Sizes
- **Base**: 16px (1rem)
- **Headings**:
  - h1: 2.5rem (40px)
  - h2: 2rem (32px)
  - h3: 1.5rem (24px)
  - h4: 1.25rem (20px)
  - h5: 1.125rem (18px)
  - h6: 1rem (16px)
- **Body**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semi-bold**: 600
- **Bold**: 700

## Spacing

Use the following spacing scale (based on 4px increments):
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Components

### Buttons

#### Primary Button
```jsx
<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  Primary Action
</button>
```

#### Secondary Button
```jsx
<button className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  Secondary Action
</button>
```

### Forms

#### Text Input
```jsx
<div className="mb-4">
  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
    Username
  </label>
  <input
    type="text"
    id="username"
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>
```

#### Checkbox
```jsx
<div className="flex items-center">
  <input
    id="remember-me"
    name="remember-me"
    type="checkbox"
    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
  />
  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
    Remember me
  </label>
</div>
```

## Layout

### Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content goes here */}
</div>
```

### Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

## Navigation

### Navbar
```jsx
<nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <span className="text-xl font-bold text-indigo-600">App Name</span>
      </div>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
          Home
        </a>
        {/* More nav items */}
      </div>
    </div>
  </div>
</nav>
```

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Example: Responsive Text
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

## Accessibility

### Focus States
- Always include visible focus states for interactive elements
- Use Tailwind's `focus:` and `focus-visible:` variants

### ARIA
- Use appropriate ARIA attributes for interactive elements
- Ensure all form inputs have associated labels
- Use semantic HTML elements where possible

## Best Practices

1. **Consistency**: Maintain consistent spacing, colors, and component styles
2. **Reusability**: Create reusable styled components for repeated UI elements
3. **Performance**: Optimize CSS by using Tailwind's purge option in production
4. **Documentation**: Keep this style guide updated with new components and patterns

## Custom CSS

When custom CSS is needed, follow these conventions:
- Use BEM (Block Element Modifier) naming convention
- Keep specificity low
- Document the purpose of custom styles with comments
- Place component-specific styles in the component's directory under a `css` folder

## Example Component Structure

```
src/
  components/
    Button/
      Button.tsx
      Button.css
      index.ts
  pages/
    Posts/
      Posts.tsx
      css/
        Posts.css
      components/
        PostCard.tsx
```

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Material Design System](https://material.io/design)
- [W3C Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
