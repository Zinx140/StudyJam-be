# StudyJam Backend API

Backend API untuk:

- Autentikasi user (register, login, logout, refresh token)
- Manajemen berita (CRUD)
- Manajemen user dan role
- Ringkasan berita menggunakan Gemini API

## Download Template File
- Silahkan download template disini jika anda mau mencoba coding dan tidak langsung terima jadi!

<a href="template.zip?raw=true" download="template.zip" target="_blank">
    <img src="https://img.shields.io/badge/⬇️-Unduh Template-1E90FF.svg?style=flat"
         alt="Unduh Template"
         width="200">
</a>

## Tech Stack

- Node.js + Express
- Sequelize + MySQL
- JWT (access token + refresh token via cookie)
- Joi (validasi)

## Struktur Singkat

- `index.js` -> entry point server
- `src/config` -> konfigurasi database
- `src/models` -> model Sequelize (users, roles, news)
- `src/controllers` -> logika endpoint
- `src/routes` -> daftar route API
- `src/middlewares` -> authentication + authorization
- `be_studyjam.sql` -> dump database

## Setup Cepat

1. Install dependency:

```bash
npm install
```

2. Buat file `.env` di root project:

```env
DB_HOST=localhost
DB_PORT=3306
DB_DBNAME=be_studyjam
DB_USER=root
DB_PASS=your_password

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_api_key
```

3. Import database dari file `be_studyjam.sql`.

4. Jalankan server:

```bash
node index.js
```

Server berjalan di:

- `http://localhost:3000`

## Auth dan Akses

- Login menghasilkan cookie:
  - `accessToken` (15 menit)
  - `refreshToken` (7 hari)
- Route berikut butuh login (authentication middleware):
  - `/news/*`
  - `/users/*`
  - `/gemini/*`
- Otorisasi per role dicek dari permission di tabel `roles`.

Catatan:

- Cookie diset `secure: true`, jadi untuk development lokal tanpa HTTPS cookie bisa tidak tersimpan di browser/client.

## Endpoint Utama

### Auth

- `POST /register`
  - body: `username`, `email`, `password`, `confirm_password`
- `POST /login`
  - body: `email`, `password`
- `POST /logout`
- `GET /refresh`

### News

- `GET /news`
- `GET /news/:news_id`
- `POST /news`
  - body: `headline`, `content`
- `PUT /news/:news_id`
  - body: `headline`, `content`
- `DELETE /news/:news_id`

### Users

- `GET /users`
- `GET /users/:user_id`
- `PUT /users/:user_id`
  - body: `role_id`
- `DELETE /users/:user_id`

### Gemini

- `POST /gemini`
  - body: `news_ids`
  - format `news_ids`: string id dipisahkan koma, contoh `"1,2,3"`

## Testing API

- Gunakan file Postman collection:
  - `Fullstack StudyJam.postman_collection.json`

## Respons Umum

Format respons umumnya:

```json
{
  "status": "success | error | Unauthorized | Forbidden",
  "message": "...",
  "data": {}
}
```

Beberapa endpoint menambahkan field khusus seperti `user`, `news_content`, atau `summarize_result`.
