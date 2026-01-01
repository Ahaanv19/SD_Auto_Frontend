# Backend Prompt: Local Businesses & Spotlight Feature

Copy everything below the line and paste it to your backend Copilot:

---

## Task: Implement Backend API for Local Businesses and Spotlight Feature

I need you to create backend API endpoints to support the local businesses spotlight feature that integrates with the find best route system. The frontend has been updated to call these endpoints.

## Required API Endpoints

### 1. GET /api/businesses
Returns list of all local businesses with their details.

**Response Format:**
```json
[
  {
    "id": 1,
    "name": "ActiveMed Integrative Health Center",
    "description": "We believe in a collaborative approach to healthcare...",
    "address": "11588 Via Rancho San Diego, Suite 101, El Cajon, CA 92019",
    "website": "https://activemedhealth.com/",
    "image": "bus.png",
    "category": "Healthcare",
    "coordinates": { "lat": 32.7914, "lng": -116.9259 }
  },
  {
    "id": 2,
    "name": "Digital One Printing",
    "description": "Digital One Printing is your premier one-stop Poway printshop...",
    "address": "12630 Poway Rd, Poway, CA 92064",
    "website": "https://d1printing.net/",
    "image": "Screenshot 2025-07-23 at 8.34.48 AM.png",
    "imageLayout": "wide",
    "category": "Printing Services",
    "coordinates": { "lat": 32.9579, "lng": -117.0287 }
  }
]
```

### 2. GET /api/businesses/spotlight (Authenticated)
Returns the current user's spotlighted business IDs.

**Response Format:**
```json
{
  "spotlighted_ids": [1, 2]
}
```

### 3. POST /api/businesses/spotlight (Authenticated)
Toggle spotlight status for a business.

**Request Body:**
```json
{
  "business_id": 1,
  "spotlight": true
}
```

**Response Format:**
```json
{
  "success": true,
  "business_id": 1,
  "spotlight": true
}
```

### 4. GET /api/businesses/spotlight/all (Authenticated)
Returns full business data for all spotlighted businesses (for map display).

**Response Format:**
```json
[
  {
    "id": 1,
    "name": "ActiveMed Integrative Health Center",
    "address": "11588 Via Rancho San Diego, Suite 101, El Cajon, CA 92019",
    "category": "Healthcare",
    "coordinates": { "lat": 32.7914, "lng": -116.9259 },
    "website": "https://activemedhealth.com/"
  }
]
```

## Database Schema

```sql
-- businesses table
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500),
  website VARCHAR(500),
  image VARCHAR(255),
  image_layout VARCHAR(50) DEFAULT 'standard',
  category VARCHAR(100),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- user_spotlights table (many-to-many)
CREATE TABLE user_spotlights (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, business_id)
);
```

## Seed Data

```sql
INSERT INTO businesses (name, description, address, website, image, category, lat, lng) VALUES
('ActiveMed Integrative Health Center', 
 'We believe in a collaborative approach to healthcare. We offer acupuncture, massage therapy, functional medicine, physical therapy, and axon therapy.',
 '11588 Via Rancho San Diego, Suite 101, El Cajon, CA 92019',
 'https://activemedhealth.com/',
 'bus.png',
 'Healthcare',
 32.7914, -116.9259),
('Digital One Printing',
 'Digital One Printing is your premier one-stop Poway printshop that offers a wide range of services, has many years of experience and a tremendous reputation. Digital, Offset, Large Format, Posters, Banners, Trade show graphics, Signs, Promotional Products, Bindery and more.',
 '12630 Poway Rd, Poway, CA 92064',
 'https://d1printing.net/',
 'Screenshot 2025-07-23 at 8.34.48 AM.png',
 'Printing Services',
 32.9579, -117.0287);
```

## Important Notes

1. The frontend stores spotlights in localStorage as a fallback when the user is not logged in
2. When user logs in, sync their localStorage spotlights with the database
3. The `/api/businesses` endpoint should be public (no auth required)
4. Spotlight endpoints require authentication
5. CORS should allow credentials (`credentials: 'include'`)
6. The frontend expects coordinates in `{ lat, lng }` format
7. Reference the existing `/api/incidents` endpoint implementation for consistency
8. The config uses `pythonURI` pointing to `https://autonomous.opencodingsociety.com/` in production
