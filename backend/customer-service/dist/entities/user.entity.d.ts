import { UserRole } from '../enums/user-role.enum';
import { UserType } from '../enums/user-type.enum';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
    type: UserType;
    isActive: boolean;
    avatar: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
}
