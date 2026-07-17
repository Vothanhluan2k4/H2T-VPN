# TÀI LIỆU KHẢO SÁT & THIẾT KẾ UI/UX
## ĐỀ BÀI: HOMEPAGE "TOP VPN SERVICES 2026" (THỊ TRƯỜNG GLOBAL)

**Ứng viên:** H2T Media Fullstack Candidate  
**Vị trí ứng tuyển:** Thực tập sinh Fullstack  
**Thời gian hoàn thành:** 48 giờ  
**Đơn vị tuyển dụng:** Công ty TNHH Truyền thông và Quảng cáo H2T  

---

## 1. RESEARCH & UI AUDIT (Khảo sát thiết kế)

Để tạo ra một trang so sánh VPN hàng đầu năm 2026 vừa mang tính chuyển đổi cao (conversion-oriented), vừa tạo cảm giác tin cậy (trust-inducing), chúng tôi đã phân tích thiết kế của 2 trường phái website phổ biến:

### A. Nhóm Website VPN Thương Mại Hiện Tại (NordVPN, ExpressVPN, Surfshark)
* **Điểm mạnh:**
  * **CTA rõ ràng:** Nút kêu gọi hành động nổi bật với màu sắc tương phản cao (cam, xanh lá cây) nằm ở vị trí dễ nhìn thấy ở khu vực Hero và bảng so sánh.
  * **Social Proof mạnh mẽ:** Logo các đơn vị kiểm toán độc lập (PwC, Cure53) và điểm số Trustpilot hiển thị ngay đầu trang.
  * **Cấu trúc phân cấp thông tin rõ ràng:** So sánh giá cả, số lượng máy chủ và các tính năng chính một cách trực quan.
* **Điểm yếu (Cần cải tiến):**
  * **Giao diện lỗi thời & Lặp lại (AI Slop/Templates):** Thiết kế dạng zigzag (ảnh trái - chữ phải) lặp lại liên tục gây nhàm chán cho người dùng khi cuộn trang.
  * **Quá tải thông tin:** Việc nhồi nhét quá nhiều nhãn giá, banner khuyến mãi nhấp nháy, countdown timer tạo cảm giác thiếu trung thực và ép buộc mua hàng.
  * **Màu sắc quá rực rỡ (Over-saturated):** Dải màu chuyển tiếp màu tím/xanh neon tạo cảm giác giống trang quảng cáo hơn là một công cụ công nghệ đáng tin cậy.

### B. Nhóm Website Công Nghệ Cao Cấp (Linear, Vercel, Apple)
* **Điểm mạnh:**
  * **Ngôn ngữ Dark Mode sang trọng (Ethereal Glass):** Sử dụng nền đen sâu (OLED Black `#050505`) kết hợp với các quầng sáng gradient nhẹ nhàng (radial glow) giúp nội dung nổi bật mà không chói mắt.
  * **Cấu trúc Bento Grid không đối xứng:** Cách sắp xếp thẻ thông tin với kích thước khác nhau tạo nhịp điệu thị giác (visual rhythm) hiện đại, cao cấp.
  * **Double-Bezel (Doppelrand):** Thiết kế thẻ lồng nhau (viền ngoài mờ, lõi trong tối màu có bóng đổ mịn) mang lại cảm giác chiều sâu vật lý (materiality).
  * **Typography tinh tế:** Tiêu đề lớn, mỏng, khoảng cách ký tự hẹp (tracking-tight) tạo ấn tượng chuyên nghiệp ngay từ cái nhìn đầu tiên.

### C. Bài học rút ra & Áp dụng vào thiết kế H2T VPN:
1. **Ứng dụng Vibe Dark Tech & Ethereal Glass:** Thay vì nền trắng đơn điệu hay tím neon của các trang VPN cũ, dự án sử dụng nền đen sâu kết hợp màu xanh ngọc lục bảo (Cyber Emerald `#10b981`) - đại diện cho sự bảo mật, an toàn và tốc độ cao.
2. **Cấu trúc thẻ Double-Bezel lồng nhau:** Tất cả các card xếp hạng VPN và khu vực Simulator đều sử dụng kỹ thuật lồng khung (outer bezel mờ và inner core tối màu) để tạo cảm giác sang trọng.
3. **Bộ chọn tab tính năng và trình mô phỏng tốc độ (Interactive Speed Simulator):** Cho phép người dùng trực tiếp chọn các nút máy chủ (New York, London, Tokyo, Singapore) để xem độ trễ (ping) và tốc độ bằng biểu đồ SVG động, tăng tương tác và thời gian lưu giữ người dùng trên trang.

---

## 2. DESIGN SYSTEM (Hệ thống thiết kế cơ bản)

