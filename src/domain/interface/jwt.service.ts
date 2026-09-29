export interface IJWTService {
  generateToken(payload: { id: string; role: string }): string;

  verifyToken(token: string): {
    id: string;
    role: string;
  };
}
