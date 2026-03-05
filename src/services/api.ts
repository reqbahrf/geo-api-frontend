import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { GeoData } from '../types/geo';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle common errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    );
  }

  public get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.api.get(url, { params });
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<AxiosResponse<T>> {
    return this.api.post(url, data);
  }

  // Geo API methods
  public async getCurrentGeo(): Promise<AxiosResponse<GeoData>> {
    return this.get<GeoData>('api/geo', {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }

  public async getGeoByIP(ip: string): Promise<AxiosResponse<GeoData>> {
    return this.get<GeoData>('api/geo', {
      ip,
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }
}

export const apiService = new ApiService();
