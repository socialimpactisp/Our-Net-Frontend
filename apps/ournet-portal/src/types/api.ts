export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  contact_email?: string;
}

export interface CustomerForm {
  first_name: string;
  last_name: string;
  phone: string;
  access_code?: string;
}

export interface CustomerAddress {
  street: string;
  suburb: string;
  city: string;
  postcode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
  };
  customer: string;
  type: string;
}

export interface PaymentIntent {
  secret: string;
  status: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stripeCode: string;
  prices: Price[];
}

export interface Price {
  id: string;
  amount: number;
  currency: string;
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
