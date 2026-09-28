// Dream Cart BD - Initial Seed Data & Schemas
const INITIAL_PRODUCTS = [
  {
    "id": "DCBD-1001",
    "name": "Canon EOS 5D Mark III Full Frame DSLR Camera Body",
    "category": "Cameras & Optics",
    "sub_category": "DSLR & Mirrorless",
    "child_category": "Full Frame",
    "brand": "Canon",
    "buying_price": 65000,
    "selling_price": 82000,
    "original_price": 95000,
    "reseller_price": 75000,
    "wholesale_price": 70000,
    "min_order_q": 3,
    "stock": 14,
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Professional 22.3 MP full-frame sensor DSLR, DIGIC 5+ image processor, 61-point High Density Reticular AF, ISO 100-25600. Ideal for studio, commercial and event photography.",
    "specification": "Sensor: 22.3MP Full-Frame CMOS | Processor: DIGIC 5+ | AF Points: 61 | Video: Full HD 1080p | Viewfinder: 100% coverage | Dual Card Slots: CF & SD",
    "others": "Original Box, Battery LP-E6, Charger, Neck Strap, Manual included.",
    "color": [
      "Black"
    ],
    "size": [
      "Standard Body"
    ]
  },
  {
    "id": "DCBD-1002",
    "name": "Sony Alpha 7C Compact Full-Frame Mirrorless Camera",
    "category": "Cameras & Optics",
    "sub_category": "DSLR & Mirrorless",
    "child_category": "Full Frame",
    "brand": "Sony",
    "buying_price": 125000,
    "selling_price": 148000,
    "original_price": 165000,
    "reseller_price": 138000,
    "wholesale_price": 132000,
    "min_order_q": 2,
    "stock": 8,
    "images": [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "World's smallest and lightest full-frame camera body with 5-axis optical in-body image stabilization, 24.2MP Exmor R CMOS sensor, 4K HDR movie recording.",
    "specification": "24.2MP BSI Sensor | BIONZ X Processor | Real-time Eye AF | 5-Axis SteadyShot | Flip-out Touchscreen | 693 AF Points",
    "others": "Imported from Dubai, 1 Year Service Warranty.",
    "color": [
      "Silver",
      "Black"
    ],
    "size": [
      "Body Only",
      "Kit with 28-60mm"
    ]
  },
  {
    "id": "DCBD-1003",
    "name": "Canon PowerShot G7 X Mark III Digital Camera",
    "category": "Cameras & Optics",
    "sub_category": "Action & Compact",
    "child_category": "Vlogging",
    "brand": "Canon",
    "buying_price": 62000,
    "selling_price": 76500,
    "original_price": 85000,
    "reseller_price": 70000,
    "wholesale_price": 66000,
    "min_order_q": 3,
    "stock": 18,
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Premium creator camera featuring 4K recording without crop, 20.1MP 1.0-type stacked CMOS sensor, 4.2x optical zoom lens, live streaming support to YouTube.",
    "specification": "20.1 Megapixel 1.0-inch Sensor | 4.2x f/1.8-2.8 Zoom Lens | 4K 30p & FHD 120p | Vertical Video Support | 3.5mm Mic Input",
    "others": "Best for YouTube creators, content creators, and vloggers.",
    "color": [
      "Black",
      "Silver"
    ],
    "size": [
      "Pocket Compact"
    ]
  },
  {
    "id": "DCBD-1004",
    "name": "Nikon D750 Full Frame DSLR Camera Body",
    "category": "Cameras & Optics",
    "sub_category": "DSLR & Mirrorless",
    "child_category": "Full Frame",
    "brand": "Nikon",
    "buying_price": 68000,
    "selling_price": 84500,
    "original_price": 98000,
    "reseller_price": 77000,
    "wholesale_price": 72000,
    "min_order_q": 2,
    "stock": 9,
    "images": [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "24.3 MP FX-format CMOS sensor, EXPEED 4 image processor, tilt-angle LCD monitor, 51-point AF system with group area AF mode.",
    "specification": "24.3MP FX Sensor | 51-Point AF System | 6.5 fps Continuous Shooting | Full HD 60p Video | Built-in Wi-Fi | Tilting 3.2\" LCD",
    "others": "Condition: Brand New in Box with accessories.",
    "color": [
      "Black"
    ],
    "size": [
      "Standard"
    ]
  },
  {
    "id": "DCBD-1005",
    "name": "Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E-Mount",
    "category": "Cameras & Optics",
    "sub_category": "Lenses",
    "child_category": "Zoom",
    "brand": "Sigma",
    "buying_price": 88000,
    "selling_price": 105000,
    "original_price": 120000,
    "reseller_price": 97000,
    "wholesale_price": 92000,
    "min_order_q": 2,
    "stock": 11,
    "images": [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Flagship standard zoom lens for mirrorless full-frame cameras. Constant f/2.8 aperture, exceptional sharpness across entire zoom range.",
    "specification": "Focal Length: 24-70mm | Max Aperture: f/2.8 | Mount: Sony E / L-Mount | Filter Size: 82mm | Weather-Sealed Construction",
    "others": "Lens Hood, Front & Rear Caps, Padded Case included.",
    "color": [
      "Black"
    ],
    "size": [
      "82mm Filter"
    ]
  },
  {
    "id": "DCBD-1006",
    "name": "Canon EF 70-200mm f/2.8L IS II USM Telephoto Lens",
    "category": "Cameras & Optics",
    "sub_category": "Lenses",
    "child_category": "Telephoto",
    "brand": "Canon",
    "buying_price": 98000,
    "selling_price": 118000,
    "original_price": 135000,
    "reseller_price": 108000,
    "wholesale_price": 103000,
    "min_order_q": 2,
    "stock": 6,
    "images": [
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Legendary professional workhorse telephoto zoom lens. Optical Image Stabilizer with up to 4 stops of correction, Fluorite and UD elements.",
    "specification": "Focal Length: 70-200mm | Aperture: f/2.8 Constant | Ultrasonic Motor (USM) | 4-Stop Image Stabilizer | Filter: 77mm",
    "others": "Tripod Collar, ET-87 Hood, LZ1326 Case included.",
    "color": [
      "White/Grey"
    ],
    "size": [
      "77mm Filter"
    ]
  },
  {
    "id": "DCBD-1007",
    "name": "Epson EcoTank L3250 Wi-Fi All-in-One Ink Tank Printer",
    "category": "Office Equipment",
    "sub_category": "Printers & Scanners",
    "child_category": "Color InkTank",
    "brand": "Epson",
    "buying_price": 18500,
    "selling_price": 22500,
    "original_price": 25500,
    "reseller_price": 20500,
    "wholesale_price": 19500,
    "min_order_q": 4,
    "stock": 25,
    "images": [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Cost-effective wireless multi-function printer with spill-free refilling, borderless photo printing up to 4R, WiFi Direct and smart panel app.",
    "specification": "Print, Scan, Copy | Print Speed: 33 ppm (Black), 15 ppm (Color) | Resolution: 5760 x 1440 dpi | Wi-Fi & Wi-Fi Direct",
    "others": "High yield ink bottles included (Black: 4,500 pages, Color: 7,500 pages).",
    "color": [
      "Black"
    ],
    "size": [
      "Compact Office"
    ]
  },
  {
    "id": "DCBD-1008",
    "name": "BenQ MS550 SVGA 3600 Lumens Business Meeting Projector",
    "category": "Office Equipment",
    "sub_category": "Projectors",
    "child_category": "DLP Business",
    "brand": "BenQ",
    "buying_price": 38000,
    "selling_price": 46000,
    "original_price": 52000,
    "reseller_price": 42000,
    "wholesale_price": 40000,
    "min_order_q": 2,
    "stock": 12,
    "images": [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "High brightness 3600 ANSI Lumens projector for crisp presentations in well-lit meeting rooms. Dual HDMI inputs for multiplatform connectivity.",
    "specification": "Brightness: 3600 Lumens | Contrast: 20,000:1 | Resolution: SVGA (800x600) | Lamp Life: Up to 15,000 hrs | Dual HDMI, VGA",
    "others": "Remote control, Power cord, VGA Cable included. 2 Year Warranty.",
    "color": [
      "White"
    ],
    "size": [
      "Desktop / Ceiling"
    ]
  },
  {
    "id": "DCBD-1009",
    "name": "Logitech MK270 Wireless Keyboard and Mouse Combo",
    "category": "Office Equipment",
    "sub_category": "Computer Accessories",
    "child_category": "Peripherals",
    "brand": "Logitech",
    "buying_price": 1850,
    "selling_price": 2450,
    "original_price": 2900,
    "reseller_price": 2150,
    "wholesale_price": 2000,
    "min_order_q": 10,
    "stock": 60,
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Reliable 2.4 GHz wireless connection with 10-meter range. Spill-resistant design with 36-month keyboard and 12-month mouse battery life.",
    "specification": "Plug-and-play USB Receiver | Full-sized keyboard with numpad | 8 Multimedia hotkeys | Optical mouse with scroll wheel",
    "others": "Includes AAA and AA batteries. 3 Years Warranty.",
    "color": [
      "Black"
    ],
    "size": [
      "Full Size"
    ]
  },
  {
    "id": "DCBD-1010",
    "name": "Boya BY-M1 Omni-Directional Lavalier Microphone",
    "category": "Studio & Lighting",
    "sub_category": "Microphones",
    "child_category": "Lavalier",
    "brand": "Boya",
    "buying_price": 650,
    "selling_price": 990,
    "original_price": 1400,
    "reseller_price": 820,
    "wholesale_price": 750,
    "min_order_q": 10,
    "stock": 85,
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520523839898-507124cd537a?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Universal clip-on microphone for smartphones, DSLR, camcorders, audio recorders, PC. 6-meter high-quality audio cable.",
    "specification": "Transducer: Electret Condenser | Polar Pattern: Omni-directional | Frequency: 65Hz-18KHz | Connector: 3.5mm 4-pole gold plug",
    "others": "Foam windscreen, lapel clip, LR44 battery, 1/4\" adapter included.",
    "color": [
      "Black"
    ],
    "size": [
      "6 Meter Cable"
    ]
  },
  {
    "id": "DCBD-1011",
    "name": "Heavy Duty Office Paper Shredder Cross-Cut 12 Sheets",
    "category": "Office Equipment",
    "sub_category": "Laminators & Shredders",
    "child_category": "Shredders",
    "brand": "OffiTech",
    "buying_price": 8500,
    "selling_price": 11500,
    "original_price": 13900,
    "reseller_price": 9900,
    "wholesale_price": 9200,
    "min_order_q": 3,
    "stock": 16,
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "High security cross-cut paper shredder. Destroys credit cards, staples, paper clips and sensitive company documents into 4x38mm particles.",
    "specification": "Capacity: 12 sheets per pass | Bin Volume: 21 Liters | Continuous run: 10 mins | Overheat protection auto-stop",
    "others": "1 Year Service Warranty.",
    "color": [
      "Black",
      "White"
    ],
    "size": [
      "21L Wastebasket"
    ]
  },
  {
    "id": "DCBD-1012",
    "name": "Godox SL60W 5600K Continuous LED Video Light",
    "category": "Studio & Lighting",
    "sub_category": "Lighting",
    "child_category": "LED Video Light",
    "brand": "Godox",
    "buying_price": 11500,
    "selling_price": 14500,
    "original_price": 16800,
    "reseller_price": 13000,
    "wholesale_price": 12300,
    "min_order_q": 2,
    "stock": 20,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Versatile continuous light source with daylight-balanced 5600K color temperature for professional studio video, portraiture and live streaming.",
    "specification": "Power: 60W | CRI 95, TLCI 90 | Bowens Mount | Heat Sink and Built-in Cooling Fan | Wireless Remote Control Support",
    "others": "Reflector, Power Cord, Lamp Cover included.",
    "color": [
      "Black"
    ],
    "size": [
      "Standard Bowens"
    ]
  },
  {
    "id": "DCBD-1013",
    "name": "A3 Laminating Machine Hot and Cold Heavy Duty",
    "category": "Office Equipment",
    "sub_category": "Laminators & Shredders",
    "child_category": "Laminators",
    "brand": "OffiTech",
    "buying_price": 4200,
    "selling_price": 5800,
    "original_price": 6900,
    "reseller_price": 4900,
    "wholesale_price": 4600,
    "min_order_q": 4,
    "stock": 22,
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Professional 4-roller metal body A3 laminator with temperature gauge, forward and reverse rotation functions. Fast 3-minute warm-up.",
    "specification": "Entry Width: 330mm (A3/A4) | Speed: 500mm/min | Temperature range: 80-180°C | Metal gear system",
    "others": "1 Year Free Service Warranty.",
    "color": [
      "Metallic Grey"
    ],
    "size": [
      "A3 / A4"
    ]
  },
  {
    "id": "DCBD-1014",
    "name": "Ergonomic Mesh High-Back Executive Office Chair",
    "category": "Office Equipment",
    "sub_category": "Furniture",
    "child_category": "Chairs",
    "brand": "Dream Comfort",
    "buying_price": 8500,
    "selling_price": 12500,
    "original_price": 15500,
    "reseller_price": 10500,
    "wholesale_price": 9500,
    "min_order_q": 3,
    "stock": 15,
    "images": [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Breathable high-density mesh chair with adjustable 3D lumbar support, 2D armrests, tilt tension lock and heavy-duty steel base.",
    "specification": "Gas Lift: Class 4 BIFMA Certified | Capacity: Up to 150 kg | Wheels: 60mm PU silent casters | Headrest: Height & angle adjustable",
    "others": "Flat packed with complete tool set and easy manual.",
    "color": [
      "Black",
      "Grey"
    ],
    "size": [
      "High Back"
    ]
  },
  {
    "id": "DCBD-1015",
    "name": "SanDisk Extreme PRO 128GB UHS-I SDXC Memory Card",
    "category": "Cameras & Optics",
    "sub_category": "Accessories",
    "child_category": "Memory Cards",
    "brand": "SanDisk",
    "buying_price": 1800,
    "selling_price": 2650,
    "original_price": 3200,
    "reseller_price": 2200,
    "wholesale_price": 2000,
    "min_order_q": 5,
    "stock": 70,
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Shot speeds up to 90MB/s, transfer speeds up to 170MB/s. Perfect for shooting 4K UHD video and sequential burst mode photography.",
    "specification": "Capacity: 128GB | Class 10, UHS-I, U3, V30 | Temperature-proof, waterproof, shockproof, and x-ray proof",
    "others": "Lifetime Limited Warranty.",
    "color": [
      "Black/Red"
    ],
    "size": [
      "128GB"
    ]
  },
  {
    "id": "DCBD-1016",
    "name": "Smart Fingerprint & RFID Card Office Attendance Machine",
    "category": "Office Equipment",
    "sub_category": "Security & Attendance",
    "child_category": "Biometrics",
    "brand": "ZKTeco",
    "buying_price": 5500,
    "selling_price": 7800,
    "original_price": 9500,
    "reseller_price": 6800,
    "wholesale_price": 6200,
    "min_order_q": 3,
    "stock": 28,
    "images": [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Fast biometric fingerprint identification within 0.5s, 2.8-inch TFT color screen, USB drive Excel report export with no software setup needed.",
    "specification": "Fingerprint Capacity: 1,000 | Record Capacity: 100,000 logs | Communication: USB Host/Client | Power: 5V DC 1A",
    "others": "Includes mounting bracket, screws, power adapter and warranty card.",
    "color": [
      "Black"
    ],
    "size": [
      "Wall Mount"
    ]
  },
  {
    "id": "DCBD-1017",
    "name": "Barcode Scanner 2D QR Code Handheld USB Wired",
    "category": "Office Equipment",
    "sub_category": "POS & Barcode",
    "child_category": "Scanners",
    "brand": "Netum",
    "buying_price": 1600,
    "selling_price": 2400,
    "original_price": 3100,
    "reseller_price": 1950,
    "wholesale_price": 1800,
    "min_order_q": 5,
    "stock": 45,
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Reads 1D, 2D QR codes and barcodes directly from screen and paper. Plug and play USB interface, compatible with Windows, Mac, Linux.",
    "specification": "Scan Speed: 300 scans/sec | Resolution: ≥ 4 mil | Cable Length: 1.8M | Drop Test: 1.5 meters onto concrete",
    "others": "1 Year Replacement Warranty.",
    "color": [
      "Black"
    ],
    "size": [
      "Handheld with Stand"
    ]
  },
  {
    "id": "DCBD-1018",
    "name": "Professional 18-inch LED Ring Light with 2M Tripod Stand",
    "category": "Studio & Lighting",
    "sub_category": "Lighting",
    "child_category": "Ring Light",
    "brand": "Simpex",
    "buying_price": 2800,
    "selling_price": 3950,
    "original_price": 4900,
    "reseller_price": 3300,
    "wholesale_price": 3100,
    "min_order_q": 4,
    "stock": 35,
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "Bi-color dimmable 18\" ring light with smartphone holders, USB charging port and sturdy 7-foot light stand. Essential for makeup and live sales.",
    "specification": "Diameter: 18 Inches / 48cm | Color Temperature: 3200K - 5600K | 3 Phone Mounts | Remote Controller included",
    "others": "Carry Bag, Wireless Remote, Adapter included.",
    "color": [
      "Black"
    ],
    "size": [
      "18 Inch"
    ]
  },
  {
    "id": "DCBD-1019",
    "name": "Thermal Receipt Printer 80mm Auto-Cutter USB+LAN",
    "category": "Office Equipment",
    "sub_category": "POS & Barcode",
    "child_category": "Printers",
    "brand": "Xprinter",
    "buying_price": 4500,
    "selling_price": 6200,
    "original_price": 7500,
    "reseller_price": 5200,
    "wholesale_price": 4900,
    "min_order_q": 3,
    "stock": 20,
    "images": [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "High-speed 260mm/s 80mm thermal receipt printer with automatic cutter, cash drawer kick-out port, compatible with ESC/POS commands.",
    "specification": "Print Width: 72mm/80mm | Interfaces: USB + Ethernet (LAN) | Cutter Life: 1.5 Million cuts | Head Life: 150 KM",
    "others": "Power adapter, USB cable, sample paper roll included. 1 Year Warranty.",
    "color": [
      "Black"
    ],
    "size": [
      "80mm"
    ]
  },
  {
    "id": "DCBD-1020",
    "name": "Heavy Duty Automatic Bill Counter Currency Counting Machine",
    "category": "Office Equipment",
    "sub_category": "Security & Attendance",
    "child_category": "Currency Detectors",
    "brand": "BillPro",
    "buying_price": 6800,
    "selling_price": 9500,
    "original_price": 11800,
    "reseller_price": 8200,
    "wholesale_price": 7600,
    "min_order_q": 2,
    "stock": 14,
    "images": [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
    ],
    "description": "High speed 1000 notes/min currency counter with Ultraviolet (UV), Magnetic (MG) counterfeit note detection and batch counting mode.",
    "specification": "Counting Speed: >1000 pcs/min | Hopper Capacity: 200 notes | External Customer Display included | Power: 80W",
    "others": "1 Year Free Service Warranty.",
    "color": [
      "White/Grey"
    ],
    "size": [
      "Standard Countertop"
    ]
  }
];
const INITIAL_CATEGORIES = [
  {
    "id": "cat-1",
    "name": "Cameras & Optics",
    "subcategories": [
      {
        "id": "sub-1-1",
        "name": "DSLR & Mirrorless",
        "children": [
          "Full Frame",
          "Crop Sensor"
        ]
      },
      {
        "id": "sub-1-2",
        "name": "Lenses",
        "children": [
          "Prime",
          "Zoom",
          "Telephoto"
        ]
      },
      {
        "id": "sub-1-3",
        "name": "Action & Compact",
        "children": [
          "Vlogging",
          "Action Cam"
        ]
      },
      {
        "id": "sub-1-4",
        "name": "Accessories",
        "children": [
          "Memory Cards",
          "Batteries & Grips",
          "Bags"
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "name": "Office Equipment",
    "subcategories": [
      {
        "id": "sub-2-1",
        "name": "Printers & Scanners",
        "children": [
          "Color InkTank",
          "Laser Jet",
          "All-In-One"
        ]
      },
      {
        "id": "sub-2-2",
        "name": "Projectors",
        "children": [
          "DLP Business",
          "Home Cinema",
          "Portable"
        ]
      },
      {
        "id": "sub-2-3",
        "name": "Laminators & Shredders",
        "children": [
          "Shredders",
          "Laminators",
          "Binding Machines"
        ]
      },
      {
        "id": "sub-2-4",
        "name": "POS & Barcode",
        "children": [
          "Scanners",
          "Printers",
          "Cash Drawers"
        ]
      },
      {
        "id": "sub-2-5",
        "name": "Security & Attendance",
        "children": [
          "Biometrics",
          "Currency Detectors"
        ]
      },
      {
        "id": "sub-2-6",
        "name": "Furniture",
        "children": [
          "Chairs",
          "Desks"
        ]
      },
      {
        "id": "sub-2-7",
        "name": "Computer Accessories",
        "children": [
          "Peripherals",
          "Networking"
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "name": "Studio & Lighting",
    "subcategories": [
      {
        "id": "sub-3-1",
        "name": "Lighting",
        "children": [
          "LED Video Light",
          "Ring Light",
          "Strobe Flash"
        ]
      },
      {
        "id": "sub-3-2",
        "name": "Microphones",
        "children": [
          "Lavalier",
          "Shotgun",
          "Wireless Mic"
        ]
      }
    ]
  }
];
const INITIAL_BANNERS = [
  {
    "id": "b-1",
    "title": "প্রিমিয়াম ক্যামেরা ও অফিস ইক্যুইপমেন্ট হোলসেল ও রিটেইল",
    "subtitle": "সরাসরি দুবাই, হংকং ও রাশিয়া থেকে আমদানিকৃত সেরা ব্র্যান্ডের গ্যাজেট",
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&auto=format&fit=crop&q=80",
    "link": "products.html?category=Cameras%20%26%20Optics",
    "active": true
  },
  {
    "id": "b-2",
    "title": "আধুনিক স্মার্ট অফিস সলিউশন ও গ্যাজেট",
    "subtitle": "প্রিন্টার, প্রজেক্টর, পেপার শ্রেডার ও বায়োমেট্রিক এটেন্ডেন্স মেশিন বিশেষ ছাড়ে",
    "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop&q=80",
    "link": "products.html?category=Office%20Equipment",
    "active": true
  },
  {
    "id": "b-3",
    "title": "অনলাইন পেমেন্টে নিশ্চিত ৫% বিশেষ নগদ ছাড়!",
    "subtitle": "বিকাশ, নগদ, রকেট অথবা ব্যাংক পেমেন্ট করলেই যেকোনো অর্ডারে তাৎক্ষণিক ৫% ডিসকাউন্ট",
    "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&auto=format&fit=crop&q=80",
    "link": "checkout.html",
    "active": true
  }
];
const SITE_SETTINGS = {
  "shop_name": "Dream Cart BD",
  "slogan": "You make.",
  "phones": [
    "01581 703 822",
    "0181 827 3838"
  ],
  "emails": [
    "jainal.dcitbd@gmail.com",
    "saiful05333@gmail.com"
  ],
  "address": "চৌধুরী প্লাজা, নিচ তলা, কক্ষ-০৩, পদুয়ার বাজার, বিশ্ব রোড, সদর দক্ষিণ, কুমিল্লা।",
  "office_time": "সকাল ১০:০০ টা - রাত ৯:০০ টা (শুক্রবার বিকাল ৪:০০ - রাত ৯:০০)",
  "developer_name": "Jainal Abedin",
  "developer_title": "CEO, Dream Career IT BD",
  "developer_url": "https://dcitbd.github.io/Jainal-Abedin/",
  "company_url": "https://dcitbd.github.io/dcitbd/",
  "main_shop_url": "https://tinyurl.com/Dream-Cart-BD",
  "payment_accounts": {
    "bkash_personal": "01879653143",
    "bkash_merchant": "01581703822",
    "nagad_personal": "01879653143",
    "rocket_personal": "01581703822",
    "bank_name": "Islami Bank BD Limited",
    "bank_account_no": "20508070200030208",
    "bank_account_name": "Jainal Abedin"
  },
  "delivery_rates": {
    "cumilla": 90,
    "dhaka": 110,
    "outside": 135,
    "free_threshold": 2000
  },
  "online_discount_percent": 5,
  "reseller_withdrawal_fee_percent": 3,
  "market_links": [
    {
      "name": "WhatsApp Catalog",
      "url": "https://wa.me/c/8801581703822"
    },
    {
      "name": "Facebook Shop",
      "url": "https://www.facebook.com/dreamcartbd1"
    },
    {
      "name": "Daraz Store",
      "url": "https://www.daraz.com.bd/shop/m8svmjyg"
    },
    {
      "name": "Othoba Store",
      "url": "https://othoba.com/dream-cart-bd"
    },
    {
      "name": "MartMama - Dream Cart",
      "url": "https://martmama.com/shop/dream-cart-bd"
    },
    {
      "name": "MartMama - Saif Mart",
      "url": "https://martmama.com/shop/saif-mart"
    },
    {
      "name": "MartMama - Medixo BD",
      "url": "https://martmama.com/shop/medixo-bd"
    },
    {
      "name": "Bikroy.com",
      "url": "https://bikroy.com/shop/dreamcartbd"
    },
    {
      "name": "Pykari Wholesale",
      "url": "https://pykari.com/shop/dream-cart-bd"
    },
    {
      "name": "Packly Store",
      "url": "https://packly.com/shop/dream-cart-bd"
    },
    {
      "name": "DitchIt Advertiser",
      "url": "https://ditchit.com/advertiser/jainal-abedin-59224946"
    }
  ]
};
