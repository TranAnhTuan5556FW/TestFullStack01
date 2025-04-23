# Massage Booking - Authentication Service

## Mô tả

Authentication Service là một phần của hệ thống Massage Booking, được xây dựng bằng Node.js và Express.js. Service này cung cấp các chức năng xác thực và phân quyền cho người dùng trong hệ thống.

## Tính năng chính

- Đăng ký tài khoản (Local)
- Đăng nhập (Local)
- Xác thực với Google và Facebook
- Quản lý phiên đăng nhập với JWT
- Phân quyền người dùng (Admin/Customer)
- Quản lý thông tin cá nhân

## Cài đặt

```bash
# Cài đặt dependencies
$ npm install

# Tạo file .env và cấu hình các biến môi trường
$ cp .env.example .env
```

## Cấu hình môi trường

Tạo file `.env` với các thông tin sau:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=massage_booking

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Admin Registration
ADMIN_REGISTRATION_KEY=massage_booking_admin_key

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Chạy ứng dụng

```bash
# Development
$ npm run dev

# Production
$ npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register/admin` - Đăng ký tài khoản admin
- `GET /api/auth/google` - Đăng nhập với Google
- `GET /api/auth/facebook` - Đăng nhập với Facebook

### User Management
- `GET /api/auth/profile` - Lấy thông tin người dùng
- `PUT /api/auth/profile` - Cập nhật thông tin người dùng
- `GET /api/auth/admin/users` - Lấy danh sách người dùng (Admin only)

## Bảo mật

- Mật khẩu được mã hóa bằng bcrypt
- Sử dụng JWT cho xác thực
- CORS được cấu hình cho frontend
- Rate limiting để chống tấn công brute force
- Validation cho tất cả input từ người dùng

## Cấu trúc thư mục

```
src/
├── config/         # Cấu hình ứng dụng
├── controllers/    # Xử lý logic nghiệp vụ
├── middleware/     # Middleware (auth, validation)
├── models/        # Định nghĩa model
├── routes/        # Định tuyến API
├── utils/         # Tiện ích
└── index.js       # Entry point
```

## Phát triển

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/your-feature`)
3. Commit thay đổi (`git commit -am 'Add new feature'`)
4. Push branch (`git push origin feature/your-feature`)
5. Tạo Pull Request

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trong repository.

## License

[MIT License](LICENSE)
