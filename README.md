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
- React Server Components (RSC) via [`vite-plugin-react-server`](https://github.com/nicobrinkkemper/vite-plugin-react-server)
- Vite for development and bundling
- TypeScript for type safety
- CSS Modules for styling

## Development

```bash
# Install dependencies
npm install

# Start dev server (RSC mode — requires --conditions=react-server)
npm run dev:rsc

# Or start dev server in plain SSR mode
npm run dev:ssr

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
│   ├── data/           # Data fetching and management
│   ├── css/            # Global and theme styles
│   └── config/         # Configuration files
├── public/             # Static assets
├── scripts/            # Build/deploy scripts (e.g. FTP deploy)
├── startup/            # Build-time data fetch / image generation
├── types/              # TypeScript type definitions
├── vite.config.ts      # Vite static-build config
└── vite.react.config.tsx # Vite RSC app config
```

## Key Features

### React Server Components
- Server-side rendering powered by `vite-plugin-react-server`
- Client-side hydration
- Automatic CSS collection and injection

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
   - `npm run build` produces a fully static site under `dist/static/`
   - Pre-renders all routes
   - Optimizes assets
   - Emits RSC payloads alongside the HTML

## Deploying to mmcelebration.com

`mmcelebration.com` is hosted on a shared etcserver account that only exposes FTP, so the deploy step is an FTPS upload of `dist/static/` to the remote `/www` directory.

1. Copy `.env.example` to `.env.local` (gitignored) and fill in `FTP_*` credentials.
2. Build the static site: `npm run build:prod` (writes to `dist/static/`).
3. Sanity-check the connection without uploading: `npm run deploy:ftp:check`.
4. Upload: `npm run deploy:ftp`.

The upload overwrites files in place and reuses existing remote directories — it does **not** delete unrelated remote files, so the remote tree is never wiped first.

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
