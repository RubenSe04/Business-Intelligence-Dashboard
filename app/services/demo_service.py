import random
from datetime import date, timedelta

from app.models import db
from app.models.sales import SalesTransaction
from app.models.dataset import Dataset


def generate_demo_rows(seed=2024, count=1200):
    random.seed(seed)
    categories = {
        "Electronics": ["Laptop Pro 14", "Ultrabook Air", "Wireless Monitor", "Tablet S8", "Noise-Cancel Headphones"],
        "Office": ["Ergonomic Chair", "Standing Desk", "Document Scanner", "Laser Printer", "Desk Organizer"],
        "Accessories": ["Mechanical Keyboard", "Wireless Mouse", "USB-C Hub", "Webcam HD", "Laptop Stand"],
        "Furniture": ["Executive Desk", "Storage Cabinet", "Meeting Table", "Filing Drawer", "Office Sofa"],
        "Networking": ["Wi-Fi Router AX", "Managed Switch", "Mesh Extender", "Network Storage", "Ethernet Kit"],
        "Software": ["BI License", "Security Suite", "Team Workspace", "Cloud Backup", "Analytics Pack"],
    }
    category_names = list(categories)
    regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"]
    cities = {
        "North America": ["New York", "Toronto", "Austin"],
        "Europe": ["London", "Berlin", "Amsterdam"],
        "Asia Pacific": ["Singapore", "Tokyo", "Sydney"],
        "Latin America": ["Sao Paulo", "Mexico City", "Bogota"],
        "Middle East": ["Dubai", "Riyadh", "Istanbul"],
    }
    payments = ["Credit Card", "Bank Transfer", "Digital Wallet", "Invoice"]
    statuses = ["Completed", "Completed", "Completed", "Completed", "Pending", "Cancelled", "Returned"]

    start = date(2024, 1, 1)
    end = date(2025, 12, 31)
    total_days = (end - start).days
    rows = []
    for i in range(count):
        category = random.choice(category_names)
        product_name = random.choice(categories[category])
        product_id = f"P-{abs(hash(product_name)) % 10000:04d}"
        region = random.choice(regions)
        customer_number = random.randint(1, 160)
        customer_id = f"CUST-{customer_number:04d}"
        order_date = start + timedelta(days=random.randint(0, total_days))
        month_factor = 1 + (order_date.month - 1) * 0.012 + (0.16 if order_date.month in (10, 11, 12) else 0)
        quantity = random.randint(1, 8)
        base_price = random.choice([85, 120, 180, 260, 420, 650, 920, 1250])
        unit_price = round(base_price * random.uniform(0.92, 1.18) * month_factor, 2)
        unit_cost = round(unit_price * random.uniform(0.58, 0.78), 2)
        discount = random.choice([0, 0, 5, 10, 15])
        status = random.choice(statuses)
        order_number = i // 3 + 1
        rows.append({
            "order_id": f"ORD-{order_number:05d}",
            "order_date": order_date,
            "customer_id": customer_id,
            "customer_name": f"Customer {customer_number:03d}",
            "product_id": product_id,
            "product_name": product_name,
            "category": category,
            "region": region,
            "city": random.choice(cities[region]),
            "quantity": quantity,
            "unit_price": unit_price,
            "discount_percentage": discount,
            "unit_cost": unit_cost,
            "shipping_cost": round(random.uniform(8, 35), 2),
            "payment_method": random.choice(payments),
            "order_status": status,
        })
    return rows


