interface IUserResponseDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar: string;
  avatar_url(): string;
}
export { IUserResponseDTO };
