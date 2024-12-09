const events = [
  {
    id: 1,
    year: "Tháng 1",
    title: "Khai giảng năm học và chào đón tân sinh viên 2024-2025",
    description:
      "Tiếp nối truyền thống tốt đẹp của Nhóm, hàng trăm bạn Sinh viên Công giáo Hòa Cường đã quy tụ tại ngôi Thánh đường Giáo xứ Hòa Cường để tham dự Thánh lễ khai giảng năm học mới và chào đón các tân sinh viên niên khóa 2024 - 2025.",
    image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
    activities: [
      {
        title: "Khai giảng năm học",
        description: "Hàng trăm sinh viên đã tham dự Thánh lễ khai giảng, cùng cầu nguyện cho một năm học mới thành công.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg","https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg","https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg","https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg","https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Chào đón tân sinh viên",
        description: "Các anh chị sinh viên kỳ cựu đã chuẩn bị những món quà nhỏ để chào đón các tân sinh viên, tạo không khí thân thiện và ấm áp.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Họp mặt giao lưu",
        description: "Buổi họp mặt đầu tiên của các thành viên nhằm chia sẻ kinh nghiệm học tập và xây dựng tình bạn.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
    ],
  },
  {
    id: 2,
    year: "2010",
    title: "Mở rộng hoạt động",
    description:
      "Nhóm mở rộng quy mô và tổ chức nhiều sự kiện lớn, thu hút sự tham gia của cộng đồng.",
    image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
    activities: [
      {
        title: "Chương trình thiện nguyện",
        description: "Nhóm đã đến các khu vực khó khăn để hỗ trợ nhu yếu phẩm, chia sẻ yêu thương với cộng đồng.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Giao lưu văn hóa",
        description: "Các buổi giao lưu với sinh viên từ các trường khác nhằm xây dựng sự đoàn kết và học hỏi lẫn nhau.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Hội thảo kỹ năng mềm",
        description: "Tổ chức các hội thảo về kỹ năng làm việc nhóm, giao tiếp và quản lý thời gian cho các thành viên.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
    ],
  },
  {
    id: 3,
    year: "2020",
    title: "Chuyển đổi số",
    description:
      "Ứng dụng công nghệ để kết nối các thành viên hiệu quả hơn trong thời đại kỹ thuật số.",
    image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
    activities: [
      {
        title: "Ra mắt ứng dụng nhóm",
        description: "Ứng dụng di động giúp các thành viên quản lý thông tin và tham gia hoạt động dễ dàng hơn.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Sự kiện trực tuyến",
        description: "Các buổi họp trực tuyến đã được tổ chức để đảm bảo hoạt động của nhóm không bị gián đoạn.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
      {
        title: "Xây dựng hệ thống quản lý",
        description: "Hệ thống quản lý mới được triển khai giúp nhóm vận hành hiệu quả hơn.",
        image: ["https://res.cloudinary.com/dxggv6rnr/image/upload/v1733740510/fb789edd-22f6-4f43-a3e8-73e77d9fe336_aktd21.jpg"],
      },
    ],
  },
];

export default events;
