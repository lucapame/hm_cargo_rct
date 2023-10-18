export interface UserType {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified?: boolean | null;
  isAnonymous?: boolean | null;
  phoneNumber?: string | null;
  photoURL: string | null;
  isAdmin?: boolean | null;
}

export interface UserProfile {
  displayName: string | null;
  email: string | null;
  emailVerified?: boolean | null;
  isAnonymous?: boolean | null;
  phoneNumber?: string | null;
  photoURL: string | null;
}
