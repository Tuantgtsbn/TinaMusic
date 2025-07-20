## Cài đặt

1. yarn
2. Copy file .env.example vào .env.development.local Có thể điều chỉnh nếu cần
3. yarn dev

## Biến môi trường (env)

-   Biến bắt buộc phải có tiền tố: `VITE`. Ví dụ: VITE_API_BASE_URL
-   Khi thêm biến môi trường mới, cần phải thêm vào file `.env.example` và thêm kiểu của biến vào file `src/vite-env.d.ts`
-   Để truy cập biến môi trường, sử dụng `import.meta.env`

## Ảnh giao diện demo

### 1. Trang chủ

<p align="center">
  <img src="./demo/HomePageWeb.png" alt="Trang chủ website" width="100%">
  <img src="./demo/HomePageMobile.png" alt="Trang chủ mobile" width="50%">
</p>

### 2. Modal Login

<p align="center">
  <img src="./demo/ModalLogin.png" alt="Modal Login" width="60%">
</p>

### 3. Modal Setting

<p align="center">
  <img src="./demo/ModalSetting.png" alt="Modal Setting" width="60%">
</p>

### 4. SideBar

<p align="center">
  <img src="./demo/SideBarMobile.png" alt="SideBar" width="40%">
</p>
