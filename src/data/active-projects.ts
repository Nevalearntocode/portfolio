export type ActiveProject = {
  id: string
  clientName: string
  clientCategory: string
  credibility?: string
  clientSocials?: {
    facebook?: string
    instagram?: string
    zalo?: string
    tiktok?: string
  }
  projectType: string
  phase: "design" | "integration" | "review" | "finishing"
  demoUrl?: string
  thumbnail: string
}

export const activeProjects: ActiveProject[] = [
  {
    id: "1",
    clientName: "Cam Giang Shop",
    clientCategory: "Đặc sản khô",
    credibility: "700k+ followers trên các nền tảng",
    clientSocials: {
      facebook: "https://www.facebook.com/hi.camgiang",
      zalo: "https://zalo.me/0909313165",
      tiktok: "https://www.tiktok.com/@cam_giang_nguyen_97",
    },
    projectType: "Cửa hàng online",
    phase: "integration",
    demoUrl: "https://cam-giang-shop.vercel.app",
    thumbnail: "/about-room/tools/cam-giang-thumb.jpg",
  },
  {
    id: "2",
    clientName: "Trần Lại Mobile",
    clientCategory: "Cửa hàng điện thoại",
    credibility: "Hơn 10 năm kinh nghiệm tại địa phương",
    clientSocials: {
      facebook: "https://www.facebook.com/lai.tran.5454",
      zalo: "https://zalo.me/0944900899",
    },
    projectType: "Website bán lẻ & sửa chữa",
    phase: "finishing",
    demoUrl: "https://tran-lai-mobile.vercel.app",
    thumbnail: "/about-room/tools/tran-lai-thumb.jpg",
  },
]
