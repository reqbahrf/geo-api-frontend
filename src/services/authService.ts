import { apiService } from './api';
import type { LoginRequest, LoginResponse, ApiError } from '../types/auth';

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>(
        '/api/login',
        credentials,
      );
      return response.data;
    } catch (error: unknown) {
      if (this.isApiError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  }

  private isApiError(
    error: unknown,
  ): error is { response?: { data?: ApiError } } {
    return typeof error === 'object' && error !== null && 'response' in error;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
