export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  productId: id
});
