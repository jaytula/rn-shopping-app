export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  productId: id
});

export const editProduct = (id, ownerId, title, description, imageUrl) => ({
  productId: id,
  ownerId,
  title,
  description,
  imageUrl
});
