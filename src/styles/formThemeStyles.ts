export type ThemeType = 'default' | 'learner';

export interface FormThemeConfig {
  inputClassName: string;
  passwordInputClassName: string;
  labelClassName: string;
  checkboxLabelClassName: string;
  buttonClass: string;
  verificationButtonClass: string;
  checkboxClassName: string;
}

export const formThemes: Record<ThemeType, FormThemeConfig> = {
  default: {
    inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
    passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
    labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-blue-600',
    checkboxLabelClassName: 'text-left text-gray-600 ml-2 group-focus-within:text-blue-600',
    buttonClass: '',
    verificationButtonClass: '!bg-transparent hover:!bg-transparent',
    checkboxClassName: 'mr-2',
  },
  learner: {
    inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
    passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
    labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-yellow-500',
    checkboxLabelClassName: 'text-left text-gray-600 ml-2 group-focus-within:text-yellow-500',
    buttonClass: '!bg-yellow-500 hover:!bg-yellow-600',
    verificationButtonClass: '!bg-transparent !text-yellow-500 hover:!bg-transparent hover:!text-yellow-600 !border-yellow-500',
    checkboxClassName: 'mr-2 accent-yellow-500',
  },
};

export function useFormTheme(theme: ThemeType = 'default'): FormThemeConfig {
  return formThemes[theme];
}