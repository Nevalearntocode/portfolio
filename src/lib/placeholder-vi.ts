export type WorkItem = {
  id: string;
  businessType: string;
  businessName: string;
  description: string;
  tag: string;
  image: string;
  liveUrl: string;
};

export type Testimonial = {
  id: string;
  name: string;
  business: string;
  quote: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

export const works: WorkItem[] = [
  {
    id: "1",
    businessType: "Cửa hàng hoa",
    businessName: "Bloom & Co.",
    description: "Đặt hàng online, danh mục theo mùa và lên lịch giao hàng cho một cửa hàng hoa địa phương.",
    tag: "Bán lẻ",
    image: "https://picsum.photos/seed/flower/800/500",
    liveUrl: "#",
  },
  {
    id: "2",
    businessType: "Salon tóc",
    businessName: "The Cut Studio",
    description: "Đặt lịch hẹn, hồ sơ thợ và bảng giá dịch vụ cho một salon hiện đại.",
    tag: "Đặt lịch",
    image: "https://picsum.photos/seed/salon/800/500",
    liveUrl: "#",
  },
  {
    id: "3",
    businessType: "Sửa chữa điện thoại",
    businessName: "FixIt Fast",
    description: "Theo dõi yêu cầu sửa chữa, quản lý linh kiện và thông báo tự động cho khách hàng.",
    tag: "Vận hành",
    image: "https://picsum.photos/seed/repair/800/500",
    liveUrl: "#",
  },
  {
    id: "4",
    businessType: "Tiệm bánh",
    businessName: "Sweet Origins",
    description: "Đặt bánh theo yêu cầu, trưng bày tác phẩm và lịch nhận hàng.",
    tag: "Bán lẻ",
    image: "https://picsum.photos/seed/bakery/800/500",
    liveUrl: "#",
  },
  {
    id: "5",
    businessType: "Chăm sóc xe hơi",
    businessName: "Shine & Drive",
    description: "Gói dịch vụ, thư viện ảnh trước/sau và hệ thống đặt lịch trực tuyến.",
    tag: "Đặt lịch",
    image: "https://picsum.photos/seed/auto/800/500",
    liveUrl: "#",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Santos",
    business: "Bloom & Co.",
    quote: "Đơn hàng online tăng gấp đôi ngay trong tháng đầu. Khách hàng rất thích vì đặt hàng quá dễ.",
  },
  {
    id: "2",
    name: "James Park",
    business: "FixIt Fast",
    quote: "Hệ thống theo dõi sửa chữa giúp chúng tôi bớt hẳn việc nhắn tin qua lại với khách. Thực sự hiệu quả.",
  },
  {
    id: "3",
    name: "Aisha Nguyen",
    business: "The Cut Studio",
    quote: "Trước đây đặt lịch rất lộn xộn. Giờ thì mọi thứ tự chạy, và tỷ lệ khách hủy giảm gần về không.",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Cửa hàng & Bán lẻ",
    description: "Danh mục sản phẩm, đặt hàng online và quản lý tồn kho cho cửa hàng địa phương.",
    emoji: "🛍️",
  },
  {
    id: "2",
    title: "Đặt lịch & Hẹn giờ",
    description: "Hệ thống lên lịch cho salon, phòng khám và các doanh nghiệp dịch vụ.",
    emoji: "📅",
  },
  {
    id: "3",
    title: "Vận hành & Theo dõi",
    description: "Quản lý công việc, thông báo khách hàng và công cụ nội bộ cho tiệm dịch vụ.",
    emoji: "⚙️",
  },
];

export const owner = {
  name: "Alex",
  title: "Lập trình viên ứng dụng cho doanh nghiệp địa phương",
  bio: "Tôi thiết kế và xây dựng ứng dụng web tùy chỉnh cho các doanh nghiệp nhỏ — từ tiệm hoa đến tiệm sửa điện thoại. Nhanh, hợp lý và thực sự giúp bạn vận hành tốt hơn.",
  email: "hello@yourname.dev",
  available: true,
};
