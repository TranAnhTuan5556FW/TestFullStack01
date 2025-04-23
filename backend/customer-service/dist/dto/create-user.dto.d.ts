import { UserRole } from '../enums/user-role.enum';
import { UserType } from '../enums/user-type.enum';
export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    role?: UserRole;
    type?: UserType;
    avatar?: string;
    notes?: string;
}