### A. Bảng màu (Color Palette)
* **Nền chính (Background):** `#050505` (OLED Black) & `#0c0c0e` (Charcoal) để tạo chiều sâu cho các block nội dung.
* **Văn bản (Typography):** `#f4f4f5` (Off-white cho tiêu đề để đạt độ tương phản tối đa) & `#a1a1aa` (Muted gray cho nội dung mô tả, dễ đọc, không mỏi mắt).
* **Màu nhấn chủ đạo (Primary Accent):** `#10b981` (Cyber Emerald) - màu sắc biểu trưng cho trạng thái an toàn, bảo mật và sự tin cậy.
* **Màu nhấn phụ (Secondary Accent):** `#06b6d4` (Cyber Cyan) & `#3b82f6` (Royal Blue) để phân biệt các dòng VPN khác nhau.
* **Viền (Borders):** `rgba(255, 255, 255, 0.08)` cho viền thẻ, mang lại hiệu ứng kính mờ trong suốt.

### B. Typography (Hệ phông chữ)
* **Display / Headings (Tiêu đề):** Phông chữ **Outfit** kết hợp **Plus Jakarta Sans**. Tiêu đề được thiết kế với thuộc tính `tracking-tight` (khoảng cách chữ khít) và `font-extrabold` để tăng tính nhận diện thương hiệu.
* **Body / Text (Nội dung):** Phông chữ **Plus Jakarta Sans** (sans-serif hiện đại, tối ưu hóa hiển thị trên màn hình retina và di động). Độ cao dòng (line-height) được khóa ở mức `1.6` để tối ưu trải nghiệm đọc.

