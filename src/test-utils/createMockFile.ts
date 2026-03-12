export const createMockAvatarFile = (
  filename = "avatar.png",
  content = "avatar"
): File => {
  return new File([content], filename, { type: "image/png" });
};

export const createMockImageFile = (
  filename = "image.jpg",
  content = "image content",
  type = "image/jpeg"
): File => {
  return new File([content], filename, { type });
};
