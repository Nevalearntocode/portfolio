export type WorkMeta = {
  id: string
  title: string
  description: string
  tag: string
  thumbnail: string
  url: string
  video?: string
  comingSoon?: boolean
}

export const works: WorkMeta[] = [
  {
    id: "1",
    title: "Thiệp Cưới Đình Toàn",
    description: "Cửa hàng thiệp cưới & thiệp chúc cao cấp — xem thiệp 3D, đặt theo yêu cầu qua Zalo",
    tag: "Thiệp cưới",
    thumbnail: "/works/card-shop.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/card-shop",
    video: "/works/card-shop.webm",
  },
  {
    id: "2",
    title: "DUSK",
    description: "Tiệm nước đặc biệt phong cách tối giản — thực đơn thức uống cao cấp và đặt hàng online",
    tag: "F&B",
    thumbnail: "/works/food-shop.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/food-shop",
    video: "/works/food-shop.webm",
  },
  {
    id: "3",
    title: "Barber District",
    description: "Barbershop cao cấp dành cho phái mạnh — đặt lịch, hồ sơ thợ, thư viện phong cách",
    tag: "Barber",
    thumbnail: "/works/hair-salon-men.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/hair-salon-men",
    video: "/works/hair-salon-men.webm",
  },
  {
    id: "4",
    title: "Bánh Ngọt Hương Vị",
    description: "Tiệm bánh đặt theo yêu cầu, giao tận nơi trong ngày",
    tag: "F&B",
    thumbnail: "https://picsum.photos/seed/bakery/800/500",
    url: "#",
    comingSoon: true,
  },
  {
    id: "5",
    title: "Garage Ô Tô Trung Tín",
    description: "Garage sửa xe với hệ thống đặt lịch và theo dõi tiến độ",
    tag: "Ô tô",
    thumbnail: "https://picsum.photos/seed/auto/800/500",
    url: "#",
    comingSoon: true,
  },
  {
    id: "6",
    title: "Spa Thư Giãn Hoa Sen",
    description: "Website đặt lịch trị liệu và chăm sóc sức khỏe tại spa cao cấp",
    tag: "Spa & Wellness",
    thumbnail: "https://picsum.photos/seed/spa/800/500",
    url: "#",
    comingSoon: true,
  },
]
