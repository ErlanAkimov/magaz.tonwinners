export interface ProductInterface {
    // personal info
    _id: string; // ObjectId()
    product_id: number; // Уникальный номер продукта
    name: string; // Полное название
    description: string; // Детальное описание
    brand: string; // Брэндинг
    category: string[]; // Категория товара

    // data structures
    attributes: { [key: string]: string }; // Характеристики
    variations: variationInterface[]; // Вариативные товары

    // seller info
    seller: string; // Название магазина (регистр учитывается)
    seller_id: number; // Внутренний номер продавца
    seller_wallet: string; // Адрес кошелька в TON

    // counters
    likes: number; // Количество лайков
}

interface variationInterface {
    name: string; // color/memory_size etc.
    avatar_small: string; // img_url (40x40)
    product_card_images: string[]; // img_urls for card
    images: string[]; // img_urls in Array
    types: singleVariationInterface[]; // sizes/types
}

export interface singleVariationInterface {
    name: string | number; // Размер для обуви | объем памяти для техники или иные вариативные характеристики товара
    stock: number; // Остаток на складе
    price: number; // Стоимость конкретной вариации товара
    attributes: { [key: string]: string }[] | null; // Уникальные характеристики для каждой вариации (null при отсутствии)
}
