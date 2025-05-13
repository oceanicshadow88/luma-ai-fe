export class ApiError extends Error {
    code: string;
    meta?: Record<string, any>;
  
    constructor(message: string, code: string, meta?: Record<string, any>) {
      super(message);
      this.code = code;
      this.name = "ApiError";
      this.meta = meta;
    }
  }
  