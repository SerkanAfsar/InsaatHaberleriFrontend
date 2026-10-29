# AGENTS.md — Haber App Admin Panel Tasarım Rehberi

> Bu dosya yaşayan bir proje talimatıdır. Proje sahibi tarafından zaman içinde güncellenebilir. Codex/AI agent, değişiklik yapmadan önce bu dosyayı okumalıdır.

## 1. Rol ve temel amaç

Deneyimli bir Next.js, React, TypeScript ve yönetim paneli arayüz geliştiricisi olarak çalış.

**Şimdiki tek görev:** Haber App projesinin mevcut admin panelini, Firma Rehberi frontend projesinin admin paneli tasarımını referans alarak görsel açıdan iyileştirmek.

**Kesin sınır:** Haber App'in mevcut kod altyapısı, veri akışı ve iş mantığı korunacak. Bu çalışma yeniden yazım, mimari taşıma veya API entegrasyonu çalışması değildir.

## 2. Projeler

### Hedef: Haber App
- Çalışma dizini: Bu `AGENTS.md` dosyasının bulunduğu Haber App Next.js repository'si.
- Mevcut framework, paket sürümleri, klasör yapısı ve proje konvansiyonları önceliklidir.
- Proje yolu bilinmiyorsa mevcut çalışma dizinini esas al; yeni bir yol uydurma.

### Tasarım referansı: Firma Rehberi frontend
- Yerel dizin: `C:\Users\Serkan\Desktop\Projeler\FirmaRehberi\firma-rehberi-frontend`
- GitHub: https://github.com/SerkanAfsar/FirmaRehberiFrontend
- Yalnızca admin paneliyle ilgili sayfa, layout, stil ve görsel bileşenler referans alınır.
- Yerel referans dizini erişilebiliyorsa öncelikle onu incele. Erişilemiyorsa kullanıcıdan erişim iste; görünmeyen tasarım detaylarını varsayma.
- Referans proje **salt okunur** kabul edilir: hiçbir dosyasını değiştirme.

## 3. Kapsam

Yalnızca Haber App'in mevcut admin alanında, gerektiğinde aşağıdaki görsel unsurları güncelle:

- Admin layout, sidebar, üst menü ve sayfa içerik düzeni
- Dashboard kartları ve görsel hiyerarşi
- Liste ve tablo görünümü, filtre ve arama alanlarının yerleşimi
- Form alanları, etiketler, butonlar, modal/dialog görünümleri
- Tipografi, renk paleti, border, shadow, spacing ve hover/focus durumları
- Mobil, tablet ve masaüstü responsive davranışı
- Loading, empty state ve hata mesajlarının **yalnızca sunumu**

Firma Rehberi'ndeki tasarım dilini uygula ancak Haber App'in menü isimlerini, sayfalarını, alanlarını ve özelliklerini koru. Görsel benzerlik hedeflenir; körü körüne dosya kopyalama hedeflenmez.

## 4. Değiştirilmesi yasak olanlar

Açıkça ayrıca talimat verilmedikçe:

1. API endpoint'lerini, HTTP metotlarını, request/response sözleşmelerini değiştirme.
2. Authentication, authorization, JWT, token/cookie, rol ve permission mantığını değiştirme.
3. Server Actions, veri çekme, caching, pagination, sorting, filtering, validation ve form submit işleyişini değiştirme.
4. Veritabanı, backend, servis, repository veya DTO yapılarını değiştirme.
5. Route URL'lerini, route segmentlerini, middleware/proxy davranışını ve redirect kurallarını değiştirme.
6. İşlevsel componentleri sırf tasarım için yeniden yazma veya mevcut özellikleri kaldırma.
7. Gereksiz paket yükleme, sürüm yükseltme veya mevcut UI altyapısını topluca değiştirme.
8. Admin dışındaki public site sayfalarına dokunma. Global stil değişikliklerinin public siteyi etkilemesine izin verme.
9. Gerçek verileri sabit/demo verilerle değiştirme; çalışan bağlantıları bozma.
10. Referans projeden Firma Rehberi'ne özgü iş kurallarını, entity'leri, API adreslerini ve içerikleri taşıma.

