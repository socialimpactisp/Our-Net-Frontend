type AccessCode = {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
};

export function getStoredPromoCode() {
  const accessCode = JSON.parse(
    localStorage.getItem("affinity_coupon_code") || "null",
  ) as AccessCode | null;

  if (accessCode === null) {
    return null;
  }

  return accessCode;
}
