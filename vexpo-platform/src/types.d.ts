declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      role: 'ADMIN' | 'ORGANIZER' | 'EXHIBITOR' | 'ATTENDEE';
    }
  }
}