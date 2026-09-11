import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './axios';

// --- Interfaces ---
export interface SignupData {
  fullName: string;
  displayName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResendOtpData {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
  role: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// --- Hooks ---
export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      return (await axiosInstance.post('/auth/signup', data)).data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: VerifyOtpData) => {
      return (await axiosInstance.post('/auth/verify-otp', data)).data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      return (await axiosInstance.post('/auth/login', data)).data;
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (data: ResendOtpData) => {
      return (await axiosInstance.post('/auth/resend-otp', data)).data;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      return (await axiosInstance.post('/auth/forgot-password', data)).data;
    },
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: async (data: VerifyOtpData) => {
      return (await axiosInstance.post('/auth/verify-forgot-password-otp', data)).data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      return (await axiosInstance.put('/auth/reset-password', data)).data;
    },
  });
};
