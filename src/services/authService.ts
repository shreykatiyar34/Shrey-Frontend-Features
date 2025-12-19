import apiClient from './api';

export interface SendOtpRequest {
  identifier: string; // phone number or email
  provider?: 'sms' | 'email' | 'auto'; // defaults to 'auto'
}

export interface SendOtpResponse {
  message: string;
  success: boolean;
}

export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

export interface VerifyOtpResponse {
  access_token: string;
  refresh_token: string;
  student_id: string;
  is_first_time_user: boolean;
}

export interface VerifyTokenResponse {
  valid: boolean;
  student_id?: string;
  [key: string]: any;
}

export interface AddUserInfoRequest {
  name: string;
  school: string;
  board?: string;
  class_name: string;
  medium?: string;
  age: string;
  location: string;
  contact: string;
  guardian_contact?: string;
}

export interface AddUserInfoResponse {
  message: string;
  success: boolean;
  student_id?: string;
}

export interface UserInfo {
  student_id: string;
  name: string;
  school: string;
  class_name: string;
  age: string;
  location: string;
  contact: string;
  email?: string;
  phone?: string;
  is_first_time_user: boolean;
  [key: string]: any;
}

export interface CheckFirstTimeUserResponse {
  success: boolean;
  is_first_time_user: boolean;
  user_id?: string;
  student_id: string;
  profile?: any;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  student_id: string;
  profile: UserInfo | any;
}

class AuthService {
  /**
   * Send OTP to phone number or email
   */
  async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    const response = await apiClient.post('/auth/send-otp', {
      identifier: data.identifier,
      provider: data.provider || 'auto',
    });
    return response.data;
  }

  /**
   * Verify OTP and get tokens
   */
  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const response = await apiClient.post('/auth/verify-otp', {
      identifier: data.identifier,
      otp: data.otp,
    });
    
    // Store tokens in localStorage
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    if (response.data.refresh_token) {
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    if (response.data.student_id) {
      localStorage.setItem('student_id', response.data.student_id);
    }
    
    return response.data;
  }

  /**
   * Verify JWT token
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    const response = await apiClient.get('/auth/verify-token');
    return response.data;
  }

  /**
   * Add or update user information (Onboarding)
   */
  async addUserInfo(data: AddUserInfoRequest): Promise<AddUserInfoResponse> {
    const response = await apiClient.post('/auth/addUserInfo', data);
    return response.data;
  }

  /**
   * Get user by student ID
   * GET /api/v1/auth/user/{student_id}
   */
  async getUserById(studentId: string): Promise<UserProfileResponse> {
    const response = await apiClient.get(`/auth/user/${studentId}`);
    return response.data;
  }

  /**
   * Check if user is first time user
   * GET /api/v1/auth/check-first-time-user
   */
  async checkFirstTimeUser(): Promise<CheckFirstTimeUserResponse> {
    const response = await apiClient.get('/auth/check-first-time-user');
    return response.data;
  }

  /**
   * Get user profile by student ID
   * GET /api/v1/auth/addUserInfo/{student_id}
   */
  async getUserProfile(studentId: string): Promise<UserProfileResponse> {
    const response = await apiClient.get(`/auth/addUserInfo/${studentId}`);
    return response.data;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('student_id');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Get student ID
   */
  getStudentId(): string | null {
    return localStorage.getItem('student_id');
  }
}

export default new AuthService();

