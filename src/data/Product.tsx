const products = [
  {
    id:1,
    image:"https://iplanet.one/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-IN_7c8887fe-8923-4bc1-bd4c-5cf98f7cce47.jpg?v=1695436494&width=1445",
    category: "Smartphone",
    name: "iPhone 15 Pro",
    price: 999,
    description: "Apple flagship smartphone with A17 Pro chip, 48MP camera, and titanium design.",
    qty: 25
  },
  {
    id:2,
    image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-size-unselect-202601-gallery-1_FMT_WHH?wid=690&hei=720&fmt=jpeg&qlt=90&.v=1767638908527",
    category: "Laptop",
    name: "MacBook Air M3",
    price: 1299,
    description: "Lightweight laptop with Apple M3 chip, 13-inch Retina display, and long battery life.",
    qty: 15
  },
  {
    id:3,
    image:"https://i5.walmartimages.com/seo/Dell-XPS-13-9300-Intel-Core-i7-1065G7-1-3-GHz-Win-10-Pro-Iris-Plus-Graphics-16-GB-RAM-512-SSD-NVMe-13-4-touchscreen-1920-x-1200-Wi-Fi-6-silver_2ddd9a78-5a96-4a89-ac67-1bb3a07dbc33.23c5c186460aca291772af14cad13082.jpeg",
    category: "Laptop",
    name: "Dell XPS 13",
    price: 1199,
    description: "Premium ultrabook with Intel Core i7, InfinityEdge display, and slim aluminum body.",
    qty: 18
  },
  {
    id:4,
    image:"https://cdn.movertix.com/media/catalog/product/cache/image/s/a/samsung-galaxy-s24-5g-amber-yellow-128gb-and-8gb-ram-sm-s921b.jpg",
    category: "Smartphone",
    name: "Samsung Galaxy S24",
    price: 899,
    description: "High-end Android smartphone with powerful processor and advanced camera system.",
    qty: 30
  },
  {
    id:5,
    image:"https://i5.walmartimages.com/seo/2022-Apple-10-9-inch-iPad-Air-Wi-Fi-Cellular-64GB-Pink-5th-Generation_204c4b6f-cc12-434a-91d1-c5995cf1fab5.79bacd232077b42a0a250792dafb38fb.jpeg",
    category: "Tablet",
    name: "iPad Air 5",
    price: 599,
    description: "Powerful tablet with Apple M1 chip, 10.9-inch Liquid Retina display.",
    qty: 20
  },
  {
    id:6,
    image:"https://sonyworld.co.za/cdn/shop/files/3Untitled-1.jpg?v=1688724954&width=1946",
    category: "Headphones",
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Industry-leading noise cancelling wireless headphones with premium sound.",
    qty: 35
  },
  {
    id:7,
    image:"https://images-cdn.ubuy.co.in/66121f864cd32d78796e489f-apple-watch-series-9-gps-cellular-45mm.jpg",
    category: "Smartwatch",
    name: "Apple Watch Series 9",
    price: 429,
    description: "Advanced smartwatch with health tracking, GPS, and bright Always-On display.",
    qty: 28
  },
  {
    id:8,
    image:"https://i.guim.co.uk/img/media/f58aa676496e9eaba611000477f28d0232fd91eb/0_165_3378_2027/master/3378.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=c48d69de6062bdf393f5af91dfb76225",
    category: "Gaming",
    name: "PlayStation 5",
    price: 499,
    description: "Next-gen gaming console with ultra-fast SSD and immersive 4K gaming.",
    qty: 12
  },
  {
    id:9,
    image:"https://us.maxgaming.com/bilder/artiklar/zoom/21665_1.jpg?m=1653482560",
    category: "Accessory",
    name: "Logitech MX Master 3S",
    price: 99,
    description: "Advanced wireless mouse designed for productivity and precision.",
    qty: 40
  },
  {
    id:10,
    image:"https://image-us.samsung.com/SamsungUS/samsungbusiness/computing/monitors/flat/22--led-monitor-with-borderless-design-lf22t350fhnxza/LF22T350FHNXZA_004_L-Perspective_Black_1600x1200.jpg?$product-details-jpg$",
    category: "Monitor",
    name: "LG UltraGear 27\"",
    price: 349,
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and IPS panel.",
    qty: 22
  },
  {
    id:11,
    image:"https://us.maxgaming.com/bilder/artiklar/zoom/21665_1.jpg?m=1653482560",
    category: "Accessory",
    name: "Logitech MX Master 3S",
    price: 99,
    description: "Advanced wireless mouse designed for productivity and precision.",
    qty: 40
  },
  {
    id:12,
    image:"https://image-us.samsung.com/SamsungUS/samsungbusiness/computing/monitors/flat/22--led-monitor-with-borderless-design-lf22t350fhnxza/LF22T350FHNXZA_004_L-Perspective_Black_1600x1200.jpg?$product-details-jpg$",
    category: "Monitor",
    name: "LG UltraGear 27\"",
    price: 349,
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and IPS panel.",
    qty: 22
  },
  {
    id:13,
    image:"https://us.maxgaming.com/bilder/artiklar/zoom/21665_1.jpg?m=1653482560",
    category: "Accessory",
    name: "Logitech MX Master 3S",
    price: 99,
    description: "Advanced wireless mouse designed for productivity and precision.",
    qty: 40
  },
  {
    id:14,
    image:"https://image-us.samsung.com/SamsungUS/samsungbusiness/computing/monitors/flat/22--led-monitor-with-borderless-design-lf22t350fhnxza/LF22T350FHNXZA_004_L-Perspective_Black_1600x1200.jpg?$product-details-jpg$",
    category: "Monitor",
    name: "LG UltraGear 27\"",
    price: 349,
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and IPS panel.",
    qty: 22
  },
  {
    id:15,
    image:"https://us.maxgaming.com/bilder/artiklar/zoom/21665_1.jpg?m=1653482560",
    category: "Accessory",
    name: "Logitech MX Master 3S",
    price: 99,
    description: "Advanced wireless mouse designed for productivity and precision.",
    qty: 40
  },
  {
    id:16,
    image:"https://image-us.samsung.com/SamsungUS/samsungbusiness/computing/monitors/flat/22--led-monitor-with-borderless-design-lf22t350fhnxza/LF22T350FHNXZA_004_L-Perspective_Black_1600x1200.jpg?$product-details-jpg$",
    category: "Monitor",
    name: "LG UltraGear 27\"",
    price: 349,
    description: "27-inch QHD gaming monitor with 165Hz refresh rate and IPS panel.",
    qty: 22
  }
];

export default products;