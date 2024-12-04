
# Keycloak Project

Bu proje, **Keycloak** ile kullanıcı kimlik doğrulama ve yetkilendirme işlemlerini yönetmek için geliştirilmiş bir tam yığın uygulamadır. Hem frontend (Angular) hem de backend (ASP.NET Core) modülleri Keycloak ile entegrasyon sağlar.

## Projenin Özellikleri
### Backend (ASP.NET Core)
- **Keycloak Client Configuration:** Projenin backend tarafında Keycloak istemci yapılandırması yapılmıştır. 
- **Yetkilendirme Middleware’i:** API isteklerini güvenli hale getirmek için JWT doğrulama mekanizması uygulanmıştır.
- **Login ve Logout:** Kullanıcı giriş ve çıkış işlemleri Keycloak ile entegre çalışır.
- **Veritabanı Yönetimi:** Keycloak kullanıcı bilgileri ve uygulama verileri uyumlu bir şekilde yönetilir.

### Frontend (Angular)
- **Keycloak SDK Kullanımı:** Angular uygulamasında `keycloak-angular` kütüphanesi kullanılarak istemci tarafında kimlik doğrulama gerçekleştirilmiştir.
- **Role-Based Access Control (RBAC):** Kullanıcı rolleri üzerinden sayfa erişimi kontrol edilir.
- **Dinamik Yönlendirme:** Kullanıcı durumuna göre oturum açma ve kapatma akışları dinamik olarak yönetilir.
- **Örnek Sayfa Akışları:** Keycloak girişinden sonra yönlendirme ve kullanıcı verisi gösterimi.

---

## Proje Yapısı
```plaintext
Keycloak_Project/
├── Keycloak_Backend/
│   ├── Controllers/        # API Kontrolcüleri
│   ├── Middleware/         # JWT Token Doğrulama
│   └── KeycloakConfig.cs   # Keycloak yapılandırma dosyası
├── Keycloak_Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth.guard.ts   # Yetkilendirme guard’ı
│   │   │   ├── login.component.ts  # Giriş işlemleri
│   │   │   └── role.service.ts     # Kullanıcı rolleri
│   └── environments/       # Ortam değişkenleri (Keycloak yapılandırma URL’leri)
└── README.md               # Dokümantasyon
```

## Kullanılan Teknolojiler
- **Frontend:** Angular 15, Keycloak Angular SDK
- **Backend:** ASP.NET Core 6, Keycloak Admin API
- **Kimlik Yönetimi:** Keycloak Server

---

## Kurulum
### Backend
1. `Keycloak_Backend` dizinine gidin.
2. Gerekli bağımlılıkları yükleyin ve çalıştırın:
   ```bash
   dotnet restore
   dotnet run
   ```
3. Keycloak yapılandırmasını güncellemek için `appsettings.json` dosyasını düzenleyin.

### Frontend
1. `Keycloak_Frontend` dizinine gidin.
2. Bağımlılıkları yükleyin ve çalıştırın:
   ```bash
   npm install
   ng serve
   ```
3. `environments/environment.ts` dosyasındaki Keycloak yapılandırmasını düzenleyin.

---

## Kullanım
1. Keycloak sunucusunda istemci yapılandırmasını tamamlayın.
2. Frontend ve backend’i başlatarak tarayıcı üzerinden `http://localhost:4200` adresine gidin.
3. Test kullanıcılarıyla giriş yaparak akışları deneyimleyin.

---

## Katkıda Bulunma
Katkıda bulunmak için yeni bir **branch** oluşturun, geliştirmeleri yapın ve **pull request** gönderin.

## Lisans
MIT Lisansı ile lisanslanmıştır.
