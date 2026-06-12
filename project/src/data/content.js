export const content = {
  couple: {
    name1: "Đạt",
    name2: "Dương",
    startDate: "2023-02-14", // Valentine day — thay bằng ngày thật
    tagline: "Từ hai người xa lạ, thành một thế giới",
    subTagline: "Đây là câu chuyện của chúng mình ✨",
  },

  ourStory: [
    {
      id: 1,
      author: "Đạt",
      title: "Lần đầu anh thấy em...",
      content:
        "Anh không nghĩ rằng buổi chiều hôm đó lại thay đổi mọi thứ. Em ngồi đó, cười cái gì đó trên điện thoại, và anh cứ nhìn mãi không thôi. Tim đập nhanh một chút, rồi nhanh thêm một chút nữa.",
      image: "/assets/hero.png",
      align: "left",
    },
    {
      id: 2,
      author: "Dương",
      title: "Lần đầu em để ý anh...",
      content:
        "Em không muốn thừa nhận, nhưng mà em cũng để ý anh trước. Cái cách anh cười, hơi ngốc nghếch một chút nhưng mà chân thật lắm. Em nghĩ bụng: người này thú vị đây.",
      image: "/assets/hero.png",
      align: "right",
    },
    {
      id: 3,
      author: "Đạt",
      title: "Tin nhắn đầu tiên...",
      content:
        "Anh gõ đi gõ lại không biết bao nhiêu lần. Xóa. Gõ lại. Xóa. Cuối cùng chỉ dám nhắn 'Hi em'. Đơn giản vậy thôi mà tim hồi hộp như thi đại học.",
      image: "/assets/hero.png",
      align: "left",
    },
    {
      id: 4,
      author: "Dương",
      title: "Khi em trả lời...",
      content:
        "Em nhìn màn hình một lúc rồi gõ 'Hi anh 😊'. Cái emoji mặt cười đó, em cân nhắc mãi. Không biết có quá tươi không. Mà thôi, cứ tự nhiên.",
      image: "/assets/hero.png",
      align: "right",
    },
  ],

  timeline: [
    {
      id: 1,
      date: "14/02/2023",
      emoji: "💌",
      title: "Tin nhắn đầu tiên",
      description: "Một lời chào đơn giản, nhưng bắt đầu cả một câu chuyện dài.",
      image: "/assets/hero.png",
    },
    {
      id: 2,
      date: "15/03/2023",
      emoji: "☕",
      title: "Hẹn hò lần đầu",
      description: "Cafe, chuyện trò, và khoảnh khắc không muốn chia tay.",
      image: "/albums/hen-ho-dau-tien/cover.png",
    },
    {
      id: 3,
      date: "14/05/2023",
      emoji: "💑",
      title: "Chính thức bên nhau",
      description: "Từ hôm đó, chúng mình không còn là 'bạn bè' nữa.",
      image: "/assets/hero.png",
    },
    {
      id: 4,
      date: "20/07/2023",
      emoji: "✈️",
      title: "Chuyến đi đầu tiên",
      description: "Đà Lạt, sương mù, và những ký ức không bao giờ phai.",
      image: "/albums/du-lich-da-lat/cover.png",
    },
    {
      id: 5,
      date: "14/02/2024",
      emoji: "🎂",
      title: "1 năm bên nhau",
      description: "Nhìn lại một năm qua, mình may mắn có nhau.",
      image: "/assets/hero.png",
    },
    {
      id: 6,
      date: "14/05/2024",
      emoji: "🌸",
      title: "Hơn 1 năm yêu",
      description: "Và hành trình vẫn đang tiếp tục, đẹp hơn mỗi ngày.",
      image: "/assets/hero.png",
    },
  ],

  loveLetters: [
    {
      id: 1,
      from: "Đạt",
      to: "Dương",
      subject: "Lần đầu anh dám nói thật",
      content:
        "Dương ơi, hôm đó anh không dám nhìn thẳng vào mắt em khi nói. Anh chỉ biết rằng mỗi sáng thức dậy, điều đầu tiên anh nghĩ đến là em. Và anh không muốn giả vờ gì nữa. Anh thích em.",
    },
    {
      id: 2,
      from: "Dương",
      to: "Đạt",
      subject: "Em muốn anh biết điều này",
      content:
        "Anh à, em không dễ nói những điều này lắm. Nhưng mà em muốn anh biết: cái cách anh nhớ những chi tiết nhỏ — màu đồ uống em hay gọi, bài hát em nghe khi buồn — mấy cái đó làm em thấy được quan tâm thật sự.",
    },
    {
      id: 3,
      from: "Cả hai",
      to: "Tương lai",
      subject: "Lời hứa chúng mình viết cùng nhau",
      content:
        "Hứa sẽ cùng nhau đi qua những ngày khó. Hứa sẽ vẫn nắm tay nhau khi tóc bạc. Hứa sẽ luôn là nơi an toàn nhất của nhau. Và hứa sẽ không bao giờ ngừng kể câu chuyện này.",
    },
  ],

  journeyMap: {
    title: "Dấu chân của chúng mình",
    locations: [
      {
        id: 1,
        name: "TP. Hồ Chí Minh",
        description: "Nơi câu chuyện bắt đầu",
        date: "02/2023",
        x: 65, // percentage on SVG
        y: 72,
        image: "/assets/hero.png",
      },
      {
        id: 2,
        name: "Đà Lạt",
        description: "Chuyến đi đầu tiên, sương mù và hoa dại",
        date: "07/2023",
        x: 60,
        y: 55,
        image: "/albums/du-lich-da-lat/cover.png",
      },
      {
        id: 3,
        name: "Hội An",
        description: "Đèn lồng, phố cổ, và hoàng hôn trên sông",
        date: "12/2023",
        x: 52,
        y: 42,
        image: "/assets/hero.png",
      },
      {
        id: 4,
        name: "Hà Nội",
        description: "Hồ Tây buổi chiều và cà phê trứng",
        date: "04/2024",
        x: 55,
        y: 22,
        image: "/assets/hero.png",
      },
    ],
  },

  soundtrack: [
    {
      id: 1,
      title: "Có Chắc Yêu Là Đây",
      artist: "Sơn Tùng M-TP",
      reason: "Bài hát chúng mình nghe cùng nhau lần đầu tiên.",
      color: "#FFB3D1",
    },
    {
      id: 2,
      title: "Hôm Nay Tôi Buồn",
      artist: "Phương Ly",
      reason: "Bài em hay nghe lúc nhớ anh.",
      color: "#C4B5FD",
    },
    {
      id: 3,
      title: "Như Những Phút Ban Đầu",
      artist: "Mỹ Tâm",
      reason: "Bài anh đặt làm ringtone lúc mới quen em.",
      color: "#FFD6A5",
    },
    {
      id: 4,
      title: "Em Của Ngày Hôm Qua",
      artist: "Sơn Tùng M-TP",
      reason: "Chúng mình hát bài này trong chuyến đi Đà Lạt.",
      color: "#CAFFBF",
    },
    {
      id: 5,
      title: "Từ Hôm Nay",
      artist: "Bích Phương",
      reason: "Kỷ niệm 1 năm, anh tặng em bài này.",
      color: "#FFB3D1",
    },
  ],

  funStats: [
    { label: "Tin nhắn đã gửi", value: "12,847", emoji: "💬" },
    { label: "Chuyến đi cùng nhau", value: "8", emoji: "✈️" },
    { label: "Bữa ăn bên nhau", value: "365+", emoji: "🍜" },
    { label: "Ảnh chụp cùng nhau", value: "1,200+", emoji: "📸" },
    { label: "Bộ phim đã xem", value: "47", emoji: "🎬" },
    { label: "Ngày bên nhau", value: "500+", emoji: "❤️" },
  ],

  constellationStars: [
    { x: 20, y: 30, label: "Lần đầu gặp" },
    { x: 35, y: 15, label: "Tin nhắn đầu" },
    { x: 55, y: 10, label: "Hẹn hò đầu" },
    { x: 75, y: 20, label: "Chính thức yêu" },
    { x: 85, y: 40, label: "Đà Lạt" },
    { x: 80, y: 60, label: "Hội An" },
    { x: 65, y: 75, label: "1 năm yêu" },
    { x: 45, y: 85, label: "Hà Nội" },
    { x: 25, y: 75, label: "Tương lai" },
    { x: 15, y: 55, label: "Mãi bên nhau" },
  ],

  closing: {
    quote: "Và câu chuyện vẫn đang tiếp tục...",
    promise: "Chúng mình hứa sẽ tiếp tục viết những trang đẹp nhất.",
    credit: "Made with 💕 by Đạt & Dương · 2024",
  },
};
