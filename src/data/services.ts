const CDN = process.env.NEXT_PUBLIC_CDN_URL + "/portfolio/works"

export type ServiceData = {
  slug: string
  demoUrl: string
  isRealClient?: boolean
  thumbnail: string
  days: string
  pageCount: string
  en: {
    industry: string
    headline: string
    subline: string
    body: string
    features: string[]
    metaTitle: string
    metaDescription: string
  }
  vi: {
    industry: string
    headline: string
    subline: string
    body: string
    features: string[]
    metaTitle: string
    metaDescription: string
  }
}

export const services: ServiceData[] = [
  {
    slug: "barbershop",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/hair-salon-men",
    thumbnail: `${CDN}/hair-salon-men.jpg`,
    days: "7–10",
    pageCount: "5–7",
    en: {
      industry: "Barbershop",
      headline: "Your clients are booking through Messenger.",
      subline: "There's a better way.",
      body: "A booking site built for barbershops - clients pick their barber, choose a slot, and confirm in 30 seconds. No back-and-forth messages. No missed bookings. Your chair stays full.",
      features: [
        "Online booking system",
        "Barber profiles & specialties",
        "Style gallery",
        "Pricing list",
        "Mobile-first design",
      ],
      metaTitle: "Barbershop Website — Minh Tâm",
      metaDescription: "Website for barbershops with online booking, barber profiles, and style gallery. Built in An Giang, ready in 7–10 days.",
    },
    vi: {
      industry: "Tiệm cắt tóc",
      headline: "Khách đặt lịch qua tin nhắn - dễ bỏ sót, khó quản lý.",
      subline: "Có cách tốt hơn.",
      body: "Website đặt lịch được xây dựng riêng cho tiệm cắt tóc. Khách chọn thợ, chọn giờ và xác nhận trong 30 giây - không cần nhắn tin qua lại. Lịch hẹn rõ ràng, ghế luôn kín.",
      features: [
        "Hệ thống đặt lịch trực tuyến",
        "Hồ sơ thợ & chuyên môn",
        "Thư viện phong cách",
        "Bảng giá dịch vụ",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Tiệm Cắt Tóc — Minh Tâm",
      metaDescription: "Website cho tiệm cắt tóc với đặt lịch trực tuyến, hồ sơ thợ và thư viện phong cách. Xây dựng tại An Giang, hoàn thành trong 7–10 ngày.",
    },
  },
  {
    slug: "fnb",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/food-shop",
    thumbnail: `${CDN}/food-shop.jpg`,
    days: "7–10",
    pageCount: "5–7",
    en: {
      industry: "F&B",
      headline: "Your menu is a photo album. It should be a storefront.",
      subline: "Fast, beautiful, and actually works on a phone.",
      body: "A restaurant or café site that shows your full menu, lets customers order online or book a table, and looks sharp on every screen. Built for how people actually discover and order from local F&B.",
      features: [
        "Digital menu with photos & prices",
        "Online ordering or table booking",
        "Pickup & delivery options",
        "Promotions & daily specials",
        "Mobile-first design",
      ],
      metaTitle: "Restaurant & Café Website — Minh Tâm",
      metaDescription: "Website for restaurants and cafés with digital menu, online ordering, and table booking. Built in An Giang, ready in 7–10 days.",
    },
    vi: {
      industry: "Quán ăn & Cà phê",
      headline: "Thực đơn dạng ảnh chụp - khách hàng muốn nhiều hơn thế.",
      subline: "Nhanh, đẹp, dùng tốt trên điện thoại.",
      body: "Website cho quán ăn và cà phê - thực đơn đầy đủ, đặt bàn hoặc đặt mang về, trông chuyên nghiệp trên mọi thiết bị. Xây dựng theo cách khách hàng thực sự tìm kiếm và đặt món tại quán.",
      features: [
        "Thực đơn kỹ thuật số với ảnh và giá",
        "Đặt bàn hoặc đặt hàng trực tuyến",
        "Nhận tại quán & giao hàng",
        "Khuyến mãi & món đặc biệt",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Quán Ăn & Cà Phê — Minh Tâm",
      metaDescription: "Website cho nhà hàng và cà phê với thực đơn kỹ thuật số, đặt hàng và đặt bàn trực tuyến. Xây dựng tại An Giang, hoàn thành trong 7–10 ngày.",
    },
  },
  {
    slug: "retail",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/tech-shop",
    thumbnail: `${CDN}/tech-shop.jpg`,
    days: "8–12",
    pageCount: "6–8",
    en: {
      industry: "Retail",
      headline: "Every Shopee sale costs you 15%. Every sale on your own site costs you nothing.",
      subline: "Your store. Your margins.",
      body: "A product store built for retail - catalog browsing, flash sales, and online ordering without the platform cut. Customers come directly to you, and everything they buy stays in your pocket.",
      features: [
        "Product catalog with search & filters",
        "Flash sale system",
        "Online ordering",
        "Stock & pricing display",
        "CMS to manage products",
      ],
      metaTitle: "Retail Store Website — Minh Tâm",
      metaDescription: "Website for retail stores with product catalog, flash sales, and online ordering. No platform fees. Built in An Giang, ready in 8–12 days.",
    },
    vi: {
      industry: "Cửa hàng bán lẻ",
      headline: "Mỗi đơn trên Shopee mất 15–25%. Trên website của bạn - không mất đồng nào.",
      subline: "Kênh bán hàng của riêng bạn, lợi nhuận của riêng bạn.",
      body: "Website bán hàng cho cửa hàng bán lẻ - danh mục sản phẩm, flash sale và đặt hàng trực tuyến không qua nền tảng trung gian. Khách đến thẳng với bạn, toàn bộ doanh thu giữ lại.",
      features: [
        "Danh mục sản phẩm với tìm kiếm & bộ lọc",
        "Hệ thống flash sale",
        "Đặt hàng trực tuyến",
        "Hiển thị giá & tồn kho",
        "CMS quản lý sản phẩm",
      ],
      metaTitle: "Website Cửa Hàng Bán Lẻ — Minh Tâm",
      metaDescription: "Website bán lẻ với danh mục sản phẩm, flash sale và đặt hàng trực tuyến. Không phí nền tảng. Xây dựng tại An Giang, hoàn thành trong 8–12 ngày.",
    },
  },
  {
    slug: "wedding",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/card-shop",
    thumbnail: `${CDN}/card-shop.jpg`,
    days: "6–8",
    pageCount: "5–6",
    en: {
      industry: "Wedding & Cards",
      headline: "Your work deserves more than a Facebook album.",
      subline: "Show it the way it deserves to be shown.",
      body: "A catalog site for wedding and greeting card shops - clients browse your full range, view premium cards up close, and place custom orders through Zalo without needing to message you first.",
      features: [
        "3D card viewer",
        "Full product catalog",
        "Custom order via Zalo",
        "Gallery by occasion",
        "Mobile-first design",
      ],
      metaTitle: "Wedding Card Shop Website — Minh Tâm",
      metaDescription: "Website for wedding and greeting card shops with 3D card viewer, catalog, and Zalo ordering. Built in An Giang, ready in 6–8 days.",
    },
    vi: {
      industry: "Thiệp cưới & Thiệp chúc",
      headline: "Sản phẩm đẹp xứng đáng được trưng bày đúng cách.",
      subline: "Hơn một album ảnh Facebook.",
      body: "Website danh mục cho cửa hàng thiệp cưới và thiệp chúc mừng - khách xem đầy đủ mẫu, xem thiệp cận cảnh, đặt theo yêu cầu qua Zalo mà không cần nhắn tin hỏi trước.",
      features: [
        "Xem thiệp 3D",
        "Danh mục đầy đủ",
        "Đặt theo yêu cầu qua Zalo",
        "Thư viện theo dịp",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Cửa Hàng Thiệp Cưới — Minh Tâm",
      metaDescription: "Website cho cửa hàng thiệp cưới và thiệp chúc với xem thiệp 3D, danh mục và đặt hàng qua Zalo. Xây dựng tại An Giang, hoàn thành trong 6–8 ngày.",
    },
  },
  {
    slug: "construction",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/construction-shop",
    thumbnail: `${CDN}/construction-shop.jpg`,
    days: "8–12",
    pageCount: "5–7",
    en: {
      industry: "Construction Supplies",
      headline: "Your price list changes daily. Your customers need to know.",
      subline: "Real-time pricing. Province-wide delivery calculator.",
      body: "A supply store site built for construction materials - daily updated pricing, a delivery cost calculator by district and truck size, and a full material catalog. Contractors check your site before they call anyone else.",
      features: [
        "Daily price updates",
        "Delivery calculator by area & load",
        "Full material catalog",
        "Quotation requests",
        "Mobile-first design",
      ],
      metaTitle: "Construction Supply Website — Minh Tâm",
      metaDescription: "Website for construction supply stores with daily pricing, delivery calculator, and material catalog. Built in An Giang, ready in 8–12 days.",
    },
    vi: {
      industry: "Vật liệu xây dựng",
      headline: "Giá vật tư thay đổi hàng ngày - khách hàng cần biết ngay.",
      subline: "Giá cập nhật theo ngày. Tính cước giao hàng theo khu vực.",
      body: "Website cho cửa hàng vật liệu xây dựng - giá cập nhật hàng ngày, công cụ tính cước giao hàng theo khu vực và tải trọng xe, danh mục vật liệu đầy đủ. Thợ và chủ công trình kiểm tra website của bạn trước khi gọi cho ai khác.",
      features: [
        "Cập nhật giá hàng ngày",
        "Tính cước theo khu vực & tải xe",
        "Danh mục vật liệu đầy đủ",
        "Yêu cầu báo giá",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Cửa Hàng Vật Liệu Xây Dựng — Minh Tâm",
      metaDescription: "Website vật liệu xây dựng với cập nhật giá hàng ngày, tính cước giao hàng và danh mục vật liệu. Xây dựng tại An Giang, hoàn thành trong 8–12 ngày.",
    },
  },
  {
    slug: "interior",
    demoUrl: "https://scaffolds.hmtam110501.workers.dev/interior-shop",
    thumbnail: `${CDN}/interior-shop.jpg`,
    days: "10–14",
    pageCount: "6–8",
    en: {
      industry: "Interior & Furniture",
      headline: "Premium furniture deserves a premium space to live in.",
      subline: "Online showroom. Showroom visit booking.",
      body: "A showroom site for furniture and interior brands - full product catalog with photography, space to tell the story behind each piece, and online booking for showroom visits. Clients arrive informed, not just curious.",
      features: [
        "Product catalog with professional photography",
        "Story & material details per piece",
        "Showroom visit booking",
        "Finish & material options",
        "Mobile-first design",
      ],
      metaTitle: "Interior & Furniture Website — Minh Tâm",
      metaDescription: "Website for furniture and interior brands with online showroom, product catalog, and showroom booking. Built in An Giang, ready in 10–14 days.",
    },
    vi: {
      industry: "Nội thất & Decor",
      headline: "Sản phẩm cao cấp cần một không gian xứng tầm để trưng bày.",
      subline: "Showroom trực tuyến. Đặt lịch tham quan thực tế.",
      body: "Website showroom cho thương hiệu nội thất và decor - danh mục đầy đủ kèm ảnh chuyên nghiệp, câu chuyện và thông tin chi tiết sau mỗi sản phẩm, đặt lịch tham quan showroom trực tuyến. Khách đến đã hiểu sản phẩm, không chỉ đơn thuần tò mò.",
      features: [
        "Danh mục sản phẩm với ảnh chuyên nghiệp",
        "Câu chuyện & chi tiết chất liệu từng sản phẩm",
        "Đặt lịch tham quan showroom",
        "Tùy chọn chất liệu & hoàn thiện",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Nội Thất & Decor — Minh Tâm",
      metaDescription: "Website showroom nội thất với danh mục sản phẩm, câu chuyện thương hiệu và đặt lịch tham quan. Xây dựng tại An Giang, hoàn thành trong 10–14 ngày.",
    },
  },
  {
    slug: "specialty-food",
    demoUrl: "https://camgiangshop.com",
    isRealClient: true,
    thumbnail: "/about-room/tools/cam-giang-thumb.jpg",
    days: "10–14",
    pageCount: "6–8",
    en: {
      industry: "Specialty Food",
      headline: "Selling on TikTok is costing you 25% of every order.",
      subline: "Platform fees stop the day your site goes live.",
      body: "A specialty food store built around how customers actually buy - browse products, pick quantity and size, place their order in one step. No cart, no checkout flow. No platform cut. Already live at Cẩm Giang Shop, one of An Giang's biggest dried food brands.",
      features: [
        "Product catalog with variants",
        "One-step order modal (no cart)",
        "CMS for products, discounts & orders",
        "Direct ordering - no platform",
        "Mobile-first design",
      ],
      metaTitle: "Specialty Food Website — Minh Tâm",
      metaDescription: "Website for specialty food shops with one-step ordering, product catalog, and CMS. No platform fees. Built in An Giang, ready in 10–14 days.",
    },
    vi: {
      industry: "Đặc sản & Thực phẩm",
      headline: "TikTok tính 25% mỗi đơn. Website của bạn - không tính gì cả.",
      subline: "Phí nền tảng dừng lại ngay khi website đi vào hoạt động.",
      body: "Website đặc sản được xây dựng theo cách khách hàng thực sự mua hàng - xem sản phẩm, chọn số lượng, đặt hàng trong một bước. Không cần giỏ hàng, không qua thanh toán phức tạp. Không mất phí nền tảng. Đã triển khai tại Cẩm Giang Shop - một trong những thương hiệu đặc sản khô lớn nhất tỉnh An Giang.",
      features: [
        "Danh mục sản phẩm với nhiều phân loại",
        "Đặt hàng một bước, không cần giỏ hàng",
        "CMS quản lý sản phẩm, khuyến mãi và đơn hàng",
        "Đặt hàng trực tiếp, không qua nền tảng",
        "Tối ưu cho điện thoại",
      ],
      metaTitle: "Website Cửa Hàng Đặc Sản — Minh Tâm",
      metaDescription: "Website đặc sản với đặt hàng một bước, danh mục sản phẩm và CMS quản lý. Không phí nền tảng. Xây dựng tại An Giang, hoàn thành trong 10–14 ngày.",
    },
  },
]