## 5. Teknoloji ve uygulama kuralları

- Hedef projedeki Next.js App Router / React / TypeScript mimarisine uy.
- Projede Tailwind CSS kullanılıyorsa mevcut sürüm ve yapılandırma üzerinden ilerle.
- Mevcut UI component, icon ve form kütüphanelerini mümkün olduğunca yeniden kullan.
- Server Component / Client Component sınırlarını ve mevcut `use client` kullanımını koru.
- Mevcut erişilebilirlik davranışlarını (klavye, focus, aria, label) bozma.
- Tasarım stillerini mümkün olduğunca admin layout veya admin bileşenleri kapsamında tut.
- Tekrarlanan görsel kalıplar için küçük, yeniden kullanılabilir sunum bileşenleri oluşturabilirsin; mevcut iş mantığını bunlara taşıma.
- Gerekmedikçe dosya taşıma, yeniden adlandırma veya büyük refactor yapma.
- TypeScript tip güvenliğini koru; hataları `any` veya `@ts-ignore` ile gizleme.

## 6. Çalışma sırası

1. Önce hedef Haber App'in `package.json`, admin route/layout yapısını, kullanılan stilleri ve mevcut UI bileşenlerini incele.
2. Firma Rehberi frontend'in admin layout, navigation, ortak bileşen ve stil dosyalarını incele.
3. Hedef ile referans arasında **tasarım farkları** çıkar. Hangi dosyaların değişeceğini belirle.
4. Yalnızca görsel değişiklik içeren küçük ve kontrollü adımlarla ilerle: önce admin shell (sidebar/header/layout), sonra dashboard, sonra ortak tablolar ve formlar, ardından diğer admin ekranları.
5. Her adımda işlevleri ve responsive davranışı koru.
6. Mevcut script'ler varsa lint/typecheck/build kontrollerini çalıştır; başarısız olanları ve sebeplerini raporla.
7. Sonuçta değiştirilen dosyaları, yapılan görsel iyileştirmeleri ve **özellikle dokunulmayan altyapıyı** kısa özetle.

## 7. Tasarım kabul kriterleri

- Haber App admin paneli, Firma Rehberi admin panelinin görsel diline belirgin biçimde yaklaşmalı.
- Sidebar, header, içerik genişlikleri ve boşluklar tutarlı olmalı.
- Sayfalar masaüstünde ve dar ekranlarda taşmadan kullanılabilmeli.
- Menü linkleri, tablolar, filtreler, form gönderimleri, modal ve diğer etkileşimler eskisi gibi çalışmalı.
- API çağrıları, yetki kontrolleri, veri tipleri ve route'lar değişmemeli.
- Public site tasarımı etkilenmemeli.
- Yapılan değişiklikler tasarım kapsamıyla sınırlı ve gözden geçirilebilir olmalı.

## 8. Agent iletişim kuralları

- Büyük değişiklikten önce kısa bir dosya/kapsam planı sun.
- Tasarım referansına erişilemiyorsa bunu açıkça bildir; tahmin ederek uygulama yapma.
- Tasarım için iş mantığı değişikliği zorunlu görünürse **önce onay iste**.
- İlgisiz hataları veya başka modülleri kendiliğinden düzeltme.
- Kullanıcı istemedikçe commit, push veya merge yapma.
- Her aşamanın sonunda tamamlanan işleri ve kalan işleri belirt.

## 9. Gelecekte güncellenecek kurallar

> Bu bölüm proje sahibi tarafından genişletilebilir. Buraya eklenecek kurallar, yukarıdaki altyapıyı koruma ilkesiyle birlikte değerlendirilir.

### Ek tasarım tercihleri
- Henüz tanımlanmadı.

### İleride izin verilecek kapsam genişletmeleri
- Henüz tanımlanmadı. Yeni bir görev verilene kadar **yalnızca admin panel tasarımı** kapsam dahilindedir.

### Projeye özel notlar
- Henüz tanımlanmadı.
