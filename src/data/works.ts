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
    title: "TechStore",
    description: "Cửa hàng công nghệ - điện thoại, laptop, phụ kiện - flash sale, đặt hàng online",
    tag: "Tech",
    thumbnail: "/works/tech-shop.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/tech-shop",
    video: "/works/tech-shop.webm",
  },
  {
    id: "2",
    title: "Thiệp Cưới Đình Toàn",
    description: "Cửa hàng thiệp cưới & thiệp chúc cao cấp - xem thiệp 3D, đặt theo yêu cầu qua Zalo",
    tag: "Thiệp cưới",
    thumbnail: "/works/card-shop.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/card-shop",
    video: "/works/card-shop.webm",
  },
  {
    id: "3",
    title: "Barber District",
    description: "Barbershop cao cấp dành cho phái mạnh - đặt lịch, hồ sơ thợ, thư viện phong cách",
    tag: "Barber",
    thumbnail: "/works/hair-salon-men.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/hair-salon-men",
    video: "/works/hair-salon-men.webm",
  },
  {
    id: "4",
    title: "DUSK",
    description: "Tiệm nước đặc biệt phong cách tối giản - thực đơn thức uống cao cấp và đặt hàng online",
    tag: "F&B",
    thumbnail: "/works/food-shop.jpg",
    url: "https://scaffolds.hmtam110501.workers.dev/food-shop",
    video: "/works/food-shop.webm",
  },
]
