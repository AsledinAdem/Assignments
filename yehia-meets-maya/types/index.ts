export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type DemoScenario = "success" | "slow" | "error" | "empty";
export type PanelState = "idle" | "loading" | "success" | "empty" | "error";
export type ViewMode = "focus" | "dual";

export interface PostsApiResponse {
  success: boolean;
  data: Post[];
  scenario: DemoScenario;
  latencyMs: number;
  error?: string;
}
