export type ActiveProject = {
  id: string
  clientName: string
  clientCategory: string
  clientSocials?: {
    facebook?: string
    instagram?: string
    zalo?: string
  }
  projectType: string
  phase: "design" | "integration" | "review" | "finishing"
  demoUrl?: string
  thumbnail: string
}

export const activeProjects: ActiveProject[] = [
  {
    id: "1",
    clientName: "Phở Bà Lan",
    clientCategory: "Nhà hàng",
    clientSocials: { facebook: "#", instagram: "#" },
    projectType: "Website đặt bàn & menu",
    phase: "design",
    demoUrl: "#",
    thumbnail: "https://picsum.photos/seed/pho/800/500",
  },
  {
    id: "2",
    clientName: "Nail Studio Lily",
    clientCategory: "Làm đẹp",
    clientSocials: { facebook: "#", zalo: "#" },
    projectType: "Website đặt lịch",
    phase: "review",
    demoUrl: "#",
    thumbnail: "https://picsum.photos/seed/nail/800/500",
  },
  {
    id: "3",
    clientName: "Café Góc Nhỏ",
    clientCategory: "F&B",
    clientSocials: { instagram: "#" },
    projectType: "Website thực đơn & order",
    phase: "finishing",
    demoUrl: "#",
    thumbnail: "https://picsum.photos/seed/cafe/800/500",
  },
]
