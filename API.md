# API Documentation

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://anniversary-scrapbook-api.onrender.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Scrapbooks

#### Create Scrapbook
```
POST /scrapbooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Our First Year",
  "anniversaryDate": "2024-02-14T00:00:00Z",
  "themeColor": "#FFB6C1"
}

Response: 201 Created
{
  "message": "Scrapbook created successfully",
  "scrapbook": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Our First Year",
    "themeColor": "#FFB6C1",
    "anniversaryDate": "2024-02-14T00:00:00Z",
    "isPublic": false,
    "shareToken": "uuid-string",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get All Scrapbooks
```
GET /scrapbooks
Authorization: Bearer <token>

Response: 200 OK
{
  "scrapbooks": [
    { ... scrapbook objects ... }
  ]
}
```

#### Get Scrapbook by ID
```
GET /scrapbooks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "scrapbook": { ... },
  "memories": [ ... ],
  "loveLetter": { ... } or null
}
```

#### Update Scrapbook
```
PUT /scrapbooks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "themeColor": "#FF69B4",
  "isPublic": true,
  "accessPassword": "optional_password"
}

Response: 200 OK
{
  "message": "Scrapbook updated successfully",
  "scrapbook": { ... }
}
```

#### Delete Scrapbook
```
DELETE /scrapbooks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Scrapbook deleted successfully"
}
```

#### Get Public Scrapbook
```
POST /scrapbooks/public/:shareToken
Content-Type: application/json

{
  "password": "optional_password"
}

Response: 200 OK
{
  "scrapbook": { ... },
  "memories": [ ... ],
  "loveLetter": { ... } or null
}
```

### Memories

#### Add Memory
```
POST /memories
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- scrapbookId: "65a1b2c3d4e5f6g7h8i9j0k1"
- image: <file>
- caption: "First date at the park"
- date: "2024-01-10T00:00:00Z"
- location: "Central Park, NYC"
- mood: "romantic"

Response: 201 Created
{
  "message": "Memory added successfully",
  "memory": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "scrapbookId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "image": "1642348200000.jpg",
    "caption": "First date at the park",
    "date": "2024-01-10T00:00:00Z",
    "location": "Central Park, NYC",
    "mood": "romantic",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Memories
```
GET /memories/:scrapbookId
Authorization: Bearer <token>

Response: 200 OK
{
  "memories": [ ... ]
}
```

#### Update Memory
```
PUT /memories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "caption": "Updated caption",
  "date": "2024-01-10T00:00:00Z",
  "location": "Central Park",
  "mood": "happy"
}

Response: 200 OK
{
  "message": "Memory updated successfully",
  "memory": { ... }
}
```

#### Delete Memory
```
DELETE /memories/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Memory deleted successfully"
}
```

### Love Letters

#### Create or Update Love Letter
```
POST /love-letters
Authorization: Bearer <token>
Content-Type: application/json

{
  "scrapbookId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "content": "My dearest love...",
  "revealDate": "2025-02-14T00:00:00Z"
}

Response: 201 Created
{
  "message": "Love letter saved successfully",
  "loveLetter": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "scrapbookId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "content": "My dearest love...",
    "revealDate": "2025-02-14T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Love Letter
```
GET /love-letters/:scrapbookId
Authorization: Bearer <token>

Response: 200 OK
{
  "loveLetter": { ... }
}
```

#### Delete Love Letter
```
DELETE /love-letters/:scrapbookId
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Love letter deleted successfully"
}
```

### Health Check

#### API Health
```
GET /health

Response: 200 OK
{
  "status": "Server is running"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token" or "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Scrapbook not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

## Mood Options

- `happy`
- `romantic`
- `adventurous`
- `nostalgic`
- `grateful`
- `excited`

## Theme Colors

- `#FFB6C1` (Light Pink)
- `#FFB6D9` (Pink)
- `#FFC9E3` (Pale Pink)
- `#FFE5EC` (Very Light Pink)
- `#FF69B4` (Hot Pink)

## Rate Limiting

Currently no rate limiting. For production, consider implementing:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user (authenticated)

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "createdAt": "Date"
}
```

### Scrapbook
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "title": "String",
  "themeColor": "String",
  "coverImage": "String or null",
  "anniversaryDate": "Date",
  "backgroundMusic": "String or null",
  "isPublic": "Boolean",
  "accessPassword": "String (hashed) or null",
  "shareToken": "String (unique)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Memory
```json
{
  "_id": "ObjectId",
  "scrapbookId": "ObjectId (ref: Scrapbook)",
  "image": "String",
  "caption": "String",
  "date": "Date",
  "location": "String",
  "mood": "String (enum)",
  "createdAt": "Date"
}
```

### LoveLetter
```json
{
  "_id": "ObjectId",
  "scrapbookId": "ObjectId (ref: Scrapbook, unique)",
  "content": "String",
  "revealDate": "Date or null",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Create Scrapbook
```bash
curl -X POST http://localhost:5000/api/scrapbooks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Our Love Story",
    "anniversaryDate": "2024-02-14T00:00:00Z",
    "themeColor": "#FFB6C1"
  }'
```

## WebSocket Support (Future)

For real-time features (collaborative editing, live notifications):
- Socket.IO can be integrated
- Currently using REST API only

## Versioning

Current API Version: v1 (implicit)
- No version prefix in URLs
- Future versions: `/api/v2/...`

---

For more information or issues, refer to INSTALLATION.md or DEPLOYMENT.md
