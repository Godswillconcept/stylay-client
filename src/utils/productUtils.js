// Mock data - in a real app, this would come from an API
export const mockReviews = [
  {
    id: "1857914812",
    title: "Adjustable Foldable Laptop & Bed Side Table - Pink",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "337173698",
    title: "Hair Growth Essence - Beard Oil Growth",
    image:
      "https://images.unsplash.com/photo-1604176354207-1d6c0a5e3b0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "352169846",
    title:
      "Fashion Daisies Flower Rose Gold Bracelet Wrist Watch Women Girl Gift",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

export const getProductById = (productId) => {
  return (
    mockReviews.find((product) => product.id === productId) || {
      id: productId,
      title: "Product",
      image:
        "https://images.unsplash.com/photo-1602082558048-799f8af84376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    }
  );
};
