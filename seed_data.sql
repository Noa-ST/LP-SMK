-- ============================================
-- SEED DATA - SMART KIDS COFFEE & PLAYGROUND
-- Su dung gen_random_uuid() va CTE de xu ly UUID
-- ============================================

-- 1. UPSERT DANH MUC (xu ly ca truong hop da ton tai)
WITH inserted_categories AS (
  INSERT INTO categories (name, icon, sort_order) VALUES
    ('Cà phê', '☕', 1),
    ('Trà sữa & Sữa tươi', '🧋', 2),
    ('Trà', '🍵', 3),
    ('Matcha', '🍃', 4),
    ('Nước ép trái cây', '🍊', 5),
    ('Bạc xỉu - Cacao - Milo', '🍫', 6),
    ('Sữa chua', '🥛', 7),
    ('Kem truyền thống', '🍦', 8)
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id, name
)

-- 2. TAO SAN PHAM (bo qua neu ten da ton tai)
INSERT INTO products (name, name_en, category_id, price, price_weekend, unit, is_available, sort_order)
SELECT p.name, p.name_en, c.id, p.price, p.price_weekend, p.unit, true, p.sort_order
FROM (VALUES
  -- CA PHE
  ('Phin đen / đen đá', 'Black Coffee', 'Cà phê', 20000, 25000, 'ly', 1),
  ('Phin sữa / sữa đá', 'Milk Coffee', 'Cà phê', 24000, 29000, 'ly', 2),
  ('Espresso đen / đen đá', 'Espresso', 'Cà phê', 22000, 27000, 'ly', 3),
  ('Espresso sữa / sữa đá', 'Espresso Latte', 'Cà phê', 25000, 30000, 'ly', 4),
  ('Cà phê kem muối', 'Salted Cream Coffee', 'Cà phê', 30000, 35000, 'ly', 5),
  ('Cà phê kem trứng', 'Egg Cream Coffee', 'Cà phê', 30000, 35000, 'ly', 6),
  ('Cà phê sữa tươi + flan', 'Fresh Milk Coffee Flan', 'Cà phê', 32000, 37000, 'ly', 7),
  -- TRA SUA
  ('Trà sữa Ô long', 'Oolong Milk Tea', 'Trà sữa & Sữa tươi', 30000, 35000, 'ly', 1),
  ('Trà sữa trà đen', 'Black Milk Tea', 'Trà sữa & Sữa tươi', 30000, 35000, 'ly', 2),
  ('Trà sữa thái xanh', 'Thai Green Milk Tea', 'Trà sữa & Sữa tươi', 30000, 35000, 'ly', 3),
  ('Trà sữa kem trứng dừa nướng', 'Egg Cream Coconut Milk Tea', 'Trà sữa & Sữa tươi', 35000, 40000, 'ly', 4),
  ('Trà sữa kem cheese Oreo', 'Cheese Oreo Milk Tea', 'Trà sữa & Sữa tươi', 35000, 40000, 'ly', 5),
  ('Trà sữa trân châu plan', 'Pearl Flan Milk Tea', 'Trà sữa & Sữa tươi', 35000, 40000, 'ly', 6),
  ('Trà sữa matcha kem cheese', 'Matcha Cheese Milk Tea', 'Trà sữa & Sữa tươi', 35000, 40000, 'ly', 7),
  ('Sữa tươi trân châu đường đen', 'Brown Sugar Pearl Milk', 'Trà sữa & Sữa tươi', 30000, 35000, 'ly', 8),
  ('Sữa tươi trân châu kem trứng', 'Egg Pearl Fresh Milk', 'Trà sữa & Sữa tươi', 35000, 40000, 'ly', 9),
  -- TRA
  ('Trà gừng cam quế nóng', 'Ginger Orange Cinnamon Tea', 'Trà', 30000, 35000, 'ly', 1),
  ('Trà lipton nóng / đá', 'Lipton Tea', 'Trà', 30000, 35000, 'ly', 2),
  ('Trà chanh trân châu', 'Lemon Pearl Tea', 'Trà', 30000, 35000, 'ly', 3),
  ('Trà đào', 'Peach Tea', 'Trà', 32000, 37000, 'ly', 4),
  ('Trà vải lài', 'Lychee Jasmine Tea', 'Trà', 32000, 37000, 'ly', 5),
  ('Trà dâu tươi', 'Fresh Strawberry Tea', 'Trà', 35000, 40000, 'ly', 6),
  ('Trà xoài chanh dây', 'Mango Passion Tea', 'Trà', 32000, 37000, 'ly', 7),
  ('Trà ổi hồng', 'Pink Guava Tea', 'Trà', 32000, 37000, 'ly', 8),
  ('Trà nho việt quất', 'Blueberry Grape Tea', 'Trà', 32000, 37000, 'ly', 9),
  ('Trà trái cây', 'Fruit Tea', 'Trà', 35000, 40000, 'ly', 10),
  ('Trà nhãn sen', 'Longan Lotus Tea', 'Trà', 35000, 40000, 'ly', 11),
  ('Trà lài đặc thơm', 'Premium Jasmine Tea', 'Trà', 35000, 40000, 'ly', 12),
  ('Trà sen vàng machiato', 'Golden Lotus Machiato', 'Trà', 38000, 43000, 'ly', 13),
  -- MATCHA
  ('Matcha latte sữa tươi', 'Matcha Fresh Milk Latte', 'Matcha', 30000, 35000, 'ly', 1),
  ('Matcha latte xoài', 'Mango Matcha Latte', 'Matcha', 35000, 40000, 'ly', 2),
  ('Matcha latte dâu', 'Strawberry Matcha Latte', 'Matcha', 35000, 40000, 'ly', 3),
  ('Matcha latte việt quất', 'Blueberry Matcha Latte', 'Matcha', 35000, 40000, 'ly', 4),
  ('Matcha kem muối', 'Salted Cream Matcha', 'Matcha', 35000, 40000, 'ly', 5),
  -- NUOC EP
  ('Chanh tươi xí muội', 'Lemon Preserved Plum', 'Nước ép trái cây', 30000, 35000, 'ly', 1),
  ('Nước ép cam', 'Orange Juice', 'Nước ép trái cây', 35000, 40000, 'ly', 2),
  ('Nước ép ổi', 'Guava Juice', 'Nước ép trái cây', 30000, 35000, 'ly', 3),
  ('Nước ép cà rốt', 'Carrot Juice', 'Nước ép trái cây', 30000, 35000, 'ly', 4),
  ('Nước ép cam cà rốt', 'Orange Carrot Juice', 'Nước ép trái cây', 35000, 40000, 'ly', 5),
  ('Nước ép dưa hấu', 'Watermelon Juice', 'Nước ép trái cây', 35000, 40000, 'ly', 6),
  -- BAC XIU CACAO MILO
  ('Bạc xỉu sữa tươi (nóng/đá)', 'Vietnamese Milk Coffee', 'Bạc xỉu - Cacao - Milo', 30000, 35000, 'ly', 1),
  ('Bạc xỉu kem muối', 'Salted Cream Bac Xiu', 'Bạc xỉu - Cacao - Milo', 35000, 40000, 'ly', 2),
  ('Bạc xỉu kem trứng', 'Egg Cream Bac Xiu', 'Bạc xỉu - Cacao - Milo', 35000, 40000, 'ly', 3),
  ('Cacao sữa tươi (nóng/đá)', 'Fresh Milk Cacao', 'Bạc xỉu - Cacao - Milo', 30000, 35000, 'ly', 4),
  ('Cacao kem trứng', 'Egg Cream Cacao', 'Bạc xỉu - Cacao - Milo', 35000, 40000, 'ly', 5),
  ('Cacao kem muối', 'Salted Cream Cacao', 'Bạc xỉu - Cacao - Milo', 35000, 40000, 'ly', 6),
  ('Milo đá bảo flan', 'Milo Flan', 'Bạc xỉu - Cacao - Milo', 35000, 40000, 'ly', 7),
  -- SUA CHUA
  ('Sữa chua đá', 'Iced Yogurt', 'Sữa chua', 30000, 35000, 'ly', 1),
  ('Sữa chua dâu', 'Strawberry Yogurt', 'Sữa chua', 35000, 40000, 'ly', 2),
  ('Sữa chua đào', 'Peach Yogurt', 'Sữa chua', 35000, 40000, 'ly', 3),
  ('Sữa chua việt quất', 'Blueberry Yogurt', 'Sữa chua', 35000, 40000, 'ly', 4),
  ('Sữa chua chanh', 'Lemon Yogurt', 'Sữa chua', 35000, 40000, 'ly', 5),
  ('Sữa chua trái cây', 'Fruit Yogurt', 'Sữa chua', 35000, 40000, 'ly', 6),
  ('Sữa chua đặc thơm', 'Premium Yogurt', 'Sữa chua', 35000, 40000, 'ly', 7),
  -- KEM TRUYEN THONG
  ('Kem dừa', 'Coconut Ice Cream', 'Kem truyền thống', 16000, 20000, 'phần', 1),
  ('Kem socola', 'Chocolate Ice Cream', 'Kem truyền thống', 18000, 22000, 'phần', 2),
  ('Kem dâu', 'Strawberry Ice Cream', 'Kem truyền thống', 18000, 22000, 'phần', 3),
  ('Kem sầu riêng', 'Durian Ice Cream', 'Kem truyền thống', 20000, 25000, 'phần', 4),
  ('Kem trộn', 'Mixed Ice Cream', 'Kem truyền thống', 22000, 27000, 'phần', 5),
  ('Kem plan sữa tươi', 'Flan Fresh Milk Ice Cream', 'Kem truyền thống', 20000, 25000, 'phần', 6),
  ('Kem plan trân châu', 'Flan Pearl Ice Cream', 'Kem truyền thống', 25000, 30000, 'phần', 7)
) AS p(name, name_en, cat_name, price, price_weekend, unit, sort_order)
JOIN inserted_categories c ON c.name = p.cat_name
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = p.name);

