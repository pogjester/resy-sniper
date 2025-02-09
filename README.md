# Optimized Resy Sniper

A high-performance reservation bot for Resy that outperforms standard scrapers through parallel processing and connection optimization. Built for speed-critical scenarios where milliseconds matter.

## Performance Features

### 1. Parallel Slot Processing

Instead of checking reservation slots sequentially, this bot processes all available slots simultaneously using Promise.all():

```javascript
const slotPromises = slots.map((slot) => slotChooser(slot));
const results = await Promise.all(slotPromises);
```

This parallel processing can be up to 10x faster than traditional sequential checking when multiple slots are available.

### 2. Connection Optimization

- Persistent connections with keep-alive
- HTTP/2 support for multiplexing
- Gzip/Deflate compression
- Optimized headers for faster handshakes

```javascript
headers: {
  'Connection': 'keep-alive',
  'Accept-Encoding': 'gzip, deflate, br'
}
```

### 3. Time Optimization

- Cached time conversions to avoid repeated calculations
- Minimal string parsing
- Optimized datetime comparisons

### 4. Memory Management

- No unnecessary object creation
- Efficient slot filtering
- Minimal string concatenation

## Setup

1. Clone and install:

```bash
git clone https://github.com/robertjdominguez/ez-resy.git
npm install
```

2. Configure your `.env`:

```env
VENUE_ID=       # Restaurant's Resy ID
DATE=           # YYYY-MM-DD format
EARLIEST=       # 24hr format (e.g., 18:00)
LATEST=         # 24hr format (e.g., 21:00)
PARTY_SIZE=     # Number of guests
PAYMENT_ID=     # Your Resy payment method ID
AUTH_TOKEN=     # Your Resy JWT token
```

## Usage

### For Instant Booking (Fastest)

```bash
npm run start:today
```

### For Future Date Booking

```bash
npm run start
```

## Finding Required IDs

### Venue ID

Network tab > Filter "venue" > Look in the request URL

### Payment ID

Network tab > Filter "user" > Look for payment_method.id in response

### Auth Token

Application > Cookies > authToken

## Performance Tips

1. Run the script on a machine with minimal latency to Resy's servers
2. Use a wired internet connection when possible
3. Consider running multiple instances with different auth tokens
4. Monitor your token expiration to avoid auth failures

## Rate Limiting

While this bot is optimized for speed, be aware that aggressive usage may trigger Resy's rate limits. Consider implementing:

- Random delays between retries
- Multiple auth tokens
- Proxy rotation

## Legal Note

This tool is for educational purposes. Be aware that automated booking may violate Resy's terms of service.