### C. Quy tắc Spacing & Grid
* Hệ thống khoảng cách dựa trên bội số của 8px (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
* Khoảng cách vùng đệm (macro-whitespace) giữa các section lớn được thiết lập tối thiểu là `py-24` (96px) để giao diện có không gian thở (breathing room).
* Layout chia theo tỷ lệ bất đối xứng (ví dụ: Card số 1 chiếm 7 cột, Card số 2 & 3 chiếm 5 cột trên Grid 12 cột) giúp phá vỡ sự nhàm chán của bố cục Bootstrap thông thường.

---

## 3. THIẾT KẾ HOMEPAGE (Homepage Architecture)

Trang chủ được chia làm 6 phân khu chức năng được sắp xếp có chủ đích để dẫn dắt hành vi người dùng:

1. **Navigation (Thanh điều hướng Floating Island):**
   * Thiết kế dưới dạng một viên nang kính mờ (frosted glass pill) lơ lửng, tách rời khỏi mép trên của màn hình.
   * Trên thiết bị di động, thanh menu co giãn mượt mà thành một overlay tràn màn hình khi bấm nút hamburger.
2. **Hero Section (Khởi động phễu chuyển đổi):**
   * Sử dụng tiêu đề lệch trái bất đối xứng: *"The Privacy Layer For a Borderless Web"*.
   * Phía bên phải là hình ảnh **Security Shield Core** được vẽ và render 3D cao cấp (được sinh tự động từ mô hình AI thế hệ mới), lồng trong khung viền kim loại Double-Bezel, tạo ấn tượng trực giác tức thì về mặt công nghệ.
   * CTAs được đặt nổi bật: Nút chính màu trắng tương phản cao có chứa icon trượt (`→`), nút phụ dạng viền mờ tối giản.
3. **Trust & Verification Strip (Chứng thực độ tin cậy):**
   * Hiển thị logo các hãng kiểm toán độc lập nổi tiếng (Deloitte, PwC, Cure53) bằng màu trắng đơn sắc tinh tế, thay vì các logo màu sắc lộn xộn, giúp duy trì thẩm mỹ tối giản sang trọng của website.
4. **Bento Rankings (Bảng xếp hạng VPN 2026):**
   * **Vị trí số 1 (NordVPN):** Được đặt trong một card lớn (spans 7/12 cột) có viền quầng sáng ngọc lục bảo nổi bật, danh sách các tiêu chuẩn kiểm duyệt và nút kêu gọi hành động lớn tích hợp hiệu ứng kinetic.
   * **Vị trí số 2 & 3 (ExpressVPN, Surfshark):** Được đặt trong hai card nhỏ xếp chồng (spans 5/12 cột), làm nổi bật các thông số kỹ thuật then chốt (RAM-only servers, Unlimited devices).
5. **Interactive Node Speed Simulator (Trình mô phỏng kiểm tra tốc độ):**
   * Cho phép người dùng click chọn máy chủ tại các quốc gia để xem hệ thống thiết lập đường truyền mã hóa (handshake) thông qua mô phỏng cửa sổ terminal thực tế.
   * Biểu đồ mạng lưới SVG động hiển thị đường truyền từ vị trí người dùng (`YOU`) tới máy chủ đích kèm chỉ số tốc độ và độ trễ ping chạy tăng dần. Đây là điểm nhấn tương tác cao giúp tăng tính tin cậy của bài review.
6. **Key Features & FAQ Accordion:**
   * Sử dụng hệ thống accordion tương tác mượt mà, giúp người dùng giải đáp nhanh các thắc mắc chuyên sâu mà không làm loãng giao diện chính.

---

## 4. TƯ DUY TRIỂN KHAI (Dev Thinking & Implementation)

Website được xây dựng dựa trên tư duy lập trình giao diện hiện đại, tối ưu hóa hiệu năng và khả năng tái sử dụng:

### A. Phân rã Component (React Architecture)
Cấu trúc cây thư mục component được phân chia như sau:
* `src/components/ui/` (Các nguyên tử giao diện dùng chung):
  * `Button.tsx`: Hỗ trợ biến thể `primary`, `secondary`, `outline` cùng hiệu ứng scale khi nhấn.
  * `Card.tsx`: Đóng gói cấu trúc Double-Bezel (outer wrapper và inner core).
  * `Accordion.tsx`: Cấu trúc FAQ có thể co giãn.
* `src/components/sections/` (Các phân khúc trang chủ):
  * `Navbar.tsx`: Xử lý trạng thái co giãn và menu di động.
  * `Hero.tsx`: Chứa nội dung chính và hình ảnh 3D core.
  * `RankingsGrid.tsx`: Bố cục Bento so sánh top 3 VPN.
  * `SpeedSimulator.tsx`: Widget giả lập kết nối và đo tốc độ mạng.
  * `FeaturesTabs.tsx`: Khu vực chuyển đổi tab thông số kỹ thuật.

### B. Giải pháp Responsive (Mobile First)
* Sử dụng hệ thống truy vấn màn hình của Tailwind v4 (`md:`, `lg:`).
* Trên màn hình di động (`< 768px`), toàn bộ các grid bất đối xứng (Bento Grid) sẽ tự động thu về bố cục 1 cột (`grid-cols-1`) và kéo giãn chiều rộng tối đa (`w-full`), đảm bảo touch-target lớn hơn 48px cho các ngón tay.
* Loại bỏ hoàn toàn đơn vị `h-screen` cho Hero section, thay bằng `min-h-[100dvh]` để tránh lỗi giật lag chiều cao viewport khi thanh địa chỉ của trình duyệt Safari trên iOS ẩn/hiện lúc cuộn trang.

### C. Những điểm khó khi lập trình (Technical Challenges)
1. **Tốc độ phản hồi hiệu ứng Blur (backdrop-filter):** Hiệu ứng frosted glass sử dụng `backdrop-filter: blur(16px)` ngốn rất nhiều tài nguyên GPU trên các dòng điện thoại cũ. Giải pháp là chỉ áp dụng thuộc tính này lên các thanh Nav cố định (`fixed`) hoặc overlay menu, tuyệt đối không dùng trên các container cuộn liên tục.
2. **Hiệu ứng vẽ đường truyền mạng động (Animated SVG Connection Line):** Việc vẽ đường line từ điểm `YOU` đến server đích được giải quyết bằng thuộc tính `stroke-dasharray` và hiệu ứng CSS keyframe dịch chuyển dash offset để tạo luồng chạy dữ liệu mượt mà, không dùng JS loop giúp giữ FPS ở mức 60 ổn định.
3. **Kiểm soát dung lượng Bundle (Bundle Optimization):** Thư viện icon `@phosphor-icons/react` chứa hàng ngàn icon, nếu import toàn bộ sẽ làm phình file build. Chúng tôi thực hiện import tường minh từng icon dạng `{ Shield, Key }` để trình biên dịch thực hiện Tree-shaking loại bỏ các icon thừa khi đóng gói.

---

## 5. GIẢI THÍCH QUYẾT ĐỊNH THIẾT KẾ (Design Rationale)

* **Vì sao chọn bảng màu này?**
  * VPN là một sản phẩm kỹ thuật liên quan đến bảo mật và ẩn danh. Màu nền tối `#050505` tạo ra cảm giác an toàn và riêng tư (giống như một boongke bảo mật).
  * Màu xanh ngọc lục bảo `#10b981` (Cyber Emerald) hoạt động như một tín hiệu đèn xanh của hệ thống an ninh: "Mọi thứ đã được bảo vệ". Màu này có độ tương phản cao trên nền đen giúp nâng điểm chất lượng tiếp cận (WCAG AA Accessibility).
* **Vì sao chọn phông chữ này?**
  * Phông chữ **Outfit** có cấu trúc hình học tròn trịa nhưng hiện đại, tạo cảm giác thân thiện nhưng vẫn đậm chất công nghệ cho phần tiêu đề lớn.
  * Phông chữ **Plus Jakarta Sans** có độ mở chữ lớn (x-height cao), giúp người dùng dễ dàng đọc các đoạn văn bản dài hoặc thông số kỹ thuật nhỏ ở độ phân giải thấp.
* **Nguồn cảm hứng:**
  * Lấy cảm hứng từ ngôn ngữ thiết kế của **Linear.app** (cho phong cách thẻ tối giản, đường viền mảnh 1px) và **Vercel** (cho cấu trúc phân cấp typography rõ ràng và logo đơn sắc sang trọng).
* **Nếu có thêm thời gian, tôi sẽ cải thiện điều gì?**
  * Tích hợp thêm **GSAP ScrollTrigger** để tạo hiệu ứng các thẻ VPN trượt xếp chồng lên nhau (sticky stack) khi người dùng cuộn chuột qua phân khúc Rankings.
  * Thiết lập một backend node giả lập ping thực để người dùng đo tốc độ VPN H2T VPN thực tế so với mạng gốc của họ thông qua WebRTC.
