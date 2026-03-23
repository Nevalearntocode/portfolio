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

const CDN = process.env.NEXT_PUBLIC_CDN_URL + "/portfolio/works"

export const works: WorkMeta[] = [
  {
    id: "1",
    title: "TechStore",
    description: "Cửa hàng công nghệ - điện thoại, laptop, phụ kiện - flash sale, đặt hàng online",
    tag: "Tech",
    thumbnail: `${CDN}/tech-shop.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/tech-shop",
    video: `${CDN}/tech-shop.webm`,
  },
  {
    id: "2",
    title: "Thiệp Cưới Đình Toàn",
    description: "Cửa hàng thiệp cưới & thiệp chúc cao cấp - xem thiệp 3D, đặt theo yêu cầu qua Zalo",
    tag: "Thiệp cưới",
    thumbnail: `${CDN}/card-shop.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/card-shop",
    video: `${CDN}/card-shop.webm`,
  },
  {
    id: "3",
    title: "Barber District",
    description: "Barbershop cao cấp dành cho phái mạnh - đặt lịch, hồ sơ thợ, thư viện phong cách",
    tag: "Barber",
    thumbnail: `${CDN}/hair-salon-men.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/hair-salon-men",
    video: `${CDN}/hair-salon-men.webm`,
  },
  {
    id: "4",
    title: "DUSK",
    description: "Tiệm nước đặc biệt phong cách tối giản - thực đơn thức uống cao cấp và đặt hàng online",
    tag: "F&B",
    thumbnail: `${CDN}/food-shop.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/food-shop",
    video: `${CDN}/food-shop.webm`,
  },
  {
    id: "5",
    title: "Vật Tư An Giang",
    description: "Cửa hàng vật liệu xây dựng - bảng giá cập nhật hàng ngày, tính chi phí theo xe tải toàn tỉnh",
    tag: "Vật tư",
    thumbnail: `${CDN}/construction-shop.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/construction-shop",
    video: `${CDN}/construction-shop.webm`,
  },
  {
    id: "6",
    title: "The Curated Sanctuary",
    description: "Showroom nội thất cao cấp - sản phẩm thủ công từ vật liệu tự nhiên, đặt lịch tham quan online",
    tag: "Nội thất",
    thumbnail: `${CDN}/interior-shop.jpg`,
    url: "https://scaffolds.hmtam110501.workers.dev/interior-shop",
    video: `${CDN}/interior-shop.webm`,
  },
]