-- ============================================
-- 3. NGUYEN VAT LIEU
-- ============================================
INSERT INTO ingredients (name, unit, current_stock, min_stock_alert, cost_per_unit, ingredient_type, category, storage_condition, purchase_unit, purchase_to_use_ratio, supplier)
SELECT src.name, src.unit, src.current_stock, src.min_stock_alert, src.cost_per_unit,
       src.ingredient_type, src.category, src.storage_condition,
       src.purchase_unit, src.purchase_to_use_ratio, src.supplier
FROM (VALUES
  ('Hạt cà phê Robusta','g',5000,1000,120,'base','dry','room','Túi 1kg',1000,'Đại lý cà phê'),
  ('Bột Matcha Nhật','g',500,100,500,'base','dry','fridge','Hộp 100g',100,'Nhập khẩu'),
  ('Trà Ô long lá','g',1000,200,80,'base','dry','room','Túi 500g',500,'Công ty trà'),
  ('Trà đen Lipton','túi',200,50,1500,'base','dry','room','Hộp 100 túi',100,'Siêu thị'),
  ('Trà thái xanh','g',500,100,150,'base','dry','room','Túi 500g',500,'Đại lý trà'),
  ('Cacao bột nguyên chất','g',2000,500,90,'base','dry','room','Túi 1kg',1000,'Đại lý'),
  ('Milo bột','g',2000,500,80,'base','dry','room','Hộp 1kg',1000,'Siêu thị'),
  ('Trà hoa nhài khô','g',500,100,200,'base','dry','room','Túi 200g',200,'Đại lý trà'),
  ('Hoa sen khô','g',300,50,350,'base','dry','room','Túi 100g',100,'Đại lý'),
  ('Sữa đặc có đường','ml',5000,1000,25,'base','dry','room','Hộp 380ml',380,'Siêu thị'),
  ('Sữa tươi không đường','ml',10000,2000,22,'base','fresh','fridge','Hộp 1L',1000,'Vinamilk/Dalat Milk'),
  ('Kem tươi (Whipping Cream)','ml',2000,500,55,'base','fresh','fridge','Hộp 1L',1000,'Đại lý bánh'),
  ('Sữa chua không đường','hũ',50,10,8000,'base','fresh','fridge','Thùng 48 hũ',48,'Vinamilk'),
  ('Trân châu đen','g',3000,500,50,'topping','dry','room','Túi 1kg',1000,'Đại lý'),
  ('Trân châu trắng','g',2000,500,55,'topping','dry','room','Túi 1kg',1000,'Đại lý'),
  ('Flan (bánh flan)','cái',50,10,5000,'topping','fresh','fridge','Khay 10 cái',10,'Làm nội bộ'),
  ('Kem trứng (egg foam)','phần',30,10,8000,'topping','fresh','fridge','Mẻ 20 phần',20,'Làm nội bộ'),
  ('Kem muối (salted cream)','phần',30,10,8000,'topping','fresh','fridge','Mẻ 20 phần',20,'Làm nội bộ'),
  ('Kem cheese (cream cheese foam)','phần',30,10,10000,'topping','fresh','fridge','Mẻ 20 phần',20,'Làm nội bộ'),
  ('Bánh Oreo nghiền','g',1000,200,40,'topping','dry','room','Hộp 500g',500,'Siêu thị'),
  ('Dừa nướng sợi','g',1000,200,60,'topping','dry','room','Túi 500g',500,'Đại lý'),
  ('Xí muội (preserved plum)','g',500,100,80,'topping','dry','room','Túi 500g',500,'Chợ'),
  ('Thạch trái cây','g',2000,500,30,'topping','dry','room','Túi 1kg',1000,'Đại lý'),
  ('Chanh tươi','quả',100,20,3000,'fresh_fruit','fresh','fridge',NULL,1,'Chợ đầu mối'),
  ('Cam tươi','quả',60,15,5000,'fresh_fruit','fresh','fridge',NULL,1,'Chợ đầu mối'),
  ('Dâu tây','g',2000,500,80,'fresh_fruit','fresh','fridge','Khay 500g',500,'Đà Lạt'),
  ('Đào tươi','g',1500,300,60,'fresh_fruit','fresh','fridge','Túi 1kg',1000,'Chợ đầu mối'),
  ('Vải thiều','g',1000,200,50,'fresh_fruit','fresh','fridge','Túi 1kg',1000,'Chợ đầu mối'),
  ('Xoài','g',2000,500,40,'fresh_fruit','fresh','fridge','Túi 1kg',1000,'Chợ đầu mối'),
  ('Chanh dây','quả',50,10,5000,'fresh_fruit','fresh','fridge',NULL,1,'Chợ đầu mối'),
  ('Ổi hồng','quả',30,10,8000,'fresh_fruit','fresh','fridge',NULL,1,'Chợ đầu mối'),
  ('Nho tươi','g',1000,200,70,'fresh_fruit','fresh','fridge','Túi 500g',500,'Chợ đầu mối'),
  ('Việt quất (blueberry)','g',500,100,200,'fresh_fruit','fresh','fridge','Hộp 125g',125,'Nhập khẩu'),
  ('Nhãn tươi','g',1000,200,35,'fresh_fruit','fresh','fridge','Túi 1kg',1000,'Chợ đầu mối'),
  ('Cà rốt','g',3000,500,15,'fresh_fruit','fresh','fridge','Túi 1kg',1000,'Chợ'),
  ('Dưa hấu','g',5000,1000,8,'fresh_fruit','fresh','room','Quả 3-5kg',4000,'Chợ'),
  ('Gừng tươi','g',500,100,20,'fresh_fruit','fresh','room','Túi 500g',500,'Chợ'),
  ('Đường trắng','g',10000,2000,15,'base','dry','room','Túi 1kg',1000,'Đại lý'),
  ('Syrup đường đen','ml',3000,500,35,'base','dry','room','Chai 1L',1000,'Đại lý pha chế'),
  ('Muối biển hạt mịn','g',2000,500,10,'base','dry','room','Gói 1kg',1000,'Siêu thị'),
  ('Quế chi khô','g',200,50,150,'base','dry','room','Túi 100g',100,'Chợ'),
  ('Syrup đào','ml',1000,200,45,'base','dry','room','Chai 700ml',700,'Đại lý pha chế'),
  ('Syrup vải','ml',1000,200,45,'base','dry','room','Chai 700ml',700,'Đại lý pha chế'),
  ('Kem dừa (viên)','viên',100,20,8000,'base','frozen','freezer','Hộp 12 viên',12,'Đại lý kem'),
  ('Kem socola (viên)','viên',100,20,8000,'base','frozen','freezer','Hộp 12 viên',12,'Đại lý kem'),
  ('Kem dâu (viên)','viên',100,20,8000,'base','frozen','freezer','Hộp 12 viên',12,'Đại lý kem'),
  ('Kem sầu riêng (viên)','viên',50,10,12000,'base','frozen','freezer','Hộp 12 viên',12,'Đại lý kem'),
  ('Ly nhựa 500ml','cái',500,100,800,'packaging','packaging','room','Túi 50 cái',50,'Đại lý bao bì'),
  ('Ly nhựa 700ml','cái',300,50,1000,'packaging','packaging','room','Túi 50 cái',50,'Đại lý bao bì'),
  ('Nắp ly nhựa','cái',500,100,300,'packaging','packaging','room','Túi 100 cái',100,'Đại lý bao bì'),
  ('Ống hút','cái',1000,200,200,'packaging','packaging','room','Hộp 200 cái',200,'Đại lý bao bì'),
  ('Túi nilon','cái',500,100,300,'packaging','packaging','room','Cuộn 100 cái',100,'Đại lý bao bì'),
  ('Ly giấy nóng 8oz','cái',200,50,1200,'packaging','packaging','room','Túi 50 cái',50,'Đại lý bao bì')
) AS src(name, unit, current_stock, min_stock_alert, cost_per_unit, ingredient_type, category, storage_condition, purchase_unit, purchase_to_use_ratio, supplier)
WHERE NOT EXISTS (SELECT 1 FROM ingredients WHERE ingredients.name = src.name);

-- ============================================
-- 4. TAO LOG NHAP KHO CHO TAT CA NGUYEN LIEU
--    (Bu truong hop seed bypass API, khong tu dong ghi log)
-- ============================================
INSERT INTO inventory_logs (ingredient_id, employee_id, type, quantity_change, quantity_before, quantity_after, note)
SELECT 
  i.id,
  (SELECT e.id FROM employees e
   JOIN roles r ON r.id = e.role_id
   WHERE r.name IN ('admin', 'manager', 'owner')
     AND e.status = 'active'
   ORDER BY e.created_at LIMIT 1),
  'import',
  i.current_stock,
  0,
  i.current_stock,
  'Nhập kho lần đầu (khởi tạo hệ thống) - ' || i.name
FROM ingredients i
WHERE i.current_stock > 0
  AND i.id NOT IN (
    SELECT DISTINCT ingredient_id FROM inventory_logs WHERE type = 'import'
  );

-- KIEM TRA KET QUA
SELECT 'Categories' as bang, count(*) as so_luong FROM categories
UNION ALL SELECT 'Products', count(*) FROM products
UNION ALL SELECT 'Ingredients', count(*) FROM ingredients
UNION ALL SELECT 'Inventory Logs', count(*) FROM inventory_logs;
