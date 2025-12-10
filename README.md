# Mario Maker Celebration (MMC)

A React Server Components (RSC) powered website showcasing the best Mario Makers from around the world.

[Official site](https://mmcelebration.com) | [Latest (GitHub Pages)](https://nicobrinkkemper.github.io/mmc)

## Featured Projects

- [4YMM](https://mmcelebration.com/4ymm)
- [5YMM](https://mmcelebration.com/5ymm)
- [6YMM](https://mmcelebration.com/6ymm)
- [7MMC](https://mmcelebration.com/7mmc)
- [8MMC](https://mmcelebration.com/8mmc)
- [9MMC](https://mmcelebration.com/9mmc)

## Architecture

This project uses:
- React Server Components (RSC) for server-side rendering
- Vite for development and bundling
- TypeScript for type safety
- CSS Modules for styling
- Custom RSC streaming implementation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Project Structure

```
.
├── src/
│   ├── page/           # Page components and routing
│   ├── components/     # Shared components
│   ├── data/          # Data fetching and management
│   ├── css/           # Global and theme styles
│   └── config/        # Configuration files
├── vite/              # Vite plugins and config
│   └── vite-react-stream/  # RSC streaming implementation
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## Key Features

### React Server Components
- Server-side rendering with streaming
- Client-side hydration
- Automatic CSS collection and injection
- Custom RSC implementation using `react-server-dom-esm`

### Theming System
Each theme includes:
- Custom CSS variables
- Theme-specific components
- Dedicated routing
- Asset management

### Data Management
- Google Sheets integration for content
- Automatic image optimization
- Type-safe data fetching
- Cached data generation

## Build Process

1. **Development**
   - `npm run start`: Starts Vite dev server with RSC support
   - Hot Module Replacement (HMR) enabled
   - CSS Modules with automatic typing

2. **Production Build**
   - `npm run build`: Creates optimized production build
   - RSC payload generation
   - Static asset optimization
   - CSS minification

3. **Static Export**
   - `npm run export`: Generates static HTML
   - Pre-renders all routes
   - Optimizes assets
   - Creates RSC payloads

## Configuration

### Environment Variables (optional)
These can be used to override or pre-set the server and client URLs.
```env
VITE_PUBLIC_ORIGIN=https://mmcelebration.com
```
or simply run `npm run build`
Above config is for production builds.
For github pages it's
```env
VITE_BASE_URL=/mmc/
VITE_PUBLIC_ORIGIN=https://nicobrinkkemper.github.io
```
or simply run `npm run build:gh`
If you want to see how it looks like locally, including favicons, etc,
The config is
```
VITE_PUBLIC_ORIGIN=http://localhost:4137
```
Or simply run `npm run preview`

Setting NODE_ENV to development will show any error and stacktraces in the console.

### Adding New Themes

1. Add theme configuration in `src/config/themeConfig.ts`:
```typescript
createConfig({
    theme: "new_theme",
    gid: "spreadsheet_gid",
    weekTrailers: ["video_id1", "video_id2"],
})
```

2. Create theme assets:
```
public/new_theme/
├── level/      # Level screenshots
├── maker/      # Maker avatars
└── batch/      # Batch images
```

3. Add theme styles in `src/css/new_theme.module.css`

4. Add theme content in `src/content/new_theme.tsx`

5. Add new theme to the barrel files (index.ts)
 - 

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
