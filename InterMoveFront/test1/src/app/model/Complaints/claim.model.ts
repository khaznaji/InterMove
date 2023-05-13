import { User } from '../User/user';
import { TypeClaim } from '../Complaints/type-claim';

export class Claim {
    id!: number;
    objet!: string;
    message!: string;
    image!: string;
    date!: string;
    typeClaim!: TypeClaim;
    status!: boolean;
    user!: User;
    }