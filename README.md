# Solodit Simple API Explorer

A simplified version of the Solodit API Explorer that asks for API key input without exposing any keys in the code.

## Features

- 🔑 **Single API Key**: Enter your API key once per session
- 🎯 **Advanced Filtering**: Filter by impact, audit firms, tags, protocols, languages, and more
- 📊 **Rate Limit Handling**: Automatic rate limit detection and sleep mode
- 📄 **Export Functionality**: Export findings to Markdown files
- 🎨 **Simple UI**: Clean, responsive interface with dark theme
- 🔍 **Real-time Search**: Live filtering with search capabilities

## Quick Start

1. **Run the server**:
   ```bash
   python3 server.py
   ```

2. **Open your browser**:
   Navigate to `http://localhost:8000`

3. **Enter your API key**:
   - Input your Solodit API key in the header field
   - The key will be stored in browser localStorage for the session

4. **Start searching**:
   - Configure your filters
   - Click "Search Findings"
   - Export results as needed

## File Structure

```
solodit_simple_app/
├── server.py          # Python HTTP server with CORS proxy
├── index.html         # Main HTML interface
├── app.js            # Alpine.js application logic
├── README.md         # This file
├── exports/          # Exported findings (created automatically)
├── sessions/         # Session data (created automatically)
└── logs/            # Application logs (created automatically)
```

## Key Features

### API Key Management
- **No hardcoded keys**: API keys are never exposed in the source code
- **Session storage**: Keys are stored in browser localStorage for convenience
- **Manual input**: Users enter their own API key each session
- **Secure handling**: Keys are only sent to the server in request headers

### Rate Limiting
- **Automatic detection**: Monitors API rate limit headers
- **Sleep mode**: Automatically pauses when limits are reached
- **Visual feedback**: Shows remaining requests in the header
- **Recovery**: Resumes operation after rate limit reset

### Filtering Options
- **Impact Levels**: High, Medium, Low, Gas optimizations
- **Audit Firms**: 30+ major audit firms
- **Tags**: 100+ vulnerability categories
- **Protocol Categories**: DeFi, NFT, Gaming, etc.
- **Programming Languages**: Solidity, Rust, Go, etc.
- **Advanced Filters**: Date ranges, quality scores, custom sorting

### Export Features
- **Markdown format**: Clean, readable export format
- **Batch export**: Export multiple pages of results
- **File organization**: Automatic timestamped filenames
- **Server-side saving**: Files saved to `exports/` directory

## Usage Instructions

### 1. Server Setup
```bash
cd solodit_simple_app
python3 server.py
```

The server will start on `http://localhost:8000` by default. You can specify a different port:
```bash
python3 server.py 9000
```

### 2. API Key Configuration
- Open the web interface
- Enter your Solodit API key in the header field
- The key will be saved for the current browser session

### 3. Searching Findings
1. **Configure Filters**: Use the filter cards to select criteria
2. **Search Terms**: Add keywords, protocol names, or finder handles
3. **Advanced Options**: Set date ranges, quality scores, and sorting
4. **Execute Search**: Click "Search Findings" to fetch results

### 4. Exporting Results
1. **Run a search** to get results
2. **Click "Export to Markdown"** in the results header
3. **Specify the number** of findings to export
4. **Files are saved** to the `exports/` directory

## API Endpoints

### `/api/solodit`
- **Method**: POST
- **Purpose**: Proxy requests to Solodit API
- **Headers**: Requires `X-Cyfrin-API-Key` header
- **Body**: JSON payload with search parameters

### `/api/save-file`
- **Method**: POST
- **Purpose**: Save exported files to server
- **Body**: JSON with `filename`, `content`, and `folder` fields

## Security Considerations

- **No key exposure**: API keys are never stored in source code
- **Session-only storage**: Keys are only kept in browser localStorage
- **HTTPS recommended**: Use HTTPS in production environments
- **Server logs**: Keys are not logged, only usage statistics

## Customization

### Styling
The app uses Tailwind CSS with custom CSS variables. Modify the `:root` section in `index.html` to change colors:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    /* ... */
}
```

### Filter Data
Filter options are defined in `app.js`. To add new options, modify the arrays:
- `impactLevels`
- `auditFirms`
- `tags`
- `protocolCategories`
- `languages`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the server is running and accessible
2. **Rate Limits**: Wait for the sleep mode to complete (60 seconds)
3. **API Key Issues**: Verify your key is valid and has sufficient permissions
4. **No Results**: Try broadening your search criteria

### Debug Mode
Enable browser console to see detailed error messages and API responses.

## Development

### Local Development
```bash
# Start the server
python3 server.py

# Open browser
open http://localhost:8000
```

### File Modifications
- **Server logic**: Edit `server.py`
- **Frontend logic**: Edit `app.js`
- **UI/HTML**: Edit `index.html`

## License

This project is for educational and personal use. Please respect the Solodit API terms of service.

## Support

For issues related to:
- **API functionality**: Check Solodit API documentation
- **Server issues**: Review server logs in the terminal
- **UI problems**: Check browser console for JavaScript errors