def generate_indonesia_demo_rows(seed=2025, count=1200):
    random.seed(seed)
    categories = {
        "Elektronik & Perangkat": [
            "Laptop Bisnis Nusantara 14",
            "Monitor UltraWide 27 Inci",
            "Tablet Niaga Pro S9",
            "Smart POS Terminal Kasir",
            "Proyektor Laser Ruang Rapat",
        ],
        "Perlengkapan Kantor": [
            "Kursi Kerja Ergonomis Mesh",
            "Meja Kerja Elektrik Adjustable",
            "Scanner Dokumen Kecepatan Tinggi",
            "Printer Laser Multifungsi",
            "Brankas Digital Kantor",
        ],
        "Aksesoris IT": [
            "Mechanical Keyboard Wireless",
            "Mouse Vertikal Ergonomis",
            "Docking Station USB-C 10-in-1",
            "Webcam Konferensi 4K AI",
            "Headset Call Center Noise-Cancel",
        ],
        "Furnitur Korporat": [
            "Meja Direksi Kayu Jati",
            "Lemari Arsip Besi Sliding",
            "Meja Rapat Modular 8 Orang",
            "Sofa Tamu Lobby Eksekutif",
            "Rak Server Kabinet Tertutup",
        ],
        "Jaringan & Server": [
            "Router Enterprise Wi-Fi 6E",
            "Switch Managed 24-Port PoE",
            "Access Point Ceiling Mesh",
            "NAS Storage Server 16TB",
            "Firewall Gateway Keamanan",
        ],
        "Lisensi Perangkat Lunak": [
            "Lisensi NexusBI Enterprise",
            "Paket Keamanan Endpoint Cloud",
            "Sistem ERP & Akuntansi Pajak",
            "Cloud Backup Server Tahunan",
            "Suite Kolaborasi Tim Korporat",
        ],
    }
    category_names = list(categories)
    regions = [
        "Jabodetabek & Banten",
        "Jawa Barat & Tengah",
        "Jawa Timur & Bali",
        "Sumatera",
        "Kalimantan & Sulawesi",
    ]
    cities = {
        "Jabodetabek & Banten": ["Jakarta Selatan", "Tangerang", "Bekasi", "Depok"],
        "Jawa Barat & Tengah": ["Bandung", "Semarang", "Yogyakarta", "Surakarta"],
        "Jawa Timur & Bali": ["Surabaya", "Malang", "Denpasar"],
        "Sumatera": ["Medan", "Palembang", "Pekanbaru", "Batam"],
        "Kalimantan & Sulawesi": ["Balikpapan", "Banjarmasin", "Makassar", "Manado"],
    }
    company_prefixes = ["PT", "CV", "PT", "PT", "UD", "Koperasi"]
    company_CORES = [
        "Nusantara Digital", "Sinar Mandiri", "Bumi Pratama", "Karya Sentosa",
        "Mega Teknologi", "Cipta Niaga", "Garuda Logistik", "Prima Solusi",
        "Mitra Sejahtera", "Indo Makmur", "Buana Karya", "Cahaya Abadi",
        "Delta Niaga", "Eka Persada", "Fajar Gemilang", "Global Kencana",
        "Harapan Baru", "Inti Permata", "Jaya Konstruksi", "Kharisma Utama",
        "Lestari Pangan", "Maju Bersama", "Nirwana Retail", "Optima Medika",
    ]
    payments = ["Transfer Bank BCA/Mandiri", "QRIS Korporat", "Virtual Account BNI/BRI", "Kartu Kredit Korporat", "Invoice Tempo 30 Hari"]
    statuses = ["Completed", "Completed", "Completed", "Completed", "Pending", "Cancelled", "Returned"]

    start = date(2024, 1, 1)
    end = date(2025, 12, 31)
    total_days = (end - start).days
    rows = []
    for i in range(count):
        category = random.choice(category_names)
        product_name = random.choice(categories[category])
        product_id = f"SKU-ID-{abs(hash(product_name)) % 10000:04d}"
        region = random.choice(regions)
        customer_number = random.randint(1, 160)
        customer_id = f"PLG-{customer_number:04d}"
        prefix = company_prefixes[customer_number % len(company_prefixes)]
        core_name = company_CORES[customer_number % len(company_CORES)]
        customer_name = f"{prefix} {core_name} {customer_number:02d}"

        order_date = start + timedelta(days=random.randint(0, total_days))
        month_factor = 1 + (order_date.month - 1) * 0.014 + (0.18 if order_date.month in (3, 4, 11, 12) else 0)
        quantity = random.randint(1, 10)
        # Realistic Indonesian Rupiah B2B unit prices (Rp 450.000 to Rp 18.500.000)
        base_price = random.choice([
            450000, 850000, 1450000, 2250000, 3800000, 6500000, 11500000, 18500000
        ])
        unit_price = round(base_price * random.uniform(0.94, 1.15) * month_factor, -3)
        unit_cost = round(unit_price * random.uniform(0.60, 0.77), -3)
        discount = random.choice([0, 0, 5, 10, 12, 15])
        status = random.choice(statuses)
        order_number = i // 3 + 1
        rows.append({
            "order_id": f"INV-ID-{order_number:05d}",
            "order_date": order_date,
            "customer_id": customer_id,
            "customer_name": customer_name,
            "product_id": product_id,
            "product_name": product_name,
            "category": category,
            "region": region,
            "city": random.choice(cities[region]),
            "quantity": quantity,
            "unit_price": float(unit_price),
            "discount_percentage": discount,
            "unit_cost": float(unit_cost),
            "shipping_cost": float(random.choice([35000, 55000, 85000, 125000, 185000, 250000])),
            "payment_method": random.choice(payments),
            "order_status": status,
        })
    return rows


def ensure_demo_data(preset="indonesia"):
    if SalesTransaction.query.count() > 0:
        return
    load_preset_dataset(preset)


def load_preset_dataset(preset="indonesia"):
    is_id = str(preset).lower() in ("indonesia", "id", "idr", "nusantara")
    rows = generate_indonesia_demo_rows() if is_id else generate_demo_rows()
    name = (
        "Dataset Kasus Bisnis Indonesia 2024-2025 (IDR)"
        if is_id
        else "Synthetic Global Sales Dataset 2024-2025 (USD)"
    )
    filename = (
        "kasus_penjualan_indonesia_idr.csv"
        if is_id
        else "synthetic_sales_demo_usd.csv"
    )

    SalesTransaction.query.delete()
    Dataset.query.filter(Dataset.original_filename.in_([
        "kasus_penjualan_indonesia_idr.csv",
        "synthetic_sales_demo_usd.csv",
        "synthetic_sales_demo.csv",
    ])).delete(synchronize_session=False)
    Dataset.query.update({"dataset_status": "archived"})

    dataset = Dataset(
        dataset_name=name,
        original_filename=filename,
        total_rows=len(rows),
        total_columns=16,
        dataset_status="active",
    )
    db.session.add(dataset)
    db.session.flush()
    db.session.add_all([SalesTransaction(dataset_id=dataset.id, **row) for row in rows])
    db.session.commit()
    return {
        "preset": "indonesia" if is_id else "global",
        "currency": "IDR" if is_id else "USD",
        "dataset_name": name,
        "total_rows": len(rows),
    }


def reload_demo_data(preset="indonesia"):
    SalesTransaction.query.delete()
    Dataset.query.delete()
    db.session.commit()
    return load_preset_dataset(preset)
