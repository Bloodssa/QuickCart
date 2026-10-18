export const formatPrice = (price) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(price);