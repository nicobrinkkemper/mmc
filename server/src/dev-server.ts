import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const basePath = process.env.PUBLIC_URL || '';

app.use(basePath, express.static('build'));
app.use(historyApiFallback());
app.use(basePath, express.static('build'));

app.listen(port, () => {
    console.log(`Dev server running at http://localhost:${port}${basePath}`);
}); 